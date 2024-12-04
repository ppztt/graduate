import { FC, useEffect, useState } from 'react'
import { Button, Spin, Table, Modal, Space } from 'antd'
import type { TableProps } from "antd"
import $request from '@/api/api'
import { complainType } from '@/type/complain'
import './style.scss'
const ComplainResult: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<Array<any>>([])
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '')
    const [detailInfo, setDetailInfo] = useState<complainType>({
        complain_type_cn: '',
        area_name: '',
        merchant_name: ''
    })
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
    const columns: TableProps<any>['columns'] = [
        {
            key: 'order_num',
            dataIndex: 'order_num',
            title: '单号'
        },
        {
            key: 'area_name',
            dataIndex: 'area_name',
            title: '区域'
        },
        {
            key: 'merchant_name',
            dataIndex: 'merchant_name',
            title: '商家'
        },
        {
            key: 'complain_type_cn',
            dataIndex: 'complain_type_cn',
            title: '投诉类型'
        },
        {
            key: 'status_cn',
            dataIndex: 'status_cn',
            title: '状态'
        },
        {
            key: 'create_time',
            dataIndex: 'create_time',
            title: '创建时间'
        },
        {
            key: 'update_time',
            dataIndex: 'update_time',
            title: '更新时间'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* record：表格上的数据 */}
                    <Button type="primary" onClick={() => { editInfo(record) }}>查看</Button>
                </Space>
            )
        }
    ]
    const getTableData = async (exact: any = {}) => {
        try {
            setIsLoading(true)
            const params = {
				page: paginationProp.current,
				size: paginationProp.defaultPageSize,
                id: userInfo.id,
				...exact
			}
            const res = await $request.Gateway.getComplainList(params)
            if (res.result) {
                setTableData(res.data)
                setIsLoading(false)
                setPaginationProp({
                    ...paginationProp,
                    current: params.page,
                    total: res.count
                })
            }
        } catch (error) {
            console.log(error)
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
    const handleCancel = () => { 
        setIsModalOpen(false)
    }
    const editInfo = (obj: any) => { 
        setDetailInfo(obj)
        setIsModalOpen(true)
    }
    const labelStyle = { width: '50px', minWidth: '50px', fontSize: '18px', fontWeight: 600}
    useEffect(() => {
        getTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id='complain-result'>
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={tableData} pagination={{ ...paginationProp, position: ['bottomLeft'] }} />
            </Spin>
            <Modal
                title={'投诉详情'}
                open={isModalOpen}
                onOk={() => { setIsModalOpen(false) }}
                okText="确定"
                cancelText="取消"
                onCancel={handleCancel}
                confirmLoading={isLoading}>
                    <div className='detail-info' style={{ padding: '0 20px'}}>
                        <div className="info-box" style={{ display: 'flex'}}>
                            <span className='label' style={labelStyle}>区域: </span>
                            <span className='value'>{detailInfo.area_name || '--'}</span>
                        </div>
                        <div className="info-box">
                            <span className='label'  style={labelStyle}>商家: </span>
                            <span className='value'>{detailInfo.merchant_name || '--'}</span>
                        </div>
                        <div className="info-box">
                            <span className='label' style={labelStyle}>投诉内容: </span>
                            <span className='value'>{detailInfo.content || '--'}</span>
                        </div>
                        <div className="info-box">
                            <span className='label' style={labelStyle}>结果: </span>
                            <span className='value'>{detailInfo.result || '--'}</span>
                        </div>
                    </div>
            </Modal>
        </div>
    )
}

export default ComplainResult