import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import axios from 'axios';

// @desc    Fetch all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Recipe.countDocuments({ ...keyword });
  const recipes = await Recipe.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private/Admin
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    await recipe.deleteOne();
    res.json({ message: 'Recipe removed' });
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = asyncHandler(async (req, res) => {
  const {
    title,
    image,
    ingredients,
    instructions,
    cuisine,
    mealType,
    dietaryRestrictions,
    prepTime,
    cookTime,
    servings,
    difficulty,
  } = req.body;

  const recipe = new Recipe({
    user: req.user._id,
    title,
    image,
    ingredients,
    instructions,
    cuisine,
    mealType,
    dietaryRestrictions,
    prepTime,
    cookTime,
    servings,
    difficulty,
    isGenerated: false,
  });

  const createdRecipe = await recipe.save();
  res.status(201).json(createdRecipe);
});

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
  const {
    title,
    image,
    ingredients,
    instructions,
    cuisine,
    mealType,
    dietaryRestrictions,
    prepTime,
    cookTime,
    servings,
    difficulty,
  } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    // Check if the user is the owner of the recipe
    if (recipe.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this recipe');
    }

    recipe.title = title || recipe.title;
    recipe.image = image || recipe.image;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.cuisine = cuisine || recipe.cuisine;
    recipe.mealType = mealType || recipe.mealType;
    recipe.dietaryRestrictions = dietaryRestrictions || recipe.dietaryRestrictions;
    recipe.prepTime = prepTime || recipe.prepTime;
    recipe.cookTime = cookTime || recipe.cookTime;
    recipe.servings = servings || recipe.servings;
    recipe.difficulty = difficulty || recipe.difficulty;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Create new review
// @route   POST /api/recipes/:id/reviews
// @access  Private
const createRecipeReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    const alreadyReviewed = recipe.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Recipe already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    recipe.reviews.push(review);

    recipe.numReviews = recipe.reviews.length;

    recipe.rating =
      recipe.reviews.reduce((acc, item) => item.rating + acc, 0) /
      recipe.reviews.length;

    await recipe.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Get top rated recipes
// @route   GET /api/recipes/top
// @access  Public
const getTopRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({}).sort({ rating: -1 }).limit(5);

  res.json(recipes);
});

// @desc    Generate a recipe using AI
// @route   POST /api/recipes/generate
// @access  Private
const generateRecipe = asyncHandler(async (req, res) => {
  const { ingredients, dietaryRestrictions, cuisine, mealType } = req.body;

  if (!ingredients || ingredients.length === 0) {
    res.status(400);
    throw new Error('Please provide ingredients');
  }

  try {
    // Call the AI model API to generate a recipe
    // This would be replaced with your actual AI model endpoint
    const modelResponse = await axios.post(
      process.env.AI_MODEL_ENDPOINT || 'http://localhost:5001/api/generate',
      {
        ingredients,
        dietaryRestrictions,
        cuisine,
        mealType,
      }
    );

    const generatedRecipe = modelResponse.data;

    // Create a new recipe in the database
    const recipe = new Recipe({
      user: req.user._id,
      title: generatedRecipe.title,
      ingredients: generatedRecipe.ingredients,
      instructions: generatedRecipe.instructions,
      cuisine: cuisine || generatedRecipe.metadata?.cuisine,
      mealType: mealType || generatedRecipe.metadata?.mealType,
      dietaryRestrictions: dietaryRestrictions || generatedRecipe.metadata?.dietaryRestrictions,
      prepTime: generatedRecipe.metadata?.prepTime,
      cookTime: generatedRecipe.metadata?.cookTime,
      servings: generatedRecipe.metadata?.servings,
      difficulty: generatedRecipe.metadata?.difficulty,
      isGenerated: true,
    });

    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500);
    throw new Error('Failed to generate recipe. Please try again.');
  }
});

// @desc    Search recipes by ingredients
// @route   GET /api/recipes/search
// @access  Public
const searchRecipesByIngredients = asyncHandler(async (req, res) => {
  const { ingredients, limit } = req.query;

  if (!ingredients) {
    res.status(400);
    throw new Error('Please provide ingredients');
  }

  const ingredientList = ingredients.split(',').map((ing) => ing.trim()).filter(Boolean);
  const pageLimit = Math.min(parseInt(limit || '12', 10), 50);

  // First try local MongoDB search for recipes containing ALL provided ingredients
  // Fallback to external retrieval API if configured
  try {
    const mongoResults = await Recipe.find({ ingredients: { $all: ingredientList } })
      .limit(pageLimit)
      .select('-reviews');

    if (mongoResults && mongoResults.length) {
      return res.json(mongoResults);
    }
  } catch (err) {
    console.error('Mongo ingredient search error:', err);
  }

  // Fallback: external retrieval service
  try {
    const endpoint = process.env.RETRIEVAL_MODEL_ENDPOINT;
    if (!endpoint) {
      return res.json([]);
    }
    const modelResponse = await axios.get(endpoint, {
      params: { ingredients: ingredientList.join(','), limit: pageLimit },
    });
    return res.json(modelResponse.data);
  } catch (error) {
    console.error('Error searching recipes (fallback):', error);
    return res.json([]);
  }
});

// @desc    Toggle favorite recipe
// @route   PUT /api/recipes/:id/favorite
// @access  Private
const toggleFavoriteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Get user's favorite recipes
// @route   GET /api/recipes/favorites
// @access  Private
const getFavoriteRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user._id, isFavorite: true });
  res.json(recipes);
});

export {
  getRecipes,
  getRecipeById,
  deleteRecipe,
  createRecipe,
  updateRecipe,
  createRecipeReview,
  getTopRecipes,
  generateRecipe,
  searchRecipesByIngredients,
  toggleFavoriteRecipe,
  getFavoriteRecipes,
};