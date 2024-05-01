import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import HeroSection from '../../components/Herosection';
import BookCard from '../../components/BookCard/BookCard'; // Import the BookCard component

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
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching books');
    }
  };

  return (
    <div>
      <HeroSection imageUrl={'/public/7945313.jpg'} />
      <h1>All Books</h1>
      {error && <p>{error}</p>}
      <div className="book-list">
        <Grid container spacing={3}>
          {books.map((book) => (
            <BookCard key={book._id} book={book} handleDeleteFromCart={() => {
                console.log('delete from cart',book.title);
            }} handleAddToCart={()=>{
                console.log('Adding book to cart:',book._id)
            }}/>
            
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
