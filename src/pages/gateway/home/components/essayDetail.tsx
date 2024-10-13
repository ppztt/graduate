import { FC, useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { UserOutlined, FieldTimeOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import $request from '@/api/api'
const EssayDetail: FC = () => {
    const navigate = useNavigate()
    const [info, setInfo] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [params] = useSearchParams()
    const getDetailInfo = async () => {
        try {
            setIsLoading(true)
            const res = await $request.Content.getContentList({ size: -1, id: params.get('id')})
            if (res.result) {
                setInfo(res.data[0])
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const toBack = () => {
        navigate('/gateway_center/home_tabs')
    }
    useEffect(() => {
        getDetailInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Spin spinning={isLoading}>
            <div id="essay-detail">
                <span className='back-btn' onClick={toBack}><ArrowLeftOutlined /> 返回</span>
                <div className="title">{info.title}</div>
                <div className="info">
                    <span><UserOutlined />{info.creator}</span>
                    <span><FieldTimeOutlined />{info.create_time}</span>
                </div>
                <div className="content">{info.content}</div>
            </div>
        </Spin>
    )
}
export default EssayDetail