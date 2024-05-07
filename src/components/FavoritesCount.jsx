import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoritesCount } from '../redux/store/Redux Thunk/fetchFavorites';
import store from '../redux/store/store';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const ProfileButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#1976d2',
  color: 'white',
  padding: '8px',
  borderRadius: '20px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#135ca3',
  },
});

const FavoritesCount = () => {
    let navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesCount = useSelector((state) => state.favorites.count);
  
  useEffect(() => {
    dispatch(fetchFavoritesCount());

    const unsubscribe = store.subscribe(() => {
      dispatch(fetchFavoritesCount());
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ProfileButton style={{background: "linear-gradient(to bottom right, black, #0E0E0E)"}} onClick={() => navigate('/portal/profile')}>
        <AccountCircleIcon fontSize="large" />
        <span style={{ fontFamily: 'Arial', fontSize: '1.2rem' }}>Profile</span>
      </ProfileButton>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
        <FavoriteIcon style={{ fontSize: '1.7rem', color: 'red' }} />
        <span style={{ color: 'white', fontSize: '1.5rem', marginLeft: '5px', marginRight: "5ch" }}>{favoritesCount}</span>
      </div>
    </div>
  );
};

export default FavoritesCount;
