import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { lisbonStartLocation, lisbonCommunityData } from "./LisbonMapData";

const convertDataObjToMapMarker = ({
  lat,
  lng,
  globalName,
  localName,
  description,
  color,
}) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [lng, lat],
  },
  properties: {
    globalCommunityName: globalName,
    localCommunityName: localName,
    description,
    color: color || "black",
  },
});

export default function MapPage({
  inLat = lisbonStartLocation.lat,
  inLng = lisbonStartLocation.lng,
  inZoom = lisbonStartLocation.zoom,
  mapData = lisbonCommunityData,
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

    const markers = {
      type: "FeatureCollection",
      features: mapData.map((c) => convertDataObjToMapMarker(c)),
    };

    const markerPopupUiJsx = (localName, globalName) => `
      <div>
        <h3>
          <strong>${localName}</strong>
        </h3>
        <h4>a ${globalName} community</h4>
      </div>
    `;

    // iterate over markers and add them to the map
    for (const feature of markers.features) {
      new mapboxgl.Marker({
        color: feature.properties.color || "black",
        draggable: true,
      })
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            markerPopupUiJsx(
              feature.properties.localCommunityName,
              feature.properties.globalCommunityName
            )
          )
        )
        .addTo(map.current);
    }

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
}
