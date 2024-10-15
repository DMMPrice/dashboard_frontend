import React, {useState} from 'react';
import DateForm from './DateForm';
import ResponseComponent from './ResponseComponent'; // Import the new component

function PredictForm() {
    const [responseData, setResponseData] = useState(null);

    const handleResponse = (data) => {
        setResponseData(data);
    };

    return (
        <div>
            <h1>Welcome to Predict</h1>
            <DateForm onResponse={handleResponse}/>
            {responseData && <ResponseComponent data={responseData}/>}
        </div>
    );
}

export default PredictForm;