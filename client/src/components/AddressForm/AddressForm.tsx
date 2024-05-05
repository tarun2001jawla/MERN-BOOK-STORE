import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import './AddressForm.css';


interface AddressData {
    name: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
    country: string;
    email: string;
  }
  
  interface AddressFormProps {
    onSubmit: (addressData: AddressData) => void; // Update the type to AddressData
    onCancel: () => void;
  }
  

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
    country: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setFormData({ ...formData, [e.target.name as string]: e.target.value as string });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form data after submission
    setFormData({
      name: '',
      phone: '',
      street: '',
      city: '',
      pincode: '',
      country: '',
      email: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
        <TextField
    label="Email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    fullWidth
    margin="normal"
  />
      <TextField
        label="Street"
        name="street"
        value={formData.street}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pincode"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <MenuItem value="">Select Country</MenuItem>
          <MenuItem value="IN">INDIA</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
          <MenuItem value="UK">UK</MenuItem>
          
        </Select>
      </FormControl>
      <div className="address-form__actions">
        <Button type="submit" variant="contained" color="primary">
          Complete Order
        </Button>
        <Button onClick={onCancel} variant="contained" color="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;