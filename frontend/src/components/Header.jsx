import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom"; // Using NavLink for active styles
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  // Style for active NavLink will use CSS variable --accent
  const activeLinkStyle = {
    color: 'var(--accent)'
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-50" style={{ background: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold font-commissioner text-[var(--accent)] hover:opacity-90 transition-colors">
          CookCanvas
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <NavLink 
            to="/recipes" 
            className="text-[var(--text)] hover:text-[var(--accent)] font-medium transition-colors"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            Recipes
          </NavLink>
          <NavLink 
            to="/generate-recipe" 
            className="text-[var(--text)] hover:text-[var(--accent)] font-medium transition-colors"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            Create Recipe
          </NavLink>
          <NavLink 
            to="/saved-recipes" 
            className="text-[var(--text)] hover:text-[var(--accent)] font-medium transition-colors"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            Saved
          </NavLink>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="px-3 py-1 text-sm rounded-md border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-md text-sm font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;