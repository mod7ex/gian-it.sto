import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  build: {
    outDir: 'public',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/components'),
      '~': path.resolve(__dirname, './src'),
    },
  },

  envDir: './',
});
