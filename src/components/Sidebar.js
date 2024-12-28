import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../store';
import { useNavigate } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Toolbar,
  styled
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

const DrawerHeader = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar,
}));

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Member Cards', icon: <PeopleIcon />, path: '/member-cards' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : theme => theme.spacing(7),
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : theme => theme.spacing(7),
          overflowX: 'hidden',
          backgroundColor: theme => theme.palette.primary.main,
          color: theme => theme.palette.primary.contrastText,
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <DrawerHeader>
        <IconButton 
          color="inherit"
          onClick={() => dispatch(toggleSidebar())}
        >
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{ color: 'inherit' }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            {isOpen && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
