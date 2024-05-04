import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import BookCard from '../../components/BookCard/BookCard';
import { CartContext } from '../../components/cartContext/CartContext'; // Import the CartContext
import './AllBooks.css';

interface Book {
  _id: string;
  title: string;
  author: string;
  CoverImageURL: string;
  price: number;
  quantity : number;
}

const AllBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>('');
  const { addToCart } = useContext(CartContext); // Access the addToCart function from the CartContext

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
    <div className="all-books-container">
      <h1 className="all-books-title">All Books</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="book-list">
        <Grid container spacing={3}>
          {books
            // Filter books with quantity greater than 0
            .filter((book) => book.quantity > 0)
            .map((book) => (
              <BookCard
                key={book._id}
                book={book}
                handleDeleteFromCart={() => {
                  console.log('delete from cart', book.title);
                }}
                handleAddToCart={() => {
                  addToCart({
                    id: book._id,
                    title: book.title,
                    price: book.price,
                    quantity: 1,
                  });
                }}
              />
            ))}
        </Grid>
      </div>
    </div>
  );
  
};

export default AllBooks;