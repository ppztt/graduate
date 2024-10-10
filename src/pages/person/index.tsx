import React, { useState, useEffect } from "react"
import { Button } from "antd"
import CommonInfo from "./components/commonInfo"
import EditInfo from "./components/editInfo"
import './index.scss'
import $request from '@/api/api'
const Person: React.FC = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [useInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem('userInfo') || ''))
    const changeEdit: Function = (): void => {
        setIsEdit(!isEdit)
        getInfo()
    }
    const userId = JSON.parse(sessionStorage.getItem('userInfo') || '').id
    const getInfo = async () => {
        try {
            const res = await $request.User.getUserList({id: userId})
            if (res.result) {
                sessionStorage.setItem('userInfo', JSON.stringify(res.data[0]))
                setUserInfo(res.data[0])
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="person">
            <Button type="primary" onClick={() => changeEdit()}>{ isEdit ? '取消编辑' : '编辑'}</Button>
            <div className="info-content">{ isEdit ? <EditInfo userInfo={useInfo}/> : <CommonInfo userInfo={useInfo} /> }</div>
        </div>
    )
}

export default Person