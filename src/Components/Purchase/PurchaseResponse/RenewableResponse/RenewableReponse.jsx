import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import DetailContainer from "../../../Main/Detail-Info/DetailContainer";
import "./renewable.css"

function RenewableResponse() {
    const location = useLocation();
    const data = location.state?.data;
    const {start_date, end_date} = data || {};

    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const backendUrl = `https://dashboard-backend-zan6.onrender.com/wind/sum_wind?start_date=${start_date}&end_date=${end_date}`;
            const backendUrl2 = `https://dashboard-backend-zan6.onrender.com/solar/sum_solar?start_date=${start_date}&end_date=${end_date}`;

            const response = await fetch(backendUrl);
            const data = await response.json();

            const response2 = await fetch(backendUrl2);
            const data2 = await response2.json();

            const combinedData = {
                total_wind: data[0].total_wind,
                total_wind_price: data[1].total_price,
                total_solar: data2[0][0].total_solar,
                total_solar_price: data2[1][0].total_price
            };

            setResponseData(combinedData);
        };

        fetchData();
    }, [start_date, end_date]);

    return (
        <div>
            <h1 className="renewable-heading">Renewable Energy</h1>
            {responseData ? (
                <div className='renewable-container'>
                    <DetailContainer title={"Total Wind"} value={responseData.total_wind} color={"black"}
                                     backgroundColor={"#00BFB2"}/>
                    <DetailContainer title={"Total Wind Price"} value={responseData.total_wind_price}
                                     color={"black"} backgroundColor={"#F0F3BD"}/>
                    <DetailContainer title={"Total Solar"} value={responseData.total_solar} color={"black"}
                                     backgroundColor={"#00BFB2"}/>
                    <DetailContainer title={"Total Solar Price"} value={responseData.total_solar_price}
                                     color={"black"} backgroundColor={"#F0F3BD"}/>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default RenewableResponse;