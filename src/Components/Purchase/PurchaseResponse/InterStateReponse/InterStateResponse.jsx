import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function InterStateResponse() {
    const location = useLocation();
    const data = location.state?.data;
    const {start_date, end_date} = data || {};

    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // Step 1: Fetch company names
                const companyResponse = await fetch(`http://13.233.144.75:4000/inter-state/all`);
                const companies = await companyResponse.json();

                // Step 2: Fetch total generation and price for each company
                const companyDetails = await Promise.all(
                    companies.map(async (company) => {
                        // console.log(company);
                        const response = await fetch(
                            `http://13.233.144.75:4000/inter-state/${company}?start_date=${start_date}&end_date=${end_date}`
                        );
                        const result = await response.json();
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
