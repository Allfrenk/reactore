import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    react(),
    // Run `npm run build:analyze` to open the interactive bundle map.
    mode === 'analyze' &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/stats.html',
        title: 'Reactore — Bundle Analysis',
      }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep React ecosystem together — stable, long-cacheable
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router')
          ) {
            return 'vendor-react'
          }
          // Redux and its peers
          if (
            id.includes('node_modules/@reduxjs/') ||
            id.includes('node_modules/react-redux/') ||
            id.includes('node_modules/immer/')
          ) {
            return 'vendor-redux'
          }
          // Firebase — large and rarely changes
          if (
            id.includes('node_modules/firebase/') ||
            id.includes('node_modules/@firebase/')
          ) {
            return 'vendor-firebase'
          }
          // Lucide icons — changes with new icon releases
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-lucide'
          }
        },
      },
    },
  },
}))
