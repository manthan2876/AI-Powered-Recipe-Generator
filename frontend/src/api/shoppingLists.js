import axios from 'axios';

// Get all shopping lists
export const getShoppingLists = async () => {
  try {
    const { data } = await axios.get('/api/shoppinglists');
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Get shopping list by ID
export const getShoppingListById = async (id) => {
  try {
    const { data } = await axios.get(`/api/shoppinglists/${id}`);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Create a new shopping list
export const createShoppingList = async (shoppingList) => {
  try {
    const { data } = await axios.post('/api/shoppinglists', shoppingList);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Update a shopping list
export const updateShoppingList = async (id, shoppingList) => {
  try {
    const { data } = await axios.put(`/api/shoppinglists/${id}`, shoppingList);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Delete a shopping list
export const deleteShoppingList = async (id) => {
  try {
    const { data } = await axios.delete(`/api/shoppinglists/${id}`);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Generate shopping list from recipes
export const generateShoppingListFromRecipes = async (id, recipeIds) => {
  try {
    const { data } = await axios.post(`/api/shoppinglists/${id}/generate`, { recipeIds });
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Add item to shopping list
export const addShoppingListItem = async (id, item) => {
  try {
    const { data } = await axios.post(`/api/shoppinglists/${id}/items`, item);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Update shopping list item
export const updateShoppingListItem = async (id, itemId, updates) => {
  try {
    const { data } = await axios.put(`/api/shoppinglists/${id}/items/${itemId}`, updates);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Delete shopping list item
export const deleteShoppingListItem = async (id, itemId) => {
  try {
    const { data } = await axios.delete(`/api/shoppinglists/${id}/items/${itemId}`);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};