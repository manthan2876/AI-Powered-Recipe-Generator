import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET || 'abc123';
const modeEnv = process.env.NODE_ENV || 'development';
const generateToken = (res, userId) => {
  console.log(jwtSecret);
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: modeEnv !== 'development',
    secure: modeEnv !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
