import React, {useState} from "react";
import * as XLSX from "xlsx";
import "./TableArea.css";

function TableArea({data, columns}) {
    const [rowsToShow, setRowsToShow] = useState(100);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, "data.xlsx");
    };

    const handleRowsChange = (event) => {
        setRowsToShow(parseInt(event.target.value));
    };

    return (
        <div className="table-area">
            <button onClick={handleExport}>Download as Excel</button>
            <select onChange={handleRowsChange} value={rowsToShow} className="table-area-select">
                <option value={10}>Show 10 rows</option>
                <option value={50}>Show 50 rows</option>
                <option value={100}>Show 100 rows</option>
                <option value={200}>Show 200 rows</option>
                <option value={500}>Show 500 rows</option>
                <option value={data.length}>Show All rows</option>
            </select>
            <table>
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.accessor}>{column.Header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.slice(0, rowsToShow).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column) => (
                            <td key={column.accessor}>{row[column.accessor]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableArea;