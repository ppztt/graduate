import React, { useEffect, useState } from "react"
import { Modal, Form, Input, Select } from "antd"
import { userType } from "@/type/userType"
import $request from '@/api/api'
const UserDialog: React.FC<any> = ({ isShow, isEdit, userInfo, handleShow }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [merchantList, setMerchantList] = useState([])
    const [roleList, setRoleList] = useState([])
    const userForm = Form.useForm()
    const handleConfirm = () => {
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
    const closeModal = () => { }
    useEffect(() => {
        getMerchantList()
        getRoleList()
    }, [])
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
                // form={userForm}
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
                    label="隶属组织"
                    name="organization"
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
                    name="role"
                    rules={[{ required: true, message: '请选择用户所属角色!' }]}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择所属角色"
                        options={roleList}
                    />
                </Form.Item>

                <Form.Item<userType>
                    label="描述"
                    name="desc"
                    rules={[{ required: true, message: '请输入角色描述!' }]}>
                    <Input placeholder="角色描述" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserDialog