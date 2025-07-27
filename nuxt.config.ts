import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  alias: {
    // 自定义其他别名
    '~type': '/<rootDir>/type'
  },
  css: [
    '@/assets/css/common.css',
    'element-plus/dist/index.css'
  ],
  devServer: {
    port: 8002,
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // Express API 地址
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
  routeRules: {
    '/': { redirect: '/login' }
  },
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
})
