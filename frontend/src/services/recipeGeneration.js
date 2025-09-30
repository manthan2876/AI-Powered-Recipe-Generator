import { API_BASE } from "./apiConfig";

export async function generateRecipe(ingredientsText) {
  const response = await fetch(`${API_BASE}/api/recipe-generation/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsText }),
  });

  if (!response.ok) {
    throw new Error("Generation failed");
  }

  return response.json(); // Expected: {title, ingredients[], instructions}
}
