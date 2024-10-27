import React from "react";
import {Line} from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import "./GraphArea.css";

// Register the required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale);

function GraphArea({data}) {
    console.log("GraphArea data:", data); // Debugging log

    const chartData = {
        labels: data.map((item) => new Date(item.TimeStamp)), // Parse TimeStamp as Date
        datasets: [
            {
                label: "Demand (Pred)",
                data: data.map((item) => item["Demand(Pred)"]),
                borderColor: "#f0f3bd",
                backgroundColor: "#f0f3bd",
                fill: false,
            },
            {
                label: "Demand (Actual)",
                data: data.map((item) => item["Demand(Actual)"]),
                borderColor: "#028090",
                backgroundColor: "#028090",
                fill: false,
            }
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    tooltipFormat: 'MM dd yyyy ',
                    displayFormats: {
                        minute: 'MMM dd, yyyy HH:mm'
                    }
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Demand (Actual) vs Demand (Pred)',
            },
        },
        animation: {
            duration: 100,
            easing: 'easeInOutQuad',
        },
    };

    return (
        <div className="graph-area">
            <Line data={chartData} options={options}/>
        </div>
    );
}

export default GraphArea;