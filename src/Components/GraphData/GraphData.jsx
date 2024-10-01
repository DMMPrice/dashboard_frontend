import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

const GraphData = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        // Fetch data from the API
        fetch('http://127.0.0.1:5000/wind')
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const labels = data.map(item => item.TimeStamp);
                    const windActual = data.map(item => item["Wind(Actual)"]);
                    const windPred = data.map(item => item["Wind(Pred)"]);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: "Wind Actual",
                                data: windActual,
                                borderColor: "rgba(75,192,192,1)",
                                fill: false,
                            },
                            {
                                label: "Wind Pred",
                                data: windPred,
                                borderColor: "rgba(192,75,75,1)",
                                fill: false,
                            }
                        ]
                    });
                } else {
                    console.error('Data is undefined or empty');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h2>Graph Data</h2>
            {chartData.labels.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
}

export default GraphData;
