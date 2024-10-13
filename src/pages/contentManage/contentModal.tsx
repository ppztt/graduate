import { Modal, Form, Input, Select } from "antd"
import React, { useEffect, useState } from "react"
import $request from '@/api/api'
const ContentModal: React.FC<any> = ({ isEdit, isShow, changeShow, currentInfo, typeList }) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }
    const [contentForm] = Form.useForm<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const baseInfo = {
        id: -1,
        title: '',
        content: '',
        complaint_type: ''
    }
    const handleConfirm = () => {
        setIsLoading(true)
        contentForm.validateFields().then(async (value) => {
            const params = value
            params.creator = JSON.parse(sessionStorage.getItem('userInfo') || '').user_name
            const res = isEdit ? await $request.Content.editContent(currentInfo.id, params) : await $request.Content.addContent(params)
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
        contentForm.resetFields()
        setIsLoading(false)
        changeShow(false)
    }
    const handleCancel = () => {
        changeShow(false)
    }
    useEffect(() => {
        if(isEdit) {
            contentForm.setFieldsValue(currentInfo)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit])
    return (
        <Modal
            title={isEdit ? '编辑文章' : '新增文章'}
            open={isShow}
            onOk={handleConfirm}
            okText="确定"
            cancelText="取消"
            afterClose={closeModal}
            onCancel={handleCancel}
            confirmLoading={isLoading}>
            <Form
                {...layout}
                form={contentForm}
                style={{ maxWidth: 600 }}
                initialValues={baseInfo}>
                <Form.Item name="title" label="文章标题" rules={[{ required: true, message: '请输入文章标题'  }]}>
                    <Input placeholder="请输入文章标题" />
                </Form.Item>
                <Form.Item name="complaint_type" label="文章类型" rules={[{ required: true, message: '请选择文章类型' }]}>
                    <Select
                        allowClear
                        style={{ width: 200 }}
                        placeholder="请选择文章类型"
                        options={typeList}
                    />
                </Form.Item>
                <Form.Item name="content" label="文章内容" rules={[{ required: true, message: '请输入商户描述' }]}>
                    <Input.TextArea rows={10} placeholder="请输入文章内容" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ContentModal