import React, {useState} from 'react';
import "./DemographicComponent.css";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from 'react-simple-maps';
import countriesData from './countries-110m.json';

const DemographicMap = () => {
    const [tooltipContent, setTooltipContent] = useState("");

    return (
        <div className='demographic-main'>
            <ComposableMap data-tip="">
                <ZoomableGroup>
                    <Geographies geography={countriesData}>
                        {({geographies}) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const {NAME} = geo.properties;
                                        setTooltipContent(`${NAME}`);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {fill: "#028090", outline: "none"},
                                        hover: {fill: "#00bfb2", outline: "none"},
                                        pressed: {fill: "#f0f3bd", outline: "none"}
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            {tooltipContent && (
                <div className="tooltip">
                    {tooltipContent}
                </div>
            )}
        </div>
    );
};

export default DemographicMap;
