import React, { useContext } from 'react';
import { CartContext } from '..//../components/cartContext/CartContext';
import { Card, CardContent, Button } from '@material-ui/core';


const Cart : React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, completeOrder } = useContext(CartContext);

  return (
    <div className="cart">
      <h2 className="cart__heading">Cart</h2>
      <div className="cart__container">
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
        {cartItems.length > 0 && (
          <Button variant="contained" color="primary" onClick={completeOrder}>
            Complete Your Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;
