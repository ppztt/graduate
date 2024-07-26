import React, { useEffect } from "react"
import { activeFormProps } from "@/type/componentType"
import type { FormProps } from 'antd'
import { Button, Form, Input, Select } from 'antd'
import $request from '@/api/api'
const ActiveForm: React.FC<activeFormProps> = ({options}) => {
    const [loginInfo] = Form.useForm<any>()
    const onFinish: FormProps<any>['onFinish'] = (values) => {}
    
    const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    const getData = () => {
        options.config.map(async (item) => {
            if (item.block && item.method) {
                const {result, data} = await $request[item?.block || ''][item?.method || ''](item.params)
                if (result) {
                    item.optionList = data
                }
            }
        })
    }
    const formOptions = options.config.map((item) => {
        let res: any
        if (item.type === 'select') {
            res = (
                <Form.Item name={item.id} label={item.label || ''} rules={item.rules || []}>
                    <Select options={item.optionList}></Select>
                </Form.Item>
            )
        } else {
            res = (
                <Form.Item name={item.id} label={item.label || ''} rules={item.rules || []}>
                    <Input placeholder={item?.placeholder || '请输入'}></Input>
                </Form.Item>
            )
        }
        return res
    })
    useEffect(() => {
        getData()
    })
    return (
        <div>
            <Form
                form={loginInfo}
                name="login_form"
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                    { formOptions }
            </Form>
            <Button>提交</Button>
        </div>
    )
}

export default ActiveForm