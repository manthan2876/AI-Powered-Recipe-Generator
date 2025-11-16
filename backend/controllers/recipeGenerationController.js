import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Recipe from '../models/recipeModel.js';
import axios from 'axios';
// 🟢 Import GoogleGenerativeAI instead of OpenAI
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// 🟢 Initialize Gemini client
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in .env file');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyCb_ujTxJktBFhhfD3mo0M92fdIvMRuxxg');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Python service URL
const PYTHON_SERVICE_URL = 'http://localhost:5001/predict';

// --- HELPER FUNCTION FOR PARSER FALLBACK ---
// (This function is unchanged)
const getParserFallback = (rawText, ingredients = []) => {
  console.warn('Using parser fallback structure.');
  const fallbackIngredients = ingredients.length > 0 ? ingredients : ["See instructions"];
  const fallbackTitle = ingredients.length > 0 
    ? `Fallback Recipe with ${ingredients.slice(0, 3).join(', ')}`
    : "Unstructured Recipe (Fallback)";

  return {
    title: fallbackTitle,
    description: "Could not parse the raw recipe text. Displaying raw text.",
    ingredients: fallbackIngredients,
    instructions: rawText,
    prepTime: 15,
    cookTime: 30,
    servings: 2,
    difficulty: "Medium",
    cuisine: "Unknown",
    tags: ["Parsing-Failed", "Fallback"],
    NER: [{ entity: "Fallback", label: "PARSE_ERROR" }]
  };
};

// 🟡 --- MAIN PARSING FUNCTION (MODIFIED FOR GEMINI) --- 🟡
const structureRecipeText = async (recipeText, originalIngredients) => {
  console.log('Calling Gemini service to *parse* recipe text...');

  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in .env file. Returning fallback.');
    return getParserFallback(recipeText, originalIngredients);
  }

  // The system prompt is still valid for Gemini
  const systemPrompt = `
    You are a recipe parsing assistant. Take the raw recipe text provided by the user
    and extract the information. Respond *only* with a valid JSON object matching this
    exact structure. Do not add any text, markdown, or explanations.
    If you cannot find information for a field, make a reasonable guess.
    For 'ingredients', list all ingredients, including quantities if mentioned.
    For 'instructions', combine all steps into a array of strings.

    {
      "title": "Recipe Title",
      "description": "A brief description of the dish. If none, create one.",
      "ingredients": ["list of all ingredients needed, including quantities"],
      "instructions": ["Step-by-step instructions as an array of strings."],
      "di
      "prepTime": 15,
      "cookTime": 30,
      "servings": 4,
      "difficulty": "Medium",
      "cuisine": "Unknown",
      "tags": ["parsed"]
    }
  `;

  try {
    // 1. Get the model, configured with the system prompt
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Using Flash for speed
      systemInstruction: {
        role: "system",
        parts: [{ text: systemPrompt }],
      },
    });

    // 2. Generate content, enabling JSON output mode
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: recipeText }] }],
      generationConfig: {
        responseMimeType: "application/json", // Enable JSON output mode
        temperature: 0.1, // Low temp for predictable JSON
      },
    });

    // 3. Extract and parse the response
    const response = result.response;
    const aiResponse = response.text();
    const parsedData = JSON.parse(aiResponse); // The response text *is* the JSON

    // Add back the fields our controller expects
    parsedData.tags = ['AI-Parsed', 'Gemini-Parsed', ...parsedData.tags]; // Added a Gemini tag
    parsedData.NER = [{ entity: 'AI-Parsed-Gemini', label: 'INFO' }];

    console.log('Gemini parsing completed successfully.');
    return parsedData;

  } catch (error) {
    console.error('Error calling Gemini parsing service:', error.message);
    return getParserFallback(recipeText, originalIngredients); // Return fallback on error
  }
};
// 🟢 --- END: MODIFIED FUNCTION --- 🟢


// --- callPythonService FUNCTION ---
// (This function is unchanged, as it just passes data to structureRecipeText)
const callPythonService = async (ingredients) => {
  console.log('Calling Python service for recipe generation...');
  
  let recipeText;

  try {
    // 1. Make HTTP request to Python service
    const response = await axios.post(PYTHON_SERVICE_URL, { ingredients });
    console.log('Python service response received.');

    recipeText = response.data.recipe;

    if (!recipeText || typeof recipeText !== 'string' || recipeText.trim() === '') {
        throw new Error('Python service returned an invalid or empty recipe string.');
    }

    // 2. Call the new Gemini-powered parser
    const structuredData = await structureRecipeText(recipeText, ingredients);
    
    return structuredData;

  } catch (error) {
    console.error('Error in recipe generation pipeline:', error.message);
    
    return getParserFallback(
      recipeText || "Service failed to generate a recipe.", 
      ingredients
    );
  }
};

// --- generateRecipe FUNCTION ---
// (This function is unchanged, it's already compatible)
const generateRecipe = asyncHandler(async (req, res) => {
  const { ingredients } = req.body;
  
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    res.status(400);
    throw new Error('Please provide a list of ingredients');
  }

  try {
    const generatedData = await callPythonService(ingredients);
    
    const allTags = [
      'AI-generated', 
      ...generatedData.tags,
      ...ingredients.slice(0, 5)
    ]
    .filter((value, index, self) => self.indexOf(value) === index);

    const recipe = new Recipe({
      user: req.user._id,
      title: generatedData.title,
      description: generatedData.description,
      ingredients: generatedData.ingredients,
      instructions: generatedData.instructions, 
      prepTime: generatedData.prepTime,
      cookTime: generatedData.cookTime,
      servings: generatedData.servings,
      difficulty: generatedData.difficulty,
      cuisine: generatedData.cuisine,
      tags: allTags,
      notes: `This recipe was generated by AI and parsed by Gemini. NER results: ${JSON.stringify(generatedData.NER)}`, 
      isPublic: false
    });
    
    const savedRecipe = await recipe.save();
    
    res.status(201).json({
      ...savedRecipe._doc,
      NER: generatedData.NER
    });
  } catch (error) {
    console.error('Recipe generation controller error:', error);
    res.status(500);
    throw new Error('Failed to generate recipe: ' + error.message);
  }
});

// --- parseIngredientsFromText FUNCTION ---
// (This function is unchanged)
const parseIngredientsFromText = asyncHandler(async (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string' || text.trim() === '') {
    res.status(400);
    throw new Error('Please provide a non-empty text to parse');
  }
  
  try {
    const ingredients = text
      .split(/[,;\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    res.status(200).json({ ingredients });
  } catch (error) {
    console.error('Ingredient parsing error:', error);
    res.status(500);
    throw new Error('Failed to parse ingredients: ' + error.message);
  }
});

export { generateRecipe, parseIngredientsFromText };