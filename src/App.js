import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { store } from './store';
import MemberDashboard from './pages/MemberDashboard';
import MemberCardsPage from './pages/MemberCardsPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './output.css';

function AppContent() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const drawerWidth = 240;
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header drawerWidth={drawerWidth} open={isOpen} />
          <Box sx={{ display: 'flex', flex: 1 }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${isOpen ? drawerWidth : 240}px)` },
                //marginLeft: { sm: `${isOpen ? drawerWidth : 64}px` },
                transition: theme => theme.transitions.create(['margin', 'width'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }}
            >
              <Routes>
                <Route path="/" element={<MemberDashboard />} />
                <Route path="/member-cards" element={<MemberCardsPage />} />
              </Routes>
            </Box>
          </Box>
          <Footer drawerWidth={drawerWidth} open={isOpen} />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
