import React, { useEffect, useState } from "react"
import { useOutletContext } from 'react-router-dom'
import { Space, Table, Button, Select, Input, Spin, message } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import type { TableProps } from "antd"
import $request from '@/api/api'
import './index.scss'
const ComplainManage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [globalUserInfo, _] = useOutletContext<any>()
    const [searchValue, setSearchValue] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [merchantList, setMerchantList] = useState<Array<any>>([])
    const [tableData, setTableData] = useState<Array<any>>([])
    // 不能写死pageSize
    const [paginationProp, setPaginationProp] = useState({
        current: 1,
        pageSizeOptions: [10, 20, 50],
        defaultPageSize: 10,
        showSizeChanger: true,
        onChange: (page: number, pageSize: number) => {
            changePage(page, pageSize)
        }
    })
    const columns: TableProps<any>['columns'] = [
        {
            title: "单号",
            key: "order_num",
            dataIndex: 'order_num'
        },
        {
            title: "发起人",
            key: "initiator_name",
            dataIndex: 'initiator_name'
        },
        {
            title: '所在区域',
            key: 'area_name',
            dataIndex: 'area_name'
        },
        {
            title: '投诉商户',
            key: 'merchant_name',
            dataIndex: 'merchant_name'
        },
        {
            title: '投诉类型',
            key: 'complain_type_cn',
            dataIndex: 'complain_type_cn'
        },
        {
            title: '状态',
            key: 'status_cn',
            dataIndex: 'status_cn'
        },
        {
            title: "创建时间",
            key: "create_time",
            dataIndex: "create_time"
        },
        {
            title: "更新时间",
            dataIndex: "update_time",
            key: "update_time"
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* record：表格上的数据 */}
                    <Button type="link" onClick={() => { }}>编辑</Button>
                    <Button danger type="text" onClick={() => { delComplain(record.id) }}>删除</Button>
                </Space>
            ),
        }
    ]

    const changePage = (page: number, pageSize: number) => {
        const current = pageSize === paginationProp.defaultPageSize ? page : 1
        setPaginationProp({
            ...paginationProp,
            current,
            defaultPageSize: pageSize
        })
        getTableData({ page: current, size: pageSize })
    }
    const selectChange = (value: string) => {
        setSelectValue(value)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target
        setSearchValue(inputValue)
    }
    const getTableData = async (exact: Object = {}) => {
        setIsLoading(true)
        try {
            const params = {
                page: paginationProp.current,
                size: paginationProp.defaultPageSize,
                area_id: globalUserInfo.area_id,
                ...exact
            }
            const res = await $request.Complain.getComplainList(params)
            if (res.result) {
                setTableData([...res.data])
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getMerchantList = async () => {
        try {
            const params = {
                size: -1
            }
            const res = await $request.Merchant.getMerchantList(params)
            if (res.result) {
                setMerchantList(res.data.map((item: any) => {
                    return {
                        ...item,
                        value: item.id,
                        label: item.merchant_name
                    }
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
    const delComplain = async (id: Number) => {
        try {
            const res = await $request.Complain.delComplainList(id)
            if (res.result) {
                message.success('删除成功')
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getMerchantList()
        getTableData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getTableData({ order_num: searchValue, merchant_id: selectValue })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectValue])
    return (
        <div id="complain-manage">
            <div className="search-area">
                <div className="right-part">
                    <Select
                        allowClear
                        style={{ width: 200 }}
                        placeholder="请选择投诉商户"
                        onClear={() => { setSelectValue('') }}
                        onChange={selectChange}
                        options={merchantList}
                    />
                    <Input
                        onChange={handleChange}
                        style={{ width: 300 + 'px', marginLeft: 10 + 'px', marginRight: 10 + 'px' }}
                        placeholder="请输入单号进行搜索"
                        onKeyDown={(event) => { event.keyCode === 13 && getTableData({ order_num: searchValue, merchant_id: selectValue }) }}>
                    </Input>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => { getTableData({ order_num: searchValue, merchant_id: selectValue }) }}>
                        搜索
                    </Button>
                </div>
            </div>
            {/* position属性不能直接在变量里配置 */}
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={tableData} pagination={{ ...paginationProp, position: ['bottomLeft'] }} />
            </Spin>
        </div>
    )
}
export default ComplainManage
