import React, { useState } from "react";
import { generateRecipe } from "../services/recipeGeneration";

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

    try {
      const response = await generateRecipe(ingredientsInput);
      setGeneratedRecipe(response);
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate a Recipe</h2>
      <form onSubmit={handleGenerate}>
        <textarea
          value={ingredientsInput}
          onChange={(e) => setIngredientsInput(e.target.value)}
          rows={4}
          placeholder="Enter ingredients (comma separated) or descriptions"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </form>

      {error && <p style={{color: "red"}}>{error}</p>}

      {generatedRecipe && (
        <div className="generated-recipe">
          <h3>{generatedRecipe.title}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {generatedRecipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p>{generatedRecipe.instructions}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeGenerationPage;
