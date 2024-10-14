import { FC, useEffect, useState } from 'react'
import { Form, Input, Select, Button, message } from "antd"
import { complainType } from '@/type/complain'
import $request from '@/api/api'
const ComplainForm: FC = () => {
    const initValue: complainType = {
        content: '',
        area_id: null,
        merchant_id: null,
        complain_type: null
    }
    const [complainForm] = Form.useForm<complainType>()
    const [merchantList, SetMerchantList] = useState<Array<any>>([])
    const [areaList, setAreaList] = useState<Array<any>>([])
    const [typeList, setTypeList] = useState<Array<any>>([])
    const getMerchant = async (area_id: number) => {
        try {
            const res = await $request.Merchant.getMerchantList({ size: -1, address: area_id})
            if (res.result) {
                SetMerchantList(res.data.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.merchant_name,
                        ...item
                    }
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getArea = async () => {
        try {
            const res = await $request.Merchant.getAreaList({ size: -1})
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
            console.log(error)
        }
    }
    const getComplainType = async () => {
        try {
            const res = await $request.Complain.getComplaintType({ size: -1 })
            if (res.result) {
                setTypeList(res.data.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.type_name,
                        ...item
                    }
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
    const areaChange = (val: number) => {
        getMerchant(val)
    }
    const handleSubmit = async (values: complainType) => {
        try {
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '')
            const params = {
                ...values,
                area_name: areaList.find(item => item.id === values.area_id).area_name,
                merchant_name: merchantList.find(item => item.id === values.merchant_id).merchant_name,
                complain_type_cn: typeList.find(item => item.id === values.complain_type).type_name,
                user_id: userInfo.id,
                initiator_name: userInfo.user_name
            }
            const res = await $request.Gateway.postComplain(params)
            if (res.result) {
                message.success('发起成功')
                complainForm.resetFields()
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getArea()
        getComplainType()
    }, [])
    return (
        <div>
            <Form
                form={complainForm}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit}
                initialValues={initValue}>
                <Form.Item<complainType>
                    label="区域"
                    name="area_id"
                    rules={[{ required: true, message: '投诉区域不能为空!' }]}>
                    <Select
                        onChange={areaChange}
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择所属区域"
                        options={areaList}
                    />
                </Form.Item>
                <Form.Item<complainType>
                    label="商家"
                    name="merchant_id"
                    rules={[{ required: true, message: '投诉商家不能为空!' }]}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择投诉商家"
                        options={merchantList}
                    />
                </Form.Item>
                <Form.Item<complainType>
                    label="投诉类型"
                    name="complain_type"
                    rules={[{ required: true, message: '投诉类型不能为空!' }]}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择投诉类型"
                        options={typeList}
                    />
                </Form.Item>
                <Form.Item<complainType>
                    label="投诉内容"
                    name="content"
                    rules={[{ required: true, message: '投诉内容不能为空!' }]}>
                    <Input.TextArea placeholder="请输入投诉内容" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确认提交
                    </Button>
                    </Form.Item>
            </Form>
        </div>
    )
}

export default ComplainForm