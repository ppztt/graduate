import { createApp } from 'vue'
import './style.css'
import '@/assets/css/common.css'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import api from '@/request/api'
import {common, success, warning, error} from '@/utils/index.js'
import Table from '@/components/table.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.component('zt-table', Table)
app.config.globalProperties.$api = api
app.config.globalProperties.$common = common
app.config.globalProperties.$success = success
app.config.globalProperties.$warn = warning
app.config.globalProperties.$error = error
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
