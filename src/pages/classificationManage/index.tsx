import React, { useState } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import ComplainType from './components/ComplainType'
import AreaManage from './components/AreaManage'

const ClassificationManage: React.FC = () => {
    const [currentKey, setCurrentKey] = useState('ComplainType')
    const items: TabsProps['items'] = [
        {
            key: 'ComplainType',
            label: '投诉类型',
            children: currentKey === 'ComplainType' && <ComplainType></ComplainType>
        },
        {
            key: 'AreaManage',
            label: '管辖区域',
            children: currentKey === 'AreaManage' && <AreaManage></AreaManage>
        }
    ]
    const onChange = (key: string) => {
        setCurrentKey(key)
    }
    return (
        <Tabs type="card" defaultActiveKey="ComplainType" items={items} onChange={onChange} />
    )
}

export default ClassificationManage