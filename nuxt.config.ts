// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
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
  }
})
