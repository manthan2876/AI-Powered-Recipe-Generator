import axios from 'axios';
const getBaseUrl = () => {
  const envBase = process.env.REACT_APP_API_BASE;
  if (envBase) return envBase.replace(/\/$/, '');
  return '';
};

const BASE = getBaseUrl();

// Generate a recipe from ingredients
export const generateRecipe = async (ingredients) => {
  try {
    const response = await axios.post(`${BASE}/api/recipe-generation/generate`, { ingredients });
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Parse ingredients from text
export const parseIngredientsFromText = async (text) => {
  try {
    const response = await axios.post(`${BASE}/api/recipe-generation/parse-ingredients`, { text });
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};