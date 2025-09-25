import asyncHandler from 'express-async-handler';
import ShoppingList from '../models/shoppingListModel.js';
import Recipe from '../models/recipeModel.js';
import mongoose from 'mongoose';

// @desc    Create a new shopping list
// @route   POST /api/shoppinglists
// @access  Private
const createShoppingList = asyncHandler(async (req, res) => {
  const { name, recipeIds } = req.body;

  if (!name || name.trim() === '') {
    res.status(400);
    throw new Error('Shopping list name is required');
  }

  // Create empty shopping list
  const shoppingList = await ShoppingList.create({
    user: req.user._id,
    name,
    items: [],
    recipes: recipeIds || [],
  });

  // If recipe IDs are provided, generate shopping list items
  if (recipeIds && recipeIds.length > 0) {
    await generateShoppingListItems(shoppingList._id, recipeIds);
    // Fetch the updated shopping list with items
    const updatedList = await ShoppingList.findById(shoppingList._id);
    res.status(201).json(updatedList);
  } else {
    res.status(201).json(shoppingList);
  }
});

// @desc    Get all shopping lists for a user
// @route   GET /api/shoppinglists
// @access  Private
const getShoppingLists = asyncHandler(async (req, res) => {
  const shoppingLists = await ShoppingList.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('recipes', 'title image');
  
  res.json(shoppingLists);
});

// @desc    Get shopping list by ID
// @route   GET /api/shoppinglists/:id
// @access  Private
const getShoppingListById = asyncHandler(async (req, res) => {
  const shoppingListId = req.params.id;
  
  // Validate shopping list ID
  if (!mongoose.Types.ObjectId.isValid(shoppingListId)) {
    res.status(400);
    throw new Error('Invalid shopping list ID');
  }

  const shoppingList = await ShoppingList.findById(shoppingListId)
    .populate('recipes', 'title image ingredients')
    .populate('items.recipe', 'title');

  if (shoppingList) {
    // Check if user owns this shopping list
    if (shoppingList.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to access this shopping list');
    }
    res.json(shoppingList);
  } else {
    res.status(404);
    throw new Error('Shopping list not found');
  }
});

// @desc    Update shopping list
// @route   PUT /api/shoppinglists/:id
// @access  Private
const updateShoppingList = asyncHandler(async (req, res) => {
  const { name, items, recipes } = req.body;

  const shoppingList = await ShoppingList.findById(req.params.id);

  if (shoppingList) {
    // Check if user owns this shopping list
    if (shoppingList.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this shopping list');
    }

    shoppingList.name = name || shoppingList.name;
    
    // Update items if provided
    if (items) {
      shoppingList.items = items;
    }

    // Update recipes if provided
    if (recipes) {
      shoppingList.recipes = recipes;
    }

    const updatedShoppingList = await shoppingList.save();
    res.json(updatedShoppingList);
  } else {
    res.status(404);
    throw new Error('Shopping list not found');
  }
});

// @desc    Delete shopping list
// @route   DELETE /api/shoppinglists/:id
// @access  Private
const deleteShoppingList = asyncHandler(async (req, res) => {
  const shoppingList = await ShoppingList.findById(req.params.id);

  if (shoppingList) {
    // Check if user owns this shopping list
    if (shoppingList.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this shopping list');
    }

    await ShoppingList.deleteOne({ _id: req.params.id });
    res.json({ message: 'Shopping list removed' });
  } else {
    res.status(404);
    throw new Error('Shopping list not found');
  }
});

// @desc    Generate shopping list items from recipes
// @route   POST /api/shoppinglists/:id/generate
// @access  Private
const generateShoppingListFromRecipes = asyncHandler(async (req, res) => {
  const { recipeIds } = req.body;
  const shoppingListId = req.params.id;

  // Validate shopping list ID
  if (!mongoose.Types.ObjectId.isValid(shoppingListId)) {
    res.status(400);
    throw new Error('Invalid shopping list ID');
  }

  if (!recipeIds || !Array.isArray(recipeIds) || recipeIds.length === 0) {
    res.status(400);
    throw new Error('Recipe IDs are required');
  }

  // Validate recipe IDs
  const validIds = recipeIds.every(id => mongoose.Types.ObjectId.isValid(id));
  if (!validIds) {
    res.status(400);
    throw new Error('One or more recipe IDs are invalid');
  }

  const shoppingList = await ShoppingList.findById(shoppingListId);

  if (!shoppingList) {
    res.status(404);
    throw new Error('Shopping list not found');
  }

  // Check if user owns this shopping list
  if (shoppingList.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this shopping list');
  }

  // Add recipes to shopping list
  shoppingList.recipes = [...new Set([...shoppingList.recipes, ...recipeIds])];
  await shoppingList.save();

  // Generate items from recipes
  await generateShoppingListItems(shoppingListId, recipeIds);

  // Return updated shopping list
  const updatedList = await ShoppingList.findById(shoppingListId)
    .populate('recipes', 'title image');
  
  res.json(updatedList);
});

// @desc    Update item status (checked/unchecked)
// @route   PUT /api/shoppinglists/:id/items/:itemId
// @access  Private
const updateShoppingListItem = asyncHandler(async (req, res) => {
  const { checked, quantity } = req.body;
  const { id, itemId } = req.params;

  const shoppingList = await ShoppingList.findById(id);

  if (!shoppingList) {
    res.status(404);
    throw new Error('Shopping list not found');
  }

  // Check if user owns this shopping list
  if (shoppingList.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this shopping list');
  }

  // Find the item
  const itemIndex = shoppingList.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in shopping list');
  }

  // Update item
  if (checked !== undefined) {
    shoppingList.items[itemIndex].checked = checked;
  }
  
  if (quantity !== undefined) {
    shoppingList.items[itemIndex].quantity = quantity;
  }

  await shoppingList.save();
  res.json(shoppingList);
});

// @desc    Add a new item to shopping list
// @route   POST /api/shoppinglists/:id/items
// @access  Private
const addShoppingListItem = asyncHandler(async (req, res) => {
  const { ingredient, quantity } = req.body;
  const { id } = req.params;

  if (!ingredient) {
    res.status(400);
    throw new Error('Ingredient name is required');
  }

  const shoppingList = await ShoppingList.findById(id);

  if (!shoppingList) {
    res.status(404);
    throw new Error('Shopping list not found');
  }

  // Check if user owns this shopping list
  if (shoppingList.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this shopping list');
  }

  // Add new item
  shoppingList.items.push({
    ingredient,
    quantity: quantity || '',
    checked: false,
  });

  await shoppingList.save();
  res.status(201).json(shoppingList);
});

// @desc    Delete an item from shopping list
// @route   DELETE /api/shoppinglists/:id/items/:itemId
// @access  Private
const deleteShoppingListItem = asyncHandler(async (req, res) => {
  const { id, itemId } = req.params;

  const shoppingList = await ShoppingList.findById(id);

  if (!shoppingList) {
    res.status(404);
    throw new Error('Shopping list not found');
  }

  // Check if user owns this shopping list
  if (shoppingList.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this shopping list');
  }

  // Remove item
  shoppingList.items = shoppingList.items.filter(
    (item) => item._id.toString() !== itemId
  );

  await shoppingList.save();
  res.json(shoppingList);
});

// Helper function to generate shopping list items from recipes
const generateShoppingListItems = async (shoppingListId, recipeIds) => {
  // Get the shopping list
  const shoppingList = await ShoppingList.findById(shoppingListId);
  
  if (!shoppingList) {
    throw new Error('Shopping list not found');
  }

  // Get all recipes
  const recipes = await Recipe.find({ _id: { $in: recipeIds } });
  
  if (!recipes.length) {
    throw new Error('No valid recipes found');
  }

  // Extract all ingredients from recipes
  const allIngredients = [];
  recipes.forEach(recipe => {
    // Process each ingredient to extract name and quantity
    recipe.ingredients.forEach(ingredient => {
      // Try to extract quantity and unit from ingredient string
      const quantityMatch = ingredient.match(/^([\d./]+)?\s*([a-zA-Z]+\.?)?\s+(.+)$/);
      
      let quantity = '';
      let ingredientName = ingredient;
      
      if (quantityMatch) {
        const [_, amount, unit, name] = quantityMatch;
        quantity = amount ? (unit ? `${amount} ${unit}` : amount) : '';
        ingredientName = name.trim();
      }
      
      allIngredients.push({
        ingredient: ingredientName,
        quantity: quantity,
        recipe: recipe._id
      });
    });
  });

  // Consolidate ingredients (simple approach - group by exact name match)
  const consolidatedIngredients = {};
  
  allIngredients.forEach(item => {
    const ingredient = item.ingredient.toLowerCase().trim();
    
    if (!consolidatedIngredients[ingredient]) {
      consolidatedIngredients[ingredient] = {
        ingredient: item.ingredient,
        quantity: item.quantity,
        recipes: [item.recipe],
      };
    } else {
      // If this ingredient already exists, keep the more detailed quantity
      if (item.quantity && (!consolidatedIngredients[ingredient].quantity || 
          item.quantity.length > consolidatedIngredients[ingredient].quantity.length)) {
        consolidatedIngredients[ingredient].quantity = item.quantity;
      }
      
      if (!consolidatedIngredients[ingredient].recipes.includes(item.recipe)) {
        consolidatedIngredients[ingredient].recipes.push(item.recipe);
      }
    }
  });

  // Create shopping list items
  const newItems = Object.values(consolidatedIngredients).map(item => ({
    ingredient: item.ingredient,
    quantity: item.quantity || '',
    checked: false,
    recipe: item.recipes[0], // Link to first recipe that uses this ingredient
  }));

  // Add new items to shopping list, avoiding duplicates
  const existingIngredients = new Set(shoppingList.items.map(item => 
    item.ingredient.toLowerCase().trim()
  ));

  const uniqueNewItems = newItems.filter(item => 
    !existingIngredients.has(item.ingredient.toLowerCase().trim())
  );

  shoppingList.items = [...shoppingList.items, ...uniqueNewItems];
  
  // Save the updated shopping list
  await shoppingList.save();
  
  return shoppingList;
};

export {
  createShoppingList,
  getShoppingLists,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
  generateShoppingListFromRecipes,
  updateShoppingListItem,
  addShoppingListItem,
  deleteShoppingListItem,
};