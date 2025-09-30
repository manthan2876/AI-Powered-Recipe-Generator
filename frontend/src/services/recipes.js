import { API_BASE } from "./apiConfig";

export async function getRecipes() {
  const res = await fetch(`${API_BASE}/api/recipes`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch recipes");
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

export async function deleteRecipe(id) {
  const res = await fetch(`${API_BASE}/api/recipes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete recipe");
}

export async function getSavedRecipes() {
  const res = await fetch(`${API_BASE}/api/recipes/saved`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to get saved recipes");
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

export async function removeSavedRecipe(id) {
  const res = await fetch(`${API_BASE}/api/recipes/saved/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to remove saved recipe");
}
