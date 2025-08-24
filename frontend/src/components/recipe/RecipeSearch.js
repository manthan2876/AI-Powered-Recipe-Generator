import React, { useState } from 'react';

const RecipeSearch = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false
  });

  const handleIngredientAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setIngredients([...ingredients, e.target.value.trim()]);
      e.target.value = '';
    }
  };

  const handleDietaryChange = (preference) => {
    setDietaryPreferences({
      ...dietaryPreferences,
      [preference]: !dietaryPreferences[preference]
    });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleSearch = () => {
    onSearch({
      ingredients,
      dietaryPreferences
    });
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-dark">Ingredients</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Add ingredient and press Enter"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={handleIngredientAdd}
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {ingredients.map((ingredient, index) => (
            <span key={index} className="bg-secondary bg-opacity-20 text-secondary px-3 py-1 rounded-full flex items-center">
              {ingredient}
              <button 
                onClick={() => handleRemoveIngredient(index)}
                className="ml-2 text-secondary hover:text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-dark">Dietary Preferences</h2>
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
              checked={dietaryPreferences.vegetarian}
              onChange={() => handleDietaryChange('vegetarian')}
            />
            <span>Vegetarian</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
              checked={dietaryPreferences.vegan}
              onChange={() => handleDietaryChange('vegan')}
            />
            <span>Vegan</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
              checked={dietaryPreferences.glutenFree}
              onChange={() => handleDietaryChange('glutenFree')}
            />
            <span>Gluten Free</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
              checked={dietaryPreferences.dairyFree}
              onChange={() => handleDietaryChange('dairyFree')}
            />
            <span>Dairy Free</span>
          </label>
        </div>
        <button 
          className="btn-primary w-full mt-6"
          onClick={handleSearch}
        >
          Generate Recipes
        </button>
      </div>
    </div>
  );
};

export default RecipeSearch;