import React from "react";
import RenewableResponse from "./RenewableResponse/RenewableReponse";
import IntraStateResponse from "./IntraStateResponse/IntraStateRepsonse";
import InterStateResponse from "./InterStateReponse/InterStateResponse";
import './purchaseResponse.css';

function PurchaseResponse() {

    return (
        <div>
            <RenewableResponse/>
            <div className="response-row2">
                <IntraStateResponse/>
                <InterStateResponse/>
            </div>

        </div>
    );
}

export default PurchaseResponse;