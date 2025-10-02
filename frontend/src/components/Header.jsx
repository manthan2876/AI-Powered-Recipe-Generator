import React from "react";
import { Link, NavLink } from "react-router-dom"; // Using NavLink for active styles

const Header = () => {
  // Style for active NavLink
  const activeLinkStyle = {
    color: '#4ade80', // A bright green for the active link
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold font-commissioner text-green-400 hover:text-green-500 transition-colors">
          CookCanvas
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <NavLink 
            to="/recipes" 
            className="text-gray-300 hover:text-green-400 font-medium transition-colors"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            Recipes
          </NavLink>
          <NavLink 
            to="/generate-recipe" 
            className="text-gray-300 hover:text-green-400 font-medium transition-colors"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            Create Recipe
          </NavLink>
          <NavLink 
            to="/saved-recipes" 
            className="text-gray-300 hover:text-green-400 font-medium transition-colors"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            Saved
          </NavLink>
          <Link 
            to="/login" 
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;