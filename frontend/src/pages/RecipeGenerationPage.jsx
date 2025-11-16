import React, { useState } from "react";
import { generateRecipe } from "../services/recipeGeneration";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RecipeGenerationPage() {
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGeneratedRecipe(null);

    // 🟢 START: Added frontend validation
    const ingredientsArray = (ingredientsInput || '')
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    if (ingredientsArray.length === 0) {
      setError("Please enter at least one ingredient.");
      setLoading(false); // Stop loading
      return; // Stop here
    }
    // 🟢 END: Added frontend validation

    try {
      // Pass the already-processed array
      const response = await generateRecipe(ingredientsArray);
      setGeneratedRecipe(response);
    } catch (err) {
      // 🟢 CORRECTION: Correctly concatenate the error message
      setError("Failed to generate recipe. " + (err.message || "Please try again."));
    } finally {
      setLoading(false);
    }
  };

  // 🟢 We also need to update the recipeGeneration.js service
  //    (See note below this code block)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        padding: '40px 20px',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* ... (Form and Error sections are unchanged) ... */}
          
          <form onSubmit={handleGenerate} style={{ marginBottom: '30px' }}>
            <div style={{ marginBottom: '20px' }}>
              <textarea
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
                rows={4}
                placeholder="e.g., chicken breast, broccoli, soy sauce, garlic"
                // Removed 'required' to allow custom frontend validation
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4caf50'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 32px',
                  backgroundColor: loading ? '#cccccc' : '#4caf50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#45a049';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#4caf50';
                  }
                }}
              >
                {loading ? "Generating..." : "Generate Recipe"}
              </button>
            </div>
          </form>

          {error && (
            <div style={{
              padding: '16px',
              backgroundColor: '#ffebee',
              border: '1px solid #ffcdd2',
              borderRadius: '4px',
              textAlign: 'center',
              color: '#c62828',
              marginBottom: '30px'
            }}>
              {error}
            </div>
          )}

          {generatedRecipe && (
            <div style={{
              padding: '30px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '16px' // Adjusted margin
              }}>
                {generatedRecipe.title}
              </h3>
              
              {/* 🟢 NEW: Description Section */}
              <p style={{
                fontSize: '16px',
                color: '#555',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                {generatedRecipe.description}
              </p>

              {/* 🟢 NEW: Info Bar Section */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                padding: '20px 0',
                borderTop: '1px solid #eee',
                borderBottom: '1px solid #eee',
                marginBottom: '24px'
              }}>
                <div style={{ flex: '1 1 100px' }}>
                  <h5 style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Prep Time</h5>
                  <p style={{ fontSize: '16px', color: '#333', fontWeight: '600', margin: 0 }}>
                    {generatedRecipe.prepTime} min
                  </p>
                </div>
                <div style={{ flex: '1 1 100px' }}>
                  <h5 style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Cook Time</h5>
                  <p style={{ fontSize: '16px', color: '#333', fontWeight: '600', margin: 0 }}>
                    {generatedRecipe.cookTime} min
                  </p>
                </div>
                <div style={{ flex: '1 1 100px' }}>
                  <h5 style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Servings</h5>
                  <p style={{ fontSize: '16px', color: '#333', fontWeight: '600', margin: 0 }}>
                    {generatedRecipe.servings}
                  </p>
                </div>
                <div style={{ flex: '1 1 100px' }}>
                  <h5 style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Difficulty</h5>
                  <p style={{ fontSize: '16px', color: '#333', fontWeight: '600', margin: 0 }}>
                    {generatedRecipe.difficulty}
                  </p>
                </div>
                <div style={{ flex: '1 1 100px' }}>
                  <h5 style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Cuisine</h5>
                  <p style={{ fontSize: '16px', color: '#333', fontWeight: '600', margin: 0 }}>
                    {generatedRecipe.cuisine}
                  </p>
                </div>
              </div>

              {/* This is the existing 2-column grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: '#333'
                  }}>
                    Ingredients
                  </h4>
                  <ul style={{
                    listStyle: 'disc',
                    paddingLeft: '20px',
                    color: '#666',
                    lineHeight: '1.8'
                  }}>
                    {generatedRecipe.ingredients.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: '#333'
                  }}>
                    Instructions
                  </h4>
                  <div style={{
                    color: '#666',
                    lineHeight: '1.8'
                  }}>
                    {/* This was already corrected in the previous step */}
                    {generatedRecipe.instructions.map((line, idx) => (
                      line.trim() && <p key={idx} style={{ marginBottom: '8px' }}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 🟢 NEW: Tags Section */}
              <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '24px' }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#333'
                }}>
                  Tags
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {generatedRecipe.tags.map((tag, idx) => (
                    <span key={idx} style={{
                      backgroundColor: '#f0f0f0', // Lighter background
                      color: '#555',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* This is the existing "Generate Another" button */}
              <div style={{ marginTop: '30px', textAlign: 'right' }}>
                <button
                  onClick={() => setGeneratedRecipe(null)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    color: '#666',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Generate Another
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RecipeGenerationPage;