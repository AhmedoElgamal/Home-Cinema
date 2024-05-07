import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', height: "100vh", color:"white" }}>
        <br style={{marginBottom: "15vh"}}></br>
      <Typography variant="h2" component="h2" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Oops! The page you're looking for does not exist.
      </Typography>
      <Typography variant="body1">
        Return to <Link style={{color: "yellow"}} to="/portal">Home</Link>
      </Typography>
    </div>
  );
};

export default NotFound;
