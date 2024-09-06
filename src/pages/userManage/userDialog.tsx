import React, { useState } from "react"
import { Modal, Form, Input, Select } from "antd"
import { userType } from "@/type/userType"

const UserDialog: React.FC<any> = ({ isShow, isEdit, userInfo, handleShow }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [organizationList, setOrganizationList] = useState([])
    const userForm = Form.useForm()
    const handleConfirm = () => {
        handleShow(false)
    }
    const handleCancel = () => {
        handleShow(false)
    }
    const closeModal = () => { }
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
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择隶属组织"
                        options={organizationList}
                    />
                </Form.Item>

                <Form.Item<userType>
                    label="所属角色"
                    name="organization"
                    rules={[{ required: true, message: '请选择用户所属组织!' }]}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择所属角色"
                        options={organizationList}
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