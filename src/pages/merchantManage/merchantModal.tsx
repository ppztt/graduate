import { Modal, Form, Input, Select, message } from "antd"
import React, { useEffect, useState } from "react"
import { merchantTableType } from "@/type/merchantType"
import $request from '@/api/api'
const MerchantModal: React.FC<any> = ({ isEdit, isShow, changeShow, currentInfo }) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }
    const [merchantForm] = Form.useForm<merchantTableType>()
    const [areaList, setAreaList] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const info = {
        id: -1,
        merchant_name: '',
        merchant_desc: '',
        address: null,
        floor: ''
    }
    const handleConfirm = () => {
        setIsLoading(true)
        merchantForm.validateFields().then(async (value) => {
            const params = value
            const res = isEdit ? await $request.Merchant.editMerchant(currentInfo.id, params) : await $request.Merchant.addMerchant([params])
            if (res.result) {
                changeShow(false)
                setIsLoading(false)
                message.success('修改成功')
            }
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }
    const getAreaList = async () => {
        try {
            const res = await $request.Merchant.getAreaList({ size: -1 })
            if (res.result) {
                setAreaList(res.data.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.area_name,
                        ...item
                    }
                }))
            }
        } catch (error) {

        }
    }
    const closeModal = () => {
        merchantForm.resetFields()
        setIsLoading(false)
        changeShow(false)
    }
    const handleCancel = () => {
        changeShow(false)
    }
    useEffect(() => {
        if(isEdit) {
            merchantForm.setFieldsValue({...currentInfo, address: Number(currentInfo.address)})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit])
    useEffect(() => {
        getAreaList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Modal
            title={isEdit ? '编辑用户' : '新增用户'}
            open={isShow}
            onOk={handleConfirm}
            okText="确定"
            cancelText="取消"
            afterClose={closeModal}
            onCancel={handleCancel}
            confirmLoading={isLoading}>
            <Form
                {...layout}
                form={merchantForm}
                name="control-hooks"
                style={{ maxWidth: 600 }}
                initialValues={info}>
                <Form.Item name="merchant_name" label="商户名称" rules={[{ required: true, message: '请输入商户名称'  }]}>
                    <Input placeholder="请输入商户名称" />
                </Form.Item>
                <Form.Item name="merchant_desc" label="商户描述" rules={[{ required: true, message: '请输入商户描述' }]}>
                    <Input.TextArea placeholder="请输入商户描述" />
                </Form.Item>
                <Form.Item name="address" label="地址" rules={[{ required: true, message: '地址不能为空' }]}>
                    <Select
                        placeholder="请选择地点"
                        allowClear
                        options={areaList}>
                    </Select>
                </Form.Item>
                <Form.Item name="floor" label="具体地址" rules={[{ required: true, message: '具体地址不能为空' }]}>
                    <Input.TextArea placeholder="请输入具体地址" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MerchantModal