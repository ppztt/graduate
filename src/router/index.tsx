import { useRoutes } from "react-router-dom"
import routes from "./routes"
// useRoutes需要按下面将处理后的组件返回，不能当作值直接塞在Router里面使用
const Routers = () => useRoutes(routes)

export {
    Routers
}