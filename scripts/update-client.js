#!/usr/bin/env node

/**
 * This script updates the client.ts file after code generation
 * to correctly export and configure all the generated API clients.
 */

const fs = require('fs');
const path = require('path');
const generatedDir = path.resolve(__dirname, '../src/generated');
const clientPath = path.resolve(__dirname, '../src/client.ts');
const indexPath = path.resolve(__dirname, '../src/index.ts');

// Check if the generated directory exists
if (!fs.existsSync(generatedDir)) {
  console.error('Generated directory not found. Run "npm run generate" first.');
  process.exit(1);
}

// Find all API files in the generated/apis directory
const apisDir = path.join(generatedDir, 'apis');
if (!fs.existsSync(apisDir)) {
  console.error('APIs directory not found in the generated code.');
  process.exit(1);
}

console.log('Updating client.ts with generated API clients...');

// Get all API files
const apiFiles = fs.readdirSync(apisDir)
  .filter(file => file.endsWith('.ts') && !file.includes('index'))
  .map(file => path.basename(file, '.ts'));

// Generate import statements for all API files
const apiImports = apiFiles.map(api => {
  const apiName = api.replace('.', '');
  return `import { ${apiName} } from './generated/apis/${api}';`;
}).join('\n');

// Generate API client instantiation code
const apiClients = apiFiles.map(api => {
  const apiName = api.replace('.', '');
  const instanceName = apiName.charAt(0).toLowerCase() + apiName.slice(1);
  return `    ${instanceName}: new ${apiName}(undefined, '', axiosInstance),`;
}).join('\n');

// Update the client.ts file with generated API imports and clients
let clientContent = fs.readFileSync(clientPath, 'utf8');

// Update imports
clientContent = clientContent.replace(
  '// These imports will be updated after code generation\n// import { Configuration } from \'./generated\';\n// import * as apis from \'./generated/apis\';',
  '// Auto-generated imports\nimport { Configuration } from \'./generated\';\n' + apiImports
);

// Update client instantiation
const insertionPoint = '// DO NOT REMOVE: API_CLIENTS_INSERTION_POINT';
const insertionRegex = new RegExp(`return \\{\\s*// API clients will be included here after generation\\s*\\};`);

if (insertionRegex.test(clientContent)) {
  clientContent = clientContent.replace(
    insertionRegex,
    `return {\n${apiClients}\n  };`
  );
} else {
  console.warn('Could not find API clients insertion point in client.ts');
  // Try alternative approach
  const insertionPointIndex = clientContent.indexOf(insertionPoint);
  if (insertionPointIndex !== -1) {
    const beforeInsertionPoint = clientContent.substring(0, clientContent.lastIndexOf('return {'));
    clientContent = `${beforeInsertionPoint}return {\n${apiClients}\n  };\n\n${insertionPoint}`;
  } else {
    console.error('Could not update client.ts - insertion point not found');
    process.exit(1);
  }
}

// Write updated content back to client.ts
fs.writeFileSync(clientPath, clientContent);

// Now update index.ts to export generated types
console.log('Updating index.ts with generated API exports...');

let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(
  '// Re-export everything from the generated API\n// This will be uncommented after generation\n// export * from \'./generated\';',
  '// Re-export everything from the generated API\nexport * from \'./generated\';'
);

fs.writeFileSync(indexPath, indexContent);

console.log('Updates completed successfully.'); 