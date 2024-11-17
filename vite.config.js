// // File: vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for `src`
    },
  },
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
// });

//   //root: 'client',  // Set client as the root directory
//   //publicDir: 'public', // Ensure public folder is correctly referenced for static assets like index.html
// //  build: {
//   //   outDir: 'dist', // Output directory for build artifacts
//   //   emptyOutDir: true, // Clear the dist folder before each build
//   // },
