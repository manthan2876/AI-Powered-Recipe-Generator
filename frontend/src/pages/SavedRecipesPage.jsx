import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getFavoriteRecipes, toggleFavorite } from "../services/recipes";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        const data = await getFavoriteRecipes();
        setRecipes(data || []);
      } catch (err) {
        setError("Failed to load saved recipes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  const handleRemove = async (id) => {
    // Optimistic update handled in RecipeCard now, or we can handle it here if passed as onDelete
    // To match previous logic:
    if (window.confirm("Remove this recipe from saved?")) {
      try {
        await toggleFavorite(id);
        setRecipes((prev) => prev.filter((r) => r._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Improved remove handler that doesn't need window.confirm if we want a smoother UX
  const onCardDelete = (id) => {
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-1 p-4 md:p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-800 dark:text-white mb-2">
              Saved Recipes
            </h1>
            <p className="text-black dark:text-white">
              Your personal cookbook of favorites.
            </p>
          </header>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-500 text-sm p-3 rounded-lg text-center mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Heart size={32} className="text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">No saved recipes yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start exploring and save your favorite recipes here!
              </p>
              <Link to="/recipes" className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all">
                Browse Recipes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div key={recipe._id} className="h-full">
                  <RecipeCard
                    recipe={{ ...recipe, isSaved: true }}
                    onDelete={() => onCardDelete(recipe._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavedRecipes;
