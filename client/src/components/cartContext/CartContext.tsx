// CartContext.tsx
import React, { createContext, useState } from 'react';
import { createOrder, updateBookQuantity } from '../../utils/orderService';
import { toast } from 'react-toastify';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  completeOrder: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  completeOrder: async () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update the book quantity in the database
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (cartItem) {
      await updateBookQuantity(cartItem.id, newQuantity);
    }
  };

  const completeOrder = async () => {
    // Send the cart data to the backend for order processing
    const orderItems = cartItems.map((item) => ({
      bookId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    const { updatedBooks } = await createOrder(orderItems);

    // Update the book quantities in the cart based on the updated data from the server
    const updatedCartItems = cartItems.map((item) => {
      const updatedBook = updatedBooks.find((book: { _id: string; }) => book._id === item.id);
      return {
        ...item,
        quantity: updatedBook ? updatedBook.quantity : item.quantity,
      };
    });

    setCartItems(updatedCartItems);  // Display a toast message
    toast.success('Congratulations! Your order has been completed.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  

  };
  

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, completeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};