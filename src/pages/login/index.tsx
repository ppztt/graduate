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
    const [messageApi, contextHolder] = message.useMessage();
    const [loginInfo] = Form.useForm<loginForm>()
    const onFinish: FormProps<loginForm>['onFinish'] = async ({ username, password }) => {
        try {
            const params: any = {
                user_name: username,
                password
            }
            const res = await $request.User.userLogin(params)
            if (res.result) {
                messageApi.open({
                    type: 'success',
                    content: '登录成功！'
                })
                setTimeout(() => {
                    navigate('/back_way/dash_board')
                }, 500)
            } else {
                messageApi.open({
                    type: 'error',
                    content: res.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const onFinishFailed: FormProps<loginForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <div className='login-layout'>
            <div className='login-box'>
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
                        <div>立即注册</div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
