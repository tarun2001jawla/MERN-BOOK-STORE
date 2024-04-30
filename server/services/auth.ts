import jwt from 'jsonwebtoken';
import ms from 'ms';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const key = process.env.JWT_SECRET_KEY;

interface User {
  _id: string;
  email: string;
}

function setUser(user: User): string {
  try {
    const token = jwt.sign(
      { _id: user._id, email: user.email},
      key!,
      { expiresIn: ms('1h') }
    );
    console.log('Token generated:', token);
    return token;
  } catch (error) {
    console.error('Error signing token:', error);
    throw new Error('Failed to sign token');
  }
}

function getUser(token: string): User | null {
  if (!token) return null;
  try {
    const decodedToken = jwt.verify(token, key!);
    return decodedToken as User;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}

export { setUser, getUser };