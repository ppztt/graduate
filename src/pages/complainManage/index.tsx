import React, { useEffect, useState } from "react"
import { Space, Table, Button, Select, Input, Spin, message } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import type { TableProps } from "antd"
import $request from '@/api/api'
import './index.scss'
const ComplainManage: React.FC = () => {
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
        title: "用户名",
        key: "user_name",
        dataIndex: 'user_name'
      },
      {
        title: '投诉商户',
        key: 'merchant_name',
        dataIndex: 'merchant_name'
      },
      {
        title: '用户角色',
        key: 'role_name',
        dataIndex: 'role_name'
      },
      {
        title: '描述',
        key: 'desc',
        dataIndex: 'desc'
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
    return (
      <div id="complain-manage">
        <div className="search-area">
          <div className="right-part">
            <Select
              allowClear
              style={{ width: 200 }}
              placeholder="请选择角色类型"
              onChange={selectChange}
              options={merchantList}
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
      </div>
    )
}
export default ComplainManage
