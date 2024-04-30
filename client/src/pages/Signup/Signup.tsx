import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';
import './Signup.css';
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    mob_number: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', formData);
      console.log('Response:', response);
      console.log('Signup successful');
    } catch (err) {
      console.error('Error occurred while signing up:', err);
    }
  };

  return (
    <Container maxWidth="xs" className="signup-container">
      <Box className="form-box">
        <Typography variant="h4" className="form-title">
          Sign Up
        </Typography>
        <TextField
          label="Full Name"
          variant="outlined"
          required
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
          type = 'tel'
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          required
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Mobile Number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="mob_number"
          value={formData.mob_number}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="form-button"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Typography variant="body1" className="link1">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
