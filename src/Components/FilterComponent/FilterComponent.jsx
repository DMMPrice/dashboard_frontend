import React, { useState } from "react";
import "./FilterComponent.css";

function FilterComponent({ onFilter, setLoading }) {
    const [year, setYear] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleFilter = () => {
        setLoading(true);
        onFilter({ year, startDate, endDate });
    };

    const handleClear = () => {
        setLoading(true);
        setYear("");
        setStartDate("");
        setEndDate("");
        onFilter({ year: "", startDate: "", endDate: "" });
    };

    return (
        <div className="filter-component">
            <input
                type="text"
                placeholder="Year (e.g., 2021)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={handleFilter}>Apply Filter</button>
            <button onClick={handleClear}>Clear Filter</button>
        </div>
    );
}

export default FilterComponent;