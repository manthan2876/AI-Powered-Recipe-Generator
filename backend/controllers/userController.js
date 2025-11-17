import asyncHandler from 'express-async-handler';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Check if user is OAuth-only (no password)
  if (!user.password) {
    res.status(401);
    throw new Error('This account uses Google sign-in. Please use Google to sign in.');
  }

  if (await user.matchPassword(password)) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dietaryPreferences: user.dietaryPreferences || [],
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Handle password change
    if (req.body.currentPassword && req.body.newPassword) {
      // If user has a password, verify current password
      if (user.password) {
        const isPasswordValid = await user.matchPassword(req.body.currentPassword);
        if (!isPasswordValid) {
          res.status(401);
          throw new Error('Current password is incorrect');
        }
      } else {
        // OAuth user setting password for the first time - no need to verify current password
        // Just verify they provided a current password (can be any value or empty for OAuth users)
      }
      // Set new password
      user.password = req.body.newPassword;
    } else if (req.body.newPassword && !req.body.currentPassword) {
      // Allow OAuth users to set password without current password
      if (!user.password) {
        user.password = req.body.newPassword;
      } else {
        res.status(400);
        throw new Error('Current password is required to change password');
      }
    }

    // Handle dietary preferences update
    if (req.body.dietaryPreferences !== undefined) {
      user.dietaryPreferences = req.body.dietaryPreferences || [];
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      dietaryPreferences: updatedUser.dietaryPreferences || [],
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc    Google OAuth authentication
// @route   GET /api/users/auth/google
// @access  Public
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// @desc    Google OAuth callback
// @route   GET /api/users/auth/google/callback
// @access  Public
const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=${encodeURIComponent(err.message || 'Authentication failed')}`);
    }

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=${encodeURIComponent('Authentication failed')}`);
    }

    try {
      generateToken(res, user._id);
      
      // Redirect to frontend with success
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/auth/google/success?token=success`);
    } catch (error) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=${encodeURIComponent('Failed to generate token')}`);
    }
  })(req, res, next);
};

// @desc    Get user data after Google OAuth success
// @route   GET /api/users/auth/google/success
// @access  Private (via cookie)
const googleAuthSuccess = asyncHandler(async (req, res) => {
  // This endpoint is called after successful OAuth to get user data
  // The token is already set in cookie from the callback
  const token = req.cookies.jwt;
  
  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }

  // User should be set by authMiddleware if token is valid
  // But we'll get it from the token directly
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'abc123');
  const user = await User.findById(decoded.userId).select('-password');

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleAuth,
  googleCallback,
  googleAuthSuccess,
};
