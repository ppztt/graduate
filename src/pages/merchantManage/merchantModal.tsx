import { Modal, Form, Input, Select } from "antd"
import React, { useEffect, useState } from "react"
import { merchantTableType } from "@/type/merchantType"

const MerchantModal: React.FC<any> = ({ isEdit, isShow, changeShow, currentInfo }) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }
    const [merchantForm] = Form.useForm<merchantTableType>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const info = {
        id: -1,
        merchant_name: '',
        merchant_desc: '',
        address: '',
        floor: ''
    }
    const handleConfirm = async () => {
        try {
            setIsLoading(true)
            merchantForm.validateFields().then((value) => {
                const params = value
                if (isEdit) {
                    params.id = currentInfo.id
                    params.create_time = currentInfo.create_time
                }
                changeShow(false)
                setIsLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const closeModal = () => {
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
                <Form.Item name="merchant_name" label="商户名称" rules={[{ required: true, message: '请输入商户描述'  }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="merchant_desc" label="商户描述" rules={[{ required: true, message: '请输入商户描述' }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="address" label="地址" rules={[{ required: true }]}>
                    <Select
                        placeholder="请选择地点"
                        allowClear>
                    </Select>
                </Form.Item>
                <Form.Item name="floor" label="楼层" rules={[{ required: true }]}>
                    <Select
                        placeholder="请选择楼层"
                        allowClear>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MerchantModal