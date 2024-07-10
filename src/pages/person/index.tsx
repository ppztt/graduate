import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Input } from "antd"
import type { FormProps } from 'antd'
import { personForm } from "@/type/personType"
import './index.scss'
const Person: React.FC = () => {
    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState(false)
    const [loginInfo] = Form.useForm<personForm>()
    const onFinish: FormProps<personForm>['onFinish'] = (values) => {
        navigate('/back_way/dash_board')
    }
    
    const onFinishFailed: FormProps<personForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    const changeEdit: Function = (): void => {
        if (isEdit) {
            saveInfo()
        }
        setIsEdit(!isEdit)
    }
    const saveInfo: Function = (): void => {
        console.log('发起了一个保存的请求')
    }

    const CommonInfo: React.FC = () => {
        return (
            <div id="person">
                <div className="title">我的信息</div>
                <div className="info-content">
                    <div className="info-item">
                        <span className="label">角色：</span>
                        <span className="value">xxxxxx</span>
                    </div>
                    <div className="info-item">
                        <span className="label">角色：</span>
                        <span className="value">xxxxxx</span>
                    </div>
                    <div className="info-item">
                        <span className="label">角色：</span>
                        <span className="value">xxxxxx</span>
                    </div>
                </div>
            </div>
        )
    }
    const EditInfo: React.FC = () => {
        return (
            <Form
                form={loginInfo}
                name="login_form"
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item<personForm>
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item<personForm>
                    name="sex"
                    rules={[{ required: true, message: '请输入性别!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item<personForm>
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}>
                    <Input
                        type="password"
                        placeholder="Password" />
                </Form.Item>
                <Form.Item<personForm>
                    name="prePassword"
                    rules={[{ required: true, message: '请输入密码!' }]}>
                    <Input
                        type="password"
                        placeholder="Password" />
                </Form.Item>
            </Form>
        )
    }
    return (
        <div>
            <Button type="primary" onClick={() => changeEdit()}>{ isEdit ? '保存' : '编辑'}</Button>
            { isEdit ? <EditInfo/> : <CommonInfo /> }
        </div>
    )
}

export default Person