import React from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { loginForm } from '@/type/loginType';
import './index.scss'

export default function Login() {
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
                    name="login_form"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item<loginForm>
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item<loginForm>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}