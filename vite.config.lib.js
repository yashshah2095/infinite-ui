// vite.config.lib.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'InfiniteUI',
      fileName: (format) => `infinite-ui.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Keep React out of the public npm bundle
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