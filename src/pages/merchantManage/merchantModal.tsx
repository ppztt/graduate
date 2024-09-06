import { Modal, Form, Input, Select } from "antd"
import React, { useEffect, useState } from "react"
import { merchantTableType } from "@/type/merchantType"
import $request from '@/api/api'
const MerchantModal: React.FC<any> = ({ isEdit, isShow, changeShow, currentInfo }) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }
    const [merchantForm] = Form.useForm<merchantTableType>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const floorList = [
        {
            value: 1,
            label: 1
        },
        {
            value: 2,
            label: 2
        },
        {
            value: 3,
            label: 3
        }
    ]
    const info = {
        id: -1,
        merchant_name: '',
        desc: '',
        address: '',
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
            }
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
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
            merchantForm.setFieldsValue(currentInfo)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit])
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
                <Form.Item name="desc" label="商户描述" rules={[{ required: true, message: '请输入商户描述' }]}>
                    <Input.TextArea placeholder="请输入商户描述" />
                </Form.Item>
                <Form.Item name="address" label="地址" rules={[{ required: true }]}>
                    <Select
                        placeholder="请选择地点"
                        allowClear
                        options={floorList}>
                    </Select>
                </Form.Item>
                <Form.Item name="floor" label="楼层" rules={[{ required: true }]}>
                    <Select
                        placeholder="请选择楼层"
                        allowClear
                        options={floorList}>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MerchantModal