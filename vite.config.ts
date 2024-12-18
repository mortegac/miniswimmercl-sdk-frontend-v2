import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'https://api.whaticket.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  plugins: [
    react(),  
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Mi Aplicación PWA',
        short_name: 'MiPWA',
        description: 'Mi aplicación web progresiva',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB
      }
    }),
    svgr({
    // svgr options: https://react-svgr.com/docs/options/
    svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
     include: "**/*.svg",
    }),],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "tailwind-config": fileURLToPath(
        new URL("./tailwind.config.js", import.meta.url)
      ),
    },
  },
});
