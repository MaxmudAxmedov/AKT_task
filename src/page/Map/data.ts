export const MAP_STYLES = {
    osm: {
        name: "OpenStreetMap (standart)",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; OpenStreetMap contributors'
    },
    satellite: {
        name: "Sun'iy yo‘ldosh (Esri)",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UORTHO, swisstopo"
    },
    googleSatellite: {
        name: "Google Sun'iy yo‘ldosh",
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        attribution: "&copy; Google Maps"
    },
    googleHybrid: {
        name: "Google Hybrid",
        url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        attribution: "&copy; Google Maps"
    },
    dark: {
        name: "Qorong‘i (CartoDB Dark)",
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> & <a href="https://carto.com/">CARTO</a>'
    }
};