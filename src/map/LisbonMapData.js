export const lisbonStartLocation = {
  lat: 38.7223,
  lng: -9.1393,
  zoom: 12,
};

export const lisbonCommunityData = [
  {
    lat: lisbonStartLocation.lat,
    lng: lisbonStartLocation.lng,
    globalName: "Crypto Nomads",
    localName: "CN Lisbon",
    description: "CN is a club",
    color: "orange",
  },
  {
    lat: lisbonStartLocation.lat + 0.01,
    lng: lisbonStartLocation.lng,
    globalName: "HER DAO",
    localName: "HER DAO Europe",
    description: "her dao is a club",
    color: "blue",
  },
  {
    lat: lisbonStartLocation.lat,
    lng: lisbonStartLocation.lng + 0.01,
    globalName: "EthGlobal",
    localName: "Eth Lisbon",
    description: "test",
    color: "green",
  },
];
