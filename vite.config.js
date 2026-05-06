import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build optimizations
  build: {
    // Code splitting & chunk strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk — large stable deps
          'vendor-react':  ['react', 'react-dom'],
          'vendor-three':  ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-gsap':   ['gsap'],
          'vendor-firebase': ['firebase'],
        },
      },
    },
    // Inline assets smaller than 4 KB
    assetsInlineLimit: 4096,
    // Enable minification
    minify: 'esbuild',
    // Source maps for production debug (disable for final deploy)
    sourcemap: false,
    // Chunk size warning
    chunkSizeWarningLimit: 600,
  },

  // Serve static assets from /public
  publicDir: 'public',

  // Dev server
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },

  // Preview server (after build)
  preview: {
    port: 4173,
    strictPort: false,
  },
})
