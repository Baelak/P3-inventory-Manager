// File: client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'client',  // Set client as the root directory
  publicDir: 'public', // Specify public directory where index.html is located
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
