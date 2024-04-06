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
        path: '/back_way',
        redirect: '/back_way/dash_board'
    },
    {
        path: '/back_way',
        name: 'backWay',
        meta: {title: '后台管理'},
        component: () => import('@/view/Home.vue'),
        children: [
            {
                path:'dash_board',
                name: 'DashBoard',
                meta: {title: '数据中心'},
                component: ()=> import("@/view/DashBoard.vue")
            },
            {
                path:'company',
                name: 'company',
                meta: {title: '企业管理'},
                component: ()=> import("@/view/company/Company.vue"),
                children: [
                    {
                        path: 'details',
                        name: 'companyDetails',
                        meta: {title: '详情'},
                        component: () => import("@/view/company/components/details.vue")
                    }
                ]
            },
            {
                path: 'content',
                name: 'content',
                meta: {title: '文章管理'},
                component: () => import('@/view/content/content.vue')
            },
            {
                path:'complain',
                meta: {title: '投诉管理'},
                name: 'complaintMgt',
                component: ()=> import("@/view/complain/Complain.vue"),
                children: [
                    {
                        path: 'detail',
                        meta: { title: '投诉详情'},
                        name: 'complaintDetail',
                        component: () => import('@/view/complain/components/details.vue')
                    }
                ]
            },
            {
                path:'person',
                meta: {title: '个人中心'},
                component: ()=> import("@/view/Person.vue")
            },
            {
                path: 'user_manage',
                meta: {title: '用户管理'},
                component: () => import("@/view/userManage/index.vue")
            },
            {
                path: 'role_manage',
                meta: {title: '角色管理'},
                component: () => import('@/view/roleManage/index.vue')
            }
        ]
    },
    {
        path: '/gateway',
        redirect: '/gateway/login'
    },
    {
        path: '/gateway',
        component: () => import('@/App.vue'),
        children: [
            {
                path: 'login',
                component: () => import('@/view/gateway/login/index.vue')
            },
            {
                path: 'register',
                component: () => import('@/view/gateway/register/index.vue')
            },
            {
                path: 'home',
                component: () => import('@/view/gateway/index.vue')
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
