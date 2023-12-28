import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: ()=> import("@/view/Login.vue")
    },
    {
        path: '/home',
        redirect: '/home/dashboard'
    },
    {
        path: '/home',
        component: ()=> import("@/view/Home.vue"),
        children:[
            {
                path:'dashboard',
                component: ()=> import("@/view/DashBoard.vue")
            },
            {
                path:'company',
                component: ()=> import("@/view/Company.vue")
            },
            {
                path:'complain',
                component: ()=> import("@/view/Complain.vue")
            },
            {
                path:'person',
                component: ()=> import("@/view/Person.vue")
            }
        ]
    }
]
export default createRouter({
    // 指定路由模式
    history: createWebHashHistory(),
    // 路由地址
    routes
})
