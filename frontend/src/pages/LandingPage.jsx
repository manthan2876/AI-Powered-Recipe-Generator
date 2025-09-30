// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const features = [
  {
    title: "Recipe Search",
    description: "Find recipes based on ingredients you have at home.",
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16h16" />
      </svg>
    ),
  },
  {
    title: "Save Favorites",
    description: "Keep your favorite recipes saved for easy access.",
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Step-by-Step Instructions",
    description: "Follow clear instructions to cook delicious meals.",
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6" />
      </svg>
    ),
  },
];

function LandingPage() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // Replace with your backend API endpoint
      const response = await axios.get(`/api/recipes/search?ingredients=${encodeURIComponent(ingredients)}`);
      setRecipes(response.data.recipes);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-5 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">SuperCook Clone</h1>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li><a href="#features" className="hover:text-primary transition">Features</a></li>
            <li><a href="#search" className="hover:text-primary transition">Search Recipes</a></li>
            <li><a href="#footer" className="hover:text-primary transition">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-5 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Cook Something <span className="text-primary">Delicious</span> with What You Have
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Enter your ingredients and find recipes you can cook at home instantly.
          </p>
          <button
            onClick={() => document.getElementById('search').scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
          >
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://themewagon.github.io/feane/img/hero-img.png"
            alt="Cooking"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-5">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map(({ title, description, icon }, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl shadow-lg hover:shadow-2xl transition cursor-default">
                <div className="mb-4">{icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900">{title}</h4>
                <p className="text-gray-700">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="container mx-auto px-5 py-20">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Search Recipes by Ingredients</h3>
        <div className="max-w-3xl mx-auto">
          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients separated by commas"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && <p className="text-red-600 text-center mb-6">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recipes.length === 0 && !loading && (
              <p className="text-center text-gray-600 col-span-full">No recipes found. Try different ingredients.</p>
            )}
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow hover:shadow-xl transition cursor-pointer">
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{recipe.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{recipe.description}</p>
                  <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    View Recipe
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-800 text-gray-300 py-10 mt-20">
        <div className="container mx-auto px-5 text-center">
          <p>© 2024 SuperCook Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;