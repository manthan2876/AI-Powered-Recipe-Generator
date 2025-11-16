import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getFavoriteRecipes, toggleFavorite } from "../services/recipes";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        const data = await getFavoriteRecipes();
        setRecipes(data || []);
      } catch (err) {
        setError("Failed to load saved recipes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  const handleRemove = async (id) => {
    if (window.confirm("Remove this recipe from saved?")) {
      try {
        await toggleFavorite(id);
        setRecipes((prev) => prev.filter((r) => r._id !== id));
      } catch (err) {
        setError("Failed to remove recipe");
        console.error(err);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        padding: '40px 20px',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <header style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Saved Recipes
            </h1>
          </header>

          {error && (
            <div style={{
              color: '#ff4444',
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '14px',
              padding: '12px',
              backgroundColor: '#ffebee',
              borderRadius: '4px'
            }}>
              {error}
            </div>
          )}

          {loading ? (
            <p style={{
              textAlign: 'center',
              fontSize: '16px',
              color: '#666',
              padding: '40px'
            }}>
              Loading saved recipes...
            </p>
          ) : recipes.length === 0 ? (
            <p style={{
              textAlign: 'center',
              fontSize: '16px',
              color: '#666',
              padding: '40px'
            }}>
              No saved recipes yet.
            </p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {recipes.map((recipe) => (
                <div key={recipe._id}>
                  <RecipeCard
                    recipe={recipe}
                    onDelete={() => handleRemove(recipe._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavedRecipes;
