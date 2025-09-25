import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { generateRecipe, parseIngredientsFromText } from '../api/recipeGeneration';

const RecipeGenerationPage = () => {
  const [ingredients, setIngredients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ingredients.trim()) {
      toast.error('Please enter at least one ingredient');
      return;
    }
    
    try {
      setIsLoading(true);
      // Split ingredients by commas or new lines
      const ingredientsList = ingredients
        .split(/[,\n]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      const result = await generateRecipe(ingredientsList);
      setGeneratedRecipe(result);
      toast.success('Recipe generated successfully!');
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToShoppingList = async () => {
    if (!generatedRecipe) return;
    
    try {
      // Navigate to create shopping list page with recipe ID
      navigate(`/shopping-lists/new?recipeId=${generatedRecipe._id}`);
    } catch (error) {
      toast.error('Failed to create shopping list');
    }
  };

  const handlePasteRecipe = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setIngredients(text);
      
      // Try to parse ingredients from the pasted text
      const result = await parseIngredientsFromText(text);
      if (result.ingredients && result.ingredients.length > 0) {
        setIngredients(result.ingredients.join(', '));
        toast.info(`Extracted ${result.ingredients.length} ingredients from text`);
      }
    } catch (error) {
      toast.error('Failed to paste from clipboard');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generate Recipe</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-700 font-medium mb-2">
              Enter Ingredients
            </label>
            <div className="flex flex-col">
              <textarea
                id="ingredients"
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter ingredients separated by commas or new lines"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <button
                type="button"
                onClick={handlePasteRecipe}
                className="mt-2 self-end text-blue-600 hover:text-blue-800"
              >
                Paste from clipboard
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate Recipe'}
          </button>
        </form>
      </div>
      
      {generatedRecipe && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">{generatedRecipe.title}</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc pl-5">
              {generatedRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="mb-1">{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
            <div className="whitespace-pre-line">
              {generatedRecipe.instructions}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSaveToShoppingList}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Create Shopping List
            </button>
            
            <button
              onClick={() => navigate(`/recipes/${generatedRecipe._id}`)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              View Recipe Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerationPage;