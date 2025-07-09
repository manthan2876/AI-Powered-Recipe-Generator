import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import {VerifyEmailPage} from "./pages/VerifyEmailPage";
import {ProfilePage} from "./pages/ProfilePage";
import {EditProfilePage} from "./pages/EditProfilePage";

const Header = () => (
  <header className="bg-gray-800 text-white py-4">
    <nav className="container mx-auto flex justify-between items-center">
      <div className="text-xl font-bold"></div>
      <ul className="flex space-x-4">
        <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
        <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
        <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
      </ul>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4 text-center">
    <p>&copy; 2025 URL Shortener App</p>
  </footer>
);

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      
    </Routes>
    <Footer />
  </Router>
);

export default App;
