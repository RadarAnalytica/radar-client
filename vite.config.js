/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';
import { resolve } from 'path';


// https://vite.dev/config/
export default defineConfig({
  root: './',
  test: {
    globals: true,
  },
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      input: './index.html', // Specify entry point
      // output: {
      //   manualChunks: {
      //     'onboarding': ['./src/pages/Onboarding']
      //   }
      // }
    }
  },
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/pages': resolve(__dirname, 'src/pages'),
      '@/redux': resolve(__dirname, 'src/redux'),
      '@/service': resolve(__dirname, 'src/service'),
      '@/assets': resolve(__dirname, 'src/assets'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/app': resolve(__dirname, 'src/app')
    }
  },
  plugins: [
    svgr(), 
    react(),
    viteCompression({
      algorithm: 'gzip', // or 'brotliCompress' for brotli
      ext: '.gz', // extension to add to compressed files
      threshold: 10240, // only compress files bigger than this (in bytes)
      deleteOriginFile: false, // keep original files
      filter: /\.(js|mjs|json|css|html)$/i, // files to compress
    })
  ],
});
