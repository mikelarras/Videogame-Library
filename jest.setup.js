import '@testing-library/jest-dom';
import { config } from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno desde .env.local
config({ path: resolve(__dirname, '.env.local') });

// Polyfill para fetch en el entorno de pruebas
if (typeof global.fetch === 'undefined') {
  const fetch = require('node-fetch');
  global.fetch = fetch;
}