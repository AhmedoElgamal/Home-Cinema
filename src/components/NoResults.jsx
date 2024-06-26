import React from 'react';
import Typography from '@mui/material/Typography';

const NoResults = () => {
  return (
    <div style={{ textAlign: 'center', height: "100vh", color:"white" }}>
        <br style={{marginBottom: "15vh"}}></br>
      <Typography variant="h2" component="h2" gutterBottom>
        No Results
      </Typography>
      <Typography variant="body1" gutterBottom>
        Try searching for something else.
      </Typography>
    </div>
  );
};

export default NoResults;
