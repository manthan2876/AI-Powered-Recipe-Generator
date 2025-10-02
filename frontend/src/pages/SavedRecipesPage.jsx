import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "../components/RecipeCard";
import PageContainer, { fadeIn, staggerContainer } from "../components/PageContainer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

// Sample static recipes for quick display
const sampleSavedRecipes = [
  {
    _id: "1",
    title: "Classic Spaghetti Carbonara",
    description: "Creamy and savory Italian pasta with eggs, cheese, and pancetta.",
    image: "https://images.unsplash.com/photo-1604908177527-f9711b09950d?auto=format&fit=crop&w=600&q=80",
    url: "https://www.simplyrecipes.com/recipes/spaghetti_alla_carbonara/"
  },
  {
    _id: "2",
    title: "Avocado Toast with Poached Eggs",
    description: "Simple and healthy breakfast with mashed avocado and perfectly poached eggs.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    url: "https://cookieandkate.com/best-avocado-toast-recipe/"
  },
  {
    _id: "3",
    title: "Classic Caesar Salad",
    description: "Crisp romaine lettuce tossed in creamy Caesar dressing with croutons.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    url: "https://www.simplyrecipes.com/recipes/caesar_salad/"
  },
];

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState(sampleSavedRecipes);
  const [error, setError] = useState("");

  const handleRemove = (id) => {
    if (window.confirm("Remove this recipe from saved?")) {
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    }
  };

  return (
    <PageContainer>
      <div className="min-h-screen w-full px-4 py-6 md:px-8 lg:px-12">
        <motion.header 
          variants={fadeIn('down', 0.2)}
          initial="initial"
          animate="animate"
          className="max-w-6xl mx-auto mb-8 md:mb-12"
        >
          <h1 className="text-gradient-1 font-commissioner text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-center">
            Saved Recipes
          </h1>
        </motion.header>

        {error && (
          <motion.div
            className="text-red-500 text-center mb-6 font-imprima"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <motion.main 
          variants={fadeIn('up', 0.3)}
          initial="initial"
          animate="animate"
          className="max-w-6xl mx-auto"
        >
          {recipes.length === 0 ? (
            <motion.p 
              variants={fadeIn('up', 0.4)}
              className="text-center text-white/80 font-imprima text-lg md:text-xl"
            >
              No saved recipes yet.
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <AnimatePresence>
                {recipes.map((recipe) => (
                  <motion.div
                    key={recipe._id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RecipeCard
                      recipe={recipe}
                      onDelete={() => handleRemove(recipe._id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.main>
      </div>
    </PageContainer>
  );
};

export default SavedRecipes;
