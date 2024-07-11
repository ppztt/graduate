import { Navigate } from "react-router-dom"
import Login from "../pages/login"
import Home from "../pages/home"
import Person from '../pages/person/index'
import UserManage from "../pages/userManage"
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
                path: 'about',
                element: <div>about</div>
            },
            {
                path: 'test',
                element: <div>test</div>
            },
            {
                element: "数据中心",
                path:'dash_board',
                title: '数据中心'
            },
            {
                element: '文章管理',
                path: 'content',
                title: '文章管理'
            },
            {
                element: "企业管理",
                path: 'company',
                title: '企业管理'
            },
            {
                element: "投诉管理",
                path: 'complain',
                title: '投诉管理'
            },
            {
                element: <UserManage/>,
                path: 'user_manage',
                title: '用户管理'
            },
            {
                element: '角色管理',
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