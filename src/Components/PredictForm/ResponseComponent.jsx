import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import "./ResponseComponent.css";
import { CSVLink } from "react-csv";
import DetailContainer from "../Main/Detail-Info/DetailContainer";

const ResponseComponent = ({ data }) => {
  const [visibleRows, setVisibleRows] = useState(10);
  const navigate = useNavigate();

  const handleRowChange = (event) => {
    const value = event.target.value;
    setVisibleRows(value === "All" ? data.data.length : Number(value));
  };

  const csvData = data.data.map((item) => ({
    TimeStamp: item.TimeStamp,
    DemandActual: item["Demand(Actual)"],
    DemandPred: item["Demand(Pred)"],
  }));

  const series = [
    {
      name: "Demand (Pred)",
      data: data.data.map((item) => item["Demand(Pred)"]),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: data.data.map((item) => item.TimeStamp),
      title: {
        text: "Time",
      },
      labels: {
        rotate: -45,
        formatter: function (value) {
          return new Date(value).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
    },
    yaxis: {
      title: {
        text: "Demand",
      },
    },
    title: {
      text: "",
      align: "center",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#00bfb2"],
  };

  const handlePurchaseClick = () => {
    navigate("/purchase", { state: { data } });
  };

  const response_data = [
    {
      title: "Start Date",
      value: data.start_date,
      color: "black",
      backgroundColor: "#00BFB2",
    },
    {
      title: "End Date",
      value: data.end_date,
      color: "black",
      backgroundColor: "#F0F3BD",
    },
    {
      title: "Total Demand",
      value:
        data.total_demand !== null
          ? data.total_demand.toFixed(4)
          : "No data available",
      color: "black",
      backgroundColor: "#00BFB2",
    },
  ];

  return (
    <div className="response-data">
      <h2 className="response-table-container-heading">Predicted Data</h2>
      {/* <button onClick={handlePurchaseClick}>Power Procurement</button> */}
      <button>Power Procurement</button>
      <div className="response-data-row1">
        {response_data.map((item, index) => (
          <DetailContainer
            key={index}
            title={item.title}
            value={item.value}
            color={item.color}
            backgroundColor={item.backgroundColor}
          />
        ))}
      </div>
      <div className="response-data-row2">
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
      <div className="response-data-row3">
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
  );
};

export default ResponseComponent;
