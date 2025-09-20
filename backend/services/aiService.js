import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Configuration for AI model endpoints
const AI_MODEL_ENDPOINT = process.env.AI_MODEL_ENDPOINT || 'http://localhost:5001/api/generate';
const RETRIEVAL_MODEL_ENDPOINT = process.env.RETRIEVAL_MODEL_ENDPOINT || 'http://localhost:5001/api/search';

/**
 * Generate a recipe using the AI model
 * @param {Object} params - Parameters for recipe generation
 * @param {Array} params.ingredients - List of ingredients
 * @param {String} params.dietaryRestrictions - Dietary restrictions
 * @param {String} params.cuisine - Cuisine type
 * @param {String} params.mealType - Type of meal
 * @returns {Promise<Object>} - Generated recipe
 */
export const generateRecipeWithAI = async (params) => {
  try {
    const response = await axios.post(AI_MODEL_ENDPOINT, params);
    return response.data;
  } catch (error) {
    console.error('Error calling AI model for recipe generation:', error);
    throw new Error('Failed to generate recipe with AI');
  }
};

/**
 * Search for recipes by ingredients using the retrieval model
 * @param {Object} params - Search parameters
 * @param {String} params.ingredients - Comma-separated list of ingredients
 * @param {Number} params.limit - Maximum number of results to return
 * @returns {Promise<Array>} - List of matching recipes
 */
export const searchRecipesByIngredients = async (params) => {
  try {
    const response = await axios.get(RETRIEVAL_MODEL_ENDPOINT, { params });
    return response.data;
  } catch (error) {
    console.error('Error calling retrieval model for recipe search:', error);
    throw new Error('Failed to search recipes by ingredients');
  }
};

/**
 * Get recipe recommendations based on user preferences
 * @param {Object} params - Recommendation parameters
 * @param {String} params.userId - User ID for personalized recommendations
 * @param {Array} params.preferences - User preferences
 * @param {Number} params.limit - Maximum number of recommendations to return
 * @returns {Promise<Array>} - List of recommended recipes
 */
export const getRecipeRecommendations = async (params) => {
  try {
    const response = await axios.get(`${RETRIEVAL_MODEL_ENDPOINT}/recommend`, { params });
    return response.data;
  } catch (error) {
    console.error('Error getting recipe recommendations:', error);
    throw new Error('Failed to get recipe recommendations');
  }
};

/**
 * Analyze a recipe for nutritional information
 * @param {Object} recipe - Recipe to analyze
 * @returns {Promise<Object>} - Nutritional information
 */
export const analyzeRecipeNutrition = async (recipe) => {
  try {
    const response = await axios.post(`${AI_MODEL_ENDPOINT}/nutrition`, recipe);
    return response.data;
  } catch (error) {
    console.error('Error analyzing recipe nutrition:', error);
    throw new Error('Failed to analyze recipe nutrition');
  }
};

export default {
  generateRecipeWithAI,
  searchRecipesByIngredients,
  getRecipeRecommendations,
  analyzeRecipeNutrition,
};