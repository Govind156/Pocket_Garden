import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box  component={RouterLink} to="/"
        sx={{ display: 'flex',
           alignItems: 'center' ,
           mr: 2,
           textDecoration: 'none',
           color: 'inherit',    
           cursor: 'pointer',
           '&:hover': {
             textDecoration: 'none',
            }
            }}>
        <LocalFloristIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          Pocket Garden
        </Typography>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ mr: 2 }}
          >
            Plant Catalog
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/add-plant"
            variant="outlined"
            sx={{ 
              borderColor: 'white', 
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Add Plant
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 