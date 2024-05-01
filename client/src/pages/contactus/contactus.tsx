import React, { useState } from 'react';
import { TextField, Button, Grid, makeStyles } from '@material-ui/core';
import emailjs from 'emailjs-com';

emailjs.init("2RFZeop-dvSg9GIhL");

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  form: {
    width: '60%',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
  },
}));

const ContactForm = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const templateParams = {
        name: name,
        email: email,
        query: query,
      };
      await emailjs.send(
        'service_2d895y9',
        'template_npyilwa',
        templateParams,
        '2RFZeop-dvSg9GIhL'
      );
      alert('Email sent successfully');
    } catch (error) {
      alert(`Error sending email: ${error}`);
    }
    // Clear form fields after submission
    setName('');
    setEmail('');
    setQuery('');
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              required
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              required
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Query"
              variant="outlined"
              fullWidth
              multiline
              minRows={4}
              value={query}
              required
              onChange={handleQueryChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ContactForm;