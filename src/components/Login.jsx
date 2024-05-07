import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/store/slices/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make login request
    fetch('http://localhost:1000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse JSON response
      } else {
        return response.json().then(data => {
          throw new Error(data.message);
        });
      }
    })
    .then(data => {
      // Dispatch action to store user ID in Redux state
      dispatch(login(data.user.id));
      // Redirect to home page upon successful login
      navigate("/portal");
    })
    .catch(error => {
      setError(error.message || 'An error occurred. Please try again later.');
    });
  };  

  return (
    <Container maxWidth="sm" style={{height: "100vh"}}>
      <br></br><br></br><br></br>
      <Paper sx={{ padding: 4, marginTop: 0, border: "4px groove blue" }}>
        <Typography variant="h4" gutterBottom>Login</Typography><br></br>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
              <Button variant="contained" color="primary" type="submit">Login</Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body1" mt={2}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>
      {}
    </Container>
  );
};

export default Login;
