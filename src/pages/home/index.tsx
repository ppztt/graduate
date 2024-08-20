import React from "react"
import { Layout, Dropdown, Space} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Outlet } from "react-router-dom"
import './index.scss'
import LocalMenu from "./components/menus"
import type { MenuProps } from 'antd'
import LocalBreadcrumb from "./components/bread"
const { Header, Sider, Content } = Layout

const Home: React.FC = () => {
    const items: MenuProps['items'] = [
        {
            label: <a onClick={(e) => e.preventDefault()}>1st menu item</a>,
            key: '1',
        }
    ]
    return (
        <Layout id="home">
            <Header>
                <div className="header-box">
                    <span className="title">维权管理系统</span>
                    <span className="userName">
                        <span className="avatar"></span>
                        用户  &nbsp;&nbsp;
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width="12%" className="layout-bg">
                    <LocalMenu />
                </Sider>
                <Content>
                    <div className="bread">
                        <LocalBreadcrumb />
                    </div>
                    {/* 需要引入Outlet组件，作用跟router-view一样，表明组件在这里显示 */}
                    <div className="routerView">
                        <Outlet></Outlet>
                    </div>
                </Content>
            </Layout>
                {/* <Footer>Footer</Footer> */}
        </Layout>
    )
}

export default Home