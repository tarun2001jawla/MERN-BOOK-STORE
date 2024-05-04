// routes/orderRoutes.ts

import express from 'express';
import  orderController  from '../controllers/orderController';

// Create a router
const router = express.Router();

// Define a route to fetch all orders
router.get('/', orderController.getAllOrders);

// Export the router
export default router;
