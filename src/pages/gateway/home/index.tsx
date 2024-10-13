import React from "react"
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Outlet, useNavigate } from "react-router-dom"
import './index.scss'
import icon from '@/assets/icon.svg'
const GatewayHome: React.FC = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '')
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/gateway/login')
    }
    const items: MenuProps['items'] = [
        {
            label: <span style={{ cursor: 'pointer'}} onClick={logOut}>退出登陆</span>,
            key: '1',
        }
    ]
    return (
        <div id="gateway-home">
            <div className="header">
                <div className="left">
                    <img style={{ width: 30 + 'px', height: 30 + 'px', marginRight: 5 + 'px' }} src={icon} alt="" />
                    维权中心
                </div>
                <div className="right">
                    {userInfo.user_name} &nbsp;&nbsp;
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <span style={{ cursor: 'pointer' }}>
                            <Space>
                                <DownOutlined />
                            </Space>
                        </span>
                    </Dropdown>
                </div>
            </div>
            <div className="main">
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default GatewayHome