import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-green-600">SuperCook</Link>
        <div className="space-x-4">
          <Link to="/recipes" className="text-gray-700 hover:text-green-600 font-medium">Recipes</Link>
          <Link to="/saved-recipes" className="text-gray-700 hover:text-green-600 font-medium">Saved</Link>
          <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
