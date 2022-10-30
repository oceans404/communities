import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

const startLocation = {
  lat: 38.7223,
  lng: -9.1393,
  zoom: 12,
};

const communityData = [
  {
    lat: startLocation.lat,
    lng: startLocation.lng,
    globalName: "Crypto Nomads",
    localName: "CN Lisbon",
    description: "CN is a club",
    color: "red",
  },
  {
    lat: startLocation.lat + 0.01,
    lng: startLocation.lng,
    globalName: "HER DAO",
    localName: "HER DAO Europe",
    description: "her dao is a club",
    color: "blue",
  },
  {
    lat: startLocation.lat,
    lng: startLocation.lng + 0.01,
    globalName: "EthGlobal",
    localName: "Eth Lisbon",
    description: "test",
    color: "red",
  },
];

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

const markers = {
  type: "FeatureCollection",
  features: communityData.map((c) => convertDataObjToMapMarker(c)),
};

export default function MapPage({
  inLat = startLocation.lat,
  inLng = startLocation.lng,
  inZoom = startLocation.zoom,
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

    for (const feature of markers.features) {
      const marker = new mapboxgl.Marker({
        color: feature.properties.color || "black",
        draggable: true,
      })
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<div>
                <h3><strong>${feature.properties.localCommunityName}</strong></h3>
                <h4>a ${feature.properties.globalCommunityName} community</h4>
              </div>`
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
      <h1>Dynamic location</h1>

      <div ref={mapContainer} className="map-container">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
}
