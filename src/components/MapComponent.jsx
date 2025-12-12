import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import worldGeo from '../data/world.geojson?url';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

// Register locale for ISO conversion
countries.registerLocale(enLocale);

// Coordinates for small countries that might be invisible on the map
// Key is 3-letter ISO code
const SMALL_COUNTRIES_COORDINATES = {
    'MLT': [14.45, 35.9],   // Malta
    'AND': [1.52, 42.5],    // Andorra
    'SMR': [12.45, 43.94],  // San Marino
    'VAT': [12.45, 41.90],  // Vatican City
    'MCO': [7.42, 43.73],   // Monaco
    'LIE': [9.52, 47.16],   // Liechtenstein
    'LUX': [6.13, 49.61],   // Luxembourg
    'SGP': [103.8, 1.35],   // Singapore
    'BHR': [50.55, 26.06],  // Bahrain
    'MDV': [73.5, 3.2],     // Maldives
    'BRB': [-59.5, 13.17],  // Barbados
    'KNA': [-62.7, 17.3],   // Saint Kitts and Nevis
    'LCA': [-60.9, 13.9],   // Saint Lucia
    'VCT': [-61.2, 13.2],   // Saint Vincent and the Grenadines
    'GRD': [-61.6, 12.1],   // Grenada
    'ATG': [-61.8, 17.0],   // Antigua and Barbuda
    'SYC': [55.4, 4.6],     // Seychelles
};

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
                    {SMALL_COUNTRIES_COORDINATES[highlightedISO3] && (
                        <Marker coordinates={SMALL_COUNTRIES_COORDINATES[highlightedISO3]}>
                            <circle r={3} fill="#FF0000" stroke="#FFF" strokeWidth={1} />
                        </Marker>
                    )}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default MapComponent;
