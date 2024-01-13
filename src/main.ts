import { createApp } from 'vue'
import './style.css'
import '@/assets/css/common.css'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import Table from '@/components/table.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.component('zt-table', Table)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
