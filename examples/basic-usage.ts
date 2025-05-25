/**
 * Basic usage example for the Hallocasa API client
 * 
 * Note: This example will only work after code generation.
 * TypeScript errors are expected before running the generate script.
 */

import { createHallocasaClient } from '../src';

// Create a client instance with the base URL for the API
const client = createHallocasaClient({
  baseURL: 'https://api.hallocasa.com',
  // Optional: Include an API key if required
  // apiKey: 'your-api-key',
  // Optional: Include auth token if available
  // token: 'your-auth-token',
});

async function runExamples() {
  try {
    // Example 1: Get all countries
    console.log('Fetching countries...');
    const countries = await client.countriesApi.getAllCountries();
    console.log(`Retrieved ${countries.data.length} countries`);
    
    // Example 2: Get geolocation by address
    console.log('\nFetching geolocation for Barcelona...');
    const geolocations = await client.geoLocationApi.getGeoLocationsByLatLng({
      address: 'Barcelona, Spain'
    });
    console.log('Location details:', geolocations.data);
    
    // Example 3: Get available languages
    console.log('\nFetching available languages...');
    const languages = await client.languagesApi.getAllLanguages();
    console.log(`Retrieved ${languages.data.length} languages`);
    
    // Additional examples
    // Note: Some endpoints may require authentication
    
    // Example 4: Get user favorites (requires authentication)
    // const userId = 123;
    // const favorites = await client.favoritesApi.getByUser_1(userId);
    // console.log(`User has ${favorites.data.length} favorites`);
    
  } catch (error) {
    console.error('Error in examples:', error);
  }
}

// Run the examples
runExamples().catch(console.error); 