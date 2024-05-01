import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@material-ui/core';
import HeroSection from '../../components/Herosection';
// Define the Book interface
interface Book {
  _id: string;
  title: string;
  author: string;
  CoverImageURL: string;
  price: number;
}

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get<Book[]>('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching books');
    }
  };

  return (
    <div>
        <HeroSection imageUrl={'/public/7945313.jpg'}/>
    
      <h1>All Books</h1>
      {error && <p>{error}</p>}
      <div className="book-list">
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
              <Card>
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
                <Button variant="contained" color="primary">
                  Add to Cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;