import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Login from "../pages/login"
const routes = createBrowserRouter([
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
        element: <div>hello, home</div>
    }
])

const Router = () => {
    return (
        <RouterProvider router={routes} />
    )
}

export {
    Router
}