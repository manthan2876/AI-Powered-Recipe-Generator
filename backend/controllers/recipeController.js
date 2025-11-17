import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import User from '../models/userModel.js';
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
  let recipes = await Recipe.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Add isSaved status for authenticated users
  if (req.user && req.user._id) {
    const user = await User.findById(req.user._id);
    if (user && user.savedRecipes) {
      const savedRecipeIds = user.savedRecipes.map(id => id.toString());
      recipes = recipes.map(recipe => {
        const recipeObj = recipe.toObject();
        recipeObj.isSaved = savedRecipeIds.includes(recipeObj._id.toString());
        return recipeObj;
      });
    } else {
      recipes = recipes.map(recipe => {
        const recipeObj = recipe.toObject();
        recipeObj.isSaved = false;
        return recipeObj;
      });
    }
  } else {
    // For non-authenticated users, set isSaved to false
    recipes = recipes.map(recipe => {
      const recipeObj = recipe.toObject();
      recipeObj.isSaved = false;
      return recipeObj;
    });
  }

  res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('reviews.user', 'name');

  if (recipe) {
    // Check if user has saved this recipe (if authenticated)
    let isSaved = false;
    if (req.user && req.user._id) {
      const user = await User.findById(req.user._id);
      if (user && user.savedRecipes) {
        isSaved = user.savedRecipes.some(
          (id) => id.toString() === recipe._id.toString()
        );
      }
    }
    res.json({ ...recipe.toObject(), isSaved });
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
      process.env.AI_MODEL_ENDPOINT || 'http://localhost:5001/predict',
      {
        ingredients,
        dietaryRestrictions,
        cuisine,
        mealType,
      }
    );

    const generatedRecipe = modelResponse.data;
    console.log(generatedRecipe);
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
  const { 
    ingredients, 
    limit,
    cuisine,
    dietaryRestrictions,
    minRating,
    maxTotalTime,
    excludeIngredients,
    difficulty,
    isGenerated
  } = req.query;

  // Make ingredients optional
  const ingredientList = ingredients 
    ? ingredients.split(',').map((ing) => ing.trim().toLowerCase()).filter(Boolean)
    : [];
  const excludeList = excludeIngredients
    ? excludeIngredients.split(',').map((ing) => ing.trim().toLowerCase()).filter(Boolean)
    : [];
  const pageLimit = Math.min(parseInt(limit || '12', 10), 50);

  // Build query object
  const query = {};
  const andConditions = [];

  // Ingredient matching - use $or for partial matching (recipes that contain any of the selected ingredients)
  if (ingredientList.length > 0) {
    // Match recipes that contain at least one of the selected ingredients
    andConditions.push({
      $or: ingredientList.map(ing => ({
        ingredients: { $regex: ing, $options: 'i' }
      }))
    });
  }

  // Exclude ingredients
  if (excludeList.length > 0) {
    andConditions.push({
      ingredients: {
        $nin: excludeList.map(ing => new RegExp(ing, 'i'))
      }
    });
  }

  // Combine conditions with $and if we have multiple conditions
  if (andConditions.length > 0) {
    if (andConditions.length === 1) {
      Object.assign(query, andConditions[0]);
    } else {
      query.$and = andConditions;
    }
  }

  // Filter by cuisine
  if (cuisine) {
    query.cuisine = { $regex: cuisine, $options: 'i' };
  }

  // Filter by dietary restrictions
  if (dietaryRestrictions) {
    const restrictions = dietaryRestrictions.split(',').map(r => r.trim());
    query.dietaryRestrictions = { $in: restrictions.map(r => new RegExp(r, 'i')) };
  }

  // Filter by minimum rating
  if (minRating) {
    query.rating = { $gte: parseFloat(minRating) };
  }

  // Filter by max total time (prep + cook)
  if (maxTotalTime) {
    const maxTime = parseInt(maxTotalTime);
    query.$expr = {
      $lte: [
        { $add: [{ $ifNull: ['$prepTime', 0] }, { $ifNull: ['$cookTime', 0] }] },
        maxTime
      ]
    };
  }

  // Filter by difficulty
  if (difficulty) {
    query.difficulty = difficulty;
  }

  // Filter by AI or Human (isGenerated)
  if (isGenerated !== undefined && isGenerated !== null && isGenerated !== '') {
    query.isGenerated = isGenerated === 'true' || isGenerated === true;
  }

  // First try local MongoDB search
  try {
    let mongoResults = await Recipe.find(query)
      .select('-reviews')
      .limit(pageLimit * 2); // Get more results for sorting


    // Calculate ingredient match count for each recipe
    if (ingredientList.length > 0) {
      mongoResults = mongoResults.map(recipe => {
        const recipeIngredients = (recipe.ingredients || []).map(ing => ing.toLowerCase());
        const matchCount = ingredientList.filter(selectedIng => 
          recipeIngredients.some(recipeIng => recipeIng.includes(selectedIng))
        ).length;
        return {
          ...recipe.toObject(),
          ingredientMatch: matchCount
        };
      });

      // Sort by ingredient match count (descending)
      mongoResults.sort((a, b) => (b.ingredientMatch || 0) - (a.ingredientMatch || 0));
    }

    // Limit results
    mongoResults = mongoResults.slice(0, pageLimit);

    // Add isSaved status for authenticated users
    if (req.user && req.user._id) {
      const user = await User.findById(req.user._id);
      if (user && user.savedRecipes) {
        const savedRecipeIds = user.savedRecipes.map(id => id.toString());
        mongoResults = mongoResults.map(recipe => ({
          ...recipe,
          isSaved: savedRecipeIds.includes(recipe._id.toString())
        }));
      }
    } else {
      // For non-authenticated users, set isSaved to false
      mongoResults = mongoResults.map(recipe => ({
        ...recipe,
        isSaved: false
      }));
    }

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

// @desc    Toggle favorite recipe (save/unsave recipe for user)
// @route   PUT /api/recipes/:id/favorite
// @access  Private
const toggleFavoriteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const recipeId = recipe._id.toString();
  const isSaved = user.savedRecipes.includes(recipeId);

  if (isSaved) {
    // Remove from saved recipes
    user.savedRecipes = user.savedRecipes.filter(
      (id) => id.toString() !== recipeId
    );
  } else {
    // Add to saved recipes
    user.savedRecipes.push(recipeId);
  }

  await user.save();
  res.json({ isSaved: !isSaved, recipe });
});

// @desc    Get user's favorite recipes
// @route   GET /api/recipes/favorites
// @access  Private
const getFavoriteRecipes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('savedRecipes');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user.savedRecipes || []);
});

// @desc    Get all unique ingredients from database
// @route   GET /api/recipes/ingredients
// @access  Public
const getAllIngredients = asyncHandler(async (req, res) => {
  try {
    const recipes = await Recipe.find({}, 'ingredients');
    const allIngredients = new Set();
    
    recipes.forEach(recipe => {
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach(ingredient => {
          // Extract ingredient name (remove quantities/units)
          // Handle formats like "2 cups flour" or "flour" or "1 tsp salt"
          const cleaned = ingredient
            .replace(/^[\d./\s]+(cup|cups|tsp|tbsp|tablespoon|teaspoon|oz|ounce|lb|pound|g|gram|kg|kilogram|ml|milliliter|l|liter|piece|pieces|clove|cloves|slice|slices|can|cans|package|packages)\s+/i, '')
            .replace(/^[\d./\s]+/, '')
            .trim()
            .toLowerCase();
          
          if (cleaned) {
            allIngredients.add(cleaned);
          }
        });
      }
    });
    
    const sortedIngredients = Array.from(allIngredients).sort();
    res.json(sortedIngredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500);
    throw new Error('Failed to fetch ingredients');
  }
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
  getAllIngredients,
};