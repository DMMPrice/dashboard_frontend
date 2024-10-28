import React, {useState, useEffect} from "react";
import DetailContainer from "./Detail-Info/DetailContainer";
import PairColumnChart from "./ColumnCharts/PairColumnChart";
import DonutChart from "./Donut Chart/Donut";
import DemographicComponent from "./DemographicComponent/DemographicComponent";

import "./Detail-Info/DetailContainer.css";
import "./main.css";


function Main() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 3); // 3ms delay

        return () => clearTimeout(timer);
    }, []);

    const data = [
        {
            "title": "Current Demand",
            "value": "12.4k",
            "color": "black",
            "backgroundColor": "#00BFB2" // Corrected color code
        },
        {
            "title": "Current Prediction",
            "value": "16.6K",
            "color": "black",
            "backgroundColor": "#F0F3BD" // Corrected color code
        },
        {
            "title": "Total Generated",
            "value": "1.2M",
            "color": "black",
            "backgroundColor": "#00BFB2" // Corrected color code
        },
        {
            "title": "Total Expenses",
            "value": "0.6M",
            "color": "black",
            "backgroundColor": "#F0F3BD" // Corrected color code
        },
    ];

    return (
        <div className='main'>
            <div className={`main-container ${visible ? 'visible' : 'hidden'}`}>
                {data.map((item, index) => (
                    <DetailContainer key={index} title={item.title} value={item.value} color={item.color}
                                     backgroundColor={item.backgroundColor}/>
                ))}
            </div>
            <div className="main-column-chart">
                <PairColumnChart/>
            </div>
            <div className="main-row-3">
                <DonutChart/>
                <DemographicComponent/>
            </div>
        </div>
    );
}

export default Main;