import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Adjust this if your app is deployed in a subdirectory
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './src/main.jsx',
        polyfills: './src/polyfills.js',
      },
    },
  },
  server: {
    
    // to ensure it serves the index.html for all routes in development
    historyApiFallback: true,
  },
});