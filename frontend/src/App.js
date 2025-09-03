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
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Bar with Language Preference */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="relative flex-grow max-w-2xl">
            <input
              type="text"
              placeholder="Search for specific recipes..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span>English</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Language dropdown would go here */}
            </div>
            <div className="h-6 border-l border-gray-300"></div>
            <button className="text-gray-700 hover:text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Filter options */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Key Ingredients</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Exclude</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Meal type</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Missing one ingredient</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Video only</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Cuisines</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Diet</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Max Ingredients</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Rating</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm flex items-center hover:bg-gray-50">
            <span>Recipe time</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8"> {/* Adjusted gap for different screens */}
            <RecipeSearch onSearch={handleSearch} />

            <div className="lg:col-span-2">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-dark">Suggested Recipes</h2> {/* Responsive text size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"> {/* Added sm breakpoint */}
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
