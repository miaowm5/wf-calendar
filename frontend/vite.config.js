import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const proxy = 'https://wf-calendar.miaowm5.com'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../dist/frontend'
  },
  server: {
    proxy: {
      '/data': { target: proxy, changeOrigin: true },
      '/banner': {
        target: proxy,
        changeOrigin: true,
        headers: { Referer: proxy },
      }
    }
  }
})
