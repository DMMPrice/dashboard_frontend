import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function InterStateResponse() {
    const apiURL = process.env.REACT_APP_API_URL + `/inter-state/all`;
    const location = useLocation();
    const data = location.state?.data;
    const {start_date, end_date} = data || {};

    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {

                // Step 1: Fetch company names
                const companyResponse = await fetch(apiURL);
                const companies = await companyResponse.json();

                // Debugging
                // console.log(companies);

                // Step 2: Fetch total generation and price for each company
                const companyDetails = await Promise.all(
                    companies.map(async (company) => {
                        const apiURL2 = process.env.REACT_APP_API_URL + `/inter-state/${company}?start_date=${start_date}&end_date=${end_date}`;

                        // Debugging
                        // console.log(company);

                        const response = await fetch(apiURL2);
                        const result = await response.json();

                        // Debugging
                        // console.log(result);

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

    return (
        <div>
            <h2>Inter State Generated Energy</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Total Generation</th>
                        <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companyData.map((company, index) => (
                        <tr key={index}>
                            <td>{company.companyName}</td>
                            <td>{company.totalGeneration || 'N/A'}</td>
                            <td>{company.totalPrice || 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default InterStateResponse;
