import React from 'react';
import { Link } from 'react-router-dom';
import './BookGenres.css';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  genre: string;
}

const books: Book[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      coverImageUrl: 'https://via.placeholder.com/150',
      genre: 'Fiction',
    },
    {
      id: '2',
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      coverImageUrl: 'https://via.placeholder.com/150',
      genre: 'Mystery',
    },
    {
      id: '3',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      coverImageUrl: 'https://via.placeholder.com/150',
      genre: 'Classics',
    },
    {
      id: '4',
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling',
      coverImageUrl: 'https://via.placeholder.com/150',
      genre: 'Fantasy',
    },
    {
      id: '5',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      coverImageUrl: 'https://via.placeholder.com/150',
      genre: 'Young Adult',
    },
    {
      id: '6',
      title: '1984',
      author: 'George Orwell',
      coverImageUrl: 'https://via.placeholder.com/150',
      genre: 'Science Fiction',
    },
    // Add more books with different genres as needed
  ];

const BookGenres: React.FC = () => {
  const genres = Array.from(new Set(books.map((book) => book.genre)));

  return (
    <div className="book-genres">
      <h2 className="book-genres__heading">Explore Our Book Selection</h2>
      {genres.map((genre) => (
        <div key={genre} className="book-genres__section">
          <h3 className="book-genres__genre-title">{genre} Books</h3>
          <div className="book-genres__books">
            {books
              .filter((book) => book.genre === genre)
              .map((book) => (
                <div key={book.id} className="book-genres__book">
                  <Link to={`/books/${book.id}`}>
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="book-genres__book-cover"
                    />
                    <div className="book-genres__book-details">
                      <h4 className="book-genres__book-title">{book.title}</h4>
                      <p className="book-genres__book-author">{book.author}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <Link to={`/books?genre=${genre}`} className="book-genres__view-all">
            View All {genre} Books
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookGenres;