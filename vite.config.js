import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base:'/',
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
});