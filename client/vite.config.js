// File: client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// export default defineConfig({
//  server:  {
//     port: 4000,
//     open: true
//   },
//  // root: 'client',  // Set client as the root directory
//   //publicDir: 'public', // Ensure public folder is correctly referenced for static assets like index.html
//   plugins: [react()],
// //  build: {
//   //   outDir: 'dist', // Output directory for build artifacts
//   //   emptyOutDir: true, // Clear the dist folder before each build
//   // },
// });
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 4000,
//     open: true,
//     proxy: {
//       '/graphql': {
//         target: 'http://localhost:4000',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/googleapi': {
//         target: 'http://localhost:4000',
//         changeOrigin: true,
//         secure: false,
//       },
//     }
//   }
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});