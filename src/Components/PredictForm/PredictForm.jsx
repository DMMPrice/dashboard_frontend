import React, {useState} from 'react';
import DateForm from './DateForm';
import ResponseComponent from './ResponseComponent';

function PredictForm() {
    const [responseData, setResponseData] = useState(null);

    const handleResponse = (data) => {
        setResponseData(data);
    };

    return (
        <div className="predict-main">
            <h1>Predict Electricity</h1>
            <DateForm onResponse={handleResponse}/>
            {responseData && <ResponseComponent data={responseData}/>}
        </div>
    );
}

export default PredictForm;