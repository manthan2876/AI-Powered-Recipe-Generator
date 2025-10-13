import { API_BASE } from "./apiConfig";

export async function getRecipes(query = '') {
  const url = query ? `${API_BASE}/api/recipes?keyword=${encodeURIComponent(query)}` : `${API_BASE}/api/recipes`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch recipes");
  const json = await res.json();
  // Backend returns {recipes, page, pages} for list route
  if (json && Array.isArray(json.recipes)) return json.recipes;
  if (Array.isArray(json)) return json;
  return [];
}

export async function deleteRecipe(id) {
  const res = await fetch(`${API_BASE}/api/recipes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete recipe");
}

export async function getRecipeById(id) {
  const res = await fetch(`${API_BASE}/api/recipes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
}

export async function toggleFavorite(id) {
  const res = await fetch(`${API_BASE}/api/recipes/${id}/favorite`, {
    method: 'PUT',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to toggle favorite');
  return res.json();
}

export async function searchRecipesByIngredients(ingredients = []) {
  const q = Array.isArray(ingredients) ? ingredients.join(',') : ingredients;
  const res = await fetch(`${API_BASE}/api/recipes/search?ingredients=${encodeURIComponent(q)}`);
  if (!res.ok) return [];
  return res.json();
}
