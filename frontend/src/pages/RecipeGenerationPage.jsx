import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateRecipe } from "../services/recipeGeneration";
import PageContainer, { fadeIn, staggerContainer } from "../components/PageContainer";

// SVG Spinner for loading state
const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

function RecipeGenerationPage() {
  // --- Core Functional Logic (Preserved) ---
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGeneratedRecipe(null);

    try {
      const response = await generateRecipe(ingredientsInput);
      setGeneratedRecipe(response);
    } catch (err) {
      setError("Failed to generate recipe. The AI might be busy, please try again.");
    } finally {
      setLoading(false);
    }
  };
  // --- End of Core Logic ---

  return (
    <PageContainer>
      <div className="min-h-screen w-full px-4 py-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* --- FORM SECTION --- */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.h2 
              variants={fadeIn('down', 0.1)} 
              className="text-gradient-1 font-commissioner text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-center mb-4"
            >
              Create a New Recipe
            </motion.h2>
            <motion.p 
              variants={fadeIn('down', 0.2)} 
              className="text-white/80 font-imprima text-lg md:text-xl text-center mb-12"
            >
              Enter the ingredients you have, and let our AI create a unique recipe for you.
            </motion.p>

            <form onSubmit={handleGenerate}>
              <motion.div variants={fadeIn('up', 0.3)}>
                <textarea
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  rows={4}
                  placeholder="e.g., chicken breast, broccoli, soy sauce, garlic"
                  required
                  className="w-full p-4 bg-black/50 backdrop-blur-md border-2 border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors font-imprima"
                />
              </motion.div>
              <motion.div variants={fadeIn('up', 0.4)} className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center font-kalnia text-lg text-white border-2 border-white px-10 py-4 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading && <Spinner />}
                  {loading ? "Generating..." : "Generate Recipe"}
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* --- ERROR MESSAGE --- */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-red-900/30 backdrop-blur-md border border-red-700/50 rounded-lg text-center text-red-200 font-imprima"
            >
              {error}
            </motion.div>
          )}

          {/* --- GENERATED RECIPE DISPLAY --- */}
          <AnimatePresence>
            {generatedRecipe && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-12 p-6 md:p-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/20"
              >
                <h3 className="text-gradient-2 font-commissioner text-2xl md:text-3xl font-bold tracking-wider mb-6">{generatedRecipe.title}</h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <h4 className="text-white font-commissioner text-xl font-semibold mb-4">Ingredients</h4>
                    <ul className="space-y-2 list-disc list-inside text-white/90 font-imprima">
                      {generatedRecipe.ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-white font-commissioner text-xl font-semibold mb-4">Instructions</h4>
                    {/* Splitting instructions by newline for better formatting */}
                    <div className="space-y-3 text-white/90 font-imprima leading-relaxed">
                      {generatedRecipe.instructions.split('\n').map((line, idx) => (
                        line.trim() && <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 flex justify-end">
                  <motion.button 
                    onClick={() => setGeneratedRecipe(null)} 
                    className="text-white/70 hover:text-white transition-colors font-kalnia"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Generate Another
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageContainer>
  );
}

export default RecipeGenerationPage;