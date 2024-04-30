import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);
      console.log('Login successful:', response.data);
      // Handle successful login, such as redirecting to another page
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      // Handle login error, such as displaying an error message to the user
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Box className="form-box">
        <Typography variant="h4" className="form-title">
          Login
        </Typography>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="form-button"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography variant="body1" className="link1">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
