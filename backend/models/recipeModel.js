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
    // 🟢 ADDED: Description field
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      // ⚠️ Note: Your schema expects an array, but your Gemini
      // prompt asks for a single string. Mongoose is likely
      // saving your string as the only item in this array.
      // This works, but it's not ideal.
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
    // 🟢 ADDED: Tags field
    tags: {
      type: [String],
    },
    // 🟢 ADDED: Notes field
    notes: {
      type: String,
    },
    // 🟢 ADDED: isPublic field
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

// Helpful indexes for efficient search
recipeSchema.index({ ingredients: 1 });
recipeSchema.index({ title: 'text' });

export default Recipe;