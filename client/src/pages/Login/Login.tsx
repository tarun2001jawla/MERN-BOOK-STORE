import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import { Box, Button, TextField, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import './Login.css';

import { Link} from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData, { withCredentials: true });
      console.log('Login successful:', JSON.stringify(response.data));
      // Set the JWT token in a cookie
      document.cookie = `token=${response.data.token}; path=/`;
      setFormData({ email: '', password: '' }); // Reset form data after successful submission
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div>
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
          {error && (
            <Typography variant="body1" className="error-message">
              {error}
            </Typography>
          )}
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
    </div>
  );
};

export default Login;
