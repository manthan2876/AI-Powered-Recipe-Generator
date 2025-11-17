import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 
        `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/users/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Validate that we have required profile data
        if (!profile.id) {
          return done(new Error('Google profile missing ID'), null);
        }

        if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
          return done(new Error('Google profile missing email'), null);
        }

        const email = profile.emails[0].value;
        const name = profile.displayName || 
          (profile.name ? `${profile.name.givenName || ''} ${profile.name.familyName || ''}`.trim() : 'User');

        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User exists, return user
          return done(null, user);
        }

        // Check if user exists with this email (but different auth method)
        user = await User.findOne({ email });

        if (user) {
          // User exists with email but no Google ID, link the accounts
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        // User doesn't exist, create new user
        user = await User.create({
          name,
          email,
          googleId: profile.id,
          password: undefined, // No password for OAuth users
        });

        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

