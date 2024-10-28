import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import "./Donut.css";

const DonutChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'donut',
                height: 250,
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
            labels: ['2021', '2022', '2023'],
            colors: ['#00bfb2', '#f0f3bd', '#0ff3bd'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%', // Increase the size of the donut
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '20px',
                                align: 'center',
                                fontWeight: 'bold',
                                color: 'rgb(0,0,0)',
                                offsetY: -10,
                                formatter: () => 'Demand'
                            },
                            value: {
                                show: false
                            },
                            total: {
                                show: true,
                                label: 'Demand Actual',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                color: '#000000',
                                align: 'center',
                            }
                        }
                    }
                }
            },
            legend: {
                position: 'bottom' // Position the legend at the bottom
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 400
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            dataLabels: {
                style: {
                    colors: ['#ffffff', '#ffffff', '#ffffff']
                }
            }
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (year) => {
            const response = await fetch(`http://3.109.157.36:4000/demand/year?year=${year}`);
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

                const totalDemand2021 = Object.values(processData(data2021)).reduce((a, b) => a + b, 0);
                const totalDemand2022 = Object.values(processData(data2022)).reduce((a, b) => a + b, 0);
                const totalDemand2023 = Object.values(processData(data2023)).reduce((a, b) => a + b, 0);

                setChartData({
                    series: [totalDemand2021, totalDemand2022, totalDemand2023],
                    options: {
                        ...chartData.options,
                        labels: ['2021', '2022', '2023']
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
        <div className='donut-main'>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="donut-container">
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="donut"
                        height={300}
                        width={200}
                    />
                </div>
            )}
        </div>
    );
};

export default DonutChart;