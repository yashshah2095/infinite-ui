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
      // THE FIX: Explicitly externalize the JSX runtime so Vite doesn't bundle its 'require' statements
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});