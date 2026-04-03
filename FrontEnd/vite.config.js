import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    minify: 'esbuild', // Use esbuild instead of terser for faster builds with less memory
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks to reduce memory usage
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', '@fortawesome/react-fontawesome', '@fortawesome/fontawesome-svg-core'],
          charts: ['chart.js', 'react-chartjs-2'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    sourcemap: false, // Disable sourcemaps to save memory and build time
    cssCodeSplit: true, // Enable CSS code splitting
  },
})
