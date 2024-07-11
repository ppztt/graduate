import React, { useEffect, useState } from "react"
import { Space, Table, Tag, Button, Select, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import type { TableProps } from "antd"
import './index.scss'

const UserManage: React.FC = () => {
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }
    const [tableData, setTableData] = useState<Array<DataType>>([])
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Button>{text}</Button>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                    </Tag>
                );
                })}
            </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
            <Space size="middle">
                <Button>Invite {record.name}</Button>
                <Button>Delete</Button>
            </Space>
            ),
        }
    ]

    const getTableData = () => {
        setTableData([
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sydney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
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