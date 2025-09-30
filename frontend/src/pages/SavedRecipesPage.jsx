import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getSavedRecipes, removeSavedRecipe } from "../services/recipes";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSaved() {
      try {
        const data = await getSavedRecipes();
        setRecipes(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load saved recipes");
      }
    }
    fetchSaved();
  }, []);

  const handleRemove = async (id) => {
    if (window.confirm("Remove this recipe from saved?")) {
      try {
        await removeSavedRecipe(id);
        setRecipes((prev) => prev.filter((r) => r._id !== id));
      } catch {
        setError("Failed to remove recipe");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-6xl mx-auto py-6">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center">Saved Recipes</h1>
      </header>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No saved recipes yet.</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onDelete={() => handleRemove(recipe._id)}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default SavedRecipes;
