import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import("@/view/Login.vue")
    },
    {
        path:'/home',
        meta: {title: '数据中心'},
        component: ()=> import("@/view/DashBoard.vue")
    },
    {
        path:'/company',
        name: 'company',
        meta: {title: '企业管理'},
        component: ()=> import("@/view/company/Company.vue"),
        children: [
            {
                path: 'details',
                name: 'companyDetails',
                meta: {title: '详情'},
                component: () => import("@/view/company/details.vue")
            }
        ]
    },
    {
        path:'/complain',
        meta: {title: '投诉管理'},
        component: ()=> import("@/view/complain/Complain.vue")
    },
    {
        path:'/person',
        meta: {title: '个人中心'},
        component: ()=> import("@/view/Person.vue")
    },
    {
        path: '/user_manage',
        meta: {title: '用户管理'},
        component: () => import("@/view/userManage/index.vue")
    },
    {
        path: '/role_manage',
        meta: {title: '角色管理'},
        component: () => import('@/view/roleManage/index.vue')
    }
]
export default createRouter({
    // 指定路由模式
    history: createWebHashHistory(),
    // 路由地址
    routes
})
