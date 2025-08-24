import React, { useState } from 'react';

const RecipeDetail = ({ recipe, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [activeTab, setActiveTab] = useState('ingredients');

  if (!recipe) return null;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically call your API to save the favorite status
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    // Here you would typically call your API to save the rating
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Recipe Header */}
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-64 object-cover rounded-t-lg" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-t-lg"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-white">{recipe.title}</h1>
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-white'}`}
              >
                <svg className="w-8 h-8" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {recipe.dietary.vegetarian && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vegetarian</span>}
              {recipe.dietary.vegan && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Vegan</span>}
              {recipe.dietary.glutenFree && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Gluten-Free</span>}
              {recipe.dietary.dairyFree && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Dairy-Free</span>}
            </div>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <div>
                <span className="text-gray-500 block text-sm">Prep Time</span>
                <span className="font-medium">{recipe.prepTime}</span>
              </div>
              <div className="h-10 border-l border-gray-300"></div>
              <div>
                <span className="text-gray-500 block text-sm">Cook Time</span>
                <span className="font-medium">{recipe.cookTime}</span>
              </div>
              <div className="h-10 border-l border-gray-300"></div>
              <div>
                <span className="text-gray-500 block text-sm">Rating</span>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1">{recipe.rating}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-gray-500 block text-sm mb-1">Rate this recipe</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => handleRating(star)}
                    className={`w-8 h-8 ${userRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex -mb-px">
              <button
                className={`mr-8 py-2 ${activeTab === 'ingredients' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button
                className={`mr-8 py-2 ${activeTab === 'instructions' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('instructions')}
              >
                Instructions
              </button>
              <button
                className={`py-2 ${activeTab === 'nutrition' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutrition
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'ingredients' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Cooking Instructions</h2>
              <ol className="space-y-4">
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <p>Preheat your oven to 350°F (175°C) if baking is required.</p>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <p>Prepare all ingredients according to the ingredient list. Wash, peel, and chop as needed.</p>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <p>Follow the specific cooking method for this recipe (sauté, bake, boil, etc.).</p>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <p>Cook until the dish reaches the desired doneness and temperature.</p>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                  <p>Serve hot and enjoy your delicious meal!</p>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-gray-500 text-sm">Calories</span>
                  <span className="text-xl font-semibold">320</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-gray-500 text-sm">Protein</span>
                  <span className="text-xl font-semibold">12g</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-gray-500 text-sm">Carbs</span>
                  <span className="text-xl font-semibold">42g</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-gray-500 text-sm">Fat</span>
                  <span className="text-xl font-semibold">10g</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">* Nutrition information is estimated and may vary based on specific ingredients used.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;