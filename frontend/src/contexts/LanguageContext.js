import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Check if user has a saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update language and save to localStorage
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// Language data
export const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'gu', name: 'Gujarati' }
];

// Translation data (simplified example)
export const translations = {
  en: {
    search: 'Search for specific recipes...',
    keyIngredients: 'Key Ingredients',
    exclude: 'Exclude',
    mealType: 'Meal type',
    missingOneIngredient: 'Missing one ingredient',
    videoOnly: 'Video only',
    cuisines: 'Cuisines',
    diet: 'Diet',
    maxIngredients: 'Max Ingredients',
    rating: 'Rating',
    recipeTime: 'Recipe time',
    searchRecipes: 'Search Recipes',
    myFavorites: 'My Favorites',
    suggestedRecipes: 'Suggested Recipes',
    noFavorites: 'No Favorite Recipes Yet',
    startExploring: 'Start exploring and save your favorite recipes here!',
    discoverRecipes: 'Discover Recipes',
    manageAccount: 'Manage Account',
    savedRecipes: 'Saved Recipes',
    theme: 'Theme',
    language: 'Language',
    logout: 'Logout',
    login: 'Login',
    register: 'Register'
  },
  hi: {
    search: 'विशिष्ट व्यंजनों के लिए खोजें...',
    keyIngredients: 'मुख्य सामग्री',
    exclude: 'बाहर रखें',
    mealType: 'भोजन प्रकार',
    missingOneIngredient: 'एक सामग्री गायब है',
    videoOnly: 'केवल वीडियो',
    cuisines: 'व्यंजन',
    diet: 'आहार',
    maxIngredients: 'अधिकतम सामग्री',
    rating: 'रेटिंग',
    recipeTime: 'रेसिपी समय',
    searchRecipes: 'रेसिपी खोजें',
    myFavorites: 'मेरे पसंदीदा',
    suggestedRecipes: 'सुझाई गई रेसिपी',
    noFavorites: 'अभी तक कोई पसंदीदा रेसिपी नहीं',
    startExploring: 'खोजना शुरू करें और अपनी पसंदीदा रेसिपी यहां सहेजें!',
    discoverRecipes: 'रेसिपी खोजें',
    manageAccount: 'खाता प्रबंधित करें',
    savedRecipes: 'सहेजी गई रेसिपी',
    theme: 'थीम',
    language: 'भाषा',
    logout: 'लॉग आउट',
    login: 'लॉग इन',
    register: 'रजिस्टर'
  },
  gu: {
    search: 'ચોક્કસ રેસિપી માટે શોધો...',
    keyIngredients: 'મુખ્ય સામગ્રી',
    exclude: 'બાકાત રાખો',
    mealType: 'ભોજન પ્રકાર',
    missingOneIngredient: 'એક સામગ્રી ખૂટે છે',
    videoOnly: 'માત્ર વિડિઓ',
    cuisines: 'વ્યંજનો',
    diet: 'આહાર',
    maxIngredients: 'મહત્તમ સામગ્રી',
    rating: 'રેટિંગ',
    recipeTime: 'રેસિપી સમય',
    searchRecipes: 'રેસિપી શોધો',
    myFavorites: 'મારી મનપસંદ',
    suggestedRecipes: 'સૂચવેલી રેસિપી',
    noFavorites: 'હજુ સુધી કોઈ મનપસંદ રેસિપી નથી',
    startExploring: 'શોધવાનું શરૂ કરો અને તમારી મનપસંદ રેસિપી અહીં સાચવો!',
    discoverRecipes: 'રેસિપી શોધો',
    manageAccount: 'એકાઉન્ટ મેનેજ કરો',
    savedRecipes: 'સાચવેલી રેસિપી',
    theme: 'થીમ',
    language: 'ભાષા',
    logout: 'લોગઆઉટ',
    login: 'લોગિન',
    register: 'રજિસ્ટર'
  }
};