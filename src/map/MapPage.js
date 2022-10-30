import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const hermosaBeachLng = -118.3995;
  const hermosaBeachLat = 33.8622;
  const [lng, setLng] = useState(hermosaBeachLng);
  const [lat, setLat] = useState(hermosaBeachLat);
  const [zoom, setZoom] = useState(13);

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
  });

  return (
    <div>
      <h1>map goes here!</h1>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
