import React, { useEffect, useState } from "react"
import { Space, Table, Button } from "antd"
import type { TableProps } from "antd"
import { roleTableType } from "@/type/tableType"
const RoleManage: React.FC = () => {
    const [tableData, setTableData] = useState<Array<roleTableType>>([])
    const columns: TableProps<roleTableType>['columns'] = [
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
                    <Button>Invite</Button>
                    <Button>Delete</Button>
                </Space>
            ),
        }
    ]

    const getTableData = () => {
        setTableData([
            {
                role_name: 'John Brown',
                desc: ''
            },
            {
                role_name: 'Jim Green',
                desc: ''
            },
            {
                role_name: 'Joe Black',
                desc: ''
            }
        ])
    }
    useEffect(() => {
        getTableData()
    })
    return (
        <div id="role-manage">
            <Button type="primary" style={{ marginBottom: '20px'}}>新增角色</Button>
            <Table columns={columns} dataSource={tableData} />
        </div>
    )
}
export default RoleManage