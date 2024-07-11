import React from "react"
import { Button, Form, Input, Select, Alert } from "antd"
import type { FormProps } from 'antd'
import { personForm } from "@/type/personType"


const EditInfo: React.FC = () => {
    const [form] = Form.useForm<personForm>()
    
    const saveInfo: FormProps<personForm>['onFinish'] = (values) => {
        console.log(values)
    }
    
    const onFinishFailed: FormProps<personForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    const handleChange = (value: string) => {
        console.log(form)
    }
    return (
        <div id="edit-info">
            <Alert style={{ width: 400 + 'px' }} message="请输入密码进行修改信息！" type="info" />
            <br/>
            <Form
                form={form}
                name="person_form"
                labelAlign="left"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={saveInfo}
                onFinishFailed={onFinishFailed}>
                <Form.Item<personForm>
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '用户名不能为空！' }]}>
                    <Input placeholder="用户名" />
                </Form.Item>
                <Form.Item<personForm>
                    label="性别"
                    name="sex"
                    rules={[{ required: true, message: '性别不能为空！' }]}>
                    <Select
                        defaultValue="男"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 1, label: '男' },
                            { value: 2, label: '女' }
                        ]}
                        />
                </Form.Item>
                <Form.Item<personForm>
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '密码不能为空' }]}>
                    <Input
                        type="password"
                        placeholder="请输入密码" />
                </Form.Item>
                <Form.Item<personForm>
                    label="新密码"
                    name="newPassword"
                    rules={[{ required: true, message: '新密码不能为空' }]}>
                    <Input
                        type="password"
                        placeholder="请输入新密码" />
                </Form.Item>
                <Form.Item<personForm>
                    label="确认密码"
                    name="prePassword"
                    rules={[{ required: true, message: '请确认密码！' }]}>
                    <Input
                        type="password"
                        placeholder="请确认密码" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" className='login-form-button'>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditInfo