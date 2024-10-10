import React, { useEffect, useState } from "react"
import { Button, Form, Input, Select, Alert, message, Upload } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import type { FormProps, GetProp, UploadProps } from 'antd'
import { personForm } from "@/type/personType"
import $request from '@/api/api'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const EditInfo: React.FC<any> = ({ userInfo }) => {
    const [isNew, setIsNew] = useState(false)
    const [form] = Form.useForm<personForm>()
    const [imageUrl, setImageUrl] = useState<string>()
    const saveInfo: FormProps<personForm>['onFinish'] = async (values) => {
        try {
            const { file } = values.avatar
            const formData: FormData = new FormData()
            Object.keys(values).forEach((key: string) => {
                formData.append(key, values[key])
            })
            file && formData.append('file', file.originFileObj)
            formData.delete('avatar')
            console.log(values)
            const res = await $request.User.editUser(userInfo.id, formData, {headers: {
                "Content-Type": "multipart/form-data"
            }})
            if (res?.result) {
                message.success('修改成功')
                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                res.data.avatar && setImageUrl(`http://localhost:3000${res.data.avatar}`)
            }
        } catch (error) {
            console.log(error)
        }
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
    // 文件上传处理
    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('仅能够上传png/jpeg文件');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图标大小不能超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            // setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            console.log('done')
        }
    }
    const fileUpload = (options: any) => {
        const { file } = options
        const blob = new Blob([file], { type: 'text/plain' })
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImageUrl(URL.createObjectURL(blob))
        })
        reader.readAsDataURL(file)
    }
    const uploadButton = (
        <button style={{ border: 0, background: 'none', width: "100%", height: '100%' }} type="button">
          {imageUrl ?
            <div
                className="avatar-box"
                style={{ backgroundImage: `url(${imageUrl})` }} /> : <PlusOutlined />}
        </button>
      )
    useEffect(() => {
        setIsNew(!!newPassword)
    }, [newPassword])
    useEffect(() => {
        setImageUrl(userInfo.avatar ? `http://localhost:3000${userInfo.avatar}`: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id="edit-info">
            <Alert style={{ width: 400 + 'px' }} message="请输入密码进行修改信息！" type="info" />
            <br />
            <Form
                form={form}
                name="person_form"
                labelAlign="left"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ ...userInfo }}
                onFinish={saveInfo}>
                <Form.Item<personForm>
                    label="头像"
                    name="avatar">
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        maxCount={1}
                        customRequest={fileUpload}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}>
                        {uploadButton}
                    </Upload>
                </Form.Item>
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