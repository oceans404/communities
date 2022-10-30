import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Stack, Input, Button } from "@chakra-ui/react";
import { lisbonStartLocation, lisbonCommunityData } from "./LisbonMapData";

const convertDataObjToMapMarker = ({
  lat,
  lng,
  globalName,
  localName,
  description,
  color,
  tags,
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
    tags,
  },
});

const markerPopupUiJsx = (localName, globalName, tags) => `
      <div>
        <h3>
          <strong>${localName}</strong>
        </h3>
        <h4>a ${globalName} community</h4>
        <p>${tags.map((t) => `#${t}`).join(", ")}</p>
      </div>
    `;

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
  const [inEdit, setInEdit] = useState(false);

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

    // iterate over markers and add them to the map
    for (const feature of markers.features) {
      new mapboxgl.Marker({
        color: feature.properties.color || "black",
        draggable: false,
      })
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            markerPopupUiJsx(
              feature.properties.localCommunityName,
              feature.properties.globalCommunityName,
              feature.properties.tags
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

  const addLocationPoint = () => {
    console.log("adding!");
    setInEdit(true);
    if (map.current) {
      console.log(map.current);

      new mapboxgl.Marker({
        color: "rgba(35, 55, 75, 0.9)",
        draggable: true, //draggable
      })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            markerPopupUiJsx("local name", "global name", ["test", "ok"])
          )
        )
        .addTo(map.current);
    }
  };

  const saveCommunity = () => {
    console.log("add save logic here -- save to chain");
    setInEdit(false);
  };

  return (
    <div>
      <div ref={mapContainer} className="map-container">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>

        <button
          onClick={addLocationPoint}
          className="button-add-marker"
          disabled={inEdit}
        >
          {inEdit ? (
            <div>
              <h1>Edit new point info</h1>
              <Stack spacing={3}>
                <Input placeholder="Local community name" size="xs" />
                <Input placeholder="Global community name" size="xs" />
                <Input placeholder="tags ex: 'women, web3'" size="xs" />
                <Input placeholder="Marker color" size="xs" />
                <p>Drag marker to update location</p>
                <Button
                  onClick={() => saveCommunity()}
                  className="button-save-community"
                >
                  Save community
                </Button>
              </Stack>
            </div>
          ) : (
            "Add Point"
          )}
        </button>
      </div>
    </div>
  );
}
