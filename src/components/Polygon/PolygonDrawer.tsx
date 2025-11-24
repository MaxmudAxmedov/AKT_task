import React from "react";
import { Marker, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';


export default function PolygonDrawer({
    positions,
    setPositions,
}: {
    positions: LatLngExpression[];
    setPositions: React.Dispatch<React.SetStateAction<LatLngExpression[]>>;
}) {
    useMapEvents({
        click(e) {
            const latlng: LatLngExpression = [e.latlng.lat, e.latlng.lng];
            setPositions(prev => [...prev, latlng]);
        }
    });

    const handleMarkerClick = (index: number) => {
        setPositions(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            {positions.map((pos, idx) => (
                <Marker
                    key={idx}
                    position={pos}
                    eventHandlers={{
                        click: () => handleMarkerClick(idx)
                    }}
                />
            ))}
        </>
    );
}