import asyncHandler from 'express-async-handler';
import ShoppingList from '../models/shoppingListModel.js';
import Recipe from '../models/recipeModel.js';
import mongoose from 'mongoose';

// @desc    Create a new shopping list
// @route   POST /api/shoppinglists
// @access  Private
const createShoppingList = asyncHandler(async (req, res) => {
  const { name, recipeIds, items } = req.body;

  if (!name || name.trim() === '') {
    res.status(400);
    throw new Error('Shopping list name is required');
  }

  // 1. Process direct items (e.g., from AI Recipe generation)
  const initialItems = items && Array.isArray(items) 
    ? items.map(item => ({
        ingredient: item.ingredient || 'Unknown Item',
        quantity: item.quantity || '',
        checked: false,
        recipe: item.recipe || null // Optional: link to recipe if provided
      }))
    : [];

  // 2. Create the shopping list document
  const shoppingList = await ShoppingList.create({
    user: req.user._id,
    name,
    items: initialItems,
    recipes: recipeIds || [],
  });

  // 3. If recipe IDs are provided (Saved Recipes), generate and merge those items
  if (recipeIds && recipeIds.length > 0) {
    try {
      await generateShoppingListItems(shoppingList._id, recipeIds);
      
      // Fetch the fully populated updated list
      const updatedList = await ShoppingList.findById(shoppingList._id)
        .populate('recipes', 'title image')
        .populate('items.recipe', 'title');
      
      res.status(201).json(updatedList);
    } catch (error) {
      console.error("Error generating items from IDs:", error);
      // If generation fails, return the list created in step 2
      res.status(201).json(shoppingList); 
    }
  } else {
    // No recipe IDs, just return the created list
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
  
  if (!mongoose.Types.ObjectId.isValid(shoppingListId)) {
    res.status(400);
    throw new Error('Invalid shopping list ID');
  }

  const shoppingList = await ShoppingList.findById(shoppingListId)
    .populate('recipes', 'title image ingredients')
    .populate('items.recipe', 'title');

  if (shoppingList) {
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
    if (shoppingList.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this shopping list');
    }

    shoppingList.name = name || shoppingList.name;
    
    // Update items if provided (Full replacement of items array)
    if (items) {
      shoppingList.items = items;
    }

    // Update linked recipes if provided
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

// @desc    Generate shopping list items from recipes (Add more recipes to existing list)
// @route   POST /api/shoppinglists/:id/generate
// @access  Private
const generateShoppingListFromRecipes = asyncHandler(async (req, res) => {
  const { recipeIds } = req.body;
  const shoppingListId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(shoppingListId)) {
    res.status(400);
    throw new Error('Invalid shopping list ID');
  }

  if (!recipeIds || !Array.isArray(recipeIds) || recipeIds.length === 0) {
    res.status(400);
    throw new Error('Recipe IDs are required');
  }

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

  if (shoppingList.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this shopping list');
  }

  // Add unique recipes to shopping list
  const currentRecipeIds = shoppingList.recipes.map(id => id.toString());
  const newRecipeIds = recipeIds.filter(id => !currentRecipeIds.includes(id));
  
  if (newRecipeIds.length > 0) {
    shoppingList.recipes = [...shoppingList.recipes, ...newRecipeIds];
    await shoppingList.save();
    
    // Generate items ONLY for the new recipes (to avoid duplicating existing items)
    await generateShoppingListItems(shoppingListId, newRecipeIds);
  }

  const updatedList = await ShoppingList.findById(shoppingListId)
    .populate('recipes', 'title image');
  
  res.json(updatedList);
});

// @desc    Update item status (checked/unchecked) or quantity
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

  if (shoppingList.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this shopping list');
  }

  const itemIndex = shoppingList.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in shopping list');
  }

  if (checked !== undefined) {
    shoppingList.items[itemIndex].checked = checked;
  }
  
  if (quantity !== undefined) {
    shoppingList.items[itemIndex].quantity = quantity;
  }

  await shoppingList.save();
  res.json(shoppingList);
});

// @desc    Add a new item to shopping list manually
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

  if (shoppingList.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this shopping list');
  }

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

  if (shoppingList.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this shopping list');
  }

  shoppingList.items = shoppingList.items.filter(
    (item) => item._id.toString() !== itemId
  );

  await shoppingList.save();
  res.json(shoppingList);
});

// --- HELPER FUNCTION ---
const generateShoppingListItems = async (shoppingListId, recipeIds) => {
  const shoppingList = await ShoppingList.findById(shoppingListId);
  if (!shoppingList) return;

  const recipes = await Recipe.find({ _id: { $in: recipeIds } });
  if (!recipes.length) return;

  const allIngredients = [];

  // 1. Parse ingredients from all recipes
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingStr => {
      if (!ingStr || typeof ingStr !== 'string') return;
      
      const cleanStr = ingStr.trim();
      let quantity = '';
      let ingredientName = cleanStr;

      // Robust Regex: Captures (Quantity) (Unit) (Name)
      // Example: "1/2 cup Sugar" -> "1/2", "cup", "Sugar"
      const match = cleanStr.match(/^([\d./-\s]+)?\s*([a-zA-Z]{1,10}\.?)?\s+(.+)$/);

      if (match) {
        const qtyVal = (match[1] || '').trim();
        const unitVal = (match[2] || '').trim();
        const nameVal = (match[3] || '').trim();

        if (nameVal) {
           quantity = qtyVal + (unitVal ? ` ${unitVal}` : '');
           ingredientName = nameVal;
        }
      }

      allIngredients.push({
        ingredient: ingredientName,
        quantity: quantity,
        recipe: recipe._id
      });
    });
  });

  // 2. Consolidate duplicates
  const consolidatedIngredients = {};
  
  allIngredients.forEach(item => {
    // Normalize name to lowercase for matching
    const key = item.ingredient.toLowerCase().trim();
    
    if (!consolidatedIngredients[key]) {
      consolidatedIngredients[key] = {
        ingredient: item.ingredient, // Keep original casing
        quantity: item.quantity,
        recipes: [item.recipe],
      };
    } else {
      // If duplicate, append quantity if distinct
      if (item.quantity && consolidatedIngredients[key].quantity !== item.quantity) {
         // Simple concatenation of quantities for now (e.g., "2 cups + 1 tbsp")
         if (consolidatedIngredients[key].quantity) {
            consolidatedIngredients[key].quantity += ` + ${item.quantity}`;
         } else {
            consolidatedIngredients[key].quantity = item.quantity;
         }
      }
      // Add recipe reference if not already there
      if (!consolidatedIngredients[key].recipes.includes(item.recipe)) {
        consolidatedIngredients[key].recipes.push(item.recipe);
      }
    }
  });

  // 3. Convert to array
  const newItems = Object.values(consolidatedIngredients).map(item => ({
    ingredient: item.ingredient,
    quantity: item.quantity || '',
    checked: false,
    recipe: item.recipes[0], // Link to first occurrence
  }));

  // 4. Merge with existing items in the shopping list (prevent duplicates there too)
  const existingItemNames = new Set(shoppingList.items.map(i => i.ingredient.toLowerCase().trim()));
  
  const itemsToAdd = newItems.filter(item => 
    !existingItemNames.has(item.ingredient.toLowerCase().trim())
  );

  shoppingList.items = [...shoppingList.items, ...itemsToAdd];
  await shoppingList.save();
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