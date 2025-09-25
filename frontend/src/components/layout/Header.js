import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';
import { logout as apiLogout } from '../../api/auth';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage, languageOptions } from '../../contexts/LanguageContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const userInfo = localStorage.getItem('userInfo');
      setIsLoggedIn(!!userInfo);
    };
    
    // Check on mount
    checkLoginStatus();
    
    // Add event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAuthModalClose = (success) => {
    if (success) {
      setIsLoggedIn(true);
    }
    setShowAuthModal(false);
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try { 
      await apiLogout(); 
      localStorage.removeItem('userInfo');
      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      setIsLoggedIn(false);
      setShowUserDropdown(false);
      // Redirect to home page
      window.location.href = '/';
    } catch (e) {
      console.error('Logout error:', e);
      // Still remove user info even if API call fails
      localStorage.removeItem('userInfo');
      setIsLoggedIn(false);
      window.location.href = '/';
    }
  };

  return (
    <>
      <header className={`shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-dark'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg className="w-8 h-8 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <h1 className="text-2xl font-bold">AI Recipe Generator</h1>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary'}`}>
              {language === 'en' ? 'Home' : language === 'hi' ? 'होम' : 'હોમ'}
            </Link>
            <Link to="/generate-recipe" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary'}`}>
              {language === 'en' ? 'Generate Recipe' : language === 'hi' ? 'रेसिपी जनरेट करें' : 'રેસિપી જનરેટ કરો'}
            </Link>
            <Link to="/about" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary'}`}>
              {language === 'en' ? 'About Us' : language === 'hi' ? 'हमारे बारे में' : 'અમારા વિશે'}
            </Link>
          </div>
          
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">U</span>
                </div>
                <span className={`hidden md:inline ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>User</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showUserDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                  <Link to="/account" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {language === 'en' ? 'Manage Account' : language === 'hi' ? 'खाता प्रबंधित करें' : 'એકાઉન્ટ મેનેજ કરો'}
                    </div>
                  </Link>
                  <Link to="/saved-recipes" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {language === 'en' ? 'Saved Recipes' : language === 'hi' ? 'सहेजे गए व्यंजन' : 'સાચવેલી રેસિપી'}
                    </div>
                  </Link>
                  <Link to="/generate-recipe" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {language === 'en' ? 'Generate Recipe' : language === 'hi' ? 'रेसिपी जनरेट करें' : 'રેસિપી જનરેટ કરો'}
                    </div>
                  </Link>
                  <Link to="/shopping-lists" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {language === 'en' ? 'Shopping Lists' : language === 'hi' ? 'खरीदारी सूची' : 'ખરીદી યાદી'}
                    </div>
                  </Link>
                  
                  <div className={`border-t my-1 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-100'}`}></div>
                  <div className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Theme
                      </div>
                      <button 
                        onClick={toggleTheme}
                        className="relative inline-flex items-center h-5 rounded-full w-10 bg-gray-200"
                      >
                        <span className={`inline-block w-4 h-4 transform transition-transform ${theme === 'dark' ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-white'} rounded-full`} />
                      </button>
                    </div>
                  </div>
                  <div className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        Language
                      </div>
                      <select 
                        className={`text-sm border-none focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-700'}`}
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                      >
                        {languageOptions.map(option => (
                          <option key={option.code} value={option.code}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={`border-t my-1 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-100'}`}></div>
                  <button 
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-2">
              <button 
                onClick={openLoginModal}
                className="btn-secondary text-sm py-1 px-3"
              >
                Login
              </button>
              <button 
                onClick={openRegisterModal}
                className="btn-primary text-sm py-1 px-3"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={handleAuthModalClose} 
          initialMode={authMode} 
        />
      )}
    </>
  );
};

export default Header;