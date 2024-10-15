import React from "react";
import GraphArea from "../GraphArea/GraphArea";
import "./ConsumedArea.css";

function ConsumedArea() {
    return (
        <div>
            <h1>Consumed Area</h1>
            <div className="submit-area-graph">
                <GraphArea type="(Actual)" path="consumed"/>
                <GraphArea type="(Pred)" path="predicted"/>
            </div>
        </div>
    );
}

export default ConsumedArea;