// Centralized API client for recipe-related endpoints

const getBaseUrl = () => {
  // In development, proxy via CRA or use REACT_APP_API_BASE if provided
  const envBase = process.env.REACT_APP_API_BASE;
  if (envBase) return envBase.replace(/\/$/, '');
  return '';
};

const BASE = getBaseUrl();

export async function searchRecipesByIngredients({ ingredients = [], limit = 12, vegetarian, vegan, glutenFree, dairyFree }) {
  const params = new URLSearchParams();
  if (ingredients.length) params.set('ingredients', ingredients.join(','));
  if (limit) params.set('limit', String(limit));
  if (vegetarian) params.set('vegetarian', 'true');
  if (vegan) params.set('vegan', 'true');
  if (glutenFree) params.set('glutenFree', 'true');
  if (dairyFree) params.set('dairyFree', 'true');

  const res = await fetch(`${BASE}/api/recipes/search?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to search recipes');
  }
  return res.json();
}

export async function getRecipes({ pageNumber = 1, keyword = '' } = {}) {
  const params = new URLSearchParams();
  if (pageNumber) params.set('pageNumber', String(pageNumber));
  if (keyword) params.set('keyword', keyword);

  const res = await fetch(`${BASE}/api/recipes?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error((await res.text()) || 'Failed to fetch recipes');
  return res.json();
}

export async function getTopRecipes() {
  const res = await fetch(`${BASE}/api/recipes/top`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error((await res.text()) || 'Failed to fetch top recipes');
  return res.json();
}

export async function getRecipeById(id) {
  const res = await fetch(`${BASE}/api/recipes/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error((await res.text()) || 'Failed to fetch recipe');
  return res.json();
}

export async function createRecipeReview(id, { rating, comment }) {
  const res = await fetch(`${BASE}/api/recipes/${id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ rating, comment }),
  });
  if (!res.ok) throw new Error((await res.text()) || 'Failed to submit review');
  return res.json();
}

export async function generateRecipe(params) {
  const res = await fetch(`${BASE}/api/recipes/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error((await res.text()) || 'Failed to generate recipe');
  return res.json();
}

export async function toggleFavoriteRecipe(recipeId) {
  const res = await fetch(`${BASE}/api/recipes/${recipeId}/favorite`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to toggle favorite');
  }
  return res.json();
}

export async function getFavoriteRecipes() {
  const res = await fetch(`${BASE}/api/recipes/favorites`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch favorites');
  }
  return res.json();
}

export default {
  searchRecipesByIngredients,
  getRecipes,
  getTopRecipes,
  getRecipeById,
  createRecipeReview,
  generateRecipe,
  toggleFavoriteRecipe,
  getFavoriteRecipes,
};


