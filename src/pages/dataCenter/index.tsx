import React from "react"
import PieChart from "./components/piechart"
import LineChart from './components/linechart'
import './index.scss'
const DataCenter: React.FC = () => {
    return (
        <div id="DataCenter">
            <div className="info-area">
                <div className="info-box total">
                    <p>商家总数</p>
                    <span>2121 &nbsp;</span>个
                </div>
                <div className="info-box complain">
                    <p>总投诉数</p>
                    <span>2121 &nbsp;</span>个
                </div>
                <div className="info-box complained">
                    <p>已处理投诉数</p>
                    <span>2121 &nbsp;</span>个
                </div>
                <div className="info-box complaining">
                    <p>未投诉数</p>
                    <span>2121 &nbsp;</span>个
                </div>
            </div>
            <div className="chart">
                <div className="pie">
                    <PieChart />
                </div>
                <div className="line">
                    <LineChart />
                </div>
            </div>
        </div>
    )
}

export default DataCenter