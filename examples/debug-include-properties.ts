/**
 * Debug example for includeNotAvailableProperties parameter
 * This helps verify that the parameter is being sent correctly in HTTP requests
 */

import { createHallocasaClient } from '../src';

const client = createHallocasaClient({
  baseURL: 'https://api.hallocasa.com',
  token: 'your-auth-token'
});

// Add request interceptor to debug HTTP requests
client.axios.interceptors.request.use((config) => {
  console.log('🔍 HTTP Request Debug:');
  console.log(`Method: ${config.method?.toUpperCase()}`);
  console.log(`URL: ${config.url}`);
  if (config.url) {
    const fullUrl = new URL(config.url, config.baseURL);
    console.log('Query Parameters:', fullUrl.searchParams.toString());
  }
  console.log('Body:', config.data);
  console.log('---');
  return config;
});

async function testIncludeNotAvailableProperties() {
  console.log('=== Testing includeNotAvailableProperties Parameter ===\n');

  // Basic property filter criteria with correct structure
  const filterCriteria = {
    resultRequest: {
      pageFrom: 0,
      pageTo: 10
    },
    filterList: []  // Empty filter list to get all properties
  };

  try {
    console.log('1. Testing with includeNotAvailableProperties = false (default)');
    const resultWithoutNotAvailable = await client.propertiesApi.findProperties1({
      propertyFilterCriteria: filterCriteria,
      includeNotAvailableProperties: false,
      bypassCache: true  // Use fresh data
    });
    
    console.log(`Found ${resultWithoutNotAvailable.data.count} properties (excluding not available)`);
    console.log(`Properties returned: ${resultWithoutNotAvailable.data.propertyList?.length || 0}`);
    
    console.log('\n2. Testing with includeNotAvailableProperties = true');
    const resultWithNotAvailable = await client.propertiesApi.findProperties1({
      propertyFilterCriteria: filterCriteria,
      includeNotAvailableProperties: true,
      bypassCache: true  // Use fresh data
    });
    
    console.log(`Found ${resultWithNotAvailable.data.count} properties (including not available)`);
    console.log(`Properties returned: ${resultWithNotAvailable.data.propertyList?.length || 0}`);
    
    // Compare results
    const difference = (resultWithNotAvailable.data.count || 0) - (resultWithoutNotAvailable.data.count || 0);
    console.log(`\n📊 Difference: ${difference} additional properties when including not available`);
    
    if (difference > 0) {
      console.log('✅ Parameter appears to be working - more properties returned when including not available');
    } else if (difference === 0) {
      console.log('⚠️ No difference found - this could mean:');
      console.log('   - There are no "not available" properties in the current filter scope');
      console.log('   - The parameter is not being processed by the server');
      console.log('   - All properties in the result set are currently available');
    } else {
      console.log('❌ Unexpected result - fewer properties when including not available');
    }
    
    // Check individual properties for availability status
    console.log('\n3. Checking property availability status in results:');
    const propertiesWithStatus = resultWithNotAvailable.data.propertyList?.slice(0, 5) || [];
    propertiesWithStatus.forEach((property, index) => {
      console.log(`Property ${index + 1}:`);
      console.log(`  - ID: ${property.id}`);
      console.log(`  - Publication State: ${property.publicationState || 'N/A'}`);
      console.log(`  - Publish Date: ${property.publishDate || 'N/A'}`);
      console.log(`  - Modified Date: ${property.modifiedDate || 'N/A'}`);
    });
    
  } catch (error) {
    console.error('❌ Error testing includeNotAvailableProperties:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Request URL:', error.config?.url);
      console.error('Request params:', error.config?.params);
    }
    
    // Check if the error is related to the parameter
    if (error.message?.includes('includeNotAvailableProperties')) {
      console.error('🔍 Error seems related to the includeNotAvailableProperties parameter');
    }
  }
}

// Additional test to verify parameter serialization
function testParameterSerialization() {
  console.log('\n=== Testing Parameter Serialization ===');
  
  // Manually create the request to see how parameters are serialized
  const testParams = {
    includeNotAvailableProperties: true,
    bypassCache: false
  };
  
  const url = new URL('/properties/search', 'https://api.hallocasa.com');
  Object.entries(testParams).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  
  console.log('Expected URL:', url.toString());
  console.log('Query string:', url.search);
}

// Export for testing
export { testIncludeNotAvailableProperties, testParameterSerialization }; 