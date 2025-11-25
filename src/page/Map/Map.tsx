import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Card } from "../../components/ui/card";
import { MAP_STYLES } from "./data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Trash2 } from "lucide-react";
import { toast } from 'react-toastify';
interface PolygonData {
    id: number;
    coords: LatLngTuple[];
    area: number;
}


function InfoControl({ onClick }: { onClick: () => void }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const InfoButton = (L.Control as any).extend({
            onAdd() {
                const btn = L.DomUtil.create("button");
                btn.innerHTML = `
          <div class="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        `;
                btn.style.background = "transparent";
                btn.style.border = "none";
                btn.style.cursor = "pointer";
                btn.onclick = (e: any) => {
                    e.stopPropagation();
                    onClick();
                };
                return btn;
            },
        });

        const control = new InfoButton({ position: "topright" });
        control.addTo(map);

        return () => control.remove();
    }, [map, onClick]);

    return null;
}

let polygonIdCounter = 0;

export default function Map() {
    const [polygons, setPolygons] = useState<PolygonData[]>([]);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const ZOOM_LEVEL = 12;
    const center: LatLngTuple = [41.3111, 69.2797];
    const totalArea = polygons.reduce((sum, p) => sum + p.area, 0);
    const [selectedStyle, setSelectedStyle] = useState<keyof typeof MAP_STYLES>("osm");
    const onCreate = (e: any) => {
        if (e.layerType === "polygon") {
            const latlngs = e.layer.getLatLngs()[0];
            const coords: LatLngTuple[] = latlngs.map((ll: any) => [ll.lat, ll.lng]);

            const turfCoords = coords.map(p => [p[1], p[0]] as [number, number]);
            turfCoords.push(turfCoords[0]);
            const area = turf.area(turf.polygon([turfCoords])) / 10000;

            setPolygons(prev => [...prev, {
                id: ++polygonIdCounter,
                coords,
                area: Number(area.toFixed(4))
            }]);
            toast.success("Polygon qo'shildi")
        }
    };

    const onEdited = (e: any) => {
        e.layers.eachLayer((layer: any) => {
            if (layer.getLatLngs) {
                const latlngs = layer.getLatLngs()[0];
                const coords: LatLngTuple[] = latlngs.map((ll: any) => [ll.lat, ll.lng]);

                const turfCoords = coords.map(p => [p[1], p[0]] as [number, number]);
                turfCoords.push(turfCoords[0]);
                const area = turf.area(turf.polygon([turfCoords])) / 10000;

                const layerId = (layer as any)._leaflet_id;
                setPolygons(prev => prev.map(p => {
                    if ((layer as any)._path?.__polygonId === p.id) {
                        return { ...p, coords, area: Number(area.toFixed(4)) };
                    }
                    return p;
                }));
            }
        });
    };

    const onDeleted = (e: any) => {
        const deletedIds = new Set();
        e.layers.eachLayer((layer: any) => {
            const path = (layer as any)._path;
            if (path && path.__polygonId) {
                deletedIds.add(path.__polygonId);
            }
        });

        setPolygons(prev => prev.filter(p => !deletedIds.has(p.id)));
    };

    const deletePolygon = (id: number) => {
        toast.success("Polygon o'chirildi")
        setPolygons(prev => prev.filter(p => p.id !== id));
    };

    const clearAll = () => {
        setPolygons([]);
        setIsInfoOpen(false);
        toast.success("Polygonlar o'chirildi")
    };

    return (
        <div className="relative h-[88vh] w-full">
            <MapContainer center={center} zoom={ZOOM_LEVEL} className="h-full w-full">
                <TileLayer
                    url={MAP_STYLES[selectedStyle].url}
                    attribution={MAP_STYLES[selectedStyle].attribution}
                />
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={onCreate}
                        onEdited={onEdited}
                        onDeleted={onDeleted}
                        draw={{
                            rectangle: false,
                            polyline: false,
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polygon: {
                                shapeOptions: {
                                    color: "#3b82f6",
                                    weight: 5,
                                    fillColor: "#60a5fa",
                                    fillOpacity: 0.4,
                                },
                            },
                        }}
                        edit={{ remove: true }}
                    />

                    {polygons.map((poly, index) => (
                        <Polygon
                            key={poly.id}
                            positions={poly.coords}
                            pathOptions={{
                                color: "#3b82f6",
                                weight: 5,
                                fillColor: "#60a5fa",
                                fillOpacity: 0.45,
                            }}
                            eventHandlers={{
                                add: (e) => {
                                    const path = e.target._path;
                                    if (path) (path as any).__polygonId = poly.id;
                                }
                            }}
                        />
                    ))}
                </FeatureGroup>

                <InfoControl onClick={() => setIsInfoOpen(true)} />
            </MapContainer>

            <div className="absolute top-2 left-20 z-[10000] bg-white rounded-lg shadow-2xl">
                <Select value={selectedStyle} onValueChange={(v) => setSelectedStyle(v as keyof typeof MAP_STYLES)}>
                    <SelectTrigger className="w-64 h-12 text-base font-medium">
                        <SelectValue placeholder="Xarita uslubini tanlang" />
                    </SelectTrigger>
                    <SelectContent
                        className="z-[100000] bg-white shadow-2xl border-2 border-gray-200"
                        sideOffset={5}
                        align="start"
                    >
                        {Object.entries(MAP_STYLES).map(([key, style]) => (
                            <SelectItem
                                key={key}
                                value={key}
                                className="text-base py-3 px-4 hover:bg-blue-50 cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded border flex items-center justify-center text-xs font-bold bg-gray-100">
                                        {key === "osm" && "OSM"}
                                        {key === "satellite" && "SAT"}
                                        {key === "googleHybrid" && "HYB"}
                                        {key === "dark" && "DARK"}
                                    </div>
                                    <span className="font-medium">{style.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
                <DialogContent className="z-[10000] max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Poligonlar ma'lumotlari ({polygons.length} ta)</DialogTitle>
                        <DialogDescription>Barcha chizilgan hududlar</DialogDescription>
                    </DialogHeader>

                    <Card className="p-6">
                        {polygons.length > 0 ? (
                            <div className="space-y-6">

                                <div className="text-center p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                                    <p className="text-5xl font-bold text-blue-700">{totalArea.toFixed(4)}</p>
                                    <p className="text-2xl text-blue-900 mt-2">Jami maydon (gektar)</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg text-gray-700">Poligonlar ro'yxati:</h4>
                                    {polygons.map((p, i) => (
                                        <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                            <div>
                                                <p className="font-medium">Poligon #{i + 1}</p>
                                                <p className="text-2xl font-bold text-blue-600">{p.area.toFixed(4)} ga</p>
                                                <p className="text-sm text-gray-500">{p.coords.length} ta nuqta</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => deletePolygon(p.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>

                                <Button onClick={clearAll} className="w-full" size="lg" variant="destructive">
                                    Barchasini tozalash
                                </Button>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-12">Hozircha poligon chizilmagan</p>
                        )}
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    );
}