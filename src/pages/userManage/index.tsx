import React, { useEffect, useState } from "react"
import { Space, Table, Button, Select, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import type { TableProps } from "antd"
import { userTableType } from "@/type/tableType"
import './index.scss'

const UserManage: React.FC = () => {
    const [tableData, setTableData] = useState<Array<userTableType>>([])
    const columns: TableProps<userTableType>['columns'] = [
        {
            title: "用户名",
            key: "user_name",
            dataIndex: 'user_name'
        },
        {
            title: '用户等级',
            key: 'role_level',
            dataIndex: 'role_level'
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
                <Button>Invite {record.user_name}</Button>
                <Button>Delete</Button>
            </Space>
            ),
        }
    ]

    const getTableData = () => {
        setTableData([
            {
                key: '1',
                user_name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
                create_time: '2021-11-01',
                update_time: '2021-11-01'
            },
            {
                key: '2',
                user_name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
                create_time: '2021-11-01',
                update_time: '2021-11-01'
            },
            {
                key: '3',
                user_name: 'Joe Black',
                age: 32,
                address: 'Sydney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
                create_time: '2021-11-01',
                update_time: '2021-11-01'
            }
        ])
    }
    const getRoleList = () => {}
    useEffect(() => {
        getTableData()
        getRoleList()
    })
    return (
        <div id="user-manage">
            <div className="search-area">
                <Select
                    defaultValue="男"
                    style={{ width: 120 }}
                    options={[
                        { value: 1, label: '男' },
                        { value: 2, label: '女' }
                    ]}
                />
                <Input style={{ width: 300 + 'px', marginLeft: 10 + 'px', marginRight: 10 + 'px'}} placeholder="请输入用户名进行搜索"></Input>
                <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
            </div>
            <Table columns={columns} dataSource={tableData} />
        </div>
    )
}

export default UserManage