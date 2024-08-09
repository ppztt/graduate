import React, { useState } from "react"
import { Modal, Form, Input, Select } from "antd"
import { roleType } from "@/type/userType"

const UserDialog: React.FC<any> = ({ isShow, isEdit, userInfo, handleShow }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
                <Form.Item<roleType>
                    label="用户名"
                    name="role_name"
                    rules={[{ required: true, message: '请输入角色名称!' }]}>
                    <Input placeholder="角色名称" />
                </Form.Item>

                <Form.Item<roleType>
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