const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 1000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

let movies = require("./movies.json");
let users = require("./users.json");
let loggedInUser = require("./loggedInUser.json");

app.get('/movies', (req, res) => {
  res.json({ movies });
});

app.get('/LoggedInUser', (req, res) => {
  res.json({ loggedInUser });
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).end();
  }
});

app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    res.json({ movie });
  } else {
    res.status(404).end();
  }
});

app.post('/movies', (req, res) => {
  const { title, releaseDate, info, rating, image } = req.body;
  const newMovie = { id: movies.length + 1, title, releaseDate, info, rating, image };
  movies.push(newMovie);
  saveMoviesToFile();
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
});

app.put('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const { title, releaseDate, info, rating, image } = req.body;
  const movieIndex = movies.findIndex(movie => movie.id === movieId);
  if (movieIndex !== -1) {
    movies[movieIndex] = { id: movieId, title, releaseDate, info, rating, image };
    saveMoviesToFile();
    res.json({ message: 'Movie updated successfully', movie: movies[movieIndex] });
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex(movie => movie.id === movieId);
  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
    saveMoviesToFile();
    res.json({ message: 'Movie deleted successfully' });
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const newUser = { 
    id: users.length + 1, 
    username, 
    email, 
    password, 
    favorites: []
  };
  users.push(newUser);
  saveUsersToFile();
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user with the given email
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the password matches
  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Update the loggedInUser.json file with the logged-in user's ID
  loggedInUser.userId = user.id;
  saveLoggedInUserToFile();

  // Successful login
  res.status(200).json({ message: 'Login successful', user: user });
});

app.get('/profile', (req, res) => {
  const loggedInUserId = require("./loggedInUser.json").userId;
  const user = users.find(user => user.id == loggedInUserId);
  console.log(loggedInUserId.id)
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


app.post('/logout', (req, res) => {
  loggedInUser = {};
  saveLoggedInUserToFile();
  res.status(200).json({ message: 'User logged out successfully' });
});

app.post('/addToFavorites/:movieId', (req, res) => {
  const { movieId } = req.params;
  const loggedInUserId = loggedInUser.userId;
  // Find the user in users.json
  const userIndex = users.findIndex(user => user.id === loggedInUserId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Add movie to favorites if not already there
  if (!users[userIndex].favorites.includes(movieId)) {
    users[userIndex].favorites.push(parseInt(movieId));
    saveUsersToFile();
  }
  res.status(200).json({ message: 'Movie added to favorites successfully' });
});


app.post('/removeFromFavorites/:movieId', (req, res) => {
  const { movieId } = req.params;
  const loggedInUserId = loggedInUser.userId;
  // Find the user in users.json
  const userIndex = users.findIndex(user => user.id === loggedInUserId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Remove movie from favorites if exists
  const favoritesIndex = users[userIndex].favorites.indexOf(parseInt(movieId));
  if (favoritesIndex !== -1) {
    users[userIndex].favorites.splice(favoritesIndex, 1);
    saveUsersToFile();
  }
  res.status(200).json({ message: 'Movie removed from favorites successfully' });
});



function saveMoviesToFile() {
  fs.writeFile('./movies.json', JSON.stringify(movies, null, 2), err => {
    if (err) {
      console.error('Error saving movies to file:', err);
    } else {
      console.log('Movies saved to file successfully');
    }
  });
}

function saveUsersToFile() {
  fs.writeFile('./users.json', JSON.stringify(users, null, 2), err => {
    if (err) {
      console.error('Error saving users to file:', err);
    } else {
      console.log('Users saved to file successfully');
    }
  });
}

function saveLoggedInUserToFile() {
  fs.writeFile('./loggedInUser.json', JSON.stringify(loggedInUser, null, 2), err => {
    if (err) {
      console.error('Error saving loggedInUser to file:', err);
    } else {
      console.log('loggedInUser saved to file successfully');
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
