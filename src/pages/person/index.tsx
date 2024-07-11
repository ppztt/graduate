import React, { useState } from "react"
import { Button } from "antd"
import CommonInfo from "./components/commonInfo"
import EditInfo from "./components/editInfo"
import './index.scss'
const Person: React.FC = () => {

    const [isEdit, setIsEdit] = useState(false)
    const changeEdit: Function = (): void => {
        setIsEdit(!isEdit)
    }

    return (
        <div id="person">
            <Button type="primary" onClick={() => changeEdit()}>{ isEdit ? '取消编辑' : '编辑'}</Button>
            <div className="info-content">{ isEdit ? <EditInfo/> : <CommonInfo /> }</div>
        </div>
    )
}

export default Person