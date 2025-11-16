import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ---
// ⚠️ SECURITY WARNING: I have removed the hardcoded API key from your code.
// The .env file is the correct and only place this key should be.
// ---
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in .env file');
}
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * --- HELPER FUNCTION FOR PARSER FALLBACK ---
 * This is exported so the controller's catch block can also use it.
 */
export const getParserFallback = (rawText, ingredients = []) => {
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

/**
 * --- MAIN PARSING FUNCTION ---
 * This is the core function that calls the Gemini API.
 */
export const structureRecipeText = async (recipeText, originalIngredients) => {
  console.log('Calling Gemini service to *parse* recipe text...');

  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set. Returning fallback.');
    return getParserFallback(recipeText, originalIngredients);
  }

  const systemPrompt = `
    You are a recipe parsing assistant. Take the raw recipe text provided by the user
    and extract the information. Respond *only* with a valid JSON object matching this
    exact structure. Do not add any text, markdown, or explanations.
    If you cannot find information for a field, make a reasonable guess.
    For 'ingredients', list all ingredients, including quantities if mentioned.
    For 'instructions', combine all steps into a single string using \\n for new lines.

    {
      "title": "Recipe Title",
      "description": "A brief description of the dish. If none, create one.",
      "ingredients": ["list of all ingredients needed, including quantities"],
      "instructions": "Step-by-step instructions as a single string. Use \\n for new lines.",
      "prepTime": 15,
      "cookTime": 30,
      "servings": 4,
      "difficulty": "Medium",
      "cuisine": "Unknown",
      "tags": ["parsed"]
    }
  `;

  try {
    // 1. Get the model (using gemini-pro for stability)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // 🟢 Using the stable 'gemini-pro' model
      systemInstruction: {
        role: "system",
        parts: [{ text: systemPrompt }],
      },
    });

    // 2. Generate content
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: recipeText }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    // 3. Extract and parse the response
    const response = result.response;
    const aiResponse = response.text();
    const parsedData = JSON.parse(aiResponse);

    parsedData.tags = ['AI-Parsed', 'Gemini-Parsed', ...parsedData.tags];
    parsedData.NER = [{ entity: 'AI-Parsed-Gemini', label: 'INFO' }];

    console.log('Gemini parsing completed successfully.');
    return parsedData;

  } catch (error) {
    console.error('Error calling Gemini parsing service:', error.message);
    return getParserFallback(recipeText, originalIngredients); // Return fallback on error
  }
};

console.log(structureRecipeText("Generate recipe with ingredients: tomato, cheese, basil, oregano, salt and pepper. Pasta Sauce butter sugar eggs flour baking powder salt milk vanilla 1/2 c. butter or margarine, softened 1 3/4 cups sugar 4 eggs 2 cups sifted all-purpose flour 3 tsp. grated orange peel (optional) or 1 tsp orange zest plus 2 Tbsp. fresh orange juice (from 1 medium navel orange) 5 tsp (about 1 cup) unsweetened cocoa powder (not Dutch-process or cocoa-flavored) plus additional for dusting 6 tsp baking pwdr Pinch of salt About 2/3 cup evaporated skimmed milk, plus more as needed (see note, below) Preheat oven to 350F. Generously butter and flour a 10-inch tube pan or possibly Bundt pan, knocking out excess flour and buttering the sides and bottom of the pan as well as tapping out any air pockets between the layers and on the bottom and sides of pan (or possibly you can use a 9- by 5- inch loaf pan). In a large bowl, beat butter at medium speed with an electric mixer until light and fluffy; gradually add in sugar, beating well after each addition, and beat in eggs, one at a time, scraping down the bowl as necessary, until well blended (mixture will look curdled at first, but will come together as it chills); stir in flour, orange rind (if using), cocoa, baking soda, 1 teaspoon salt, milk and remaining 2 teaspoons salt just until blended; pour batter into prepared pan and bake in middle of oven 1 hour and 10 minutes, or until a wooden pick inserted in center comes out clean; cool cake in pan on a wire rack 10 to 15 minutes; invert cake onto rack and cool completely, at least 2 hours or up to 1 day; dust top of cake with cocoa and dust with additional cocoa just before serving; store cake, loosely covered with plastic wrap, in a cool, dry place (such as the refrigerator) for 3 days or in the freezer for 1 month; thaw cake at room temperature for 30 minutes before slicing; wrap cake tightly in foil and store in refrigerator for 6 to 8 days; reheat cake on rack set over a baking sheet for 15 to 20 minutes"));