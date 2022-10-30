import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

const hermosaBeachLocationData = {
  lat: 33.8622,
  lng: -118.3995,
  zoom: 13,
};

export default function MapPage({
  inLat = hermosaBeachLocationData.lat,
  inLng = hermosaBeachLocationData.lng,
  inZoom = hermosaBeachLocationData.zoom,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(inLng);
  const [lat, setLat] = useState(inLat);
  const [zoom, setZoom] = useState(inZoom);

  const key = process.env.REACT_APP_MAPBOX_KEY;
  mapboxgl.accessToken = key;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <h1>Dynamic location</h1>
      <ul>
        <li>Lat: {lat}</li>
        <li>Lng: {lng}</li>
        <li>Zoom: {zoom}</li>
      </ul>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
