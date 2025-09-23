import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, translations } from '../contexts/LanguageContext';
import RecipeCard from '../components/recipe/RecipeCard';
import RecipeDetail from '../components/recipe/RecipeDetail';
import { getFavoriteRecipes } from '../api/recipes';

const SavedRecipes = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getFavoriteRecipes();
        if (mounted) setSavedRecipes(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError(e?.message || 'Failed to load favorites');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className={`text-2xl md:text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
        {t.savedRecipes}
      </h1>
      
      {loading && (
        <div className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-200 text-sm">{error}</div>
      )}
      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map(recipe => (
            <RecipeCard 
              key={recipe._id || recipe.id} 
              recipe={recipe} 
              onClick={handleRecipeClick} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className={`text-2xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
            {language === 'en' ? 'No Saved Recipes Yet' : language === 'hi' ? 'अभी तक कोई सहेजी गई रेसिपी नहीं' : 'હજુ સુધી કોઈ સાચવેલી રેસિપી નથી'}
          </h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'en' ? 'Start exploring and save your favorite recipes here!' : language === 'hi' ? 'खोजना शुरू करें और अपनी पसंदीदा रेसिपी यहां सहेजें!' : 'શોધવાનું શરૂ કરો અને તમારી મનપસંદ રેસિપી અહીં સાચવો!'}
          </p>
        </div>
      )}
      
      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={handleCloseRecipeDetail} 
        />
      )}
    </div>
  );
};

export default SavedRecipes;