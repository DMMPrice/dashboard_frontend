import React from 'react';
import GraphData from '../GraphData/GraphData';
import moment from 'moment/moment';
import './GraphArea.css';

function GraphArea({type, path, color}) {
    const apiUrl = process.env.REACT_APP_API_URL + `/demand/${path}`;
    const xAxisLabel = 'Year';
    const yAxisLabel = 'Demand';
    const heading = `Demand${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const dataMapping = {
        label: item => moment(item.TimeStamp).format('DD MM YYYY'),
        datasets: [
            {
                label: `Demand ${type.charAt(0).toUpperCase() + type.slice(1)}`,
                data: item => item[`Demand${type}`],
                borderColor: color || (type === '(Pred)' ? 'rgba(75,192,192,1)' : 'rgba(192,75,75,1)')
            }
        ]
    };

    return (
        <div className="graph-area">
            <GraphData apiUrl={apiUrl} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} dataMapping={dataMapping}
                       heading={heading}/>
        </div>
    );
}

export default GraphArea;