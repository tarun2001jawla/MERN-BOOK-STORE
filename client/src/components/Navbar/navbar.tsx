import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UserNavigation from '../../components/UserNavigation';
import { getCookie } from '../../utils/cookieUtil';
import { decodeToken } from '../../utils/jwtUtil';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '20ch',
    },
  })
);

const BookstoreNavbar: React.FC = () => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);


  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = getCookie('token');
    console.log(token)
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        // If a valid token is present, set the user as logged in
        setIsLoggedIn(true);
        setUserName(decodedToken.name); // Set the user's name from the token payload
        setCartItemCount(2); // Replace with the user's cart item count from the token
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    setUserName('');
    setCartItemCount(0);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Bookstore
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button color="inherit">Books</Button>
            <Button component={Link} to="/about" color="inherit">
              About Us
            </Button>
            <Button component={Link} to="/contact" color="inherit">
              Contact Us
            </Button>
          </div>
          <div>
            <UserNavigation
              isLoggedIn={isLoggedIn}
              userName={userName}
              cartItemCount={cartItemCount}
              onLogout={handleLogout}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BookstoreNavbar;