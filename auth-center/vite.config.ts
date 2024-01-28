import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE,
  plugins: [
    vue(),
    Components ({
      resolvers:[VantResolver()]
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 10000,
    cors: true,
    proxy: {
      '/api-2' : {
        target: 'http://127.0.0.1:10003/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-2/, "")
      },
      '/api-1' : {
        target: 'http://127.0.0.1:10002/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-1/, "")
      },
      
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
