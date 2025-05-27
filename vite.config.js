import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  // Add favicon configuration
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'Favicon.png') {
            return 'Favicon.[ext]'
          }
          return '[name].[hash].[ext]'
        }
      }
    }
  }
})