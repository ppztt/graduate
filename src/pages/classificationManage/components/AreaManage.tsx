import React, { useEffect, useState } from "react"
import { Space, Table, Button, Popconfirm, message, Modal, Form, Input, Spin } from "antd"
import type { TableProps } from "antd"
import { areaType } from "@/type/merchantType"
import $request from '@/api/api'

const AreaManage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [paginationProp, setPaginationProp] = useState({
        current: 1,
        pageSizeOptions: [10, 20, 50],
		defaultPageSize: 10,
        total: 0,
        showSizeChanger: true,
        onChange: (page: number, pageSize: number) => {
            changePage(page, pageSize)
        }
    })
    const [tableData, setTableData] = useState<Array<areaType>>([])
    const [areaForm] = Form.useForm<areaType>()
    const [currentInfo, setCurrentInfo] = useState<areaType>({ area_name: '', desc: '' })
    const columns: TableProps<areaType>['columns'] = [
        {
            key: 'area_name',
            dataIndex: 'area_name',
            title: '区域名称'
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
                        onConfirm={() => { deleteArea(record.id || 0) }}
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
            const res = await $request.Merchant.getAreaList(params)
            if (res.result) {
                setTableData(res.data)
                setIsLoading(false)
                setPaginationProp({
                    ...paginationProp,
                    total: res.count
                })
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
    const deleteArea = async (id: number) => {
        try {
            const res = await $request.Merchant.delArea(id)
            if (res.result) {
                message.success('删除成功')
                getTableData()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleConfirm = async () => {
        try {
            setIsLoading(true)
            const params = areaForm.getFieldsValue()
            const res = isEdit ? await $request.Merchant.editArea(currentInfo.id, params) : await $request.Merchant.addArea(params)
            if (res.result) {
                message.success(`${isEdit ? '编辑' : '新增'}成功`)
            }
            setIsLoading(false)
            setIsModalOpen(false)
            getTableData()
        } catch (error) {
            console.log(error)
        }
    }
    const handleCancel = async () => {
        setIsModalOpen(false)
    }
    const closeModal = () => {
        areaForm.resetFields()
        setCurrentInfo({area_name: '', desc: ''})
    }
    useEffect(() => {
        getTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        areaForm.setFieldsValue(currentInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentInfo])
    return (
        <div id="role-manage">
            <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => { setIsModalOpen(true) }}>新增区域</Button>
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
                    form={areaForm}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ area_name: '', desc: '' }}
                >
                    <Form.Item<areaType>
                        label="区域名称名称"
                        name="area_name"
                        rules={[{ required: true, message: '请输入区域名称名称!' }]}
                    >
                        <Input placeholder="区域名称名称" />
                    </Form.Item>
                    <Form.Item<areaType>
                        label="描述"
                        name="desc"
                        rules={[{ required: true, message: '请输入区域描述!' }]}>
                        <Input.TextArea placeholder="区域描述" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AreaManage