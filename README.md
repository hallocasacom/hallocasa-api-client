# Hallocasa API Client

A TypeScript client library for the Hallocasa API, generated from the OpenAPI specification.

## Features

- 🚀 Type-safe API client for Hallocasa services
- 📚 Complete TypeScript type definitions
- 🔍 Automatically generated from OpenAPI specification
- 🔄 Axios-based HTTP client with configurable options
- 💡 Easy to use, with a simple and intuitive API

## Installation

```bash
# Clone this repository and navigate to the client directory
cd hallocasa-api-client

# Install dependencies
npm install

# Generate the API client from the OpenAPI spec
npm run generate

# Build the TypeScript code
npm run build
```

Or simply run the build script:

```bash
./build.sh
```

## Usage

After building, you can use the library in your TypeScript or JavaScript project:

```typescript
import { createHallocasaClient } from 'hallocasa-api-client';

// Create a configured client instance
const client = createHallocasaClient({
  baseURL: 'https://api.hallocasa.com',
  // Optional: Include an API key if required
  // apiKey: 'your-api-key',
  // Optional: Include auth token if available
  // token: 'your-auth-token',
});

// Example: Get all countries
async function getAllCountries() {
  try {
    const response = await client.countriesApi.getAllCountries();
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

// Example: Get user favorites
async function getUserFavorites(userId: number) {
  try {
    const response = await client.favoritesApi.getByUser_1(userId);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching user favorites:', error);
  }
}
```

## Authentication

The Hallocasa API client supports two authentication methods:

1. **API Key Authentication**: Pass your API key in the `apiKey` option when creating a client.
2. **Bearer Token Authentication**: Pass your authentication token in the `token` option when creating a client.

```typescript
// With API key authentication
const client = createHallocasaClient({
  baseURL: 'https://api.hallocasa.com',
  apiKey: 'your-api-key',
});

// With Bearer token authentication
const client = createHallocasaClient({
  baseURL: 'https://api.hallocasa.com',
  token: 'your-auth-token',
});
```

## Development

### Project Structure

```
hallocasa-api-client/
├── src/                    # Source code
│   ├── generated/          # Generated API code (created after running generate)
│   ├── client.ts           # Client configuration
│   └── index.ts            # Main entry point
├── scripts/                # Build and utility scripts
├── examples/               # Usage examples
├── dist/                   # Build output (created after running build)
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

### Available Scripts

- `npm run generate`: Generate API client from OpenAPI spec
- `npm run update-client`: Update client.ts with generated API clients
- `npm run build`: Build the TypeScript code
- `npm run clean`: Remove build output

## License

[MIT](LICENSE) 