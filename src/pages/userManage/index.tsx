import React, { useEffect, useState } from "react"
import { Space, Table, Button, Select, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import type { TableProps } from "antd"
import { roleType, userTableType } from "@/type/userType"
import $request from '@/api/api'
import './index.scss'
import UserDialog from "./userDialog"

const UserManage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [roleList, setRoleList] = useState<Array<roleType>>([])
    const [tableData, setTableData] = useState<Array<userTableType>>([])
    // 不能写死pageSize
    const [paginationProp, setPaginationProp] = useState({
        current: 1,
        pageSizeOptions: [10, 20, 50],
        showSizeChanger: true,
        onChange: (page: number) => {
            changePage(page)
        },
        onShowSizeChange: (current: any, pageSize: number) => {
            changePageSize(pageSize)
        }
    })
    const columns: TableProps<userTableType>['columns'] = [
        {
            title: "用户名",
            key: "user_name",
            dataIndex: 'user_name'
        },
        {
            title: '用户等级',
            key: 'role_level',
            dataIndex: 'role_level',
            render: (_, record) => (
                <Space size="middle">
                    {roleList.find((item: roleType) => item.role_level === record.role_level)?.role_name}
                </Space>
            ),
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* record：表格上的数据 */}
                    <Button type="link">编辑</Button>
                    <Button danger type="text">删除</Button>
                </Space>
            ),
        }
    ]
    const [isShow, setIsShow] = useState<Boolean>(false)

    const changePage = (page: number) => {
        setPaginationProp({
            ...paginationProp,
            current: page
        })
        getTableData()
    }
    const changePageSize = (pageSize: number) => {
        setPaginationProp({
            ...paginationProp,
            current: 1
        })
        getTableData({ size: pageSize })

    }
    const selectChange = (value: string) => {
        setSelectValue(value)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target
        setSearchValue(inputValue)
    }
    const handleShow = (val: Boolean) => {
        setIsShow(val)
    }
    const getTableData = async (exact: Object = {}) => {
        try {
            const params = {
                page: paginationProp.current,
                size: 10,
                ...exact
            }
            const res = await $request.User.getUserList(params)
            if (res.result) {
                setTableData([...res.data])
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getRoleList = async () => {
        try {
            const res = await $request.Role.getRoleList({ size: -1 })
            if (res.result) {
                setRoleList(res.data.map((item: roleType) => {
                    return {
                        ...item,
                        value: item.role_level,
                        label: item.role_name
                    }
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTableData()
        getRoleList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id="user-manage">
            <div className="search-area">
                <div className="left-part">
                    <Button type="primary">新增用户</Button>
                </div>
                <div className="right-part">
                    <Select
                        allowClear
                        style={{ width: 200 }}
                        placeholder="请选择角色类型"
                        onChange={selectChange}
                        options={roleList}
                    />
                    <Input
                        onChange={handleChange}
                        style={{ width: 300 + 'px', marginLeft: 10 + 'px', marginRight: 10 + 'px' }}
                        placeholder="请输入用户名进行搜索"
                        onKeyDown={(event) => { event.keyCode === 13 && getTableData({ user_name: searchValue, role_level: selectValue }) }}>
                    </Input>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => { getTableData({ user_name: searchValue, role_level: selectValue }) }}>
                        搜索
                    </Button>
                </div>
            </div>
            {/* position属性不能直接在变量里配置 */}
            <Table columns={columns} dataSource={tableData} pagination={{ ...paginationProp, position: ['bottomLeft'] }} />
            <UserDialog isShow={isShow} handleShow={handleShow}></UserDialog>
        </div>
    )
}

export default UserManage