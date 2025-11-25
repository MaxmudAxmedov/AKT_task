import { useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import { useTranslation } from "react-i18next";
import PolygonDrawer from "../../components/Polygon/PolygonDrawer";

export default function Map() {
    const { t } = useTranslation();
    const [positions, setPositions] = useState<LatLngTuple[]>([]);
    const ZOOM_LIVE = 9;
    const center: LatLngTuple = [41.3111, 69.2797];

    const area =
        positions.length > 2
            ? turf.area(
                turf.polygon([
                    [...positions, positions[0]] as [number, number][]
                ])
            ) / 10000
            : 0;

    return (
        <div className="h-[80vh]">
            <MapContainer center={center} zoom={ZOOM_LIVE} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <PolygonDrawer positions={positions} setPositions={setPositions} />
                {positions.length > 2 && (
                    <Polygon positions={positions as [number, number][]} color="blue" weight={3} />
                )}
            </MapContainer>


            <div className="bg-white p-4 shadow-lg rounded mt-2 max-w-xs">
                {positions.length > 2 && (
                    <p className="text-lg font-semibold">
                        {t("polygon_are")}: {area.toFixed(3)} ga
                    </p>
                )}
                <p className="text-sm text-gray-600">Nuqtalar soni: {positions.length}</p>
            </div>
        </div>
    );
}