import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createShoppingList,
  getShoppingLists,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
  generateShoppingListFromRecipes,
  updateShoppingListItem,
  addShoppingListItem,
  deleteShoppingListItem,
} from '../controllers/shoppingListController.js';

const router = express.Router();

router.route('/')
  .post(protect, createShoppingList)
  .get(protect, getShoppingLists);

router.route('/:id')
  .get(protect, getShoppingListById)
  .put(protect, updateShoppingList)
  .delete(protect, deleteShoppingList);

router.route('/:id/generate')
  .post(protect, generateShoppingListFromRecipes);

router.route('/:id/items')
  .post(protect, addShoppingListItem);

router.route('/:id/items/:itemId')
  .put(protect, updateShoppingListItem)
  .delete(protect, deleteShoppingListItem);

export default router;