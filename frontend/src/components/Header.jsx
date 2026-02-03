import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../services/auth";
import AnimatedButton from "./ui/AnimatedButton";


import Logo from "./ui/Logo";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  // ... (keep existing state) ...
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      navigate("/");
      setShowDropdown(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/90 backdrop-blur-md border-b border-white/50 dark:border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {showMobileMenu ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 text-2xl font-display font-bold text-gray-800 dark:text-white hover:text-primary transition-colors group">
              <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              <span>CookTo<span className="text-primary">Go</span></span>
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-6 items-center">
              <Link to="/home" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">Explore</Link>
              <Link to="/about-us" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">About</Link>
            </nav>

            {/* Theme Toggle Removed - Dark Mode Permanent */}

            {/* Auth Buttons */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${showDropdown ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'}`}
                >
                  <span className="font-bold text-lg">{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                </button>
                {/* ... dropdown content ... */}

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-semibold text-gray-800">My Account</p>
                    </div>
                    <Link
                      to="/saved-recipes"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      Favorite Recipes
                    </Link>
                    <Link
                      to="/shopping-lists"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      Shopping Lists
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      Manage Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">
                  <button className="px-4 py-2 rounded-full font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <AnimatedButton variant="primary" className="!py-2 !px-5 !text-sm">
                    Sign Up
                  </AnimatedButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg absolute w-full left-0 z-40 animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col p-4 gap-2">
            <Link to="/home" className="p-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700">Explore Recipes</Link>
            {user ? (
              <>
                <Link to="/saved-recipes" onClick={() => setShowMobileMenu(false)} className="p-3 rounded-lg hover:bg-gray-50 text-gray-700">Favorites</Link>
                <Link to="/shopping-lists" onClick={() => setShowMobileMenu(false)} className="p-3 rounded-lg hover:bg-gray-50 text-gray-700">Shopping Lists</Link>
                <Link to="/manage-account" onClick={() => setShowMobileMenu(false)} className="p-3 rounded-lg hover:bg-gray-50 text-gray-700">Account</Link>
                <button onClick={async () => { await handleLogout(); setShowMobileMenu(false); }} className="p-3 rounded-lg hover:bg-red-50 text-red-500 text-left">Log Out</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/login" onClick={() => setShowMobileMenu(false)} className="w-full p-3 text-center border border-gray-200 rounded-lg font-medium">Login</Link>
                <Link to="/register" onClick={() => setShowMobileMenu(false)} className="w-full p-3 text-center bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/30">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
