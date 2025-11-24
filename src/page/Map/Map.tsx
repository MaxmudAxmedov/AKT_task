import { useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';
import PolygonDrawer from "../../components/Polygon/PolygonDrawer";
import * as turf from "@turf/turf";

export default function Map() {
    const [positions, setPositions] = useState<LatLngExpression[]>([]);
    const ZOOM_LIVE = 9;
    const center: LatLngExpression = [41.3111, 69.2797];
    const area = positions.length > 2
        ? turf.area(turf.polygon([[...positions, positions[0]]])) / 10000
        : 0;

    return (
        <div className="h-[90%]">
            <MapContainer center={center} zoom={ZOOM_LIVE} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <PolygonDrawer positions={positions} setPositions={setPositions} />
                {positions.length > 2 && <Polygon positions={positions} color="blue" />}
            </MapContainer>
            <div style={{ marginTop: 10 }}>
                {positions.length > 2 && <p>Polygon maydoni: {area.toFixed(2)} </p>}
            </div>
        </div>
    );
}
