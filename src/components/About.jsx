import React from 'react';
import { Typography, Box } from '@mui/material';

const About = () => {
  return (
    <div>
    <div style={{ padding: '20px', margin: '0 auto', maxWidth: '800px', border: "2px groove black", marginTop: "40px", padding: "40px" }}> {/* Centering the content and limiting width */}
      <Typography variant="h4" gutterBottom style={{ color: 'cyan' }}> {/* Light blue for headings */}
        Welcome to Home Cinema!
      </Typography>
      <Typography variant="h6" gutterBottom style={{ color: 'yellow' }}> {/* Light gray for subheadings */}
        Your Gateway to Movie Ratings and Information
      </Typography>

      <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}> {/* Light gray for body text */}
        Welcome to Home Cinema, your ultimate destination for discovering movie ratings, reviews, and essential information. Whether you're a casual movie buff or a dedicated film aficionado, Home Cinema is here to help you make informed decisions about your next movie night.
      </Typography>

      {/* Remaining paragraphs with light gray text */}
      <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}>
        At Home Cinema, we believe that every movie deserves to be seen and appreciated. That's why we've curated a vast database of movies from every genre, era, and corner of the globe. From timeless classics to the latest releases, you'll find everything you need to satisfy your cinematic cravings.
      </Typography>

      {/* Remaining paragraphs with light gray text */}
      <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}>
        Unsure about which movie to watch next? Let our community of movie enthusiasts guide you. Explore our extensive collection of user-generated ratings and reviews to get insights into what others are saying about the hottest films of the moment. Whether you're seeking critical acclaim or crowd-pleasing entertainment, you'll find honest and diverse opinions to help you make the right choice.
      </Typography>

      {/* Remaining paragraphs with light gray text */}
      <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}>
        Get all the essential details about each movie before you hit play. From plot summaries and cast lists to directorial insights and production trivia, we've got you covered with comprehensive information to enhance your movie-watching experience. Dive deep into the world of cinema and discover the stories behind the screens.
      </Typography>

      <Box mt={2}>
        <Typography variant="h5" gutterBottom style={{ color: 'yellow' }}> {/* Light gray for headings */}
          How It Works
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}> {/* Light gray for body text */}
          Using Home Cinema is simple and intuitive. Here's how it works:
        </Typography>
        <ul style={{ textAlign: "start", color: '#CCCCCC', marginLeft: '20px' }}> {/* Adding margin for list items */}
          <li>
            <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}> {/* Light gray for list items */}
              Search and Browse: Explore our extensive catalog of movies using our user-friendly search and browsing tools. Filter by genre, release year, or user rating to narrow down your options and find the perfect movie for any occasion.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}> {/* Light gray for list items */}
              Add to Favorites: Create an account and add movies to your favorites list for easy access and personalized recommendations.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}> {/* Light gray for list items */}
              Edit Movie Details: Update or modify existing movie details, including ratings, genres, and plot summaries, to keep your collection up-to-date.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}> {/* Light gray for list items */}
              Add New Movies: Contribute to our growing database by adding new movies to share with the community. You can also delete existing movies if needed.
            </Typography>
          </li>
          {/* Remaining list items with light gray text */}
        </ul>
      </Box>

      <Box mt={2}>
        <Typography variant="h5" gutterBottom style={{ color: 'yellow' }}> {/* Light gray for headings */}
          Join Us at Home Cinema
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: '#CCCCCC' }}> {/* Light gray for body text */}
          Join us at Home Cinema and embark on a journey through the world of movies. Whether you're looking for recommendations, ratings, or just a place to discuss your favorite films, you'll find everything you need right here. Welcome to Home Cinema, where every movie has a story to tell.
        </Typography>
      </Box>
    </div>
    <br></br><br></br>
    </div>
  );
};

export default About;
