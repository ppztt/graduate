import { Navigate } from "react-router-dom"
import Login from "../pages/login"
import Home from "../pages/home"
import Person from '../pages/person/index'
import UserManage from "../pages/userManage"
import RoleManage from "@/pages/roleManage"
import MerchantManage from '@/pages/merchantManage'
import ContentManage from '@/pages/contentManage'
import ComplainManage from '@/pages/complainManage'
const routes = [
    {
        path: '/',
        // 重定向组件Navigate
        element: <Navigate to={'/login'} replace />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/back_way',
        element: <Home />,
        title: '后台管理',
        children: [
            {
                element: "数据中心",
                path:'dash_board',
                title: '数据中心'
            },
            {
                element: <ContentManage />,
                path: 'content',
                title: '文章管理'
            },
            {
                element: <MerchantManage />,
                path: 'merchant',
                title: '商家管理'
            },
            {
                element: <ComplainManage />,
                path: 'complain',
                title: '投诉管理'
            },
            {
                element: <UserManage/>,
                path: 'user_manage',
                title: '用户管理'
            },
            {
                element: <RoleManage/>,
                path: 'role_manage',
                title: '角色管理'
            },
            {   
                path: 'person',
                element: <Person/>,
                title: '个人中心'
            }
        ]
    }
]
export default routes