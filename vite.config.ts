import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePlugin as remixVite } from '@remix-run/dev';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [remixVite(), react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
