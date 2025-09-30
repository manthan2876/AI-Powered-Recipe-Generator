import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import Recipes from "./pages/RecipesPage";
import ShoppingLists from "./pages/ShoppingListsPage";
import SavedRecipes from "./pages/SavedRecipesPage";
import RecipeGenerationPage from "./pages/RecipeGenerationPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import AboutUs from "./components/AboutUs";
import ManageAccount from "./components/ManageAccount";

import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/shopping-lists" element={<ShoppingLists />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/generate-recipe" element={<RecipeGenerationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/manage-account" element={<ManageAccount />} />
        </Routes>
      </Router>
  );
}

export default App;
