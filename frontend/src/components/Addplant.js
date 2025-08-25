import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  OutlinedInput,
  FormHelperText,
  Alert,
  CircularProgress,
  Grid,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addplant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);
  const [fileError, setFileError] = useState('');

  // const [Image,setImage]=useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: [],
    availability: true,
    stock: '',
    description: '',
    imageURL: '',
    imageName:'',
    careLevel: 'Medium',
    waterNeeds: 'Moderate',
    lightNeeds: 'Indirect Light'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // const response = await axios.get('http://localhost:5000/api/categories');
      const response = await axios.get('https://pocket-garden.onrender.com/api/categories')
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      categories: typeof value === 'string' ? value.split(',') : value
    }));
    
    if (errors.categories) {
      setErrors(prev => ({
        ...prev,
        categories: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Plant name is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.categories.length) {
      newErrors.categories = 'At least one category is required';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  const adminPassword = prompt("Enter admin password to add a plant:");
   if (adminPassword !== "Myp@ssword156") { 
    alert("Incorrect password! Access denied.");
    return;
   }
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // const response = await axios.post('http://localhost:5000/api/plants', formData);
      const response = await axios.get('https://pocket-garden.onrender.com/api/plants',formData)
      setSuccess('Plant added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        categories: [],
        availability: true,
        stock: '',
        description: '',
        imageURL: '',
        imageName:'',
        careLevel: 'Medium',
        waterNeeds: 'Moderate',
        lightNeeds: 'Indirect Light'
      });
      
      // Redirect to catalog after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add plant. Please try again.');
    } finally {
      setLoading(false);
    }
  };
   
  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  const input=e.target;
  const reader = new FileReader();
  if (!file){
    setFormData((prev) => ({ ...prev, imageURL: '', imageName: '' }));
    return;
  }
  const validTypes = ['image/jpg', 'image/jpeg' ,'image/avif','image/png','image/gif'];
  if (!validTypes.includes(file.type)) {
    toast.error('please select a valid image');
    input.value = '';
    setFileError('Please select a valid image (JPG, JPEG, PNG, GIF, AVIF)');
    setFormData((prev) => ({ ...prev, imageURL: '', imageName: '' }));
    return;
  }
  setFileError('');

  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    // setImage(reader.result);
    setFormData((prev) => ({
      ...prev,
      imageName: file.name,
      imageURL: reader.result, // Stores Base64 string
    }))
  };
 };

  const availableCategories = [
    'Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 
    'Home Decor', 'Low Maintenance', 'Flowering', 
    'Foliage', 'Herb', 'Cactus'
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add New Plant
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Plant Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Plant Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            {/* Price and Stock */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price (₹) *"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price}
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                error={!!errors.stock}
                helperText={errors.stock}
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* Categories */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.categories}>
                <InputLabel>Categories *</InputLabel>
                <Select
                  multiple
                  name="categories"
                  value={formData.categories}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label="Categories *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  required
                >
                  {availableCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.categories && (
                  <FormHelperText>{errors.categories}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Care Level, Water Needs, Light Needs */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Care Level</InputLabel>
                <Select
                  name="careLevel"
                  value={formData.careLevel}
                  onChange={handleInputChange}
                  label="Care Level"
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Water Needs</InputLabel>
                <Select
                  name="waterNeeds"
                  value={formData.waterNeeds}
                  onChange={handleInputChange}
                  label="Water Needs"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Light Needs</InputLabel>
                <Select
                  name="lightNeeds"
                  value={formData.lightNeeds}
                  onChange={handleInputChange}
                  label="Light Needs"
                >
                  <MenuItem value="Low Light">Low Light</MenuItem>
                  <MenuItem value="Indirect Light">Indirect Light</MenuItem>
                  <MenuItem value="Bright Light">Bright Light</MenuItem>
                  <MenuItem value="Direct Sunlight">Direct Sunlight</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Availability */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.availability}
                    onChange={handleInputChange}
                    name="availability"
                  />
                }
                label="Plant is available for purchase"
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description || `${formData.description.length}/500 characters`}
                inputProps={{ maxLength: 500 }}
              />
            </Grid>

            {/* Image URL */}
            <Grid item xs={12}>
              <TextField
                type='file'
                onChange={handleFileChange}
                // helperText={formData.imageURL?`Selected: ${formData.imageName}`:`upload an image`}
                helperText={fileError? fileError : "Upload an image in JPG, JPEG, PNG, GIF, or AVIF format"}
                inputProps={{accept: 'image/jpeg,image/jpg,image/png,image/gif,image/avif'}}
                fullWidth
                // label="Image URL"
                // label='IMAGE'
                name="imageURL"
                // value={formData.imageURL}
                // onChange={handleInputChange}
                // placeholder="https://example.com/image.jpg"
                // helperText="Leave empty to use default placeholder image"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                >
                  {loading ? 'Adding Plant...' : 'Add Plant'}
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/')}
                  startIcon={<AddIcon />}
                >
                  Back to Catalog
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
     
};

export default Addplant; 