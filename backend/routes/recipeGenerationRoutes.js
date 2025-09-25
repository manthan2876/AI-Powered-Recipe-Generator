import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateRecipe, parseIngredientsFromText } from '../controllers/recipeGenerationController.js';

const router = express.Router();

// Protected routes
router.post('/generate', protect, generateRecipe);
router.post('/parse-ingredients', protect, parseIngredientsFromText);

export default router;