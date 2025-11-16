// File: backend/services/aiService.js

import { OpenAI } from 'openai';
import dotenv from 'dotenv';

// Configure environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- HELPER FUNCTION FOR FALLBACK ---
// This creates a structured object so the app doesn't crash if AI fails
const getFallbackRecipe = (ingredients) => {
  return {
    title: `Fallback: Dish with ${ingredients.slice(0, 3).join(', ')}`,
    description: `A fallback recipe using ${ingredients.join(', ')}`,
    ingredients: ingredients, // Use original ingredients
    instructions: `1. Combine ${ingredients.join(', ')} in a bowl.\n2. Cook until done.\n3. Serve hot.`,
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Mixed',
    tags: ['Fallback', 'AI-generated'],
    NER: [{ entity: 'Fallback', label: 'GENERIC' }] // For compatibility
  };
};

// --- MAIN AI SERVICE FUNCTION ---
// This is the function you will export and use in your controller
const callOpenAIService = async (ingredients) => {
  console.log('Calling OpenAI service for recipe generation...');

  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in .env file');
    return getFallbackRecipe(ingredients); // Return a safe fallback
  }

  const ingredientsString = ingredients.join(', ');

  // System prompt to instruct the AI
  const systemPrompt = `
    You are a culinary assistant. Generate a recipe using the provided ingredients.
    Respond *only* with a valid JSON object matching this exact structure.
    Do not add any text, markdown, or explanations before or after the JSON.
    {
      "title": "Recipe Title",
      "description": "A brief, enticing description of the dish.",
      "ingredients": ["list of all ingredients needed, including quantities (e.g., '1 cup flour', '2 large eggs')"],
      "instructions": "Step-by-step instructions as a single string. Use \\n for new lines.",
      "prepTime": 15,
      "cookTime": 30,
      "servings": 4,
      "difficulty": "Medium",
      "cuisine": "e.g., Italian",
      "tags": ["keyword1", "keyword2"]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Ingredients: ${ingredientsString}` }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = response.choices[0].message.content;
    const parsedData = JSON.parse(aiResponse);

    // Add back the fields our generateRecipe function expects
    parsedData.tags = ['AI-generated', ...parsedData.tags, ...ingredients.slice(0, 3)];
    parsedData.NER = [{ entity: 'AI-Generated', label: 'INFO' }];

    console.log('OpenAI response parsed successfully.');
    return parsedData;

  } catch (error) {
    console.error('Error calling OpenAI service:', error.message);
    return getFallbackRecipe(ingredients); // Return fallback on error
  }
};

// Export the function
export { callOpenAIService };