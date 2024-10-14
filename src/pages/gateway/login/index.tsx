import React, { useState } from 'react'
import type { FormProps } from 'antd'
import { LockOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginForm } from '@/type/loginType'
import $request from '@/api/api'
import Register from './register'
import './index.scss'

const GatewayLogin: React.FC = () => {
    const [isRegister, setIsRegister] = useState<boolean>(false)
    const navigate = useNavigate()
    const [loginInfo] = Form.useForm<loginForm>()
    const onFinish: FormProps<loginForm>['onFinish'] = async ({ username, password }) => {
        try {
            const params: any = {
                user_name: username,
                password
            }
            const res = await $request.Gateway.gatewayLogin(params)
            if (res.result) {
                message.success('登录成功！')
                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                setTimeout(() => {
                    navigate('/gateway_center/home_tabs')
                }, 500)
            } else {
                message.error(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onFinishFailed: FormProps<loginForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <div id='gateway-login'>
            <div className='login-box'>
            {isRegister && <span className='back-btn' onClick={() => { setIsRegister(false) }}><ArrowLeftOutlined /> 返回</span> }
                <div className='title'>{isRegister ? '注册' : '维权中心'}</div>
                {
                    isRegister ? <Register changeIsRegister={() => { setIsRegister(false) }} /> :
                        <>
                            <Form
                                form={loginInfo}
                                name="login_form"
                                wrapperCol={{ span: 24 }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}>
                                <Form.Item<loginForm>
                                    name="username"
                                    rules={[{ required: true, message: '请输入用户名!' }]}>
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>

                                <Form.Item<loginForm>
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }]}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password" />
                                </Form.Item>

                                <Form.Item wrapperCol={{ span: 24 }}>
                                    <Button type="primary" htmlType="submit" className='login-form-button'>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div className='footer'>
                                没有账号，去<span style={{ color: '#2D9CDE', cursor: 'pointer' }} onClick={() => { setIsRegister(true) }}>注册</span>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
export default GatewayLogin