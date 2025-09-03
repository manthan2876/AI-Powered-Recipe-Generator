import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, translations } from '../contexts/LanguageContext';
import RecipeCard from '../components/recipe/RecipeCard';
import RecipeDetail from '../components/recipe/RecipeDetail';

const SavedRecipes = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  // Mock saved recipes data
  const savedRecipes = [
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
    }
  ];

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
      
      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
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