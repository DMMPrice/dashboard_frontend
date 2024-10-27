import React, {useEffect, useState} from "react";
import GraphArea from "../GraphArea/GraphArea";
import "./ConsumedArea.css";
import TableArea from "../Table/TableArea";
import FilterComponent from "../FilterComponent/FilterComponent";

function    ConsumedArea() {
    const apiUrl = process.env.REACT_APP_API_URL + "/demand/all";
    const columns = [
        {Header: "Demand (Actual)", accessor: "Demand(Actual)"},
        {Header: "Demand (Pred)", accessor: "Demand(Pred)"},
        {Header: "TimeStamp", accessor: "TimeStamp"},
    ];

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                setData(result);
                setFilteredData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
                setVisible(true); // Set visible to true after initial data fetch
            }
        };

        fetchData();
    }, [apiUrl]);

    const handleFilter = ({year, startDate, endDate}) => {
        setVisible(false); // Hide components before applying filter
        let filtered = data;

        if (year) {
            filtered = filtered.filter(item => new Date(item.TimeStamp).getFullYear() === parseInt(year));
        }

        if (startDate) {
            filtered = filtered.filter(item => new Date(item.TimeStamp) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(item => new Date(item.TimeStamp) <= new Date(endDate));
        }

        setFilteredData(filtered);
        setLoading(false);
        setTimeout(() => setVisible(true), 3000); // Delay visibility by 3 seconds
    };

    return (
        <div className="consumed-main">
            <h1>Consumed Electricity Vs Predicted Electricity</h1>
            <FilterComponent onFilter={handleFilter} setLoading={setLoading}/>
            <div className="submit-area-graph">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    visible && (
                        <>
                            <GraphArea data={filteredData}/>
                            <TableArea data={filteredData} columns={columns}/>
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default ConsumedArea;