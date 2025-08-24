import React, { useState } from 'react';
import AuthModal from '../auth/AuthModal';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Here you would typically call your API to logout
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-dark">AI Recipe Generator</h1>
          </div>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-dark">Welcome, User!</span>
              <button 
                onClick={handleLogout}
                className="btn-secondary text-sm py-1 px-3"
              >
                Logout
              </button>
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