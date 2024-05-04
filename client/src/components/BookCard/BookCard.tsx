import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { CartContext } from '../cartContext/CartContext';
import './BookCard.css';

interface BookCardProps {
  book: {
    _id: string;
    title: string;
    author: string;
    CoverImageURL: string;
    price: number;
  };
  handleDeleteFromCart: (bookId: string) => void;
  handleAddToCart: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, handleDeleteFromCart}) => {
  const {addToCart} = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      id: book._id,
      title: book.title,
      price: book.price,
      quantity: 1,
    });
    navigate('/cart');
  };

  if (!book) {
    return null; // Return null if book is undefined
  }

  const CoverImageURL = book.CoverImageURL ? `http://localhost:5000/images/${book.CoverImageURL.split('/')[2]}` : '';

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className="book-card">
        <CardMedia
          component="img"
          alt={book.title}
          src={CoverImageURL}
          title={book.title}
          className="book-card__image"
        />
        <CardContent className="book-card__content">
          <Typography gutterBottom variant="h5" component="div" className="book-card__title">
            {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className="book-card__author">
            {book.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className="book-card__price">
            ${book.price.toFixed(2)}
          </Typography>
        </CardContent>
        <div className="book-card__buttons">
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => handleDeleteFromCart(book._id)}
            className="book-card__delete-button"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
    </Grid>
  );
};

export default BookCard;