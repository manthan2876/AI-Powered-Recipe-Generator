import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="card cursor-pointer" onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-dark">{recipe.title}</h3>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm">{recipe.rating}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <span className="mr-3">Prep: {recipe.prepTime}</span>
          <span>Cook: {recipe.cookTime}</span>
        </div>
        <div className="mt-3">
          <h4 className="text-sm font-medium text-dark">Ingredients:</h4>
          <p className="text-sm text-gray-600">{recipe.ingredients.join(', ')}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {recipe.dietary.vegetarian && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vegetarian</span>}
          {recipe.dietary.vegan && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vegan</span>}
          {recipe.dietary.glutenFree && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Gluten-Free</span>}
          {recipe.dietary.dairyFree && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Dairy-Free</span>}
        </div>
        <div className="mt-4 flex justify-between">
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View Recipe
          </button>
          <button className="text-gray-500 hover:text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;