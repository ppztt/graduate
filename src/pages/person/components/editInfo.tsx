import React, { useEffect, useState } from "react"
import { Button, Form, Input, Select, Alert, message } from "antd"
import type { FormProps } from 'antd'
import { personForm } from "@/type/personType"
import $request from '@/api/api'

const EditInfo: React.FC<any> = ({ userInfo}) => {
    const [isNew, setIsNew] = useState(false)
    const [form] = Form.useForm<personForm>()
    const saveInfo: FormProps<personForm>['onFinish'] = async (values) => {
        try {
            const params = {
                ...values
            }
            const res = await $request.User.editUser(userInfo.id, params)
            if (res.result) {
                message.success('修改成功')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onFinishFailed: FormProps<personForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    const handleChange = (value: string) => {
        console.log(form)
    }
    const newPassword = Form.useWatch('newPassword', form)
    const checkPassword = (_: any, value: string, callBack: any) => {
        if (!isNew) {
            callBack()
        }
        const val = form.getFieldValue('newPassword')
        if (val === value) {
            callBack()
        }
        callBack(new Error('两次密码不一致'))
    }
    useEffect(() => {
        setIsNew(!!newPassword)
    },[newPassword])
    return (
        <div id="edit-info">
            <Alert style={{ width: 400 + 'px' }} message="请输入密码进行修改信息！" type="info" />
            <br/>
            <Form
                form={form}
                name="person_form"
                labelAlign="left"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 20 }}
                initialValues={{...userInfo}}
                onFinish={saveInfo}
                onFinishFailed={onFinishFailed}>
                <Form.Item<personForm>
                    label="用户名"
                    name="user_name"
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
                    label="邮箱"
                    name="email"
                    rules={[
                        { type: 'email', message: '邮箱格式不正确' },
                        { required: true, message: '邮箱不能为空' }
                    ]}>
                    <Input placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item<personForm>
                    label="电话号码"
                    name="phone"
                    rules={[{ required: true, message: '电话号码不能为空' }]}>
                    <Input placeholder="请输入电话号码" />
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
                    rules={[{ required: isNew, message: '新密码不能为空' }]}>
                    <Input
                        type="password"
                        placeholder="请输入新密码" />
                </Form.Item>
                <Form.Item<personForm>
                    label="确认密码"
                    name="prePassword"
                    rules={[
                        { required: isNew, message: '请确认密码！' },
                        { validator: checkPassword }
                    ]}>
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