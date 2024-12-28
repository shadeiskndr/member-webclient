import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

function Footer({ drawerWidth, open }) {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: 'auto',
        bottom: 0,
        width: { sm: `calc(100% - ${open ? drawerWidth : 50}px)` },
        marginLeft: { sm: `${open ? drawerWidth : 50}px` },
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography variant="body2">
            © 2023 My Application. All rights reserved.
          </Typography>
          <Typography variant="body2">
            Built with Material-UI
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
