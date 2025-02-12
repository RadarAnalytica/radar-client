import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'


// https://vite.dev/config/
export default defineConfig({
  root: './',
  build: {
    rollupOptions: {
      input: './index.html', // Specify entry point
      output: {
        manualChunks: {
          'onboarding': ['./src/pages/Onboarding']
        }
      }
    }
  },
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@': '/src'
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
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         'onboarding': ['./src/pages/Onboarding']
  //       }
  //     }
  //   }
  // }
})