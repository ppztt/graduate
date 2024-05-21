import React from 'react'
import type { FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { loginForm } from '@/type/loginType';
import './index.scss'

const Login: React.FC = () => {
    const [loginInfo] = Form.useForm<loginForm>();
    const onFinish: FormProps<loginForm>['onFinish'] = (values) => {
        console.log('Success:', values)
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
