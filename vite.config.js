import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // It was already there
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensure single HTML file for SPA
      },
    },
  },
  server: {
    historyApiFallback: true, // Enable history fallback for dev server
  },
});