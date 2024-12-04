import React from 'react'
import type { FormProps } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginForm } from '@/type/loginType'
import $request from '@/api/api'
import './index.scss'


const Login: React.FC = () => {
    const navigate = useNavigate()
    const [loginInfo] = Form.useForm<loginForm>()
    const onFinish: FormProps<loginForm>['onFinish'] = async ({ username, password }) => {
        try {
            const params: any = {
                user_name: username,
                password
            }
            const res = await $request.User.userLogin(params)
            if (res.result) {
                message.success('登录成功！')
                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                setTimeout(() => {
                    navigate('/back_way/dash_board')
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
        <div id='backway-login' className='login-layout'>
            <div className='login-box'>
                <div className='title'>校园维权后台管理</div>
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
            </div>
        </div>
    )
}

export default Login
