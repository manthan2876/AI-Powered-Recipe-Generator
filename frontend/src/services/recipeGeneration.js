import { API_BASE } from "./apiConfig";

// ingredientsText can be a string (comma separated) or an array
export async function generateRecipe(ingredientsInput) {
  const payload = Array.isArray(ingredientsInput)
    ? { ingredients: ingredientsInput }
    : { ingredients: (ingredientsInput || '').split(',').map(i => i.trim()).filter(Boolean) };

  const response = await fetch(`${API_BASE}/api/recipes/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Generation failed");
  }

  return response.json(); // Expected: created recipe object
}
