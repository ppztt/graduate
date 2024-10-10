import React, { useState } from "react"
import { Layout, Dropdown, Space, Button} from 'antd'
import { DownOutlined, RedoOutlined } from '@ant-design/icons'
import { Outlet, useNavigate } from "react-router-dom"
import './index.scss'
import LocalMenu from "./components/menus"
import type { MenuProps } from 'antd'
import LocalBreadcrumb from "./components/bread"
const { Header, Sider, Content } = Layout

const Home: React.FC = () => {
    const [userInfo, setUserInfo] = useState<any>(JSON.parse(sessionStorage.getItem('userInfo') || ''))
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
    const fn = () => {
        setUserInfo(JSON.parse(sessionStorage.getItem('userInfo') || ''))
    }
    return (
        <Layout id="home">
            <Header>
                <div className="header-box">
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span className="system-icon"></span>
                        <span className="title">维权管理系统</span>
                    </div>
                    <span className="userName">
                        <Button title="刷新信息" shape="circle" icon={<RedoOutlined />} onClick={fn} />&nbsp;&nbsp;
                        <span className="avatar" style={{backgroundImage: `url(http://localhost:3000${userInfo.avatar})`}}></span>
                        {userInfo.user_name}  &nbsp;&nbsp;
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