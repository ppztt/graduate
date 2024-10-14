import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tag, Spin } from 'antd'
import $request from '@/api/api'
import './style.scss'
const Essay: FC = () => {
    const navigate = useNavigate()
    const [essayList, setEssayList] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const getEssayList = async () => {
        try {
            setIsLoading(true)
            const res = await $request.Content.getContentList({ size: -1})
            if (res.result) {
                setEssayList(res.data)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const toDetail = (id: Number) => {
        navigate(`/gateway_center/essay?id=${id}`)
    }
    const essayItem = () => {
        return essayList.map((item: any) => {
            return (
                <div key={item.id} className="essay-item" onClick={() => { toDetail(item.id) }}>
                    <h2 className="title">{item.title}</h2>
                    <div className="content">{item.content}</div>
                    <div className="footer">
                        <div className="create-time">{item.update_time || ''} | 发布人：{item.creator || ''}</div>
                        <div className="creator"><Tag>{item.complaint_type_cn}</Tag></div>
                    </div>
                </div>
            )
        })
    }
    useEffect(() => {
        getEssayList()
    }, [])
    return (
        <div id="essay">
            <Spin spinning={isLoading}>{essayItem()}</Spin>
        </div>
    )
}

export default Essay