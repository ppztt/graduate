import { Navigate } from "react-router-dom"
import Login from "../pages/login"
import Home from "../pages/home"
import Person from '../pages/person/index'
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
                path:'dash_board'
            },
            {
                element: '文章管理',
                path: 'content'
            },
            {
                element: "企业管理",
                path: 'company'
            },
            {
                element: "投诉管理",
                path: 'complain'
            },
            {
                element: "用户管理",
                path: 'user_manage'
            },
            {
                element: '角色管理',
                path: 'role_manage'
            },
            {   
                path: 'person',
                element: <Person/>
            }
        ]
    }
]
export default routes