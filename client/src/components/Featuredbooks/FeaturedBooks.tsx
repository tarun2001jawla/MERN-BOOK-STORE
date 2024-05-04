import React from 'react';
import './FeaturedBooks.css'
const featuredBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: '../../../public/The_Great_Gatsby_Cover_1925_Retouched.jpg',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: '../../../public/A5-Hadcover-Book-Mockup2smallb.png',
  },
  // Add more featured books as needed
];

const FeaturedBooks = () => {
  return (
    <div className="featured-books">
      <h2 className="featured-books__title">Featured Books</h2>
      <div className="featured-books__list">
        {featuredBooks.map((book) => (
          <div key={book.id} className="featured-books__item">
            <img src={book.coverUrl} alt={book.title} className="featured-books__image" />
            <h3 className="featured-books__book-title">{book.title}</h3>
            <p className="featured-books__book-author">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;