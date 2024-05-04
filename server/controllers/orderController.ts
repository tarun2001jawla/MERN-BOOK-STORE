// controllers/orderController.ts

import { Request, Response } from 'express';
import Order from '../models/Order';

// Controller function to fetch all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    // Query the database to fetch all orders
    const orders = await Order.find();

    // Return the fetched orders as JSON response
    res.status(200).json(orders);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default{
    getAllOrders
} ;