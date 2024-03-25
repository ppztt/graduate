import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      // 使用npm i jquery @rollup/plugin-inject -S加载inject
      inject({
        'window.Quill': ['@vueup/vue-quill', 'Quill'],
        Quill: ['@vueup/vue-quill', 'Quill'],
      })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // 相对路径别名配置，使用 @ 代替 src
    }
  },
  server:{
    proxy:{
      "/api":{
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      "/admin":{
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    }
  }
})
