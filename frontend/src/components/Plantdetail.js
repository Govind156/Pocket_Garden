import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocalOffer as PriceIcon,
  Category as CategoryIcon,
  CheckCircle as AvailableIcon,
  Cancel as UnavailableIcon,
  WaterDrop as WaterIcon,
  WbSunny as LightIcon,
  Spa as CareIcon,
  Inventory as StockIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Plantdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlant();
  }, [id]);

  const fetchPlant = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/plants/${id}`);
      setPlant(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch plant details. Please try again later.');
      console.error('Error fetching plant:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Catalog
        </Button>
      </Container>
    );
  }

  if (!plant) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mt: 2 }}>Plant not found</Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Catalog
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Catalog
      </Button>

      <Grid container spacing={4}>
        {/* Plant Image */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="500"
              image={plant.imageURL}
              alt={plant.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Plant Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            {/* Plant Name and Price */}
            <Typography variant="h4" component="h1" gutterBottom>
              {plant.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PriceIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" color="primary" fontWeight="bold">
                ₹{plant.price}
              </Typography>
            </Box>

            {/* Availability Status */}
            <Box sx={{ mb: 3 }}>
              <Chip
                icon={plant.availability ? <AvailableIcon /> : <UnavailableIcon />}
                label={plant.availability ? 'In Stock' : 'Out of Stock'}
                color={plant.availability ? 'success' : 'error'}
                size="large"
                sx={{ fontSize: '1rem', py: 1 }}
              />
              {plant.stock > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Stock: {plant.stock} available
                </Typography>
              )}
            </Box>

            {/* Categories */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CategoryIcon sx={{ mr: 1 }} />
                Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {plant.categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Box>
            </Box>

            {/* Care Information */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Care Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <CareIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Care Level
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {plant.careLevel}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <WaterIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Water Needs
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {plant.waterNeeds}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <LightIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Light Needs
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {plant.lightNeeds}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Description */}
            {plant.description && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {plant.description}
                </Typography>
              </Box>
            )}

            {/* Additional Details */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    {/* <Inventory as StockIcon /> */}
                    <StockIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Stock Quantity" 
                    secondary={plant.stock || 'Not specified'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {/* <Category as CategoryIcon /> */}
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Added" 
                    secondary={new Date(plant.createdAt).toLocaleDateString()} 
                  />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/add-plant')}
          sx={{ mr: 2 }}
        >
          Add Another Plant
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/')}
        >
          View All Plants
        </Button>
      </Box>
    </Container>
  );
};

export default Plantdetail; 