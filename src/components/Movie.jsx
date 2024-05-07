import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Movie = (props) => {
  const { id, title, release_date, info, rating, image, addToFavorites, removeFromFavorites, isFavorite } = props;
  const url = '/portal/' + id;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  return (
    <Card sx={{ maxWidth: 350, transform: 'scale(0.9)', border: "4px groove darkblue", borderRadius: "5%", background: 'linear-gradient(-45deg, #000022, #000044)', }}> {/*"#1a237e"*/}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: "bold", marginTop: "10px", color: "white" }}>
          <div style={{ minHeight: "70px", width: "320px" }}>
            {title}
          </div>
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 400, objectFit: 'fill', margin: 'auto', backgroundColor: "black" }}
          image={image ? image : 'https://media.istockphoto.com/id/1208666888/vector/marquee-and-curtain-background.jpg?s=612x612&w=0&k=20&c=VyNG1C6kfoOoH3W7cNNMmyNAlAiLuuqoQWTdDLAvA14='}
          title="movie-poster"
        />
        <Typography variant="body1" color="text.primary" sx={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          '-webkit-box-orient': 'vertical',
        }}>
          <div style={{ minHeight: "70px", color: "#B3B3FF", marginTop: "15px", fontWeight: "bold", textAlign: "start" }}>
            {info}
          </div>
        </Typography>
      </CardContent>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <CardActions style={{ marginRight: "20px", marginBottom: "15px" }}>
        <Button size="large" style={{ fontWeight: "bold", color: "cyan", border: "2px grey solid" }} onClick={handleToggleFavorite}>
          {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />} {/* Check isFavorite */}
          <span style={{marginLeft: "5px"}}>Favorite</span>
        </Button>
          <Button size="large" style={{ fontWeight: "bold", color: "lightgreen", border: "2px grey solid" }}>
            <Link style={{ color: "yellow", textDecoration: "none" }} to={url}>Details</Link>
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default Movie;
