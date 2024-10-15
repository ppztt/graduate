import React, { useState } from "react"
import { Layout, Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Outlet, useNavigate } from "react-router-dom"
import './index.scss'
import LocalMenu from "./components/menus"
import type { MenuProps } from 'antd'
import LocalBreadcrumb from "./components/bread"
const { Header, Sider, Content } = Layout

const Home: React.FC = () => {
    const [globalUserInfo, setGlobalUserInfo] = useState<any>(JSON.parse(sessionStorage.getItem('userInfo') || ''))
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/back/login')
    }
    const items: MenuProps['items'] = [
        {
            label: <span style={{ cursor: 'pointer'}} onClick={logOut}>退出登陆</span>,
            key: '1',
        }
    ]
    return (
        <Layout id="home">
            <Header>
                <div className="header-box">
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span className="system-icon"></span>
                        <span className="title">维权管理系统</span>
                    </div>
                    <span className="userName">
                        <span className="avatar" style={{backgroundImage: `url(http://localhost:3000${globalUserInfo.avatar})`}}></span>
                        {globalUserInfo.user_name}  &nbsp;&nbsp;
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <span style={{ cursor: 'pointer'}}>
                                <Space>
                                    <DownOutlined />
                                </Space>
                            </span>
                        </Dropdown>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width="12%" className="layout-bg">
                    <LocalMenu userInfo={globalUserInfo} />
                </Sider>
                <Content>
                    <div className="bread">
                        <LocalBreadcrumb />
                    </div>
                    {/* 需要引入Outlet组件，作用跟router-view一样，表明组件在这里显示 */}
                    <div className="routerView">
                        <Outlet context={[globalUserInfo, setGlobalUserInfo]}></Outlet>
                    </div>
                </Content>
            </Layout>
                {/* <Footer>Footer</Footer> */}
        </Layout>
    )
}

export default Home