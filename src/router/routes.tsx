import { Navigate } from "react-router-dom"
import Login from "../pages/login"
import Home from "../pages/home"

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
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'about',
                element: <div>about</div>
            },
            {
                path: 'test',
                element: <div>test</div>
            }
        ]
    }
]
export default routes