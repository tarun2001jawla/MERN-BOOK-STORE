import express from 'express';
const router = express.Router();
import authController from '../controllers/authController';

// Auth routes
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/signup', authController.handleUserSignUp);

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', authController.handleUserLogin);

export default router;