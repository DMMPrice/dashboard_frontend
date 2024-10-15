import React from 'react';
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import Chart from 'react-apexcharts';
import './ResponseComponent.css';
import {CSVLink} from 'react-csv';

const ResponseComponent = ({data}) => {
    const [visibleRows, setVisibleRows] = useState(10);
    const navigate = useNavigate();

    const handleRowChange = (event) => {
        const value = event.target.value;
        setVisibleRows(value === "All" ? data.data.length : Number(value));
    };

    const csvData = data.data.map(item => ({
        TimeStamp: item.TimeStamp,
        DemandActual: item["Demand(Actual)"],
        DemandPred: item["Demand(Pred)"]
    }));

    const series = [
        {
            name: 'Demand (Pred)',
            data: data.data.map(item => item["Demand(Pred)"])
        }
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        xaxis: {
            type: 'datetime',
            categories: data.data.map(item => item.TimeStamp),
            title: {
                text: 'Time'
            },
            labels: {
                rotate: -45,
                formatter: function (value) {
                    return new Date(value).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                }
            }
        },
        yaxis: {
            title: {
                text: 'Demand'
            }
        },
        title: {
            text: '',
            align: 'center'
        },
        dataLabels: {
            enabled: false
        }
    };

    const handlePurchaseClick = () => {
        navigate('/purchase', {state: {data}});
    };

    return (
        <div className="response-table-container">
            <div className="table-wrapper">
                <div className="table-section">
                    <h2 className="response-table-container-heading">Response Data</h2>
                    <table className="response-table-container-table">
                        <thead className="response-table-container-thead">
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Demand</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{data.start_date}</td>
                            <td>{data.end_date}</td>
                            <td>{data.total_demand !== null ? data.total_demand.toFixed(4) : 'No data available'}</td>
                        </tr>
                        </tbody>
                    </table>
                    <Chart options={options} series={series} type="bar" height={350}/>
                </div>

                <div className="table-section">
                    <div className="controls">
                        <label htmlFor="rows">Rows to display:</label>
                        <select id="rows" value={visibleRows} onChange={handleRowChange}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value="All">All</option>
                        </select>
                        <CSVLink data={csvData} filename="data.csv" className="btn">
                            Download CSV
                        </CSVLink>
                    </div>
                    <table className="response-table-container-table">
                        <thead className="response-table-container-thead">
                        <tr>
                            <th>TimeStamp</th>
                            <th>Demand (Actual)</th>
                            <th>Demand (Pred)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.slice(0, visibleRows).map((item, index) => (
                            <tr key={index}>
                                <td>{item.TimeStamp}</td>
                                <td>{item["Demand(Actual)"]}</td>
                                <td>{item["Demand(Pred)"]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button onClick={handlePurchaseClick}>Purchase Electricity</button>
        </div>
    );
};

export default ResponseComponent;