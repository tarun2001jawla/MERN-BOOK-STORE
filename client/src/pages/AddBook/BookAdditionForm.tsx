import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Input,
} from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  withCredentials: true, // Include cookies in the request
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  formHeading: {
    marginTop: '20px',
  },
  formItem: {
    marginBottom: '20px',
  },
  input: {
    display: 'none',
  },
}));

const BookAdditionForm = () => {
  const classes = useStyles();
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    quantity: '',
    isbn: '',
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with data:', book);
    // Validate form fields
    if (!book.title || !book.author || !book.price || !book.isbn || !book.description || !book.quantity) {
      alert('Please fill in all required fields.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('price', book.price);
    formData.append('isbn', book.isbn);
    formData.append('quantity', book.quantity);
    formData.append('description', book.description);
    if (coverImage) formData.append('coverImage', coverImage);

    try {
      // Send data to the API using axios
      const response = await axiosInstance.post('http://localhost:5000/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book added successfully:', response.data);
      // Show toast message for successful book addition
      toast.success('Book added successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Reset form fields
      setBook({
        title: '',
        author: '',
        price: '',
        isbn: '',
        quantity: '',
        description: '',
      });
      setCoverImage(null);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 20) {
        toast.error('Maximum file size allowed is 20MB.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      setCoverImage(file);
      console.log(file)
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom className={classes.formHeading}>
        Add a New Book
      </Typography>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              label="Book Name"
              name="title"
              value={book.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              label="Author"
              name="author"
              value={book.author}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              label="Price"
              name="price"
              value={book.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              label="ISBN"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              label="Description"
              name="description"
              value={book.description}
              onChange={handleChange}
              multiline
              minRows={4}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              label="Quantity"
              name="quantity"
              value={book.quantity}
              onChange={handleChange}
              multiline
              minRows={4}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <Input
              accept="image/png, image/jpeg, image/jpg"
              id="cover-image-upload"
              type="file"
              onChange={handleImageUpload}
              className={classes.input}
            />
            <label htmlFor="cover-image-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
              >
                Upload Cover Image
              </Button>
              {coverImage && (
                <Typography variant="caption" display="block" gutterBottom>
                  {coverImage.name}
                </Typography>
              )}
              <Typography variant="caption" display="block" gutterBottom>
                Maximum file size allowed is 20MB.
              </Typography>
            </label>
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BookAdditionForm;
