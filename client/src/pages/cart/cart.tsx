// Import necessary components and hooks
import React, { useContext, useState } from 'react';
import { CartContext } from '..//../components/cartContext/CartContext';
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import AddressForm from '../../components/AddressForm/AddressForm';
import './cart.css';

interface AddressData {
  name: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
  country: string;
  email: string;
}
const Cart: React.FC = () => {
  // Context and state initialization
  const { cartItems, removeFromCart, updateQuantity, completeOrder } = useContext(CartContext);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Handle order completion with address data
  const handleCompleteOrder = (addressData: AddressData) => {
    completeOrder(addressData);
    setShowAddressForm(false); // Close the address form dialog
  };

  // Close the address form dialog
  const handleCloseAddressForm = () => {
    setShowAddressForm(false);
  };

  return (
    <div className="cart">
      <h2 className="cart__heading">Cart</h2>
      <div className="cart__container">
        {/* Iterate through cart items and display them */}
        {cartItems.map((item) => (
          <Card key={item.id} className="cart__card">
            <CardContent className="cart__card-content">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
              {/* Remove button */}
              <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
        {/* Add Address button */}
        {cartItems.length > 0 && (
          <Button variant="contained" color="primary" onClick={() => setShowAddressForm(true)}>
            Add Address
          </Button>
        )}
      </div>
      {/* Address form dialog */}
      <Dialog open={showAddressForm} onClose={handleCloseAddressForm} maxWidth="sm" fullWidth>
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent>
          <AddressForm onSubmit={handleCompleteOrder} onCancel={handleCloseAddressForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
