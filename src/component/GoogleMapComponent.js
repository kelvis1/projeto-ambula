"use client";

import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function GoogleMapComponent({ origin, destination }) {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!origin || !destination || typeof origin !== "object" || typeof destination !== "object") return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING, // Pode ser WALKING, BICYCLING ou TRANSIT
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Erro ao buscar rota: ", status);
        }
      }
    );
  }, [origin, destination]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={origin || { lat: -23.55052, lng: -46.633308 }} // Padrão: São Paulo
      zoom={10}
      onLoad={(map) => setMap(map)}
    >
      {origin && <Marker position={origin} />}
      {destination && <Marker position={destination} />}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}
