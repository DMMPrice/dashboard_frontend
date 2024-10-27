import React, {useEffect, useState} from "react";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";

const DemographicComponent = () => {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch("/india.topo.json")
            .then(response => response.json())
            .then(data => setGeoData(data))
            .catch(error => console.error("Error fetching the JSON data:", error));
    }, []);

    return (
        <div>
            <h2>Demographic Information</h2>
            {geoData ? (
                <ComposableMap projection="geoMercator">
                    <Geographies geography={geoData}>
                        {({geographies}) =>
                            geographies.map((geo) => {
                                const isGujarat = geo.properties.NAME_1 === "Gujarat";
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={isGujarat ? "#FF5733" : "#DDD"}
                                        stroke="#000"
                                        style={{
                                            default: {outline: "none"},
                                            hover: {outline: "none"},
                                            pressed: {outline: "none"},
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default DemographicComponent;