import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useLoaderData } from 'react-router-dom';
import NotFound from './NotFound';

const MovieDetails = () => {
  const moviesData = useLoaderData();
  const { id } = useParams();

  const [movie, setMovie] = useState(moviesData.movies.find((m) => m.id == id));
  const [openDialog, setOpenDialog] = useState(false);
  const [editedMovie, setEditedMovie] = useState({ ...movie });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const foundMovie = moviesData.movies.find((m) => m.id == id);
    if (foundMovie) {
      setMovie(foundMovie);
      setEditedMovie({ ...foundMovie });
    }
  }, [id, moviesData.movies]);

  if (!movie) {
    return <NotFound></NotFound>
  }

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:1000/movies/${id}`);
      console.log('Movie deleted successfully:', movie);
      setOpenDialog(false);
      window.history.back();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = () => {
    setEditedMovie({ ...movie });
    setIsEditing(true);
  };

  const saveChanges = async () => {
    console.log("Edited Movie:", editedMovie);
    try {
      const response = await axios.put(`http://localhost:1000/movies/${id}`, editedMovie);
      console.log('Movie updated successfully:', response.data);
      setMovie(response.data); // Update movie based on the response data
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };
  
  
  const handleInputChange = (event, property) => {
    const { value } = event.target;
    console.log("Input Value:", value);
    setEditedMovie({ ...editedMovie, [property]: value });
  };
  

  const handleCancel = () => {
    setIsEditing(false);
  };

  const { title, info, releaseDate, rating, image } = movie;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} style={{ color: 'gold' }} />);
    }

    if (hasHalfStar) {
      stars.push(<StarIcon key="half" style={{ color: 'gold' }} />);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<StarIcon key={fullStars + (hasHalfStar ? 1 : 0) + i} />);
    }

    return stars;
  };

  return (
    <div style={{ minHeight: "82vh", marginTop: "10vh" }}>
      <Box
        display="flex"
        alignItems="center"
        maxWidth="800px"
        m="auto"
        border="4px groove darkblue"
        padding="20px"
        bgcolor="grey"
        sx={{
          transform: 'scale(1.2)'
        }}
        borderRadius="1%"
      >
        <img src={image ? image : 'https://media.istockphoto.com/id/1208666888/vector/marquee-and-curtain-background.jpg?s=612x612&w=0&k=20&c=VyNG1C6kfoOoH3W7cNNMmyNAlAiLuuqoQWTdDLAvA14='} alt={title} style={{ width: '200px', marginRight: '20px' }} />
        <Box color="black">
          <Typography variant="h5" gutterBottom style={{color: "navy", fontWeight: "bold"}}>{title}</Typography>
          <Typography variant="body1" gutterBottom style={{minWidth: "60ch", textAlign: "left", marginBottom: "15px", backgroundColor: "grey", border: "3px groove black" , padding: "10px"}}>{info}</Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Release Date:</strong> {releaseDate}
          </Typography>
          <Box mt={1} mb={2}>
            <Typography variant="body2" component="span">
              <strong>Rating:</strong> {rating}/10
            </Typography>
            <br />
            <Typography variant="body2" component="span">
              {renderStars()}
            </Typography>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginRight: '10px' }}>Edit</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={closeDialog} style={{border: '2px solid black', padding: '10px'}}>
        <DialogTitle>Delete Movie</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this movie?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditing} onClose={handleCancel} style={{border: '2px solid black', padding: '10px'}}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editedMovie.title}
            onChange={(e) => handleInputChange(e, 'title')}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Release Date"
            value={editedMovie.releaseDate}
            onChange={(e) => handleInputChange(e, 'releaseDate')}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Rating"
            value={editedMovie.rating}
            onChange={(e) => handleInputChange(e, 'rating')}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Info"
            value={editedMovie.info}
            onChange={(e) => handleInputChange(e, 'info')}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={editedMovie.image}
            onChange={(e) => handleInputChange(e, 'image')}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">Cancel</Button>
          <Button onClick={saveChanges} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieDetails;
