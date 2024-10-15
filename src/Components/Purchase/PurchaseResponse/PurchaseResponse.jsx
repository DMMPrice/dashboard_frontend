import React from "react";
import RenewableResponse from "./RenewableResponse/RenewableReponse";
import IntraStateResponse from "./IntraStateResponse/IntraStateRepsonse";
import InterStateResponse from "./InterStateReponse/InterStateResponse";

function PurchaseResponse() {

    return (
        <div>
            <RenewableResponse/>
            <IntraStateResponse/>
            <InterStateResponse/>
        </div>
    );
}

export default PurchaseResponse;