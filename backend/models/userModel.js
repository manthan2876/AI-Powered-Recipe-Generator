import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId; // Password required only if not using Google OAuth
      },
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    savedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
    dietaryPreferences: {
      type: [String],
      default: [],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) {
    return false; // OAuth users don't have passwords
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  // Skip password hashing if password is not modified or user is using Google OAuth
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
