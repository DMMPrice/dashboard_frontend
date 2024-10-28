import React from 'react';
import {useLocation} from 'react-router-dom';
import PurchaseResponse from "./PurchaseResponse/PurchaseResponse";
import './PurchaseArea.css';
import DetailContainer from "../Main/Detail-Info/DetailContainer";

function PurchaseArea() {
    const location = useLocation();
    const data = location.state?.data;

    const {total_demand, start_date, end_date} = data || {};
    const roundedTotalDemand = total_demand !== undefined ? Math.round(total_demand) : null;

    const response_data = [
        {
            "title": "Total Demand",
            "value": roundedTotalDemand,
            "color": "black",
            "backgroundColor": "#00BFB2"
        },
        {
            "title": "Start Date",
            "value": start_date,
            "color": "black",
            "backgroundColor": "#F0F3BD"
        },
        {
            "title": "End Date",
            "value": end_date,
            "color": "black",
            "backgroundColor": "#00BFB2"
        }
    ];

    return (
        <div className="purchase-table-container">
            <h1>Purchase Details</h1>
            <div className="purchase-table-row1">
                {response_data.map((item, index) => (
                    <DetailContainer key={index} title={item.title} value={item.value} color={item.color}
                                     backgroundColor={item.backgroundColor}/>
                ))}
            </div>
            <PurchaseResponse/>
        </div>
    );
}

export default PurchaseArea;