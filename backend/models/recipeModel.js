import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const recipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    cuisine: {
      type: String,
    },
    mealType: {
      type: String,
    },
    dietaryRestrictions: {
      type: [String],
    },
    prepTime: {
      type: Number,
    },
    cookTime: {
      type: Number,
    },
    servings: {
      type: Number,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
    },
    isGenerated: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;