import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, translations } from '../contexts/LanguageContext';

const ManageAccount = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    preferences: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    }
  });

  const handlePreferenceChange = (preference) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        [preference]: !user.preferences[preference]
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user preferences to backend
    console.log('Saving user preferences:', user);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className={`text-2xl md:text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
        {t.manageAccount}
      </h1>
      
      <div className={`bg-white rounded-xl shadow-md p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
        <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Profile Information' : language === 'hi' ? 'प्रोफ़ाइल जानकारी' : 'પ્રોફાઇલ માહિતી'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{language === 'en' ? 'Name' : language === 'hi' ? 'नाम' : 'નામ'}</label>
            <input 
              type="text" 
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{language === 'en' ? 'Email' : language === 'hi' ? 'ईमेल' : 'ઈમેલ'}</label>
            <input 
              type="email" 
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            />
          </div>
          
          <h3 className="text-lg font-medium mb-3">{language === 'en' ? 'Dietary Preferences' : language === 'hi' ? 'आहार संबंधी प्राथमिकताएँ' : 'આહાર સંબંધિત પસંદગીઓ'}</h3>
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
                checked={user.preferences.vegetarian}
                onChange={() => handlePreferenceChange('vegetarian')}
              />
              <span>{language === 'en' ? 'Vegetarian' : language === 'hi' ? 'शाकाहारी' : 'શાકાહારી'}</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
                checked={user.preferences.vegan}
                onChange={() => handlePreferenceChange('vegan')}
              />
              <span>{language === 'en' ? 'Vegan' : language === 'hi' ? 'वीगन' : 'વીગન'}</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
                checked={user.preferences.glutenFree}
                onChange={() => handlePreferenceChange('glutenFree')}
              />
              <span>{language === 'en' ? 'Gluten Free' : language === 'hi' ? 'ग्लूटेन मुक्त' : 'ગ્લુટેન ફ્રી'}</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
                checked={user.preferences.dairyFree}
                onChange={() => handlePreferenceChange('dairyFree')}
              />
              <span>{language === 'en' ? 'Dairy Free' : language === 'hi' ? 'डेयरी मुक्त' : 'ડેરી ફ્રી'}</span>
            </label>
          </div>
          
          <button 
            type="submit"
            className="btn-primary w-full md:w-auto"
          >
            {language === 'en' ? 'Save Changes' : language === 'hi' ? 'परिवर्तन सहेजें' : 'ફેરફારો સાચવો'}
          </button>
        </form>
      </div>
      
      <div className={`bg-white rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
        <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Account Settings' : language === 'hi' ? 'खाता सेटिंग्स' : 'એકાઉન્ટ સેટિંગ્સ'}</h2>
        
        <div className="space-y-4">
          <button className="text-red-500 hover:text-red-700">
            {language === 'en' ? 'Change Password' : language === 'hi' ? 'पासवर्ड बदलें' : 'પાસવર્ડ બદલો'}
          </button>
          <div className="border-t pt-4">
            <button className="text-red-500 hover:text-red-700">
              {language === 'en' ? 'Delete Account' : language === 'hi' ? 'खाता हटाएं' : 'એકાઉન્ટ કાઢી નાખો'}
            </button>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'en' ? 'This action cannot be undone.' : language === 'hi' ? 'यह क्रिया पूर्ववत नहीं की जा सकती है।' : 'આ ક્રિયા પૂર્વવત કરી શકાતી નથી.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;