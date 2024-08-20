import React, { useEffect, useState } from "react"
import { Space, Table, Button, Popconfirm, message, Modal, Form, Input, Select, Spin } from "antd"
import type { TableProps } from "antd"
import { roleType } from "@/type/userType"
import $request from '@/api/api'
import menuList from './constance'

const RoleManage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<Array<roleType>>([])
    const [roleForm] = Form.useForm<roleType>()
    const [currentInfo, setCurrentInfo] = useState<roleType>({role_name: '', desc: '', menu_list: [], role_level: 0}) 
    const columns: TableProps<roleType>['columns'] = [
        {
            key: 'role_name',
            dataIndex: 'role_name',
            title: '角色名称'
        },
        {
            key: 'desc',
            dataIndex: 'desc',
            title: '描述'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* record：表格上的数据 */}
                    <Button onClick={editInfo}>编辑</Button>
                    <Popconfirm
                        title="删除角色"
                        description="确定删除该角色？"
                        onConfirm={() => {deleteRole(record.id)}}
                        okText="确定"
                        cancelText="取消">
                        <Button danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const getTableData = async (exact?: object) => {
        setIsLoading(true)
        try {
            const res = await $request.Role.getRoleList({...exact})
            if (res.result) {
                setTableData(res.data)
                setIsLoading(false)
            }
        } catch (error) {
            
        }
    }
    const deleteRole = async (id: number | string  | undefined) => {
        try {
            const res = await $request.Role.delRole(id)
            if (res.result) {
                message.success('删除成功')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleConfirm = async () => {
        try {
            setIsLoading(true)
            const params = roleForm.getFieldsValue()
            console.log(params)
            let method = 'addRole'
            if (isEdit) {
                method = 'editRole'
                params.id = currentInfo.id
            }
            const res = await $request.Role[method](params)
            if (res.result) {
                message.success(`${isEdit ? '编辑' : '新增' }成功`)
            }
        } catch (error) {
            console.log(error)
        }
    } 
    const handleCancel = async () => {
        setIsModalOpen(false)
    }
    const editInfo = async () => {
        try {
            setIsEdit(true)
            setIsModalOpen(true)
            const res = await $request.Role.getRoleList()
            if (res.result) {
                roleForm.setFieldsValue({role_name: res.data.role_name, desc: res.data.desc})
                setCurrentInfo(res.data)
            }
        } catch (error) {
            
        }
    }
    const closeModal = () => {
        roleForm.resetFields()
    }
    useEffect(() => {
        getTableData()
    }, [])
    return (
        <div id="role-manage">
            <Button type="primary" style={{ marginBottom: '20px'}} onClick={() => {setIsModalOpen(true)}}>新增角色</Button>
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={tableData} />
            </Spin>
            <Modal
                title={isEdit ? '编辑角色' : '新增角色' }
                open={isModalOpen}
                onOk={handleConfirm}
                okText="确定"
                cancelText="取消"
                afterClose={closeModal}
                onCancel={handleCancel}
                confirmLoading={isLoading}>
                <Form
                    form={roleForm}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{role_name: '', desc: ''}}
                    >
                    <Form.Item<roleType>
                        label="角色名称"
                        name="role_name"
                        rules={[{ required: true, message: '请输入角色名称!' }]}
                    >
                        <Input placeholder="角色名称" />
                    </Form.Item>
                    <Form.Item<roleType>
                        label="菜单权限"
                        name="menu_list"
                        rules={[{ required: true, message: '请选择菜单权限!' }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="请选择菜单"
                            options={menuList}
                        />
                    </Form.Item>
                    
                    <Form.Item<roleType>
                        label="描述"
                        name="desc"
                        rules={[{ required: true, message: '请输入角色描述!' }]}>
                        <Input.TextArea placeholder="角色描述" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default RoleManage