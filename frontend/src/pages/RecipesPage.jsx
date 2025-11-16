import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import RecipeDetail from "../components/RecipeDetail";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { getAllIngredients, searchRecipesByIngredients, getRecipeById } from "../services/recipes";
import { getCurrentUser } from "../services/auth";

const filters = [
  "Exclude", "Cuisine", "Diet", "Rating", "Recipe time", "Difficulty", "AI or Human"
];

export default function RecipesPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeCount, setRecipeCount] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [userDietaryPreferences, setUserDietaryPreferences] = useState([]);
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    excludeIngredients: [],
    cuisine: null,
    dietaryRestrictions: [],
    minRating: null,
    maxTotalTime: null,
    difficulty: null,
    isGenerated: null, // null = all, true = AI, false = Human
  });
  const [showFilterModal, setShowFilterModal] = useState(null);

  // Fetch all ingredients and user dietary preferences on component mount
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredients = await getAllIngredients();
        setAllIngredients(ingredients);
        setFilteredIngredients(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();

    // Fetch user dietary preferences if logged in
    const fetchUserPreferences = async () => {
      if (user) {
        try {
          const userData = await getCurrentUser();
          if (userData && userData.dietaryPreferences && userData.dietaryPreferences.length > 0) {
            setUserDietaryPreferences(userData.dietaryPreferences);
            // Automatically apply dietary preferences to filters
            setActiveFilters(prev => ({
              ...prev,
              dietaryRestrictions: userData.dietaryPreferences
            }));
          }
        } catch (error) {
          console.error("Error fetching user preferences:", error);
        }
      }
    };
    fetchUserPreferences();
  }, [user]);

  // Filter ingredients based on search
  useEffect(() => {
    if (ingredientSearch.trim() === "") {
      setFilteredIngredients(allIngredients);
    } else {
      const searchLower = ingredientSearch.toLowerCase();
      const filtered = allIngredients.filter(ing =>
        ing.toLowerCase().includes(searchLower)
      );
      setFilteredIngredients(filtered);
    }
  }, [ingredientSearch, allIngredients]);

  // Search recipes when ingredients or filters change
  useEffect(() => {
    const searchRecipes = async () => {
      if (selectedIngredients.length === 0) {
        setRecipes([]);
        setRecipeCount(0);
        return;
      }

      setLoading(true);
      try {
        const filters = {
          limit: 50,
          ...activeFilters,
        };
        
        if (activeFilters.excludeIngredients.length > 0) {
          filters.excludeIngredients = activeFilters.excludeIngredients;
        }
        
        if (activeFilters.dietaryRestrictions.length > 0) {
          filters.dietaryRestrictions = activeFilters.dietaryRestrictions;
        }

        const results = await searchRecipesByIngredients(selectedIngredients, filters);
        setRecipes(results);
        setRecipeCount(results.length);
      } catch (error) {
        console.error("Error searching recipes:", error);
        setRecipes([]);
        setRecipeCount(0);
      } finally {
        setLoading(false);
      }
    };

    searchRecipes();
  }, [selectedIngredients, activeFilters]);

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleFilterClick = (filterName) => {
    if (showFilterModal === filterName) {
      setShowFilterModal(null);
    } else {
      setShowFilterModal(filterName);
    }
  };

  const updateFilter = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setShowFilterModal(null);
  };

  const clearFilter = (key) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: key === 'excludeIngredients' || key === 'dietaryRestrictions' ? [] : null
    }));
    setShowFilterModal(null);
  };

  const handleGenerateRecipe = () => {
    navigate("/generate-recipe", {
      state: { selectedIngredients }
    });
  };

  const handleRecipeClick = async (recipe) => {
    try {
      const fullRecipe = await getRecipeById(recipe._id);
      setSelectedRecipe(fullRecipe);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      // Fallback to showing the recipe we already have
      setSelectedRecipe(recipe);
    }
  };

  const handleCloseRecipeDetail = () => {
    setSelectedRecipe(null);
  };

  const handleRecipeUpdate = async () => {
    if (selectedRecipe) {
      try {
        const updatedRecipe = await getRecipeById(selectedRecipe._id);
        setSelectedRecipe(updatedRecipe);
        // Also update the recipe in the list if it exists
        setRecipes(prevRecipes => 
          prevRecipes.map(r => r._id === updatedRecipe._id ? updatedRecipe : r)
        );
      } catch (error) {
        console.error("Error refreshing recipe:", error);
      }
    }
  };

  const totalSelected = selectedIngredients.length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header selectedIngredientsCount={totalSelected} recipeCount={recipeCount} />
      
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* Left Sidebar */}
        <aside style={{
          width: '320px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
          overflowY: 'auto',
          height: 'calc(100vh - 60px)',
          padding: '20px'
        }}>
          {/* Assumed Ingredients Banner */}
          {showBanner && (
            <div style={{
              marginBottom: '20px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                The only ingredients we assume you have are{" "}
                <span style={{ fontWeight: '600' }}>salt</span>,{" "}
                <span style={{ fontWeight: '600' }}>pepper</span> and{" "}
                <span style={{ fontWeight: '600' }}>water</span>.
              </p>
              <button
                onClick={() => setShowBanner(false)}
                style={{
                  marginLeft: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999',
                  fontSize: '18px',
                  padding: '0',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              padding: '8px 12px',
              gap: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search ingredients..."
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  flex: 1,
                  fontSize: '14px',
                  color: '#333'
                }}
              />
            </div>
          </div>

          {/* Ingredients List */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                All Ingredients
              </h2>
              <span style={{ fontSize: '13px', color: '#666' }}>
                {selectedIngredients.length} selected
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px',
              maxHeight: 'calc(100vh - 300px)',
              overflowY: 'auto'
            }}>
              {filteredIngredients.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#666', padding: '12px' }}>
                  No ingredients found
                </p>
              ) : (
                filteredIngredients.map((ingredient) => {
                  const isSelected = selectedIngredients.includes(ingredient);
                  return (
                    <button
                      key={ingredient}
                      onClick={() => handleIngredientToggle(ingredient)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#4caf50' : '#f0f0f0',
                        color: isSelected ? '#ffffff' : '#333',
                        transition: 'all 0.2s',
                        textTransform: 'capitalize'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.backgroundColor = '#e0e0e0';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.backgroundColor = '#f0f0f0';
                        }
                      }}
                    >
                      {ingredient}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          height: 'calc(100vh - 60px)',
          padding: '24px'
        }}>
          {/* Filter Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', position: 'relative' }}>
            {filters.map((filter) => {
              const isActive = showFilterModal === filter;
              const hasActiveFilter = 
                (filter === "Exclude" && activeFilters.excludeIngredients.length > 0) ||
                (filter === "Cuisine" && activeFilters.cuisine) ||
                (filter === "Diet" && activeFilters.dietaryRestrictions.length > 0) ||
                (filter === "Rating" && activeFilters.minRating) ||
                (filter === "Recipe time" && activeFilters.maxTotalTime) ||
                (filter === "Difficulty" && activeFilters.difficulty) ||
                (filter === "AI or Human" && activeFilters.isGenerated !== null);
              
              return (
                <div key={filter} style={{ position: 'relative' }}>
                  <button
                    onClick={() => handleFilterClick(filter)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: '500',
                      border: '2px solid #4caf50',
                      color: isActive || hasActiveFilter ? '#ffffff' : '#4caf50',
                      backgroundColor: isActive || hasActiveFilter ? '#4caf50' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive && !hasActiveFilter) {
                        e.target.style.backgroundColor = '#f0f9f0';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive && !hasActiveFilter) {
                        e.target.style.backgroundColor = '#ffffff';
                      }
                    }}
                  >
                    {filter}
                    {hasActiveFilter && !isActive && (
                      <span style={{ fontSize: '10px' }}>●</span>
                    )}
                  </button>
                  
                  {/* Filter Modal */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '8px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '16px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      zIndex: 100,
                      minWidth: '250px',
                      maxWidth: '400px'
                    }}>
                      {filter === "Exclude" && (
                        <div>
                          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Exclude Ingredients</h4>
                          <input
                            type="text"
                            placeholder="Type ingredient to exclude..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && e.target.value.trim()) {
                                updateFilter('excludeIngredients', [...activeFilters.excludeIngredients, e.target.value.trim()]);
                                e.target.value = '';
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #e0e0e0',
                              borderRadius: '4px',
                              marginBottom: '8px'
                            }}
                          />
                          {activeFilters.excludeIngredients.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                              {activeFilters.excludeIngredients.map((ing, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    padding: '4px 8px',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  {ing}
                                  <button
                                    onClick={() => updateFilter('excludeIngredients', activeFilters.excludeIngredients.filter((_, i) => i !== idx))}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {filter === "Cuisine" && (
                        <div>
                          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Cuisine</h4>
                          <input
                            type="text"
                            placeholder="Enter cuisine (e.g., Italian, Mexican)..."
                            defaultValue={activeFilters.cuisine || ''}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                updateFilter('cuisine', e.target.value.trim() || null);
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #e0e0e0',
                              borderRadius: '4px'
                            }}
                          />
                          {activeFilters.cuisine && (
                            <button
                              onClick={() => clearFilter('cuisine')}
                              style={{
                                marginTop: '8px',
                                padding: '6px 12px',
                                backgroundColor: '#f0f0f0',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      )}
                      
                      {filter === "Diet" && (
                        <div>
                          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Dietary Restrictions</h4>
                          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'].map(diet => {
                            const isSelected = activeFilters.dietaryRestrictions.includes(diet);
                            return (
                              <button
                                key={diet}
                                onClick={() => {
                                  const newRestrictions = isSelected
                                    ? activeFilters.dietaryRestrictions.filter(r => r !== diet)
                                    : [...activeFilters.dietaryRestrictions, diet];
                                  updateFilter('dietaryRestrictions', newRestrictions);
                                }}
                                style={{
                                  display: 'block',
                                  width: '100%',
                                  padding: '8px',
                                  marginBottom: '4px',
                                  border: '1px solid #e0e0e0',
                                  borderRadius: '4px',
                                  backgroundColor: isSelected ? '#4caf50' : '#ffffff',
                                  color: isSelected ? '#ffffff' : '#333',
                                  cursor: 'pointer'
                                }}
                              >
                                {diet}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      
                      {filter === "Rating" && (
                        <div>
                          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Minimum Rating</h4>
                          <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            placeholder="Enter min rating (0-5)..."
                            defaultValue={activeFilters.minRating || ''}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                updateFilter('minRating', e.target.value ? parseFloat(e.target.value) : null);
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #e0e0e0',
                              borderRadius: '4px'
                            }}
                          />
                          {activeFilters.minRating && (
                            <button
                              onClick={() => clearFilter('minRating')}
                              style={{
                                marginTop: '8px',
                                padding: '6px 12px',
                                backgroundColor: '#f0f0f0',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      )}
                      
                      {filter === "Recipe time" && (
                        <div>
                          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Max Total Time (minutes)</h4>
                          <input
                            type="number"
                            placeholder="Enter max time in minutes..."
                            defaultValue={activeFilters.maxTotalTime || ''}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                updateFilter('maxTotalTime', e.target.value ? parseInt(e.target.value) : null);
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #e0e0e0',
                              borderRadius: '4px'
                            }}
                          />
                          {activeFilters.maxTotalTime && (
                            <button
                              onClick={() => clearFilter('maxTotalTime')}
                              style={{
                                marginTop: '8px',
                                padding: '6px 12px',
                                backgroundColor: '#f0f0f0',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      )}
                      
                      {filter === "Difficulty" && (
                        <div>
                          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Difficulty Level</h4>
                          {['Easy', 'Medium', 'Hard'].map(diff => (
                            <button
                              key={diff}
                              onClick={() => updateFilter('difficulty', activeFilters.difficulty === diff ? null : diff)}
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginBottom: '4px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px',
                                backgroundColor: activeFilters.difficulty === diff ? '#4caf50' : '#ffffff',
                                color: activeFilters.difficulty === diff ? '#ffffff' : '#333',
                                cursor: 'pointer'
                              }}
                            >
                              {diff}
                            </button>
                          ))}
                          {activeFilters.difficulty && (
                            <button
                              onClick={() => clearFilter('difficulty')}
                              style={{
                                marginTop: '8px',
                                padding: '6px 12px',
                                backgroundColor: '#f0f0f0',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      )}
                      
                      {filter === "AI or Human" && (
                        <div>
                          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Recipe Source</h4>
                          {[
                            { label: 'All', value: null },
                            { label: 'AI Generated', value: true },
                            { label: 'Human Created', value: false }
                          ].map(option => (
                            <button
                              key={option.label}
                              onClick={() => updateFilter('isGenerated', option.value)}
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                marginBottom: '4px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px',
                                backgroundColor: activeFilters.isGenerated === option.value ? '#4caf50' : '#ffffff',
                                color: activeFilters.isGenerated === option.value ? '#ffffff' : '#333',
                                cursor: 'pointer'
                              }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <button
                        onClick={() => setShowFilterModal(null)}
                        style={{
                          marginTop: '12px',
                          padding: '8px 16px',
                          backgroundColor: '#f0f0f0',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          width: '100%'
                        }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Click outside to close modal */}
          {showFilterModal && (
            <div
              onClick={() => setShowFilterModal(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 50
              }}
            />
          )}

          {/* Recipe Count */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '24px'
          }}>
            {loading ? 'Searching...' : selectedIngredients.length === 0 
              ? 'Select ingredients to find recipes' 
              : `You can make ${recipeCount} recipe${recipeCount !== 1 ? 's' : ''}`}
          </h1>

          {/* Recipe List or No Results */}
          {selectedIngredients.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <p style={{ fontSize: '18px', marginBottom: '12px' }}>
                Select ingredients from the side panel to find recipes
              </p>
            </div>
          ) : loading ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <p style={{ fontSize: '18px' }}>Loading recipes...</p>
            </div>
          ) : recipes.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <p style={{ fontSize: '18px', marginBottom: '24px' }}>
                No recipes found with the selected ingredients
              </p>
              <button
                onClick={handleGenerateRecipe}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4caf50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#45a049';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#4caf50';
                }}
              >
                Generate Recipe
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recipes.map((recipe) => (
                <RecipeCard 
                  key={recipe._id} 
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      
      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={handleCloseRecipeDetail}
          onUpdate={handleRecipeUpdate}
        />
      )}
    </div>
  );
}
