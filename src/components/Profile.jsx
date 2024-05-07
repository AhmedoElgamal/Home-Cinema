import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import Movie from './Movie';
import axios from 'axios';

const Profile = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:1000/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUsername(userData.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const moviesData = useLoaderData();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch logged-in user's favorites
    const fetchFavorites = async () => {
        try {
            const response = await axios.get('http://localhost:1000/LoggedInUser');
            const loggedInUserId = response.data.loggedInUser.userId;
            const userResponse = await axios.get(`http://localhost:1000/users/${loggedInUserId}`);
            setFavorites(userResponse.data.user.favorites);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    fetchFavorites();
}, []);

const addToFavorites = async (movieId) => {
  try {
      await axios.post(`http://localhost:1000/addToFavorites/${movieId}`);
      setFavorites([...favorites, movieId]);
  } catch (error) {
      console.error('Error adding to favorites:', error);
  }
};

const removeFromFavorites = async (movieId) => {
  try {
      await axios.post(`http://localhost:1000/removeFromFavorites/${movieId}`);
      setFavorites(favorites.filter(id => id != movieId));
  } catch (error) {
      console.error('Error removing from favorites:', error);
  }
};
console.log(favorites)

  if(!favorites[0])
    return(
      <div>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial', fontSize: '2.5rem', marginBottom: '1rem', marginTop: "20px", color: "yellow" }}>Hello {username}</Typography>
<Typography variant="h6" gutterBottom style={{ fontFamily: 'Verdana', fontSize: '1.5rem', marginBottom: '2rem', color: "cyan" }}>Here are your favorite movies</Typography>
      <hr style={{color: "indigo"}}></hr>
          <div style={{ textAlign: 'center', height: "70vh", color:"white" }}>
              <br style={{marginBottom: "10vh"}}></br>
            <Typography variant="h2" component="h2" gutterBottom>
              No Favorites :(
            </Typography>
            <Typography variant="body1" gutterBottom>
              Try adding a movie.
            </Typography>
          </div>
        </div>
        )

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial', fontSize: '2.5rem', marginBottom: '1rem', marginTop: "20px", color: "yellow" }}>Hello {username}</Typography>
<Typography variant="h6" gutterBottom style={{ fontFamily: 'Verdana', fontSize: '1.5rem', marginBottom: '2rem', color: "cyan" }}>Here are your favorite movies</Typography>
      <hr style={{color: "indigo"}}></hr>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {moviesData.movies
          .filter((movie) => favorites.includes(movie.id))
          .map((movie) => (
            <Movie
              key={movie.id}
              {...movie}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={true}
            />
          ))}
      </div>
      <br></br><br></br>
    </div>
  );
};

export default Profile;
