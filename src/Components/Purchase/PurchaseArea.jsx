import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PurchaseResponse from "./PurchaseResponse/PurchaseResponse";
import Recommendations from "./Recommendations/Recommendations";
import './PurchaseArea.css';

function PurchaseArea() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state?.data;

    const {total_demand, start_date, end_date} = data || {};
    const roundedTotalDemand = total_demand !== undefined ? Math.round(total_demand) : null;

    const [showPurchaseResponse, setShowPurchaseResponse] = useState(false);
    const [showPredictions, setShowPredictions] = useState(false); // New state for predictions

    const handlePurchaseButtonClick = () => {
        navigate('/purchase', {state: {data}});
        setShowPurchaseResponse(prevState => !prevState);
    };

    const handleRecommendationsButtonClick = () => {
        navigate('/purchase', {state: {data}});
        setShowPredictions(prevState => !prevState);
    };

    return (
        <div className="purchase-table-container">
            <h1>Welcome to Purchase</h1>
            <div>
                <h2>Data Received:</h2>
                <table className="purchase-table">
                    <thead>
                    <tr>
                        <th>Total Demand</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{roundedTotalDemand}</td>
                        <td>{start_date}</td>
                        <td>{end_date}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={handlePurchaseButtonClick}>
                {showPurchaseResponse ? 'Hide Generated Energy' : 'Show Generated Energy'}
            </button>
            <br/>
            <button onClick={handleRecommendationsButtonClick}>
                {showPredictions ? 'Hide Recommendations' : 'Show Recommendations'}
            </button>
            {showPurchaseResponse && <PurchaseResponse/>}
            {showPredictions && <Recommendations/>}
        </div>
    );
}

export default PurchaseArea;