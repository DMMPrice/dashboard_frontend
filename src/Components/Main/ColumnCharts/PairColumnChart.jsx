import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import "./PairColumnChart.css";

const PairColumnChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        fontSize: '10px'
                    }
                }
            },
            yaxis: {
                labels: {
                    show: false
                },
                title: {
                    text: 'Demand (Actual)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    }
                }
            },
            grid: {
                show: false
            }
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (year) => {
            // const response = await fetch(`https://dashboard-backend-zan6.onrender.com/demand/year?year=${year}`);
            const response = await fetch(`https://api.powercasting.online/demand/year?year=${year}`);
            const data = await response.json();
            return data;
        };

        const processData = (data) => {
            return data.reduce((acc, item) => {
                const month = moment(item.TimeStamp).format('MMMM');
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += item["Demand(Actual)"];
                return acc;
            }, {});
        };

        const loadAllData = async () => {
            try {
                const [data2021, data2022, data2023] = await Promise.all([
                    fetchData(2021),
                    fetchData(2022),
                    fetchData(2023)
                ]);

                const monthlyData2021 = processData(data2021);
                const monthlyData2022 = processData(data2022);
                const monthlyData2023 = processData(data2023);

                const months = moment.months(); // Get months in correct order

                setChartData({
                    series: [
                        {
                            name: 'Demand 2021',
                            data: months.map(month => monthlyData2021[month] || 0),
                            color: '#1A5E63'
                        },
                        {
                            name: 'Demand 2022',
                            data: months.map(month => monthlyData2022[month] || 0),
                            color: '#f0f3bd'
                        },
                        {
                            name: 'Demand 2023',
                            data: months.map(month => monthlyData2023[month] || 0),
                            color: '#028090'
                        }
                    ],
                    options: {
                        ...chartData.options,
                        xaxis: {
                            categories: months,
                            labels: {
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        }
                    }
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            )}
        </div>
    );
};

export default PairColumnChart;