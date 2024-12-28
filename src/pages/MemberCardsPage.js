import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import MemberCardGrid from '../components/MemberCardGrid';
import { useSelector } from 'react-redux';

function MemberCardsPage() {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  return (
    <Box 
      sx={{ 
        mt: 8, 
        p: 3,
        marginLeft: isSidebarOpen ? '56px' : '56px',
        transition: theme => theme.transitions.create(['margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        width: 'auto',
        overflow: 'hidden'
      }}
    >
      <MemberCardGrid members={members} />
    </Box>
  );
}

export default MemberCardsPage;
