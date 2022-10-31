import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import { lisbonCommunityData } from "./map/LisbonMapData";

// {
//   lat: lisbonStartLocation.lat - 0.015,
//   lng: lisbonStartLocation.lng - 0.015,
//   globalName: "Crypto Nomads",
//   localName: "CN Lisbon",
//   description: "CN is a club",
//   color: "orange",
//   tags: ["crypto", "travel"],
// },

export const CommunityPage = () => {
  let { id } = useParams();

  const communityLocalName = id.split("-").join(" ");
  const { globalName, localName, description, color, tags } =
    lisbonCommunityData.filter((c) => c.localName === communityLocalName)[0];
  return (
    <div>
      <Container>
        <h1>{localName}</h1>
        <h3>a {globalName} community</h3>
        {description && <p>{description}</p>}
        {tags && tags.map((t) => `#${t}`).join(", ")}
      </Container>
    </div>
  );
};
