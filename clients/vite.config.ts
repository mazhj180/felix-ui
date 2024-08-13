import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components ({
      resolvers:[VantResolver(),ElementPlusResolver()]
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 10001,
    cors: true,
    proxy: {
      '/api' : {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      '/socket' : {
        target: 'ws://127.0.0.1:8080/',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/socket/,"")
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
