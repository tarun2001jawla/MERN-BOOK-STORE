import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import SignUp from './pages/Signup/Signup';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <h1>Hello React App</h1>
      <Routes>
        <Route path="/" element={<h1>You're on Home Page</h1>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;