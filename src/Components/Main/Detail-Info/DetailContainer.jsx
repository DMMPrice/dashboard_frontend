import React from "react";
import "./DetailContainer.css";

function DetailContainer({ title, value, color, backgroundColor }) {
    return (
        <div className="detail-container" style={{ color: color, backgroundColor: backgroundColor }}>
            <p className="info-title">{title}</p>
            <p className="info-value" style={{backgroundColor: backgroundColor}}>{value}</p>
        </div>
    );
}

export default DetailContainer;