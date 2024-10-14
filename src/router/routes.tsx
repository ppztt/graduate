import { Navigate } from "react-router-dom"
import Login from "../pages/login"
import Home from "../pages/home"
import Person from '../pages/person/index'
import UserManage from "../pages/userManage"
import RoleManage from "@/pages/roleManage"
import MerchantManage from '@/pages/merchantManage'
import ContentManage from '@/pages/contentManage'
import ComplainManage from '@/pages/complainManage'
import DataCenter from "@/pages/dataCenter"
import ClassificationManage from "@/pages/classificationManage"
// gateway
import GatewayHome from "@/pages/gateway/home"
import GatewayLogin from "@/pages/gateway/login"
import HomeTabs from "@/pages/gateway/home/components/homeTabs"
import EssayDetail from "@/pages/gateway/home/components/essayDetail"
const routes = [
    {
        path: '/',
        // 重定向组件Navigate
        element: <Navigate to={'/back/login'} replace />
    },
    {
        path: '/gateway',
        // 重定向组件Navigate
        element: <Navigate to={'/gateway/login'} replace />
    },
    {
        path: '/back/login',
        element: <Login />
    },
    {
        path: '/back_way',
        element: <Home />,
        title: '后台管理',
        children: [
            {
                element: <DataCenter />,
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
                element: <ClassificationManage />,
                path: 'display',
                title: '分类管理'
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
    },
    {
        path: '/gateway/login',
        element: <GatewayLogin/>
    },
    {
        path: '/gateway_center',
        element: <GatewayHome/>,
        title: '门户中心',
        children: [
            {
                element: <HomeTabs />,
                path:'home_tabs',
                title: '首页tab'
            },
            {
                element: <EssayDetail />,
                path: 'essay',
                title: '文章内容'
            }
        ]
    }
]
export default routes