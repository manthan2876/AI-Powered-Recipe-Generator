import React from "react";

const RecipeCard = ({ recipe, onDelete, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={recipe.image || "/default-recipe.jpg"}
        alt={recipe.title}
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{recipe.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{recipe.description || "Delicious recipe"}</p>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
