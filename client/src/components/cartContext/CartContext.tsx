// Import necessary modules and dependencies
import React, { createContext, useState } from 'react';
import { createOrder, updateBookQuantity } from '../../utils/orderService';
import { toast } from 'react-toastify';
import { sendOrderConfirmationEmail } from '../../utils/emailService';

// Define interfaces for cart item and context value
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  // Add any other necessary properties for the cart item
}

interface AddressData {
  name: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
  country: string;
  email: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  completeOrder: (addressData: AddressData) => void; // Add addressData parameter
}

// Create initial context value
export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  completeOrder: () => {},
});

// Define CartProvider component
export const CartProvider: React.FC = ({ children }) => {
  // State for storing cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Function to remove item from cart
  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Function to update item quantity in cart
  const updateQuantity = async (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    // Update book quantity in the database
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (cartItem) {
      await updateBookQuantity(cartItem.id, newQuantity);
    }
  };

  // Function to complete order
  const completeOrder = async (addressData: AddressData) => {
    // Send cart data and address to backend
    console.log('Address Data:', addressData);
    const orderItems = cartItems.map((item) => ({
      bookId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));
  
    // Calculate total price of the order
    const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
    // Construct the order data with the address object directly
    const orderData = {
      items: orderItems,
      totalPrice,
      address: addressData,
    };
  
    // Log the entire order data
    console.log('Order Data:', orderData);
  
    const result = await createOrder(orderItems, addressData);
    const updatedBooks = result?.updatedBooks || [];
    const updatedCartItems = cartItems.map((item) => {
      const updatedBook = updatedBooks.find((book: { _id: string }) => book._id === item.id);
      return { ...item, quantity: updatedBook ? updatedBook.quantity : item.quantity };
    });
    setCartItems(updatedCartItems);
  
    // Display success message
    toast.success('Congratulations! Your order has been completed.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  
    // Send order confirmation email
    const orderDetails = {
      items: orderItems,
      address: addressData,
      totalPrice,
      
    };
    await sendOrderConfirmationEmail(orderDetails,addressData.email);
    //console.log(sendOrderConfirmationEmail(orderDetails, addressData.email));
  };
  

  // Provide context value to children components
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, completeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};
