import React, { useEffect, useRef } from "react"
import * as echarts from 'echarts'
import debounce from "lodash/debounce"
import './index.scss'
import { complainType, complainTypeDefinition } from "@/type/complain"
import dayjs from "dayjs"
type lineType = { complainList: Array<complainType>, typeList: Array<complainTypeDefinition> }
const LineChart: React.FC<lineType> = ({ complainList, typeList }) => {
    const chartEle = useRef<any>(null)
    let handleResize: any = null
    const handleData = (data: Array<any>, dateTime: Array<any>) => {
        const arr: any = []
        dateTime.forEach((item, index) => {
            arr[index] = data.filter(i => dayjs(i.create_time).isSame(dayjs(item))).length || 0
        })
        return arr
    }
    const fn: any = async () => {
        return new Promise((res, rej) => {
            const legendData = typeList.map(item => item.type_name)
            const xAxis = complainList.map(item => item.create_time)
            const set = [...new Set(xAxis)]
            const xAxisData = set.sort((a: any, b: any) => {
                const x = dayjs(a.create_time) as unknown as number
                const y = dayjs(b.create_time) as unknown as number
                return x - y
            })
            res([legendData, xAxisData])
        })
    }
    const init = async () => {
        try {
            const [legendData, xAxisData] = await fn()
            const lineChart = echarts.init(chartEle.current)
            const seriesData = typeList.map(item => {
                return {
                    name: item.type_name,
                    type: 'line',
                    data: handleData(complainList.filter(i => Number(i.complain_type) === Number(item.id)), xAxisData)
                }
            })
            lineChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legendData
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesData
            })
            handleResize = debounce(() => {
                lineChart && lineChart.resize()
            }, 160)
            lineChart && window.addEventListener('resize', () => {
                handleResize()
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        try {
            init()
        } catch (error) {
            console.log(error)
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        try {
            init()
        } catch (error) {
            console.log(error)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [complainList, typeList])
    return (
        <div id="chart-component" style={{ height: '100%', width: '100%' }}>
            <p className="title">近一个月投诉变化趋势折线图</p>
            <div className="chart-ele" ref={chartEle}></div>
        </div>
    )
}

export default LineChart