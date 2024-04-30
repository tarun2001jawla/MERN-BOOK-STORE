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

const checkAdminRole = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    // Retrieve the user from the request object
    const user = req.user;

    // Check if the user exists and has an admin role
    if (user && user.role === 'admin') {
      // User has admin role, proceed to the next middleware
      next();
    } else {
      // User does not have admin role, return 403 Forbidden
      return res.status(403).json({ message: 'Forbidden - Admin role required' });
    }
  } catch (err) {
    // Handle any errors
    console.error('Error in checkAdminRole middleware:', err);
    res.status(500).send('Internal Server Error while checking admin role');
  }
};




export { checkForAuthentication ,checkAdminRole};
