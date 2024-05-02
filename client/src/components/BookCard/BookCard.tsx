import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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

const BookCard: React.FC<BookCardProps> = ({ book, handleDeleteFromCart,handleAddToCart }) => {
    
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia component="img" alt={book.title} height="200" src={`/images/${book.CoverImageURL}`} title={book.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {book.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${book.price.toFixed(2)}
          </Typography>
        </CardContent>
        <Button variant="contained" color="primary"  onClick={() => handleAddToCart(book._id)} >
          Add to Cart
        </Button>
        <IconButton aria-label="delete" color="secondary" onClick={() => handleDeleteFromCart(book._id)}>
          <DeleteIcon />
        </IconButton>
      </Card>
    </Grid>
  );
};

export default BookCard;