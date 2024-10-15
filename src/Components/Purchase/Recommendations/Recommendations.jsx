import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

function Recommendations() {
    const location = useLocation();
    const data = location.state?.data;
    const {total_demand, start_date, end_date} = data || {};

    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const url = new URL('http://localhost:5500/predict/recommend');
                url.searchParams.append('total_demand', total_demand);
                url.searchParams.append('start_date', start_date);
                url.searchParams.append('end_date', end_date);

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                setPredictionData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching predictions:', error);
                setLoading(false);
            }
        };

        if (total_demand && start_date && end_date) {
            fetchPredictions();
        }
    }, [total_demand, start_date, end_date]);

    const renderTable = (data, title) => (
        <div>
            <h3>{title}</h3>
            <table>
                <thead>
                <tr>
                    <th>Net Demand</th>
                    <th>Net Price</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item['net-demand']}</td>
                        <td>{item['net-price']}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    const renderTotalTable = (data, title) => (
        <div>
            <h3>{title}</h3>
            <table>
                <thead>
                <tr>
                    <th>Total Price</th>
                    <th>Total {title.split(' ')[1]}</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item['total_price']}</td>
                        <td>{item[`total_${title.split(' ')[1].toLowerCase()}`]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    const calculateFinalDemand = (data) => {
        return data.reduce((total, item) => total + parseFloat(item['net-demand']).toFixed(2), 0);
    };

    const calculateTotalPrice = (data) => {
        return data.reduce((total, item) => total + item['total_price'], 0);
    };

    return (
        <div>
            <h2>Recommendations</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {predictionData && (
                        <>
                            {renderTable(predictionData['net-inter'], 'Net Inter')}
                            {renderTable(predictionData['net-intra'], 'Net Intra')}
                            {renderTotalTable(predictionData['total-solar'], 'Total Solar')}
                            {renderTotalTable(predictionData['total-wind'], 'Total Wind')}
                            <div>
                                <h3>Final Calculations</h3>
                                <p>Total
                                    Price: {calculateTotalPrice(predictionData['total-solar']) + calculateTotalPrice(predictionData['total-wind'])}</p>
                                <p>Final Demand: {calculateFinalDemand(predictionData['net-inter'])} <strong>(Need to be
                                    taken
                                    from grid)</strong></p>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Recommendations;