import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './Map.css';
import {showDataOnMap} from './utils';



function Map({ countries, casesType, center, zoom}) {
    return (
        <div className='map'>
            <MapContainer
            className="markercluster-map"
            center={center}
            zoom={zoom}
            maxZoom={18}
          >
                <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Loop through countries and draw a circle */}
            {showDataOnMap(countries, casesType)}
        </MapContainer>
        </div>
    )
}

export default Map
