import React from "react";

const RecipeDetail = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="rounded-lg max-w-3xl w-full max-h-full overflow-auto p-6 relative" style={{ background: 'var(--card)', color: 'var(--text)' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close"
          style={{ color: 'var(--muted)', background: 'transparent', border: 'none' }}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>
        <img
          src={recipe.image || "/default-recipe.jpg"}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside mb-4" style={{ color: 'var(--muted)' }}>
          {(recipe.ingredients || []).map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mb-2">Instructions</h3>
        <p className="whitespace-pre-line" style={{ color: 'var(--muted)' }}>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
