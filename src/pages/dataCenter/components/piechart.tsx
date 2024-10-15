import React, { useEffect, useRef } from "react"
import * as echarts from 'echarts'
import debounce from 'lodash/debounce'
import './index.scss'
import { complainType, complainTypeDefinition } from "@/type/complain"
type pieType = {complainList: Array<complainType>, typeList: Array<complainTypeDefinition>}
const PieChart: React.FC<pieType> = ({ complainList, typeList }) => {
    const chartEle = useRef<any>(null)
    let handleResize: any = null
    const init = () => {
        const pieChart = echarts.init(chartEle.current)
        const types = typeList.map((item: any) => {
            return {
                value: 0,
                name: item.type_name,
                id: item.id
            }
        })
        const seriesData = types.map(item => {
            const arr = complainList.filter((complain: complainType) => Number(complain.complain_type ) === Number(item.id))
            return {
                value: arr.length || 0,
                name: item.name
            }
        })
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
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    data: seriesData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
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
            <p className="title">近一个月投诉类型分布扇形图</p>
            <div className="chart-ele" ref={chartEle}></div>
        </div>
    )
}

export default PieChart