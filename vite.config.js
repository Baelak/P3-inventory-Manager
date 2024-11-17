// File: client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  //root: 'client',  // Set client as the root directory
  //publicDir: 'public', // Ensure public folder is correctly referenced for static assets like index.html
  plugins: [react()],
//  build: {
  //   outDir: 'dist', // Output directory for build artifacts
  //   emptyOutDir: true, // Clear the dist folder before each build
  // },
});
