import { useState } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RecipeSearch from './components/recipe/RecipeSearch';
import RecipeCard from './components/recipe/RecipeCard';
import RecipeDetail from './components/recipe/RecipeDetail';

function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Mock recipe data
  const recipes = [
    {
      id: 1,
      title: 'Vegetable Stir Fry',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      ingredients: ['broccoli', 'carrots', 'bell peppers', 'soy sauce', 'garlic'],
      prepTime: '15 mins',
      cookTime: '10 mins',
      rating: 4.5,
      dietary: { vegetarian: true, vegan: true, glutenFree: true, dairyFree: true }
    },
    {
      id: 2,
      title: 'Pasta Carbonara',
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      ingredients: ['pasta', 'eggs', 'bacon', 'parmesan cheese', 'black pepper'],
      prepTime: '10 mins',
      cookTime: '15 mins',
      rating: 4.8,
      dietary: { vegetarian: false, vegan: false, glutenFree: false, dairyFree: false }
    },
    {
      id: 3,
      title: 'Berry Smoothie Bowl',
      image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      ingredients: ['frozen berries', 'banana', 'almond milk', 'honey', 'granola'],
      prepTime: '5 mins',
      cookTime: '0 mins',
      rating: 4.2,
      dietary: { vegetarian: true, vegan: false, glutenFree: true, dairyFree: false }
    }
  ];

  const handleSearch = (searchParams) => {
    console.log('Searching with params:', searchParams);
    // Here you would typically call your API to get recipes based on search params
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-light">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'search' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
            onClick={() => setActiveTab('search')}
          >
            Search Recipes
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
            onClick={() => setActiveTab('favorites')}
          >
            My Favorites
          </button>
        </div>

        {/* Search Section */}
        {activeTab === 'search' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <RecipeSearch onSearch={handleSearch} />

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 text-dark">Suggested Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipes.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={handleRecipeClick} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Favorites Section */}
        {activeTab === 'favorites' && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-500">No favorite recipes yet</h3>
            <p className="text-gray-400 mt-2">Save recipes you love to access them later</p>
            <button 
              onClick={() => setActiveTab('search')}
              className="btn-primary mt-4"
            >
              Discover Recipes
            </button>
          </div>
        )}
      </main>

      <Footer />
      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={handleCloseRecipeDetail} 
        />
      )}
    </div>
  );
}

export default App;
