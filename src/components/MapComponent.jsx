import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import worldGeo from '../data/world.geojson?url';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

// Register locale for ISO conversion
countries.registerLocale(enLocale);

const MapComponent = ({ highlightedISO }) => {
    // Convert 2-letter ISO to 3-letter ISO to match the map data
    const highlightedISO3 = countries.alpha2ToAlpha3(highlightedISO);

    return (
        <div style={{ width: '100%', height: '400px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', overflow: 'hidden', background: '#001' }}>
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
                <ZoomableGroup zoom={1.5} center={[10, 50]}>
                    <Geographies geography={worldGeo}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                // The map uses 3-letter ISO codes in the 'id' field
                                const isHighlighted = geo.id === highlightedISO3;
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={isHighlighted ? "#FF0000" : "#D6D6DA"}
                                        stroke={isHighlighted ? "#FFFF00" : "#FFF"}
                                        strokeWidth={isHighlighted ? 2 : 0.5}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: isHighlighted ? "#FF0000" : "#F53", outline: "none" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default MapComponent;
