// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Directs Vite to your newly created master entry gate
      entry: resolve(__dirname, 'src/index.js'),
      name: 'InfiniteUI',
      fileName: (format) => `infinite-ui.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Critical: Do NOT bundle React into your library file asset
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});