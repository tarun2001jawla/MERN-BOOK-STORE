import React from 'react';
import { Button, IconButton, Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

interface UserNavigationProps {
  isLoggedIn: boolean;
  userName?: string;
  cartItemCount?: number;
  onLogout: () => void;
}

const UserNavigation: React.FC<UserNavigationProps> = ({
  isLoggedIn,
  userName,
  cartItemCount,
  onLogout,
}) => {
  if (isLoggedIn) {
    return (
      <>
        <IconButton aria-label="show cart items" color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItemCount} color="secondary" overlap="rectangular">
            <ShoppingCartIcon   />
          </Badge>
        </IconButton>
        <Button component={Link} to="/orders"  color='secondary'>{userName}</Button>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Button component={Link} to="/login" color="inherit">
        Login
      </Button>
      <Button component={Link} to="/signup" color="inherit">
        Sign Up
      </Button>
    </>
  );
};

export default UserNavigation;