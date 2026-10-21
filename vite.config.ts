import { defineConfig } from 'vite'

export default defineConfig({
  // Relative asset paths work on both GitHub Pages project URLs and local preview.
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
