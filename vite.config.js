import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/dummyjson\.com\/quotes\/random/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'quotes-api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          }
        ]
      },
      manifest: {
        name: 'PWA Quotes',
        short_name: 'Quotes',
        description: 'Aplikacja PWA z cytatami.',
        theme_color: '#333333',
        icons: [
          {
            src: 'icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
