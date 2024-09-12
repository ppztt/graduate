import React from "react"
const CommonInfo: React.FC<any> = ({ userInfo }) => {
    const title = [
        {
            id: 'user_name',
            label: '用户名'
        },
        {
            id: 'email',
            label: '邮箱'
        },
        {
            id: 'phone',
            label: '电话号码'
        },
        {
            id: 'role_name',
            label: '角色'
        },
        {
            id: 'merchant_name',
            label: '所属商户'
        }
    ]
    
    return (
        <div id="common-info">
            <div className="title">我的信息</div>
            <ul className="info">
                {title.map((item: any) => {
                    return (
                        <li className="info-item">
                            <span className="label">{ item.label }：</span>
                            <span className="value">{ userInfo[item.id] || '--' }</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default CommonInfo