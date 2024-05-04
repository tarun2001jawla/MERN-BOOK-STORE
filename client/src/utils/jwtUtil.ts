// utils/jwtUtil.ts

import * as jwt from 'jsonwebtoken';

interface UserPayload {
    name: string;
}

const JWT_SECRET_KEY = "hXUuEHHUQanTgZitpPN0ZMluJnH9I2hZ";

export const decodeToken = (token: string): UserPayload | null => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as UserPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        console.error('Invalid token:', error.message);
      } else {
        console.error('Error decoding token:', error);
      }
      return null;
    }
  };