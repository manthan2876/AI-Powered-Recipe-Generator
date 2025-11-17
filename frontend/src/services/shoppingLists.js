// src/services/shoppingLists.js

import { API_BASE } from './apiConfig';

export async function getShoppingLists() {
  const res = await fetch(`${API_BASE}/api/shoppinglists`, { credentials: "include" });
  return res.ok ? res.json() : [];
}

export async function createShoppingList(data) {
  const res = await fetch(`${API_BASE}/api/shoppinglists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create shopping list');
  return res.json();
}

export async function deleteShoppingList(id) {
  const res = await fetch(`${API_BASE}/api/shoppinglists/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error('Failed to delete shopping list');
}

export async function addShoppingListItem(listId, item) {
  const res = await fetch(`${API_BASE}/api/shoppinglists/${listId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res.json();
}

export async function updateShoppingListItem(listId, itemId, item) {
  const res = await fetch(`${API_BASE}/api/shoppinglists/${listId}/items/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

export async function deleteShoppingListItem(listId, itemId) {
  const res = await fetch(`${API_BASE}/api/shoppinglists/${listId}/items/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error('Failed to delete item');
}

// Generate shopping list from a recipe
export async function generateShoppingListFromRecipe(recipe) {
  // Check if recipe has an _id (saved recipe) or is a generated recipe
  if (!recipe._id) {
    // For generated recipes that aren't saved, create a shopping list with items directly
    const listName = `Shopping List for ${recipe.title}`;
    const items = (recipe.ingredients || []).map(ingredient => {
      if (!ingredient || typeof ingredient !== 'string') {
        return {
          ingredient: String(ingredient || ''),
          quantity: ''
        };
      }
      
      // Try multiple patterns to parse quantity and ingredient name
      let quantity = '';
      let ingredientName = ingredient.trim();
      
      // Pattern 1: "2 cups flour" or "1/2 tsp salt"
      const pattern1 = ingredient.match(/^([\d./\s]+)?\s*([a-zA-Z]+\.?)?\s+(.+)$/);
      if (pattern1) {
        const [_, amount, unit, name] = pattern1;
        if (amount && name) {
          quantity = amount.trim() + (unit ? ' ' + unit.trim() : '');
          ingredientName = name.trim();
        }
      }
      
      // Pattern 2: "2-3 eggs" or "1-2 cups"
      if (!pattern1) {
        const pattern2 = ingredient.match(/^([\d./-]+)\s+(.+)$/);
        if (pattern2) {
          quantity = pattern2[1].trim();
          ingredientName = pattern2[2].trim();
        }
      }
      
      // Pattern 3: Just a number at the start "2 tomatoes"
      if (!pattern1 && !pattern2) {
        const pattern3 = ingredient.match(/^(\d+)\s+(.+)$/);
        if (pattern3) {
          quantity = pattern3[1].trim();
          ingredientName = pattern3[2].trim();
        }
      }
      
      // If no pattern matches, use the whole string as ingredient name
      // This ensures ALL ingredients are included
      
      return {
        ingredient: ingredientName,
        quantity: quantity
      };
    }).filter(item => item.ingredient); // Remove any empty ingredients

    const shoppingList = await createShoppingList({
      name: listName,
      items: items
    });

    return shoppingList;
  } else {
    // For saved recipes, use the backend API to generate from recipe ID
    const listName = `Shopping List for ${recipe.title}`;
    const shoppingList = await createShoppingList({
      name: listName,
      recipeIds: [recipe._id]
    });

    return shoppingList;
  }
}
  