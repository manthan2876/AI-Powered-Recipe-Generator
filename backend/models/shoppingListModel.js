import mongoose from 'mongoose';

const shoppingListItemSchema = mongoose.Schema(
  {
    ingredient: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  },
  {
    timestamps: true,
  }
);

const shoppingListSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      default: 'My Shopping List',
    },
    items: [shoppingListItemSchema],
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create index for faster queries
shoppingListSchema.index({ user: 1 });

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

export default ShoppingList;