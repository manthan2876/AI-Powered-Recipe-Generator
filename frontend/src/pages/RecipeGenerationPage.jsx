import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { generateRecipe } from "../services/recipeGeneration";
import { generateShoppingListFromRecipe } from "../services/shoppingLists";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import IngredientChip from "../components/ui/IngredientChip";
import { motion, AnimatePresence } from "framer-motion";

function RecipeGenerationPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isGeneratingList, setIsGeneratingList] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGeneratedRecipe(null);

    const ingredientsArray = (ingredientsInput || '')
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    if (ingredientsArray.length === 0) {
      setError("Please enter at least one ingredient.");
      setLoading(false);
      return;
    }

    try {
      const response = await generateRecipe(ingredientsArray);
      setGeneratedRecipe(response);
    } catch (err) {
      setError("Failed to generate recipe. " + (err.message || "Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateShoppingList = async () => {
    if (!user) {
      alert("Please login to generate shopping lists");
      return;
    }

    if (!generatedRecipe) return;

    setIsGeneratingList(true);
    try {
      await generateShoppingListFromRecipe(generatedRecipe);
      navigate("/shopping-lists");
    } catch (error) {
      console.error("Error generating shopping list:", error);
      alert(error.message || "Failed to generate shopping list. Please try again.");
    } finally {
      setIsGeneratingList(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-5xl font-bold font-display text-gray-800 mb-3">
              AI Chef <span className="text-primary">Assistant</span>
            </h1>
            <p className="text-gray-600">Tell us what you have, and we'll tell you what to cook.</p>
          </motion.div>

          <GlassCard className="mb-8">
            <form onSubmit={handleGenerate}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Ingredients</label>
                <textarea
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  rows={4}
                  placeholder="e.g., chicken breast, broccoli, soy sauce, garlic"
                  className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/80 transition-all resize-none shadow-inner"
                />
                <p className="text-xs text-gray-500 mt-2 text-right">Separate ingredients with commas</p>
              </div>

              <div className="flex justify-center">
                <AnimatedButton
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  className="w-full md:w-auto min-w-[200px]"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Magic...
                    </div>
                  ) : (
                    "Generate Recipe"
                  )}
                </AnimatedButton>
              </div>
            </form>
          </GlassCard>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {generatedRecipe && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary" />

                  <div className="pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-6 gap-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-display">{generatedRecipe.title}</h2>
                        <div className="flex flex-wrap gap-2">
                          {generatedRecipe.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold flex items-center gap-1">
                          🔥 {generatedRecipe.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold flex items-center gap-1">
                          🍲 {generatedRecipe.cuisine}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 italic text-lg opacity-90">
                      "{generatedRecipe.description}"
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8 bg-white/40 p-4 rounded-xl border border-white/50">
                      <div className="text-center">
                        <span className="block text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Prep Time</span>
                        <span className="text-xl font-bold text-gray-800">{generatedRecipe.prepTime}m</span>
                      </div>
                      <div className="text-center border-l border-gray-200">
                        <span className="block text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Cook Time</span>
                        <span className="text-xl font-bold text-gray-800">{generatedRecipe.cookTime}m</span>
                      </div>
                      <div className="text-center border-l border-gray-200">
                        <span className="block text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Servings</span>
                        <span className="text-xl font-bold text-gray-800">{generatedRecipe.servings} pp</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">1</span>
                          Ingredients
                        </h3>
                        <ul className="space-y-3">
                          {generatedRecipe.ingredients.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-sm">2</span>
                          Instructions
                        </h3>
                        <div className="space-y-4">
                          {generatedRecipe.instructions.map((line, idx) => (
                            line.trim() && (
                              <div key={idx} className="flex gap-4">
                                <span className="text-gray-400 font-bold font-display text-lg">{idx + 1}</span>
                                <p className="text-gray-700 leading-relaxed">{line}</p>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                      {user && (
                        <AnimatedButton
                          onClick={handleGenerateShoppingList}
                          disabled={isGeneratingList}
                          variant="secondary"
                          className="w-full sm:w-auto"
                        >
                          {isGeneratingList ? 'Creating List...' : 'Add to Shopping List 📝'}
                        </AnimatedButton>
                      )}

                      <button
                        onClick={() => {
                          setGeneratedRecipe(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-gray-500 hover:text-primary font-medium transition-colors"
                      >
                        Start Over
                      </button>
                    </div>

                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RecipeGenerationPage;