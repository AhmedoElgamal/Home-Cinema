import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Make registration request
      fetch('http://localhost:1000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
            console.log("registered successfully");
            navigate('/');
        } else {
          return response.json().then(data => {
            setError(data.message);
          });
        }
      })
      .catch(error => {
        setError('An error occurred. Please try again later.');
      });
    }
  };

  return (
    <Container maxWidth="sm" style={{height: "100vh"}}>
        <br></br><br></br><br></br>
      <Paper sx={{ padding: 4, marginTop: 0, border: "4px groove blue" }}>
        <Typography variant="h4" gutterBottom>Register</Typography><br></br>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">Register</Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body1" mt={2}>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
