import { FC, useState } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import Essay from './essay'
const HomeTabs: FC = () => {
    const [currentKey, setCurrentKey] = useState('Essay')
    const items: TabsProps['items'] = [
        {
            key: 'Essay',
            label: '文章',
            children: currentKey === 'Essay' && <Essay></Essay>
        },
        {
            key: 'Complain',
            label: '我要投诉',
            children: ''
        },
        {
            key: 'Result',
            label: '投诉结果',
            children: ''
        }
    ]
    const onChange = (key: string) => {
        setCurrentKey(key)
    }
    return (
        <div id='home-tabs' style={{ width: '100%', height: '100%' }}>
            <Tabs defaultActiveKey="Essay" items={items} onChange={onChange} />
        </div>
    )
}

export default HomeTabs