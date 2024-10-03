import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';
import {Chart} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import {saveAs} from 'file-saver';
import {ClipLoader} from 'react-spinners';

import './GraphData.css';

Chart.register(zoomPlugin);

const GraphData = ({apiUrl, xAxisLabel, yAxisLabel, dataMapping, heading}) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const labels = data.map(item => dataMapping.label(item));
                    const datasets = dataMapping.datasets.map(dataset => ({
                        label: dataset.label,
                        data: data.map(item => dataset.data(item)),
                        borderColor: dataset.borderColor,
                        fill: false,
                    }));

                    setChartData({
                        labels: labels,
                        datasets: datasets
                    });
                } else {
                    console.error('Data is undefined or empty');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [apiUrl, dataMapping]);

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: [...new Set(chartData.labels)],
                title: {
                    display: true,
                    text: xAxisLabel
                }
            },
            y: {
                title: {
                    display: true,
                    text: yAxisLabel
                }
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    };

    const chartContainerStyle = {
        width: '50vw',
        height: '50vh',
        margin: '0 auto'
    };

    const exportToCSV = () => {
        const csvData = [
            [xAxisLabel, ...dataMapping.datasets.map(dataset => dataset.label)],
            ...chartData.labels.map((label, index) => [
                label,
                ...chartData.datasets.map(dataset => dataset.data[index])
            ])
        ];

        const csvContent = csvData.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
        saveAs(blob, 'chart-data.csv');
    };

    return (
        <div>
            <h2 className="graph-heading">{heading}</h2>
            {loading ? (
                <div className="spinner-container">
                    <ClipLoader size={50} color={"#123abc"} loading={loading}/>
                    <p>Loading chart data...</p>
                </div>
            ) : (
                <div style={chartContainerStyle}>
                    <Line data={chartData} options={options}/>
                    <button onClick={exportToCSV}>Export to CSV</button>
                </div>
            )}
        </div>
    );
}

export default GraphData;