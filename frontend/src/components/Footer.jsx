import React from "react";
import { Link } from "react-router-dom";

import Logo from "./ui/Logo";

function Footer() {
  return (
    <footer className="bg-white/60 dark:bg-gray-950/90 backdrop-blur-md border-t border-white/50 dark:border-white/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-display font-bold text-gray-800 dark:text-white mb-4 group">
              <Logo className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
              <span>CookTo<span className="text-primary">Go</span></span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Your AI-powered kitchen companion. Turn ingredients into delicious meals instantly.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/home" className="hover:text-primary transition-colors">Find Recipes</Link></li>
              <li><Link to="/saved-recipes" className="hover:text-primary transition-colors">Saved Favorites</Link></li>
              <li><Link to="/shopping-lists" className="hover:text-primary transition-colors">Shopping Lists</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="sr-only">Twitter</span>
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="sr-only">Instagram</span>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">&copy; {new Date().getFullYear()} Cook To Go. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
