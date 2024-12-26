import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // ...ignored,
      usePolling: true, // Enable polling
      interval: 1000 // Adjust polling interval (milliseconds) as needed
    }
  }
})
