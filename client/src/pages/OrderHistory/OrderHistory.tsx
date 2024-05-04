import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import './OrderHistory.css';

interface Order {
  _id: string;
  totalPrice: number;
  items: {
    _id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>('http://localhost:5000/api/showorders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <Card key={order._id} className="order-card">
          <CardContent>
            <Typography variant="h6" className="order-title">
              Order ID: {order._id}
            </Typography>
            <Typography variant="body1" className="order-price">
              Total Price: ${order.totalPrice}
            </Typography>
            {order.items.map((item) => (
              <Box key={item._id} className="order-item">
                <Typography variant="body1">{item.title}</Typography>
                <Typography variant="body2">
                  Price: ${item.price} x {item.quantity}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;
