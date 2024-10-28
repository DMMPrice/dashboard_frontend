import React, {useState} from 'react';
import moment from 'moment';
import './DateForm.css';

const DateForm = ({onResponse}) => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (event) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        event.preventDefault(); // Prevents the default form submission behavior
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        // Format dates as YYYY-MM-DD HH:mm
        const formattedStartDate = moment(startDate).format('YYYY-MM-DD HH:mm');
        const formattedEndDate = moment(endDate).format('YYYY-MM-DD HH:mm');

        // Send data through GET request with params start_date and end_date
        const url = new URL(`${apiUrl}/demand/data_with_sum`);
        url.searchParams.append('start_date', formattedStartDate);
        url.searchParams.append('end_date', formattedEndDate);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                // Include start_date and end_date in the response data
                const responseData = {
                    ...data,
                    start_date: formattedStartDate,
                    end_date: formattedEndDate
                };
                // Pass the response data to the parent component
                onResponse(responseData);
                // Reset the form fields
                setStartDate('');
                setEndDate('');
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <form className="date-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="start-date">Start Date:</label>
                <input
                    type="datetime-local"
                    id="start-date"
                    value={startDate}
                    step="900" // 15-minute intervals
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="end-date">End Date:</label>
                <input
                    type="datetime-local"
                    id="end-date"
                    value={endDate}
                    step="900" // 15-minute intervals
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DateForm;