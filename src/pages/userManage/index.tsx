import React, { useEffect, useState } from "react"
import { Space, Table, Button, Select, Input, Spin } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import type { TableProps } from "antd"
import { roleType, userType } from "@/type/userType"
import $request from '@/api/api'
import './index.scss'
import UserDialog from "./userDialog"

const UserManage: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [roleList, setRoleList] = useState<Array<roleType>>([])
    const [tableData, setTableData] = useState<Array<userType>>([])
    const [userInfo, setUserInfo] = useState<userType>({
        user_name: '',
        organization: ''
    })
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
    const columns: TableProps<userType>['columns'] = [
        {
            title: "用户名",
            key: "user_name",
            dataIndex: 'user_name'
        },
        {
            title: '隶属商户',
            key: 'merchant_name',
            dataIndex: 'merchant_name'
        },
        {
            title: '用户角色',
            key: 'role_level_name',
            dataIndex: 'role_level_name'
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
                    <Button type="link" onClick={() => { setIsEdit(true); setIsShow(true); setUserInfo(record)}}>编辑</Button>
                    <Button danger type="text">删除</Button>
                </Space>
            ),
        }
    ]
    const [isShow, setIsShow] = useState<Boolean>(false)
    const [isEdit, setIsEdit] = useState<Boolean>(false)

    const changePage = (page: number, pageSize: number) => {
		const current = pageSize === paginationProp.defaultPageSize ? page : 1
        setPaginationProp({
            ...paginationProp,
			current,
			defaultPageSize: pageSize
        })
        getTableData({ page: current, size: pageSize})
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
        setIsLoading(true)
        try {
            const params = {
                page: paginationProp.current,
                size: paginationProp.defaultPageSize,
                ...exact
            }
            const res = await $request.User.getUserList(params)
            if (res.result) {
                res.data.forEach((item: any) => {
                    item.role_level_name = roleList.find((role: roleType) => {
                        return role.role_level === item.role_level
                    })?.role_name
                })
                setTableData([...res.data])
                setIsLoading(false)
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
        getRoleList()
        getTableData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id="user-manage">
            <div className="search-area">
                <div className="left-part">
                    <Button type="primary" onClick={() => { setIsShow(true) }}>新增用户</Button>
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
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={tableData} pagination={{ ...paginationProp, position: ['bottomLeft'] }} />
            </Spin>
            <UserDialog isShow={isShow} isEdit={isEdit} userInfo={userInfo} handleShow={handleShow}></UserDialog>
        </div>
    )
}

export default UserManage