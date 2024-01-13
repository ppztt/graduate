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
        component: ()=> import("@/view/Home.vue")
    },
    {
        path:'/dashboard',
        component: ()=> import("@/view/DashBoard.vue")
    },
    {
        path:'/company',
        name: 'company',
        component: ()=> import("@/view/company/Company.vue"),
        children: [
            {
                path: 'details',
                name: 'companyDetails',
                component: () => import("@/view/company/details.vue")
            }
        ]
    },
    {
        path:'/complain',
        component: ()=> import("@/view/complain/Complain.vue")
    },
    {
        path:'/person',
        component: ()=> import("@/view/Person.vue")
    },
    {
        path: '/user_manage',
        component: () => import("@/view/userManage/index.vue")
    },
    {
        path: '/role_manage',
        component: () => import('@/view/roleManage/index.vue')
    }
]
export default createRouter({
    // 指定路由模式
    history: createWebHashHistory(),
    // 路由地址
    routes
})
