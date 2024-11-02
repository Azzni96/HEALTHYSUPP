import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/create-checkout-session': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf}'],
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [
          /^\/Menu.html\?.*/,
          /^\/index.html$/,
        ],
      },
      includeAssets: ['app-icon.svg', 'main.css', 'Pacifico-Regular.ttf'],
      manifest: {
        name: 'vite pwa example',
        short_name: 'vite-pwa',
        description: 'example for vite pwa plugin',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
