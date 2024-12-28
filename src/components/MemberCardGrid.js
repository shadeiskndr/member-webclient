import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
}));

const MemberCardGrid = ({ members }) => {

  const getMemberImageUrl = (memberId) => {
    return `http://localhost:8080/api/members/${memberId}/image`;
  };

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {members.map((member) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
          <StyledCard>
            <CardMedia
              component="img"
              height="200"
              image={getMemberImageUrl(member.id)}
              alt={`${member.firstN} ${member.lastN}`}
              sx={{ 
                objectFit: 'cover',
                height: '200px',  // Fixed height
                width: '100%',    // Full width of container
                // aspectRatio: '1', // Forces a square shape
                // objectPosition: 'center', // Centers the image content
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200';
              }}
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {member.firstN} {member.lastN}
                </Typography>
                <Chip 
                  label={member.type}
                  color="primary"
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Username:</strong> {member.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Email:</strong> {member.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Phone:</strong> {member.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> {member.status}
                </Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default MemberCardGrid;
