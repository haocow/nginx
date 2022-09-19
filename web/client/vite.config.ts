import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'common': path.resolve(__dirname, '../../common/src'),
      '@': path.resolve(__dirname, './web/client/src'),
    }
  },
  build: {
    rollupOptions: {
      input: "./index.html",
    }
  },
})
