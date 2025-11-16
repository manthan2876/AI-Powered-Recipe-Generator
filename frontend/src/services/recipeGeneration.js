import { API_BASE } from "./apiConfig";

// Update this function to just accept the array
export async function generateRecipe(ingredientsArray) {
  // The array is already built by the frontend, so just send it
  const payload = { ingredients: ingredientsArray };

  const response = await fetch(`${API_BASE}/api/recipe-generation/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    // Throw the specific message from the server
    throw new Error(err.message || "Generation failed. The server might be busy.");
  }

  return response.json(); // Expected: created recipe object
}