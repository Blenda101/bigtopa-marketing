import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone embed bundle — outputs dist-embed/embed.js as an IIFE.
// Load with: <script src="embed.js"></script>
// Mount with: <div data-bt-calculator data-site="greekhouse"></div>
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: 'src/embed.tsx',
      name: 'BigTopaCalculator',
      fileName: () => 'embed.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    outDir: 'dist-embed',
    cssCodeSplit: false,
    minify: true,
  },
})
