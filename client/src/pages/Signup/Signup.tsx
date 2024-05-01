import React, { ChangeEvent, useState } from 'react';
import { Box, Button, TextField, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import './Signup.css';
import { Link } from "react-router-dom";

const SignUp :React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    mob_number: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', formData);
      console.log('Response:', response);
      alert('Signup successful');
     
      setFormData({
        name: '',
        password: '',
        email: '',
        mob_number: '',
      });
    } catch (err) {
      alert(`Error occurred while signing up:${err}`);
    }
  };

  return (
    <div>
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
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
    </div>
  );
};

export default SignUp;
