import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ContactForm from './pages/contactus/contactus';
import HomePage from './pages/Home/Home';
import BookstoreNavbar from './components/Navbar/navbar';
import AboutUs from './pages/About/AboutUs';
import BookAdditionForm from './pages/AddBook/BookAdditionForm';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllBooks from './pages/Books/AllBooks';
import { CartProvider } from './components/cartContext/CartContext';
import Cart from './pages/cart/cart';
import OrderHistory from './pages/OrderHistory/OrderHistory';
function App() {
  return (
    <Router>
      <CartProvider>
        <div>
          <BookstoreNavbar />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/contact" element={<ContactForm />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/addbook" element={<BookAdditionForm />}></Route>
            <Route path="/books" element={<AllBooks />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/orders" element={<OrderHistory />}></Route>
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;