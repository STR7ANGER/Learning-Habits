import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generate a JWT token for user authentication
 * @param userId - The user ID to encode in the token
 * @returns JWT token string
 */
export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'default_secret_do_not_use_in_production';
  
  if (!process.env.JWT_SECRET) {
    console.warn('WARNING: Using default JWT secret. Set JWT_SECRET in .env file for production.');
  }
  
  return jwt.sign({ id: userId }, secret, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

/**
 * Verify and decode a JWT token
 * @param token - The token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = (token: string): { id: string } | null => {
  try {
    const secret = process.env.JWT_SECRET || 'default_secret_do_not_use_in_production';
    return jwt.verify(token, secret) as { id: string };
  } catch (error) {
    return null;
  }
};