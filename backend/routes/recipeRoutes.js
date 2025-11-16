import express from 'express';
const router = express.Router();
import {
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
} from '../controllers/recipeController.js';
import { protect, optionalProtect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getRecipes).post(protect, createRecipe);
router.route('/top').get(getTopRecipes);
router.route('/generate').post(protect, generateRecipe);
router.route('/search').get(optionalProtect, searchRecipesByIngredients);
router.route('/ingredients').get(getAllIngredients);
router.route('/favorites').get(protect, getFavoriteRecipes);
router
  .route('/:id')
  .get(optionalProtect, getRecipeById)
  .delete(protect, admin, deleteRecipe)
  .put(protect, updateRecipe);
router.route('/:id/reviews').post(protect, createRecipeReview);
router.route('/:id/favorite').put(protect, toggleFavoriteRecipe);

export default router;