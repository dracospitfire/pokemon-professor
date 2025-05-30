import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Documentation: https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: './',
    plugins: [react()],
    esbuild: {
      loader: "jsx"
    },
    assetsInclude: ['**/*.glb'],
    server: {
      // Use VITE_PORT from your .env, or default to a port if not specified
      port: parseInt(env.VITE_PORT, 10) || 3030,
      host: env.NODE_ENV === 'development' ? 'localhost': '0.0.0.0',
    }
  });
};