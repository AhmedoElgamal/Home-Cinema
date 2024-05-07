import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Drawer, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoritesCount from './FavoritesCount';

const Sidebar = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    background: 'linear-gradient(to bottom right, black, #0E0E0E)',
  },
}));

const SidebarHeader = styled('div')(({ theme }) => ({
  backgroundColor: 'linear-gradient(to bottom right, black, #0E0E0E)',
  color: '#ffffff',
  padding: theme.spacing(2),
  textAlign: "center",
}));

const BoldYellowText = styled(ListItemText)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'cyan',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  padding: theme.spacing(1, 2),
  borderRadius: "5px",
  '&:hover': {
    backgroundColor: 'darkblue',
  },
}));

const BoldRedText = styled(ListItemText)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: 'rgba(255, 0, 0, 0.9)',
  padding: theme.spacing(1, 2),
  borderRadius: "5px",
  '&:hover': {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
  },
}));

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'linear-gradient(to bottom right, black, #0E0E0E)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: "cyan" }}
          >
            Home Cinema: Watch The Best Movies
          </Typography>
          <FavoritesCount />
        </Toolbar>
      </AppBar>
      <Sidebar
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List>
          <SidebarHeader>
            <Typography variant="h6" color="inherit">
              Home Cinema
            </Typography>
            <hr style={{color: "white", marginTop: "5px"}} />
          </SidebarHeader>
          <ListItem button component={Link} to="/portal" onClick={closeSidebar}>
            <BoldYellowText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/portal/add" onClick={closeSidebar}>
            <BoldYellowText primary="Add New Movie" />
          </ListItem>
          <ListItem button component={Link} to="/portal/profile" onClick={closeSidebar}>
            <BoldYellowText primary="Favorites" />
          </ListItem>
          <ListItem button component={Link} to="/portal/about" onClick={closeSidebar}>
            <BoldYellowText primary="About" />
          </ListItem>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <ListItem button component={Link} to="/" onClick={closeSidebar}>
            <BoldRedText primary="Logout" />
          </ListItem>
        </List>
      </Sidebar>
    </Box>
  );
}

export default NavBar;
