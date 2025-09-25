import { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RecipeSearch from './components/recipe/RecipeSearch';
import RecipeCard from './components/recipe/RecipeCard';
import RecipeDetail from './components/recipe/RecipeDetail';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useLanguage, translations, languageOptions } from './contexts/LanguageContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import ManageAccount from './pages/ManageAccount';
import SavedRecipes from './pages/SavedRecipes';
import ShoppingLists from './pages/ShoppingLists';
import RecipeGenerationPage from './pages/RecipeGenerationPage';
import { searchRecipesByIngredients as apiSearchRecipesByIngredients, getTopRecipes as apiGetTopRecipes, getRecipes as apiGetRecipes } from './api/recipes';

// Categorized ingredients
const pantryEssentials = [
  'butter', 'egg', 'garlic', 'milk', 'onion', 'sugar', 'flour', 'olive oil',
  'garlic powder', 'white rice', 'cinnamon', 'ketchup', 'soy sauce', 'mayonnaise', 'vegetable oil'
];

const vegetablesAndGreens = [
  'garlic', 'onion', 'bell pepper', 'scallion', 'carrot', 'tomato', 'potato',
  'red onion', 'celery', 'avocado', 'zucchini', 'shallot', 'cherry tomato', 'cucumber'
];

const AppContent = () => {
  const { theme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('search');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Refs for dropdown containers
  const ingredientsRef = useRef(null);
  const languageDropdownRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      // Close ingredients dropdown if clicked outside
      if (ingredientsRef.current && !ingredientsRef.current.contains(event.target)) {
        setShowIngredients(false);
      }

      // Close language dropdown if clicked outside
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const top = await apiGetTopRecipes();
        if (mounted && Array.isArray(top) && top.length) {
          setSuggestedRecipes(top);
          return;
        }
      } catch {}
      try {
        const list = await apiGetRecipes({ pageNumber: 1 });
        if (mounted) setSuggestedRecipes(list?.recipes || []);
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  const handleSearch = async (searchParams) => {
    const ingredients = searchParams?.ingredients || [];
    const dietaryPrefs = searchParams?.dietaryPreferences || {};

    setIsSearching(true);
    setSearchError('');
    try {
      console.log("Searching with ingredients:", ingredients);
      // Pass dietary preferences as query parameters
      const data = await apiSearchRecipesByIngredients({
        ingredients,
        limit: 12,
        vegetarian: dietaryPrefs.vegetarian || undefined,
        vegan: dietaryPrefs.vegan || undefined,
        glutenFree: dietaryPrefs.glutenFree || undefined,
        dairyFree: dietaryPrefs.dairyFree || undefined
      });
      // The retrieval API might return an object or array; normalize to array
      const results = Array.isArray(data) ? data : (data?.recipes || data?.results || []);
      setSearchResults(results);
      setActiveTab('search');
    } catch (err) {
      setSearchError(err?.message || 'Failed to fetch recipes');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-light text-dark'}`}>
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Routes>
          <Route path="/" element={
            <>
              {/* Search Bar with Language Preference */}
              <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div className="relative flex-grow max-w-2xl">
                  <input
                    type="text"
                    placeholder={t.search}
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-dark'}`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                {/* Language dropdown */}
                <div className="flex items-center space-x-2">
                  <div className="relative group" ref={languageDropdownRef}>
                    <button
                      className={`flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary'}`}
                      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <span>{languageOptions.find(option => option.code === language)?.name}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Language dropdown */}
                    {showLanguageDropdown && (
                      <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        {languageOptions.map(option => (
                          <button
                            key={option.code}
                            onClick={() => {
                              changeLanguage(option.code);
                              setShowLanguageDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`h-6 border-l ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                  <button className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Filter options */}
              <div className="mb-6 flex flex-wrap gap-2">
                <div className="relative" ref={ingredientsRef}>
                  <button
                    onClick={() => setShowIngredients(!showIngredients)}
                    className={`px-4 py-2 rounded-lg border flex items-center justify-between gap-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-dark'}`}
                  >
                    <span>{t.keyIngredients}</span>
                    <svg className={`w-4 h-4 transform transition-transform ${showIngredients ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showIngredients && (
                    <div className={`absolute left-0 mt-2 w-72 p-4 bg-white rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="Search ingredients"
                          className={`w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-dark'}`}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>

                      <div className="max-h-60 overflow-y-auto pr-2">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium mb-2">Pantry Essentials <span className="text-xs text-gray-500">15 items</span></h4>
                          <div className="grid grid-cols-2 gap-2">
                            {pantryEssentials.map(ingredient => (
                              <label key={ingredient} className="flex items-center space-x-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={selectedIngredients.includes(ingredient)}
                                  onChange={() => toggleIngredient(ingredient)}
                                  className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                                />
                                <span>{ingredient}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Vegetables & Greens <span className="text-xs text-gray-500">15 items</span></h4>
                          <div className="grid grid-cols-2 gap-2">
                            {vegetablesAndGreens.map(ingredient => (
                              <label key={ingredient} className="flex items-center space-x-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={selectedIngredients.includes(ingredient)}
                                  onChange={() => toggleIngredient(ingredient)}
                                  className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                                />
                                <span>{ingredient}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Other filter buttons with similar theme conditional classes */}
                {/* ... */}
              </div>

              {/* Tabs */}
              <div className="border-b mb-6">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'search' ? 'text-primary border-b-2 border-primary' : theme === 'dark' ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'}`}
                  onClick={() => setActiveTab('search')}
                >
                  {t.searchRecipes}
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : theme === 'dark' ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'}`}
                  onClick={() => setActiveTab('favorites')}
                >
                  {t.myFavorites}
                </button>
              </div>

              {/* Two-column layout: search panel + results */}
              {activeTab === 'search' && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <RecipeSearch onSearch={handleSearch} />
                  <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">{searchResults.length ? 'Results' : 'Suggested Recipes'}</h2>
                      {isSearching && <span className="text-sm text-gray-500">Searching…</span>}
                    </div>
                    {searchError && (
                      <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-200 text-sm">{searchError}</div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(searchResults.length ? searchResults : suggestedRecipes).map((recipe, idx) => (
                        <RecipeCard
                          key={recipe._id || recipe.id || idx}
                          recipe={recipe}
                          onClick={handleRecipeClick}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          } />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/account" element={<ManageAccount />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/shopping-lists" element={<ShoppingLists />} />
          <Route path="/generate-recipe" element={<RecipeGenerationPage />} />
        </Routes>
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;