import React from "react";

const RecipeCard = ({ recipe, onDelete, onClick }) => {
  return (
    <div
      className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
      style={{ background: 'var(--card)', color: 'var(--text)' }}
    >
      <img
        src={recipe.image || "/default-recipe.jpg"}
        alt={recipe.title}
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{recipe.title}</h3>
        <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--muted)' }}>{recipe.description || "Delicious recipe"}</p>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="mt-3 w-full py-2 rounded hover:opacity-95 transition"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
