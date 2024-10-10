import React, { useEffect, useRef } from "react"
import * as echarts from 'echarts'
import debounce from "lodash/debounce"
import './index.scss'
const LineChart: React.FC = () => {
    const chartEle = useRef<any>(null)
    let handleResize: any = null
    const init = () => {
        try {
            const lineChart = echarts.init(chartEle.current)
            lineChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Union Ads',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Video Ads',
                        type: 'line',
                        stack: 'Total',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Direct',
                        type: 'line',
                        stack: 'Total',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'Search Engine',
                        type: 'line',
                        stack: 'Total',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
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
    return (
        <div id="chart-component" style={{ height: '100%', width: '100%' }}>
            <p className="title">变化趋势折线图</p>
            <div className="chart-ele" ref={chartEle}></div>
        </div>
    )
}

export default LineChart