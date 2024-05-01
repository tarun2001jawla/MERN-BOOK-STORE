import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';

interface Book {
  _id: string;
  title: string;
  author: string;
  CoverImageURL: string;
  price: number;
}

interface BookCardProps {
  books: Book[];
  handleAddToCart: (book: Book) => void;
  handleDeleteFromCart: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ books, handleAddToCart, handleDeleteFromCart }) => {
  return (
    <>
      {books.map((book) => (
        <Card key={book._id}>
          <CardMedia
            component="img"
            alt={book.title}
            height="200"
            image={book.CoverImageURL}
            title={book.title}
          />
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
          <Button variant="contained" color="primary" onClick={() => handleAddToCart(book)}>
            Add to Cart
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDeleteFromCart(book._id)}>
            Delete
          </Button>
        </Card>
      ))}
    </>
  );
};

export default BookCard;