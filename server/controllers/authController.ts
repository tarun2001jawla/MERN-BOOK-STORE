import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { setUser } from '../services/auth';

// Signup controller
const handleUserSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, mob_number, role } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, mob_number, role });
    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ message: 'Something went wrong while signing up' });
  }
};

// Login controller
const handleUserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Check if a user exists with the given email
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User does not exist');
      return res.status(400).json({ message: 'User with this email does not exist' });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Invalid Credentials');
      return res.status(400).json({ message: 'Invalid email or password' });
    }
   
    // Generating JWT Token
    const token = setUser(user);
    console.log('Token generated:', token);
    
    // Set the token in the cookie
    res.cookie("token", token);
    console.log("Token is set in cookie");

    res.redirect('/');
    
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Something went wrong while logging in' });
  }
};

export default {
  handleUserSignUp,
  handleUserLogin
};
