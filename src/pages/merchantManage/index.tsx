import React, { useState, useEffect } from 'react'
import { Table, Space, Button, Popconfirm, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { merchantTableType } from '@/type/merchantType'
import { searchTypeList } from './constance'
import $request from '@/api/api'
import MerchantModal from './merchantModal'
import type { TableProps } from 'antd'
const Merchant: React.FC = () => {
	const [tableData, setTableData] = useState<Array<merchantTableType>>([])
	const [selectValue, setSelectValue] = useState<string>('')
	const [searchValue, setSearchValue] = useState<string>('')
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isShow, setIsShow] = useState<boolean>(false)
	const [currentInfo, setCurrentInfo] = useState<object>({})
	const columns: TableProps<merchantTableType>['columns'] = [
		{
			key: 'merchant_name',
			dataIndex: 'merchant_name',
			title: '商户名称'
		},
		{
			key: 'merchant_desc',
			dataIndex: 'merchant_desc',
			title: '商户描述'
		},
		{
			key: 'address',
			dataIndex: 'address',
			title: '地址',
			render: (_, record) => (
				<Space size="middle">
					{/* record：表格上的数据 */}
					{`${record.address}${record.floor}楼`}
				</Space>
			)
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
					<Button type='link' onClick={() => { setIsEdit(true); setIsShow(true); setCurrentInfo(record)}}>编辑</Button>
					<Popconfirm
						title="删除商户"
						description="确定删除该商户？"
						onConfirm={() => { }}
						okText="确定"
						cancelText="取消">
						<Button danger>删除</Button>
					</Popconfirm>
				</Space>
			),
		}
	]
	const getTableData = async (exact?: Object) => {
		try {
			const params = {
				page: 1,
				size: 10,
				...exact
			}
			const res = await $request
			if (res.result) {
				setTableData(res.data)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const selectChange = (value: string) => {
		setSelectValue(value)
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputValue } = e.target
		setSearchValue(inputValue)
	}
	useEffect(() => {
		// getTableData()
	}, [])
	return (
		<div id='merchant-manage'>
			<div className='search-area'>
				<div className="left-part">
					<Button type="primary" onClick={() => { setIsShow(true) }}>新增商户</Button>
				</div>
				<div className="right-part">
					<Select
						allowClear
						style={{ width: 100 }}
						placeholder="请选择"
						onChange={selectChange}
						options={searchTypeList}
					/>
					<Input
						onChange={handleChange}
						style={{ width: 300 + 'px', marginRight: 10 + 'px' }}
						placeholder="请输入关键词进行搜索"
						onKeyDown={(event) => { event.keyCode === 13 && getTableData({ [selectValue]: searchValue }) }}>
					</Input>
					<Button
						type="primary"
						icon={<SearchOutlined />}
						onClick={() => { getTableData({ [selectValue]: searchValue }) }}>
						搜索
					</Button>
				</div>
			</div>
			<Table columns={columns} dataSource={tableData} />
			<MerchantModal
				info={currentInfo}
				isEdit={isEdit}
				isShow={isShow}
				changeShow={(val: boolean) => { setIsShow(val); setIsEdit(val) }}
			/>
		</div>
	)
}
export default Merchant
