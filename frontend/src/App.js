import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import ShoppingLists from "./pages/ShoppingLists";
import SavedRecipes from "./pages/SavedRecipes";
import RecipeGenerationPage from "./pages/RecipeGenerationPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./components/AboutUs/AboutUs";
import ManageAccount from "./components/ManageAccount/ManageAccount";

import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
