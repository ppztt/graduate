import React, { useEffect, useState } from "react"
import { Space, Table, Button, Popconfirm, message, Modal, Form, Input, Spin } from "antd"
import type { TableProps } from "antd"
import { complainTypeDefinition } from "@/type/complain"
import $request from '@/api/api'

const ComplainType: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [paginationProp, setPaginationProp] = useState({
        current: 1,
        pageSizeOptions: [10, 20, 50],
		defaultPageSize: 10,
        showSizeChanger: true,
        onChange: (page: number, pageSize: number) => {
            changePage(page, pageSize)
        }
    })
    const [tableData, setTableData] = useState<Array<complainTypeDefinition>>([])
    const [complainTypeForm] = Form.useForm<complainTypeDefinition>()
    const [currentInfo, setCurrentInfo] = useState<complainTypeDefinition>({ type_name: '', desc: '' })
    const columns: TableProps<complainTypeDefinition>['columns'] = [
        {
            key: 'type_name',
            dataIndex: 'type_name',
            title: '投诉类型名称'
        },
        {
            key: 'desc',
            dataIndex: 'desc',
            title: '描述'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* record：表格上的数据 */}
                    <Button onClick={() => { setCurrentInfo(record); setIsEdit(true); setIsModalOpen(true) }}>编辑</Button>
                    <Popconfirm
                        title="删除"
                        description="确定删除该类型？"
                        onConfirm={() => { deleteComplainType(record.id || 0) }}
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
            const params = {
                page: paginationProp.current,
                size: paginationProp.defaultPageSize,
                ...exact
            }
            const res = await $request.Complain.getComplaintType(params)
            if (res.result) {
                setTableData(res.data)
                setIsLoading(false)
            }
        } catch (error) {

        }
    }
    const changePage = (page: number, pageSize: number) => {
		const current = pageSize === paginationProp.defaultPageSize ? page : 1
        setPaginationProp({
            ...paginationProp,
			current,
			defaultPageSize: pageSize
        })
        getTableData({ page: current, size: pageSize})
    }
    const deleteComplainType = async (id: number) => {
        try {
            const res = await $request.Complain.delComplainType(id)
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
            const params = complainTypeForm.getFieldsValue()
            const res = isEdit ? await $request.Complain.editComplainType(currentInfo.id, params) : await $request.Complain.addComplainType(params)
            if (res.result) {
                message.success(`${isEdit ? '编辑' : '新增'}成功`)
                setIsLoading(false)
                setIsModalOpen(false)
                getTableData()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleCancel = async () => {
        setIsModalOpen(false)
    }
    const closeModal = () => {
        complainTypeForm.resetFields()
        setCurrentInfo({type_name: '', desc: ''})
    }
    useEffect(() => {
        getTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        complainTypeForm.setFieldsValue(currentInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentInfo])
    return (
        <div id="role-manage">
            <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => { setIsModalOpen(true) }}>新增投诉类型</Button>
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={tableData} pagination={{ ...paginationProp, position: ['bottomLeft'] }} />
            </Spin>
            <Modal
                title={isEdit ? '编辑类型' : '新增类型'}
                open={isModalOpen}
                onOk={handleConfirm}
                okText="确定"
                cancelText="取消"
                afterClose={closeModal}
                onCancel={handleCancel}
                confirmLoading={isLoading}>
                <Form
                    form={complainTypeForm}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ type_name: '', desc: '' }}
                >
                    <Form.Item<complainTypeDefinition>
                        label="投诉类型名称"
                        name="type_name"
                        rules={[{ required: true, message: '请输入投诉类型名称!' }]}
                    >
                        <Input placeholder="投诉类型名称" />
                    </Form.Item>
                    <Form.Item<complainTypeDefinition>
                        label="描述"
                        name="desc"
                        rules={[{ required: true, message: '请输入类型描述!' }]}>
                        <Input.TextArea placeholder="类型描述" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ComplainType