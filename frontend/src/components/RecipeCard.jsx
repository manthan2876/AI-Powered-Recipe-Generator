import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toggleFavorite } from "../services/recipes";
import { Heart, Share2, Star } from "lucide-react";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe, onDelete, onClick }) => {
  const { user } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(recipe.isSaved || false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaved(recipe.isSaved || false);
  }, [recipe.isSaved, recipe._id]);

  const handleSave = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login to save recipes");
      return;
    }

    setIsSaving(true);
    try {
      const result = await toggleFavorite(recipe._id);
      setIsSaved(result.isSaved);
      // Update the recipe object if needed
      if (result.recipe) {
        recipe.isSaved = result.isSaved;
      }
      if (onDelete && !result.isSaved) {
        onDelete();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to save recipe. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (recipe.url) {
      window.open(recipe.url, '_blank');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`
        group relative flex flex-col md:flex-row bg-white/80 dark:bg-gray-800/60 backdrop-blur-md 
        border border-white/50 dark:border-white/10 rounded-2xl overflow-hidden 
        shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer
        h-full
      `}
    >
      {/* Recipe Image */}
      <div className="w-full md:w-32 h-48 md:h-auto flex-shrink-0 relative overflow-hidden">
        <img
          src={recipe.image || "/default-recipe.jpg"}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
      </div>

      {/* Recipe Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold font-display text-gray-800 dark:text-white mb-1 line-clamp-2 leading-tight">
            {recipe.title}
          </h3>

          {recipe.cuisine && (
            <span className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold mb-2">
              {recipe.cuisine}
            </span>
          )}

          {recipe.ingredientMatch !== undefined && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Matches <span className="font-bold text-green-600 dark:text-green-400">{recipe.ingredientMatch}</span> ingredient{recipe.ingredientMatch !== 1 ? 's' : ''}.
            </p>
          )}

          {recipe.rating > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-700 dark:text-gray-200">{recipe.rating.toFixed(1)}</span>
              <span className="text-xs">({recipe.numReviews || 0})</span>
            </div>
          )}
        </div>

        {/* Action Icons - Desktop: Bottom Right, Mobile: Absolute Top Right */}
        <div className="flex justify-end gap-2 mt-4 md:mt-0">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
                    p-2 rounded-full transition-all duration-200 focus:outline-none
                    ${isSaved
                ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
                : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
              }
                `}
            title={isSaved ? "Remove from favorites" : "Save recipe"}
          >
            <Heart size={18} className={isSaved ? "fill-current" : ""} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-primary/10 hover:text-primary transition-all duration-200"
            title="Share recipe"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
