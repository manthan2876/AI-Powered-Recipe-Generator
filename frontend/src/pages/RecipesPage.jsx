import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "../components/RecipeCard"; // Adjust path as needed
import Header from "../components/Header";
import Footer from "../components/Footer";

// Animation variants for Framer Motion
const fadeIn = (direction = "up", delay = 0) => ({
  initial: {
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1,
      delay: delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

const pantryEssentials = [
  "egg",
  "garlic",
  "butter",
  "milk",
  "onion",
  "sugar",
  "olive oil",
  "flour",
  "mayonnaise",
  "soy sauce",
  "ketchup",
  "vegetable oil",
];

const filters = [
  "Key Ingredient(s)",
  "Exclude",
  "Meal type",
  "Missing one ingredient",
  "Video only",
  "Cuisines",
  "Diet",
  "Max Ingredients",
  "Rating",
  "Recipe time",
];

const keyIngredients = [
  "olive oil",
  "butter",
  "vinegar",
  "flour",
  "extra virgin olive oil",
  "sugar",
  "cooking spray",
  "banana",
  "bacon",
  "bread",
];

const sampleRecipes = [
  {
    _id: "1",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    title: "Instant Pot Hard Boiled Eggs",
    description:
      "Perfect hard boiled eggs every time, great for breakfast or salads.",
    url: "https://eatingonadime.com/instant-pot-hard-boiled-eggs/",
  },
  {
    _id: "2",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
    title: "Egg Ribbons",
    description: "Easy homemade egg noodles for soups and stir fries.",
    url: "https://www.iamafoodblog.com/egg-ribbons/",
  },
  {
    _id: "3",
    image:
      "https://images.unsplash.com/photo-1464306076886-debede19fc21?auto=format&fit=crop&w=600&q=80",
    title: "Hard Boiled Eggs",
    description: "Simple hard boiled eggs with a perfect peel.",
    url: "https://www.foodnetwork.com/recipes/articles/how-to-make-hard-boiled-eggs",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring" },
  },
  exit: { opacity: 0, y: 30, scale: 0.97, transition: { duration: 0.3 } },
};

export default function RecipesPage() {
  const [selectedPantry, setSelectedPantry] = useState(["egg", "garlic"]);
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleIngredientToggle = (ingredient) => {
    setSelectedPantry((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== id));
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow landing_main">
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* Mobile Sidebar Toggle Button */}
              <motion.button
              variants={fadeIn("right", 0.1)}
              initial="initial"
              animate="animate"
              className="md:hidden fixed top-20 left-4 z-50 p-3 rounded-full border"
              onClick={toggleMobileSidebar}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--muted)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>

            {/* Pantry Sidebar - Desktop always visible, Mobile conditionally visible */}
            <motion.aside
              variants={fadeIn("left", 0.2)}
              initial="initial"
              animate="animate"
              className={`${
                  isMobileSidebarOpen ? "fixed inset-0 z-40" : "hidden"
                } md:relative md:block md:w-80 p-6 border-r overflow-y-auto`}
            >
              <motion.div
                variants={fadeIn("down", 0.3)}
                className="mb-6 flex items-center justify-between"
              >
                <h2 className="text-gradient-1 font-commissioner text-2xl font-bold tracking-wider">
                  Pantry
                </h2>
                <span className="font-imprima text-muted">
                  {selectedPantry.length} Ingredients
                </span>
                {/* Close button for mobile */}
                <button
                  className="md:hidden"
                  onClick={toggleMobileSidebar}
                  style={{ color: 'var(--muted)' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>

                <motion.div variants={fadeIn("up", 0.4)}>
                <input
                  type="text"
                  placeholder="Add/remove/paste ingredients"
                  className="w-full mb-6 input"
                />
              </motion.div>

              <motion.p
                variants={fadeIn('right', 0.5)}
                className="mb-3 font-commissioner text-lg tracking-wider"
                style={{ color: 'var(--text)' }}
              >
                Pantry Essentials
              </motion.p>

              <motion.div
                variants={fadeIn("up", 0.6)}
                className="flex flex-wrap gap-2 mb-6"
              >
                {pantryEssentials.map((ingredient, index) => (
                  <motion.button
                    key={ingredient}
                    variants={fadeIn("up", 0.2 + index * 0.05)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-lg text-sm font-imprima transition-all duration-200 ${
                      selectedPantry.includes(ingredient)
                        ? "bg-card text-main"
                        : "bg-card border text-muted"
                    }`}
                    onClick={() => handleIngredientToggle(ingredient)}
                  >
                    {ingredient}
                  </motion.button>
                ))}
              </motion.div>

              <div className="mt-8 mb-4 p-3 rounded" style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--muted)' }}>
                The only ingredients we assume you have are{" "}
                <span style={{ color: 'var(--text)' }}>salt</span>,{" "}
                <span style={{ color: 'var(--text)' }}>pepper</span> and{" "}
                <span style={{ color: 'var(--text)' }}>water</span>.
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="initial"
              animate="animate"
              className="flex-1 p-6 md:p-8 lg:p-10"
            >
              <motion.div variants={fadeIn("down", 0.4)} className="mb-8">
                <h1 className="text-gradient-1 font-commissioner text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider mb-6">
                  Recipes
                </h1>
                <motion.div
                  variants={fadeIn("up", 0.5)}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {filters.map((filter, index) => (
                      <motion.button
                        key={filter}
                        variants={fadeIn("up", 0.2 + index * 0.05)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                        style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text)' }}
                      >
                        {filter}
                      </motion.button>
                    ))}
                </motion.div>

                <motion.div variants={fadeIn("up", 0.6)} className="relative">
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full input"
                  />
                  <span className="absolute right-3 top-3 text-muted">
                    {/* Search icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </motion.div>
              </motion.div>

              {/* Recipe Grid */}
              <motion.div
                variants={fadeIn("up", 0.7)}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredRecipes.map((recipe) => (
                    <motion.div
                      key={recipe._id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="bg-card glass rounded-xl overflow-hidden border transition-all duration-300"
                    >
                      <RecipeCard
                        recipe={recipe}
                        onDelete={() => handleDelete(recipe._id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
