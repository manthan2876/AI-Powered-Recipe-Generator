import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toggleFavorite } from "../services/recipes";

const RecipeCard = ({ recipe, onDelete, onClick }) => {
  const { user } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(recipe.isSaved || false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaved(recipe.isSaved || false);
  }, [recipe.isSaved]);

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
    <div
      style={{
        display: 'flex',
        gap: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        padding: '16px',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Recipe Image */}
      <div style={{ flexShrink: 0 }}>
        <img
          src={recipe.image || "/default-recipe.jpg"}
          alt={recipe.title}
          style={{
            width: '128px',
            height: '128px',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
      </div>

      {/* Recipe Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '4px'
          }}>
            {recipe.title}
          </h3>
          {recipe.cuisine && (
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              {recipe.cuisine}
            </p>
          )}
          {recipe.ingredientMatch !== undefined && (
            <p style={{ fontSize: '14px', color: '#333' }}>
              Matches {recipe.ingredientMatch} ingredient{recipe.ingredientMatch !== 1 ? 's' : ''}.
            </p>
          )}
          {recipe.rating > 0 && (
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              ⭐ {recipe.rating.toFixed(1)} {recipe.numReviews > 0 && `(${recipe.numReviews} review${recipe.numReviews !== 1 ? 's' : ''})`}
            </p>
          )}
        </div>
      </div>

      {/* Action Icons */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button
          onClick={handleSave}
          style={{
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
          aria-label="Save recipe"
          disabled={isSaving}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: isSaved ? '#ff4444' : '#999', opacity: isSaving ? 0.5 : 1 }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <button
          onClick={handleShare}
          style={{
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
          aria-label="Share recipe"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: '#999' }}
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
