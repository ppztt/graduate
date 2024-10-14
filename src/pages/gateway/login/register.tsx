import { FC } from 'react'
import type { FormProps } from 'antd'
import { LockOutlined, UserOutlined, PhoneOutlined, FolderOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { registerForm } from '@/type/loginType'
import $request from '@/api/api'
import './index.scss'
const Register: FC<any> = ({ changeIsRegister }) => {
    const [registerInfo] = Form.useForm<registerForm>()
    const onFinish: FormProps<registerForm>['onFinish'] = async (values) => {
        try {
            const params: any = values
            const res = await $request.Gateway.gatewayRegister(params)
            if (res.result) {
                message.success('注册成功！')
                setTimeout(() => {
                    changeIsRegister()
                }, 500)
            } else {
                message.error(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const checkPassword = (_: any, value: any) => {
        if (!value) {
            return Promise.reject(new Error('确认密码不能为空'))
        }
        else if (registerInfo.getFieldValue('password') !== value) {
            return Promise.reject(new Error('两次密码不一致'))
        } else {
            return Promise.resolve()
        }
    }
    const onFinishFailed: FormProps<registerForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <div id='gateway-register'>
            <Form
                form={registerInfo}
                name="login_form"
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item<registerForm>
                    name="user_name"
                    rules={[{ required: true, message: '用户名不能为空' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item<registerForm>
                    name="password"
                    rules={[{ required: true, message: '密码不能为空' }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="请输入密码" />
                </Form.Item>
                <Form.Item<registerForm>
                    name="confirm_password"
                    rules={[{ required: true, validator: checkPassword}]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="请确认密码" />
                </Form.Item>
                <Form.Item<registerForm>
                    name="email"
                    rules={[{ type: 'email', required: true, message: '邮箱不能为空' }]}>
                    <Input
                        prefix={<FolderOutlined className="site-form-item-icon" />}
                        placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item<registerForm>
                    name="phone"
                    rules={[{ required: true, message: '手机号码不能为空' }]}>
                    <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="请输入手机号码" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" className='login-form-button'>
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register