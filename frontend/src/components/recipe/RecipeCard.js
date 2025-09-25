import React, { useState } from 'react';
import { createShoppingList, addShoppingListItem, getShoppingLists, updateShoppingList } from '../../api/shoppingLists';

const RecipeCard = ({ recipe, onClick }) => {
  const [isAddingToList, setIsAddingToList] = useState(false);
  const dietary = recipe.dietary || {};
  const prep = recipe.prepTime || recipe.metadata?.prepTime || '-';
  const cook = recipe.cookTime || recipe.metadata?.cookTime || '-';
  const ingredientsList = Array.isArray(recipe.ingredients) ? recipe.ingredients : (typeof recipe.ingredients === 'string' ? recipe.ingredients.split(',').map(s => s.trim()) : []);
  const image = recipe.image || recipe.thumbnail || 'https://via.placeholder.com/600x400?text=Recipe';
  const handleImgError = (e) => {
    e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
  };
  const title = recipe.title || recipe.name || 'Recipe';
  const rating = typeof recipe.rating === 'number' ? recipe.rating : (recipe.avgRating || 0);
  return (
    <div className="card cursor-pointer" onClick={() => onClick(recipe)}>
      <img src={image} onError={handleImgError} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-dark">{title}</h3>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <span className="mr-3">Prep: {prep}</span>
          <span>Cook: {cook}</span>
        </div>
        <div className="mt-3">
          <h4 className="text-sm font-medium text-dark">Ingredients:</h4>
          <p className="text-sm text-gray-600">{ingredientsList.join(', ')}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {dietary.vegetarian && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vegetarian</span>}
          {dietary.vegan && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vegan</span>}
          {dietary.glutenFree && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Gluten-Free</span>}
          {dietary.dairyFree && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Dairy-Free</span>}
        </div>
        <div className="mt-4 flex justify-between">
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View Recipe
          </button>
          <div className="flex space-x-2">
            <button 
              className={`text-gray-500 hover:text-green-600 ${isAddingToList ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  setIsAddingToList(true);
                  // Get existing shopping lists
                  const lists = await getShoppingLists();
                  
                  // Create a new list if none exists or use the first one
                  let shoppingList;
                  if (!lists || lists.length === 0) {
                    shoppingList = await createShoppingList({
                      name: `Shopping List with ${recipe.title}`,
                      items: [],
                      recipes: [recipe._id]
                    });
                  } else {
                    // Use the first shopping list
                    shoppingList = lists[0];
                    
                    // Add recipe ingredients to the shopping list
                    await updateShoppingList(shoppingList._id, {
                      ...shoppingList,
                      recipes: [...(shoppingList.recipes || []), recipe._id]
                    });
                  }
                  
                  alert(`Added ${recipe.title} ingredients to shopping list`);
                } catch (error) {
                  console.error('Error adding to shopping list:', error);
                  alert('Failed to add to shopping list. Please try again.');
                } finally {
                  setIsAddingToList(false);
                }
              }}
              title="Add to Shopping List"
              disabled={isAddingToList}
            >
              {isAddingToList ? (
                <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </button>
            <button className="text-gray-500 hover:text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;