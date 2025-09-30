import React, { useEffect, useState } from "react";
import { getRecipes, deleteRecipe } from "../services/recipes";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load recipes");
      }
    }
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this recipe?")) {
      try {
        await deleteRecipe(id);
        setRecipes(recipes.filter((r) => r._id !== id));
      } catch {
        setError("Failed to delete recipe");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-6xl mx-auto py-6">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center">Supercook Style Recipes</h1>
      </header>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={recipe.image || "/default-recipe.jpg"}
              alt={recipe.title}
              className="rounded-t-lg w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 truncate">{recipe.title}</h2>
              <p className="text-sm text-gray-500 mt-2 line-clamp-3">{recipe.description || "Delicious recipe"}</p>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Recipes;
