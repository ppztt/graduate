import React, { useEffect, useState } from "react"
import { Space, Table, Button, Select, Input, Spin, message } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import type { TableProps } from "antd"
import $request from '@/api/api'
import ContentModal from "./contentModal"
import './index.scss'
const ContentManage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [typeList, setTypeList] = useState<Array<any>>([])
    const [isEdit, setIsEdit] = useState<Boolean>(false)
    const [isShow, setIsShow] = useState<Boolean>(false)
    const [tableData, setTableData] = useState<Array<any>>([])
    const [currentInfo, setCurrentInfo] = useState<any>({})
    // 不能写死pageSize
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
            title: "标题",
            key: "title",
            dataIndex: 'title'
        },
        {
            title: '文章类型',
            key: 'complaint_type_cn',
            dataIndex: 'complaint_type_cn'
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
                    <Button type="link" onClick={() => { openModal(record) }}>编辑</Button>
                    <Button danger type="text" onClick={() => { delContent(record.id) }}>删除</Button>
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
                ...exact
            }
            const res = await $request.Content.getContentList(params)
            if (res.result) {
                setTableData([...res.data])
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
    const getTypeList = async () => {
        try {
            const params = {
                size: -1
            }
            const res = await $request.Complain.getComplaintType(params)
            if (res.result) {
                setTypeList(res.data.map((item: any) => {
                    return {
                        value: Number(item.id),
                        label: item.type_name
                    }
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
    const delContent = async (id: Number) => {
        try {
            const res = await $request.Complain.delContent(id)
            if (res.result) {
                message.success('删除成功')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const openModal = (data: any) => {
        setCurrentInfo({...data, complaint_type: Number(data.complaint_type)})
        setIsEdit(true)
        setIsShow(true)
    }
    useEffect(() => {
        getTableData()
        getTypeList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id="complain-manage">
            <div className="search-area">
                <div className="left-part">
                    <Button
                        type="primary"
                        onClick={() => { setIsShow(true) }}>
                        新增文章
                    </Button>
                </div>
                <div className="right-part">
                    <Select
                        allowClear
                        style={{ width: 200 }}
                        placeholder="请选择投诉类型"
                        onChange={selectChange}
                        options={typeList}
                    />
                    <Input
                        onChange={handleChange}
                        style={{ width: 300 + 'px', marginLeft: 10 + 'px', marginRight: 10 + 'px' }}
                        placeholder="请输入文章标题进行搜索"
                        onKeyDown={(event) => { event.keyCode === 13 && getTableData({ title: searchValue, complaint_type: selectValue }) }}>
                    </Input>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => { getTableData({ title: searchValue, complaint_type: selectValue }) }}>
                        搜索
                    </Button>
                </div>
            </div>
            {/* position属性不能直接在变量里配置 */}
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={tableData} pagination={{ ...paginationProp, position: ['bottomLeft'] }} />
            </Spin>
            <ContentModal
                isEdit={isEdit}
                isShow={isShow}
                typeList={typeList}
                currentInfo={currentInfo}
				changeShow={
					(val: boolean) => {
						getTableData()
						setIsShow(val)
						setIsEdit(val) 
					}}>
            </ContentModal>
        </div>
    )
}
export default ContentManage
