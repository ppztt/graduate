import React, { useEffect, useState } from "react"
import { Modal, Form, Input, Select, message } from "antd"
import { roleType, userType } from "@/type/userType"
import { areaType } from "@/type/merchantType"
import $request from '@/api/api'
const UserDialog: React.FC<any> = ({ isShow, isEdit, userInfo, handleShow }: any) => {
    const selfInfo = JSON.parse(sessionStorage.getItem('userInfo') || '')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [merchantList, setMerchantList] = useState<Array<userType>>([])
    const [roleList, setRoleList] = useState<Array<roleType>>([])
    const [areaList, setAreaList] = useState<Array<areaType>>([])
    const [userForm] = Form.useForm()
    const roleLevel = Form.useWatch('role_level', userForm)
    const areaId = Form.useWatch('area_id', userForm)
    const handleConfirm = async () => {
        try {
            userForm.validateFields().then(async (params: any) => {
                setIsLoading(true)
                params.role_name = roleList.find((role: roleType) => role.role_level === params.role_level)?.role_name
                params.merchant_name = merchantList.find((merchant: any) => merchant.id === params.merchant_id)?.merchant_name
                params.area_name = areaList.find((area: any) => area.id === params.area_id)?.area_name
                const res = isEdit ? await $request.User.editUser(userInfo.id, params) : await $request.User.addUser(params)
                if (res.result) {
                    message.success(`${isEdit ? '编辑' : '新增'}用户成功`)
                } else {
                    message.error(res.message || '信息有误')
                }
                handleShow(false)
            }).catch(error => { console.log(error) })
        } catch (error) {
            console.log(error)
        }
    }
    const handleCancel = () => {
        handleShow(false)
    }
    const getArea = async () => {
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
            console.log(error)
        }
    }
    const getMerchantList = async (id: number) => {
        try {
            const res = await $request.Merchant.getMerchantList({ size: -1, address: id })
            if (res.result) {
                setMerchantList(res.data.map((item: any) => {
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
    const getRoleList = async () => {
        try {
            const res = await $request.Role.getRoleList({ size: -1 })
            if (res.result) {
                const list = res.data.map((item: any) => {
                    return {
                        value: Number(item.role_level),
                        label: item.role_name,
                        ...item
                    }
                }).filter((item: any) => {
                    return item.role_level > selfInfo.role_level
                })
                setRoleList(list)
            }
        } catch (error) {

        }
    }
    const closeModal = () => {
        setIsLoading(false)
        userForm.resetFields()
    }
    useEffect(() => {
        getArea()
        getRoleList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        roleLevel >= 3 && getMerchantList(areaId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areaId])
    useEffect(() => {
        if (isEdit) {
            userForm.setFieldsValue(userInfo)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])
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
                form={userForm}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ role_name: '', desc: '' }}>
                <Form.Item<userType>
                    label="用户名"
                    name="user_name"
                    rules={[{ required: true, message: '请输入用户名称!' }]}>
                    <Input placeholder="用户名称" />
                </Form.Item>
                <Form.Item<userType>
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: '请输入邮箱!' }]}>
                    <Input placeholder="邮箱" />
                </Form.Item>
                <Form.Item<userType>
                    label="电话号码"
                    name="phone"
                    rules={[{ required: true, message: '请输入电话号码!' }]}>
                    <Input placeholder="电话号码" />
                </Form.Item>

                <Form.Item<userType>
                    label="所属角色"
                    name="role_level"
                    rules={[{ required: true, message: '请选择用户所属角色!' }]}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择所属角色"
                        options={roleList}
                    />
                </Form.Item>

                {roleLevel !== 1 &&
                    <>
                        <Form.Item<userType>
                            label="所在区域"
                            name="area_id"
                            rules={[{ required: true, message: '所在区域不能为空!' }]}>
                            <Select
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="请选择所在区域"
                                options={areaList}
                            />
                        </Form.Item>
                        {roleLevel === 3 && <Form.Item<userType>
                            label="隶属商家"
                            name="merchant_id"
                            rules={[{ required: true, message: '隶属商家不能为空!' }]}>
                            <Select
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="请选择隶属商家"
                                options={merchantList}
                            />
                        </Form.Item>}
                    </>}

                <Form.Item<userType>
                    label="描述"
                    name="desc"
                    rules={[{ required: true, message: '请输入角色描述!' }]}>
                    <Input.TextArea placeholder="角色描述" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserDialog