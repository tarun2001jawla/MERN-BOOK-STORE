import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ContactForm from './pages/contactus/contactus';
import HomePage from './pages/Home/Home';
import BookstoreNavbar from './components/Navbar/navbar';
import AboutUs from './pages/About/AboutUs';

function App() {
  return (
    <Router>
      <div>
        <BookstoreNavbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/contact" element={<ContactForm />}></Route>
          <Route path="/about" element={<AboutUs/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;