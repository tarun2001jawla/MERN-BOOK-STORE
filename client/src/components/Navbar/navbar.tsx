import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UserNavigation from './UserNavigation';
import { getCookie } from '../../utils/cookieUtil';
//import { decodeToken } from '../../utils/jwtUtil';

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
    if (token) {
      //const decoded = decodeToken(token);
      setIsLoggedIn(true);
      setUserName("Tarun Jawla");
      // Set the cart item count if available in the token payload or from the server
      setCartItemCount(2); // Replace this with the actual cart item count
    }
  }, [])

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
            <Button component={Link} to="/books" color="inherit">Books</Button>
            <Button component={Link} to="/about" color="inherit">
              About Us
            </Button>
            <Button component={Link} to="/addBook" color="inherit">
              Add a Book
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