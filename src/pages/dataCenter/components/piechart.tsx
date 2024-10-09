import React, {useEffect, useRef} from "react"
import * as echarts from 'echarts'
const PieChart: React.FC = () => {
    const chartEle = useRef<any>(null)
    useEffect(() => {
        const pieChart = echarts.init(chartEle.current)
        pieChart.setOption({
            title: {
              text: 'Referer of a Website',
              subtext: 'Fake Data',
              left: 'center'
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
          });
    }, [])
    return (
        <div id="chart" ref={chartEle} style={{height: '100%', width: '100%'}}></div>
    )
}

export default PieChart