import { Request, Response, NextFunction } from 'express';
import { getUser } from '../services/auth';
import { CustomRequest } from '../types';

function checkForAuthentication(req: CustomRequest, res: Response, next: NextFunction) {
  console.log('Request Cookies:', req.cookies); 
  console.log('Request Headers:', req.headers);
  const cookie = req.headers['cookie'];
  console.log('Cookie:', cookie);
  try {
    req.user = null;
    const tokenCookie = req.cookies.token;
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
    console.log('User:', req.user); // Log the user object
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
        console.log('User:', user); // Log the user object

    // Check if the user exists and has an admin role
    if (user && user.role.trim() === 'admin') {
      // User has admin role, proceed to the next middleware
      next();
    } else {
      // User does not have admin role, return 403 Forbidden
      return res.status(401).json({message: 'Unauthorized - You are not an admin' });
    }
  } catch (err) {
    // Handle any errors
    console.error('Error in checkAdminRole middleware:', err);
    res.status(500).send('Internal Server Error while checking admin role');
  }
};




export { checkForAuthentication ,checkAdminRole};
