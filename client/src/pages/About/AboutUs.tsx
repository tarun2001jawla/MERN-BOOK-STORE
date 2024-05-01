import React from 'react';
import './AboutUs.css'
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
const AboutUs: React.FC = () => {
  return (
    <div className='body'>
    <div className="container">
      <div className="banner" />
      <div className="content">
        <p className="title">About Our Bookstore</p>
        <p className="description">
          Welcome to our bookstore! We are passionate about connecting readers with the perfect books
          that inspire, educate, and entertain. Our mission is to provide a wide selection of books
          across various genres, from classic literature to contemporary fiction, from insightful
          non-fiction to captivating children's books.
        </p>
        <p className="mission">
          At our bookstore, we strive to create a warm and inviting atmosphere where book lovers can
          explore new titles, participate in engaging events, and connect with fellow readers. Whether
          you're seeking a thrilling adventure, a thought-provoking read, or a heartfelt story, we
          have something for everyone.
        </p>
        <p className="contact">
          Visit us today and embark on your next reading journey. Our knowledgeable staff is here to
          assist you in finding the perfect book for every occasion. We look forward to welcoming you
          to our bookstore soon!
        </p>
        <Button component={Link} to="/contact" color="primary" >
             Have a Query?
            </Button>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
