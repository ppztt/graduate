import React from "react"

const CommonInfo: React.FC = () => {
    return (
        <div id="common-info">
            <div className="title">我的信息</div>
            <ul className="info">
                <li className="info-item">
                    <span className="label">角色：</span>
                    <span className="value">xxxxxx</span>
                </li>
                <li className="info-item">
                    <span className="label">角色：</span>
                    <span className="value">xxxxxx</span>
                </li>
                <li className="info-item">
                    <span className="label">角色：</span>
                    <span className="value">xxxxxx</span>
                </li>
            </ul>
        </div>
    )
}
export default CommonInfo