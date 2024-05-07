import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import SimpleBackdrop from "./Spinner";
import { useLoaderData } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import NoResults from "./NoResults";

const Movies = () => {
    const moviesData = useLoaderData();
    const [searchValue, setSearchValue] = useState('');
    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };
    const filteredArr = moviesData.movies.filter(mov =>
        mov.title.toLowerCase().includes(searchValue.toLowerCase())
    );

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

    if(!moviesData)
    return(<SimpleBackdrop></SimpleBackdrop>)

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
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{background: 'none'}}>
                    <Toolbar style={{justifyContent: "end", marginRight: "1ch"}}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchValue}
                                onChange={handleSearchInputChange}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
            <hr style={{color: "indigo"}}></hr>
            <div style={{ background: 'linear-gradient(135deg, #000022, #000044)'}}> 
                <br></br>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {filteredArr.length > 0 ? (
                    filteredArr.map((m) => <Movie key={m.id} {...m} 
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    isFavorite={favorites.includes(m.id)}/>)
                ) : (
                    <NoResults></NoResults>
                )}
            </div>
            <br></br><br></br>
            </div>
        </>
    );
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));
export default Movies;