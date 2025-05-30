import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { spawn } from 'child_process'

dotenv.config()

let serverProcess = null

// Documentation: https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  esbuild: {
    loader: "jsx"
  },
  assetsInclude: ['**/*.glb'],
  server: {
    // Use VITE_PORT from your .env, or default to a port if not specified
    port: parseInt(process.env.VITE_PORT, 10) || 3000,
    host: process.env.NODE_ENV === 'development' ? 'localhost': '0.0.0.0',
  }
})
