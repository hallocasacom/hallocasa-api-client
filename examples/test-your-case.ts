/**
 * Test script to verify includeNotAvailableProperties parameter works with your specific setup
 * Replace the baseURL and token with your actual values
 */

import { createHallocasaClient } from '../src';

async function testWithYourCredentials() {
  console.log('=== Testing includeNotAvailableProperties with Your Setup ===\n');

  // TODO: Replace these with your actual credentials
  const client = createHallocasaClient({
    baseURL: 'https://api.hallocasa.com', // Replace with your actual API URL
    token: 'your-actual-auth-token' // Replace with your actual token
  });

  // Enable request logging to see what's being sent
  client.axios.interceptors.request.use((config) => {
    console.log('🔍 HTTP Request:');
    console.log(`${config.method?.toUpperCase()} ${config.url}`);
    if (config.url) {
      const fullUrl = new URL(config.url, config.baseURL);
      if (fullUrl.search) {
        console.log('Query Parameters:', fullUrl.search);
      }
    }
    console.log('---');
    return config;
  });

  // Enable response logging 
  client.axios.interceptors.response.use(
    (response) => {
      console.log('✅ Response received:');
      console.log(`Status: ${response.status}`);
      console.log(`Data type: ${typeof response.data}`);
      if (response.data && typeof response.data === 'object') {
        console.log(`Properties count: ${response.data.count || 'N/A'}`);
        console.log(`Properties in list: ${response.data.propertyList?.length || 0}`);
      }
      console.log('---');
      return response;
    },
    (error) => {
      console.error('❌ Request failed:');
      console.error(`Status: ${error.response?.status || 'No response'}`);
      console.error(`Message: ${error.message}`);
      console.error('---');
      throw error;
    }
  );

  // Your filter criteria - modify as needed
  const filterCriteria = {
    resultRequest: {
      pageFrom: 0,
      pageTo: 10 // Small page size for testing
    },
    filterList: [] // Add your specific filters here
  };

  try {
    console.log('1. Testing with includeNotAvailableProperties = false (default)');
    const resultWithoutNotAvailable = await client.propertiesApi.findProperties1({
      propertyFilterCriteria: filterCriteria,
      includeNotAvailableProperties: false,
      bypassCache: true
    });
    
    const countWithout = resultWithoutNotAvailable.data.count || 0;
    console.log(`Found ${countWithout} properties (excluding not available)\n`);
    
    console.log('2. Testing with includeNotAvailableProperties = true');
    const resultWithNotAvailable = await client.propertiesApi.findProperties1({
      propertyFilterCriteria: filterCriteria,
      includeNotAvailableProperties: true,
      bypassCache: true
    });
    
    const countWith = resultWithNotAvailable.data.count || 0;
    console.log(`Found ${countWith} properties (including not available)\n`);
    
    // Compare results
    const difference = countWith - countWithout;
    console.log('📊 RESULTS COMPARISON:');
    console.log(`Without includeNotAvailableProperties: ${countWithout} properties`);
    console.log(`With includeNotAvailableProperties: ${countWith} properties`);
    console.log(`Difference: ${difference} additional properties`);
    
    if (difference > 0) {
      console.log('\n✅ SUCCESS: The parameter is working correctly!');
      console.log(`You have ${difference} "not available" properties in your dataset.`);
    } else if (difference === 0) {
      console.log('\n⚠️ No difference found. This could mean:');
      console.log('1. There are no "not available" properties in your current filter scope');
      console.log('2. All properties in your dataset are currently available');
      console.log('3. The parameter might not be processed by your server version');
      console.log('\n💡 Try with different filter criteria or check your data directly.');
    } else {
      console.log('\n❌ Unexpected result: fewer properties when including not available');
    }

         // Show some sample properties to check their status
     console.log('\n🔍 Sample properties (first 3):');
     const sampleProperties = resultWithNotAvailable.data.propertyList?.slice(0, 3) || [];
     sampleProperties.forEach((property, index) => {
       console.log(`Property ${index + 1}:`);
       console.log(`  - ID: ${property.id}`);
       console.log(`  - Publication State: ${property.publicationState || 'N/A'}`);
       console.log(`  - Is Available: ${property.publicationState === 'AVAILABLE' ? 'Yes' : 'No'}`);
     });

  } catch (error: any) {
    console.error('\n❌ Test failed with error:');
    console.error('Error message:', error.message);
    
    if (error.response) {
      console.error('HTTP Status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Verify your API credentials are correct');
    console.log('2. Check if your API endpoint is accessible');
    console.log('3. Ensure you have the right permissions');
    console.log('4. Try with a simpler filter criteria');
  }
}

// Instructions for running this test
console.log('Before running this test:');
console.log('1. Replace the baseURL with your actual API endpoint');
console.log('2. Replace the token with your actual authentication token');
console.log('3. Modify the filterCriteria if needed for your specific use case');
console.log('4. Run: npx ts-node examples/test-your-case.ts\n');

// Uncomment the line below after updating your credentials
// testWithYourCredentials().catch(console.error); 