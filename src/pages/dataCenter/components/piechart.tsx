import React, { useEffect, useRef } from "react"
import * as echarts from 'echarts'
import debounce from 'lodash/debounce'
import './index.scss'
const PieChart: React.FC = () => {
    const chartEle = useRef<any>(null)
    let handleResize: any = null
    const init = () => {
        const pieChart = echarts.init(chartEle.current)
        pieChart.setOption({
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
        handleResize = debounce(() => {
            pieChart && pieChart.resize()
        }, 160)
        pieChart && window.addEventListener('resize', () => {
            handleResize()
        })
    }
    useEffect(() => {
        try {
            init()
        } catch (error) {
            throw error
        }
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id="chart-component" style={{ height: '100%', width: '100%' }}>
            <p className="title">投诉类型</p>
            <div className="chart-ele" ref={chartEle}></div>
        </div>
    )
}

export default PieChart