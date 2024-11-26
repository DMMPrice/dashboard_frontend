import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import './interState.css';

function InterStateResponse() {
    // const apiURL = process.env.REACT_APP_API_URL + `/inter-state/all`;
    // const apiURL = "https://dashboard-backend-zan6.onrender.com" + `/inter-state/all`;
    const apiURL = "https://api.powercasting.online" + `/inter-state/all`;
    const location = useLocation();
    const data = location.state?.data;
    const {start_date, end_date} = data || {};

    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleRows, setVisibleRows] = useState(10);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const companyResponse = await fetch(apiURL);
                const companies = await companyResponse.json();

                const companyDetails = await Promise.all(
                    companies.map(async (company) => {
                        // const apiURL2 = process.env.REACT_APP_API_URL + `/inter-state/${company}?start_date=${start_date}&end_date=${end_date}`;
                        // const apiURL2 = "https://dashboard-backend-zan6.onrender.com" + `/inter-state/${company}?start_date=${start_date}&end_date=${end_date}`;
                        const apiURL2 = "https://api.powercasting.online" + `/inter-state/${company}?start_date=${start_date}&end_date=${end_date}`;
                        const response = await fetch(apiURL2);
                        const result = await response.json();

                        return {
                            companyName: company,
                            totalGeneration: result[0]?.total_generate,
                            totalPrice: result[1]?.total_price
                        };
                    })
                );

                setCompanyData(companyDetails);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching company data:", error);
                setLoading(false);
            }
        };

        if (start_date && end_date) {
            fetchCompanyData();
        }
    }, [start_date, end_date]);

    const handleRowChange = (event) => {
        const value = event.target.value;
        setVisibleRows(value === "All" ? companyData.length : Number(value));
    };

    const downloadCSV = () => {
        const headers = ["Company Name", "Total Generation", "Total Price"];
        const rows = companyData.map(company => [
            company.companyName,
            company.totalGeneration || 'N/A',
            company.totalPrice || 'N/A'
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "inter_state_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="inter-state-response">
            <h2>Inter State Generated Energy</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="controls">
                        <label htmlFor="rows">Rows to display:</label>
                        <select id="rows" value={visibleRows} onChange={handleRowChange}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value="All">All</option>
                        </select>
                        <button onClick={downloadCSV}>Download CSV</button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Total Generation</th>
                            <th>Total Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {companyData.slice(0, visibleRows).map((company, index) => (
                            <tr key={index}>
                                <td>{company.companyName}</td>
                                <td>{company.totalGeneration || 'N/A'}</td>
                                <td>{company.totalPrice || 'N/A'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default InterStateResponse;