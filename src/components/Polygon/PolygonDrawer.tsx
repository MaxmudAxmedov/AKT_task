import React from "react";
import { Marker, useMapEvents } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

interface PolygonDrawerProps {
    positions: LatLngTuple[];
    setPositions: React.Dispatch<React.SetStateAction<LatLngTuple[]>>;
}

export default function PolygonDrawer({ positions, setPositions }: PolygonDrawerProps) {
    useMapEvents({
        click(e) {
            const newPoint: LatLngTuple = [e.latlng.lat, e.latlng.lng];
            setPositions((prev) => [...prev, newPoint]);
        },
    });

    const handleMarkerClick = (index: number) => {
        setPositions((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            {positions.map((pos, idx) => (
                <Marker
                    key={idx}
                    position={pos as [number, number]}
                    eventHandlers={{
                        click: () => handleMarkerClick(idx),
                    }}
                />
            ))}
        </>
    );
}