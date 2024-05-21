import React from "react";
import { Layout } from 'antd'
import { Outlet } from "react-router-dom";
import './index.scss'
import LocalMenu from "./components/menus";
const { Header, Footer, Sider, Content } = Layout;
const Home: React.FC = () => {
    return (
        <Layout>
            <Header className="layout-bg">Header</Header>
        <Layout>
            <Sider width="25%" className="layout-bg">
                <LocalMenu />
            </Sider>
            <Content>
                {/* 需要引入Outlet组件，作用跟router-view一样，表明组件在这里显示 */}
                <Outlet></Outlet>
            </Content>
        </Layout>
            <Footer>Footer</Footer>
        </Layout>
    )
}

export default Home