import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImagemin from "vite-plugin-imagemin";
import type { Plugin } from 'vite';

// Plugin to make CSS non-render-blocking
const asyncCSSPlugin = (): Plugin => ({
  name: 'async-css',
  transformIndexHtml(html) {
    // Match both with and without crossorigin attribute
    return html.replace(
      /<link rel="stylesheet"([^>]*) href="([^"]+\.css)"([^>]*)>/g,
      '<link rel="preload" as="style" href="$2" onload="this.onload=null;this.rel=\'stylesheet\'"$1$3><noscript><link rel="stylesheet" href="$2"$1$3></noscript>'
    );
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && asyncCSSPlugin(),
    mode === "production" && viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [{ name: 'removeViewBox', active: false }]
      },
      webp: { 
        quality: 80,
        lossless: false
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true, // Enable CSS code splitting per chunk
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split React and core libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-core';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'react-router';
          }
          // Split Radix UI components
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui';
          }
          // Split Tanstack Query
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'react-query';
          }
          // Split Recharts (large charting library)
          if (id.includes('node_modules/recharts')) {
            return 'recharts';
          }
          // Split form libraries
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/@hookform')) {
            return 'forms';
          }
          // Split Supabase
          if (id.includes('node_modules/@supabase')) {
            return 'supabase';
          }
          // Split other large vendors
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
      },
    },
  },
  esbuild: {
    target: 'esnext',
    legalComments: 'none',
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
