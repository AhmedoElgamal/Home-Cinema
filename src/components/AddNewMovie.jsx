import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';
import {v4 as uuid} from "uuid";

const AddNewMovie = () => {
  const [id] = useState(uuid());
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [info, setInfo] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API to add the new movie
      await axios.post('http://localhost:1000/movies', {
        id,
        title,
        releaseDate,
        info,
        rating,
        image,
      });
      // Reset form fields after successful submission
      setTitle('');
      setReleaseDate('');
      setInfo('');
      setRating('');
      setImage('');
      alert('New movie added successfully!');
    } catch (error) {
      console.error('Error adding new movie:', error);
      alert('Failed to add new movie. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" style={{height: "100vh"}}>
      <Typography variant="h4" align="center" gutterBottom style={{marginTop: "30px", color: "lightblue"}}>
        Add New Movie
      </Typography>
      <form onSubmit={handleSubmit} style={{border: "4px groove blue", backgroundColor: "lightblue", padding: "20px"}}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Release Date"
          fullWidth
          margin="normal"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <TextField
          label="Info"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
        <TextField
          label="Rating"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <TextField
          label="Image URL"
          fullWidth
          margin="normal"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" halfwidth style={{marginTop: "10px"}}>
          Add Movie
        </Button>
      </form>
    </Container>
  );
};

export default AddNewMovie;
