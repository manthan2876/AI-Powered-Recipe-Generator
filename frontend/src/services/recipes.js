import { API_BASE } from "./apiConfig";
import {
  ALL_INGREDIENT_NAMES,
  INGREDIENT_CATEGORIES,
} from "../data/ingredientCatalog";

const cloneCategories = () =>
  INGREDIENT_CATEGORIES.map((category) => ({
    ...category,
    items: [...category.items],
  }));

const cloneIngredientList = () => [...ALL_INGREDIENT_NAMES];

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
  const res = await fetch(`${API_BASE}/api/recipes/${id}`, {
    credentials: 'include'
  });
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

export async function searchRecipesByIngredients(ingredients = [], filters = {}) {
  const params = new URLSearchParams();
  
  if (ingredients && ingredients.length > 0) {
    const q = Array.isArray(ingredients) ? ingredients.join(',') : ingredients;
    params.append('ingredients', q);
  }
  
  if (filters.limit) params.append('limit', filters.limit);
  if (filters.cuisine) params.append('cuisine', filters.cuisine);
  if (filters.dietaryRestrictions) {
    const restrictions = Array.isArray(filters.dietaryRestrictions) 
      ? filters.dietaryRestrictions.join(',') 
      : filters.dietaryRestrictions;
    params.append('dietaryRestrictions', restrictions);
  }
  if (filters.minRating) params.append('minRating', filters.minRating);
  if (filters.maxTotalTime) params.append('maxTotalTime', filters.maxTotalTime);
  if (filters.excludeIngredients) {
    const exclude = Array.isArray(filters.excludeIngredients)
      ? filters.excludeIngredients.join(',')
      : filters.excludeIngredients;
    params.append('excludeIngredients', exclude);
  }
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.isGenerated !== undefined && filters.isGenerated !== null) {
    params.append('isGenerated', filters.isGenerated.toString());
  }
  
  const res = await fetch(`${API_BASE}/api/recipes/search?${params.toString()}`, {
    credentials: 'include'
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getAllIngredients(options = {}) {
  const format = options.format ?? "list";

  if (format === "categories") {
    return cloneCategories();
  }

  if (format === "both") {
    return {
      categories: cloneCategories(),
      items: cloneIngredientList(),
    };
  }

  return cloneIngredientList();
}

export async function getFavoriteRecipes() {
  const res = await fetch(`${API_BASE}/api/recipes/favorites`, {
    credentials: 'include',
  });
  if (!res.ok) return [];
  return res.json();
}

export async function submitReview(recipeId, rating, comment) {
  const res = await fetch(`${API_BASE}/api/recipes/${recipeId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ rating, comment }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to submit review');
  }
  return res.json();
}