#!/bin/bash

# Build script for Hallocasa API Client

set -e

echo "===== Setting up Hallocasa API Client ====="

# Install dependencies
echo "Installing dependencies..."
npm install

# Generate API client from OpenAPI spec
echo "Generating API client from OpenAPI spec..."
npm run generate

# Build the TypeScript code
echo "Building TypeScript code..."
npm run build

echo "===== Build completed successfully ====="
echo "The Hallocasa API client is now available in the dist directory" 