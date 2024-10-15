import React, { useEffect, useState } from "react"
import { useOutletContext } from 'react-router-dom'
import { Spin } from 'antd'
import PieChart from "./components/piechart"
import LineChart from './components/linechart'
import $request from '@/api/api'
import './index.scss'
import { complainType, complainTypeDefinition } from "@/type/complain"
import dayjs from "dayjs"
const DataCenter: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [globalUserInfo, _] = useOutletContext<any>()
    const [baseInfo, setBaseInfo] = useState<any>({})
    const [complainList, setComplainList] = useState<Array<complainType>>([])
    const [typeList, setTypeList] = useState<Array<complainTypeDefinition>>([])
    const [isLoading, setIsLoading] = useState<any>(false)
    const [isChartLoading, setChartIsLoading] = useState<any>(false)
    const getBaseData = async () => {
        try {
            setIsLoading(true)
            const res = await $request.User.getDateCenter({ id: globalUserInfo.id })
            if (res.result) {
                setBaseInfo(res.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getComplainList = async (exact: Object = {}) => {
        setChartIsLoading(true)
        try {
            // 获取今天的日期
            const today = dayjs().startOf('day').format('YYYY-MM-DD') + ' 23:59:59'
            // 获取前一个月的日期
            const lastMonth = dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD') + ' 00:00:00'
            const params = {
                size: -1,
                area_id: globalUserInfo.area_id,
                start_time: lastMonth,
                end_time: today,
                ...exact
            }
            const res = await $request.Complain.getComplainList(params)
            if (res.result) {
                // 将日期数据按日计算
                setComplainList([...res.data].map((item: any) => {
                    return {
                        ...item,
                        create_time: dayjs(item.create_time).format('YYYY-MM-DD')
                    }
                }))
                setChartIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getTypeList = async (exact?: object) => {
        setChartIsLoading(true)
        try {
            const params = {
                size: -1,
                ...exact
            }
            const res = await $request.Complain.getComplaintType(params)
            if (res.result) {
                setTypeList(res.data)
                setChartIsLoading(false)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getBaseData()
        getTypeList()
        getComplainList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id="DataCenter">
            <Spin spinning={isLoading}>
                <div className="info-area">
                    <div className="info-box total">
                        <p>商家总数</p>
                        <span>{baseInfo.merchant_count} &nbsp;</span>个
                    </div>
                    <div className="info-box complain">
                        <p>总投诉数</p>
                        <span>{baseInfo.complain_count} &nbsp;</span>个
                    </div>
                    <div className="info-box complained">
                        <p>已处理投诉数</p>
                        <span>{baseInfo.completed_complain} &nbsp;</span>个
                    </div>
                    <div className="info-box complaining">
                        <p>未投诉数</p>
                        <span>{baseInfo.running_complain} &nbsp;</span>个
                    </div>
                </div>
            </Spin>
            <div className="chart">
                <div className="pie">
                    <Spin spinning={isChartLoading}>
                        {!isChartLoading && <PieChart complainList={complainList} typeList={typeList} />}
                    </Spin>
                </div>
                <div className="line">
                    <Spin spinning={isChartLoading}>
                    {!isChartLoading && <LineChart complainList={complainList} typeList={typeList} /> }
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default DataCenter