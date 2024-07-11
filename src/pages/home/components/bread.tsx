import React from "react"
import { Breadcrumb } from 'antd'
import { useLocation } from "react-router-dom"
import routes from "@/router/routes"

const LocalBreadcrumb: React.FC = () => {
    const location = useLocation()
    const arr = location?.pathname?.split('/').filter(item => item)
    let obj: any = routes
    const breads = arr.map((item, index) => {
        const route = obj.find((r: any) => {
            return r.path.includes(item)
        })
        obj = route?.children
        return <Breadcrumb.Item key={route?.title}>
            {route.title}
            {/* {index === arr.length - 1 ? route?.title || '' : <Link to="">{route.title}</Link>} */}
        </Breadcrumb.Item>
    })
    return (
        <Breadcrumb>
            {breads}
        </Breadcrumb>
    )
}

export default LocalBreadcrumb