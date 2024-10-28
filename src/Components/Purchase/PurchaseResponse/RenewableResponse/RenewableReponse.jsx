import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function RenewableResponse() {
    const location = useLocation();
    const data = location.state?.data;
    const {start_date, end_date} = data || {};

    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_API_URL+`/renewable?start_date=${start_date}&end_date=${end_date}`;
        // console.log(backendUrl);
        if (start_date && end_date) {
            fetch(backendUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setResponseData(data))
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [start_date, end_date]);

    const renderTableData = () => {
        if (!responseData) return null;

        const solarData = responseData.solar;
        const windData = responseData.wind;

        return (
            <>
                <tr>
                    <td>Solar</td>
                    <td>{solarData[0][0].total_solar}</td>
                    <td>{solarData[1][0].total_price}</td>
                </tr>
                <tr>
                    <td>Wind</td>
                    <td>{windData[0].total_wind}</td>
                    <td>{windData[1].total_price}</td>
                </tr>
            </>
        );
    };

    return (
        <div>
            <h2>Renewal Energy</h2>
            {responseData ? (
                <table>
                    <thead>
                    <tr>
                        <th>Renewal Type</th>
                        <th>Total Generation</th>
                        <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderTableData()}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default RenewableResponse;