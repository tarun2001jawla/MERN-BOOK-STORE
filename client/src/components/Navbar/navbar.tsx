import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'; 

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Badge,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';

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
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button color="inherit">Books</Button>
            <Button color="inherit">About Us</Button>
            <Button  component={Link} to="/contact" color="inherit">Contact Us</Button>
          </div>
          <div>
            <IconButton aria-label="show cart items" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Button  component={Link} to="/login" color="inherit">Login</Button>
            <Button  component={Link} to="/signup" color="inherit">Sign Up</Button>
            <Button color="inherit">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BookstoreNavbar;