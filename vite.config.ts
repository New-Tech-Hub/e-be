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
    // Add preload for CSS and make it non-render-blocking
    return html.replace(
      /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
      '<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel=\'stylesheet\'" /><noscript><link rel="stylesheet" href="$1" /></noscript>'
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
      webp: { quality: 80 }
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
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
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
