import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Recipe from './models/recipeModel.js';

dotenv.config();

const sampleRecipes = [
  {
    title: 'Vegetable Stir Fry',
    ingredients: ['broccoli', 'carrots', 'bell peppers', 'soy sauce', 'garlic'],
    instructions: ['Chop veggies', 'Stir fry with sauce'],
    cuisine: 'Asian',
    mealType: 'Dinner',
    dietaryRestrictions: ['Vegetarian'],
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    isGenerated: false,
    rating: 4.5,
  },
  {
    title: 'Pasta Carbonara',
    ingredients: ['pasta', 'eggs', 'bacon', 'parmesan cheese', 'black pepper'],
    instructions: ['Boil pasta', 'Cook bacon', 'Mix with eggs and cheese'],
    cuisine: 'Italian',
    mealType: 'Dinner',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'Medium',
    isGenerated: false,
    rating: 4.6,
  },
  {
    title: 'Quinoa Avocado Salad',
    ingredients: ['quinoa', 'avocado', 'cherry tomatoes', 'cucumber', 'lemon', 'olive oil'],
    instructions: ['Cook quinoa', 'Chop veggies', 'Mix and dress'],
    cuisine: 'American',
    mealType: 'Lunch',
    dietaryRestrictions: ['Vegan'],
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    isGenerated: false,
    rating: 4.2,
  },
];

async function run() {
  try {
    await connectDB();
    await Recipe.deleteMany({});
    const userId = new mongoose.Types.ObjectId();
    const docs = sampleRecipes.map((r) => ({ ...r, user: userId }));
    await Recipe.insertMany(docs);
    console.log('Seeded recipes');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();


