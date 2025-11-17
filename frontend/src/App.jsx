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
import ProfilePage from "./pages/ProfilePage";
import GoogleAuthSuccessPage from "./pages/GoogleAuthSuccessPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
          <Route path="/auth/google/success" element={<GoogleAuthSuccessPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/manage-account" element={<ManageAccount />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
