import { FC, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Modal, Form, Input, message } from 'antd'
import { complainType } from '@/type/complain'
import './index.scss'
import $request from '@/api/api'
type props = { isShow: boolean, changeShow: Function, complainInfo: complainType }
const ComplainModal: FC<props> = ({ isShow, changeShow, complainInfo }) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }
    const baseInfo = {
        result: ''
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [globalUserInfo, _] = useOutletContext<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [complainForm] = Form.useForm<complainType>()
    const handleConfirm = () => { 
        setIsLoading(true)
        complainForm.validateFields().then(async (values: complainType) => {
            const params = {
                ...values,
                id: complainInfo.id,
                auditor: globalUserInfo.user_id,
                auditor_cn: globalUserInfo.user_name
            }
            const res = await $request.Complain.auditComplain(params)
            if (res.result) {
                message.success('处理成功')
                setIsLoading(false)
                changeShow(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const closeModal = () => {
        complainForm.resetFields()
        setIsLoading(false)
    }
    const handleCancel = () => {
        changeShow(false)
    }

    // 详情信息
    const detailInfo = () => {
        return (
            <div id='complain-detail-info'>
                <div className="info-box">
                    <div className="label">发起人：</div>
                    <div className="values">{complainInfo.initiator_name || '--'}</div>
                </div>
                <div className="info-box">
                    <div className="label">区域：</div>
                    <div className="values">{complainInfo.area_name || '--'}</div>
                </div>
                <div className="info-box">
                    <div className="label">商家：</div>
                    <div className="values">{complainInfo.merchant_name || '--'}</div>
                </div>
                <div className="info-box">
                    <div className="label">投诉类型：</div>
                    <div className="values">{complainInfo.complain_type_cn || '--'}</div>
                </div>
                <div className="info-box">
                    <div className="label">投诉内容：</div>
                    <div className="values">{complainInfo.content || '--'}</div>
                </div>
            </div>
        )
    }
    return (
        <Modal
            title={'编辑投诉'}
            open={isShow}
            width={800}
            onOk={handleConfirm}
            okText="确定"
            cancelText="取消"
            afterClose={closeModal}
            onCancel={handleCancel}
            confirmLoading={isLoading}>
                {detailInfo()}
            <Form
                {...layout}
                form={complainForm}
                style={{ maxWidth: 800 }}
                initialValues={baseInfo}>
                <Form.Item<complainType>
                    name="result"
                    label="处理结果"
                    rules={[{ required: true, message: '处理结果不能为空' }]}>
                    <Input.TextArea rows={6} autoSize={{ minRows: 6}} placeholder="请输入文章标题" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ComplainModal