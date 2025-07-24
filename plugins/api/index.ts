import Common from './module/common'
export default defineNuxtPlugin((nuxtApp) => {
    const request = {
        Common
    }
    nuxtApp.provide('request', request)
})