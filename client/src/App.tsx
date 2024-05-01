// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookstoreNavbar from './components/Navbar/navbar';
import HomePage from './pages/Home/Home';
import ContactForm from './pages/contactus/contactus';
import BookCard from './components/BookCard/BookCard';
import SignUp from './pages/Signup/Signup';
import Login from './pages/Login/Login';

function App() {
  

  return (
    <Router>
      <div>
        <BookstoreNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='*' element = {<HomePage/>}/>
          <Route path="/books" element={<BookCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
