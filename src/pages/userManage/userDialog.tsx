import React, { useEffect, useState } from "react"
import { Modal, Form, Input, Select, message } from "antd"
import { roleType, userType } from "@/type/userType"
import $request from '@/api/api'
const UserDialog: React.FC<any> = ({ isShow, isEdit, userInfo, handleShow }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [merchantList, setMerchantList] = useState<Array<userType>>([])
    const [roleList, setRoleList] = useState<Array<roleType>>([])
    const [userForm] = Form.useForm()
    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            const params = await userForm.validateFields()
            params.role_name = roleList.find((role: roleType) => role.role_level === params.role_level)?.role_name
            params.merchant_name = merchantList.find((merchant: any) => merchant.id === params.merchant_id)?.merchant_name
            const res = await $request.User.addUser(params)
            if (res.result) {
                message.success('新增用户成功')
            }
        } catch (error) {
            console.log(error)
        }
        handleShow(false)
    }
    const handleCancel = () => {
        handleShow(false)
    }
    const getMerchantList = async () => {
        try {
            const res = await $request.Merchant.getMerchantList({size: -1})
            if (res.result) {
                setMerchantList(res.data.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.merchant_name,
                        ...item
                    }
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getRoleList = async () => {
        try {
            const res = await $request.Role.getRoleList({ size: -1})
            if (res.result) {
                setRoleList(res.data.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.role_name,
                        ...item
                    }
                }))
            }
        } catch (error) {
            
        }
    }
    const closeModal = () => {
        setIsLoading(false)
        userForm.resetFields()
    }
    useEffect(() => {
        getMerchantList()
        getRoleList()
    }, [])
    useEffect(() => {
        if (isEdit) {
            userForm.setFieldsValue(userInfo)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])
    return (
        <Modal
            title={isEdit ? '编辑用户' : '新增用户'}
            open={isShow}
            onOk={handleConfirm}
            okText="确定"
            cancelText="取消"
            afterClose={closeModal}
            onCancel={handleCancel}
            confirmLoading={isLoading}>
            <Form
                form={userForm}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ role_name: '', desc: '' }}>
                <Form.Item<userType>
                    label="用户名"
                    name="user_name"
                    rules={[{ required: true, message: '请输入用户名称!' }]}>
                    <Input placeholder="用户名称" />
                </Form.Item>
                <Form.Item<userType>
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: '请输入邮箱!' }]}>
                    <Input placeholder="邮箱" />
                </Form.Item>
                <Form.Item<userType>
                    label="电话号码"
                    name="phone"
                    rules={[{ required: true, message: '请输入电话号码!' }]}>
                    <Input placeholder="电话号码" />
                </Form.Item>

                <Form.Item<userType>
                    label="隶属组织"
                    name="merchant_id"
                    rules={[{ required: true, message: '请选择用户所属组织!' }]}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择隶属组织"
                        options={merchantList}
                    />
                </Form.Item>

                <Form.Item<userType>
                    label="所属角色"
                    name="role_level"
                    rules={[{ required: true, message: '请选择用户所属角色!' }]}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择所属角色"
                        options={roleList}
                    />
                </Form.Item>

                {/* <Form.Item<userType>
                    label="描述"
                    name="desc"
                    rules={[{ required: true, message: '请输入角色描述!' }]}>
                    <Input placeholder="角色描述" />
                </Form.Item> */}
            </Form>
        </Modal>
    )
}

export default UserDialog