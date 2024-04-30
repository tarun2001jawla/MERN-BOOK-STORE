import { Request, Response, NextFunction } from 'express';
import { getUser } from '../services/auth';
import { CustomRequest } from '../types';

function checkForAuthentication(req: CustomRequest, res: Response, next: NextFunction) {
  console.log('Request Cookies:', req.cookies); // Log the entire cookies object
  try {
    req.user = null;
    const tokenCookie = req.cookies?.token;
    console.log('Token Cookie:', tokenCookie); // Log the extracted token cookie
    if (!tokenCookie) {
      console.log('Token cookie not found');
      return next();
    }
    const user = getUser(tokenCookie);
    console.log('User extracted from token:', user);
    if (!user) {
      console.log('Invalid token');
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = user;
    console.log('User authenticated:', user);
    next();
  } catch (error) {
    console.error('Error in checkForAuthentication middleware:', error);
    res.status(500).send('Internal Server Error while checking for authentication');
  }
}

export { checkForAuthentication };
