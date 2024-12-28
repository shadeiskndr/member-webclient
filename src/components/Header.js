import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { toggleTheme } from '../store';

function Header({ drawerWidth, open }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${open ? drawerWidth : 50}px)` },
        marginLeft: { sm: `${open ? drawerWidth : 50}px` },
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>
        <IconButton 
          color="inherit" 
          onClick={() => dispatch(toggleTheme())}
          sx={{ ml: 1 }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
