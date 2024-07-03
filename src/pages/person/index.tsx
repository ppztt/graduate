import React, { useState } from "react"
import { Button } from "antd"
import './index.scss'
const Person: React.FC = () => {
    const [isEdit, setIsEdit] = useState(false)

    const changeEdit: Function = (): void => {
        if (isEdit) {
            saveInfo()
        }
        setIsEdit(!isEdit)
    }
    const saveInfo: Function = (): void => {
        console.log('发起了一个保存的请求')
    }

    const CommonInfo: React.FC = () => {
        return (
            <div id="person">
                <div className="title">我的信息</div>
                <div className="info-content">
                    <div className="info-item">
                        <span className="label">角色：</span>
                        <span className="value">xxxxxx</span>
                    </div>
                    <div className="info-item">
                        <span className="label">角色：</span>
                        <span className="value">xxxxxx</span>
                    </div>
                    <div className="info-item">
                        <span className="label">角色：</span>
                        <span className="value">xxxxxx</span>
                    </div>
                </div>
            </div>
        )
    }
    const EditInfo: React.FC = () => {
        return (
            <div>编辑信息</div>
        )
    }
    return (
        <div>
            <Button type="primary" onClick={() => changeEdit()}>{ isEdit ? '保存' : '编辑'}</Button>
            { isEdit ? <EditInfo/> : <CommonInfo /> }
        </div>
    )
}

export default Person