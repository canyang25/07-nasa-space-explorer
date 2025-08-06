// Import required packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// NASA API endpoint
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

// Cache for storing API responses
const cache = {};

// API route to fetch NASA images
app.get('/api/nasa-images', async (req, res) => {
  const { start_date, end_date } = req.query;
  
  // Validate request parameters
  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }
  
  // Create cache key
  const cacheKey = `${start_date}_${end_date}`;
  
  // Check if we have cached data
  if (cache[cacheKey]) {
    console.log('Serving from cache');
    return res.json(cache[cacheKey]);
  }
  
  try {
    // Make request to NASA API
    const response = await axios.get(NASA_API_URL, {
      params: {
        api_key: NASA_API_KEY,
        start_date,
        end_date
      }
    });
    
    // Store in cache (with 24-hour expiry)
    cache[cacheKey] = response.data;
    setTimeout(() => {
      delete cache[cacheKey];
    }, 24 * 60 * 60 * 1000);
    
    // Return the data
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from NASA API:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch data from NASA API',
      details: error.response?.data || error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
