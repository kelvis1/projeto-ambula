"use client";

import dynamic from "next/dynamic";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const GoogleMapComponent = dynamic(() => import("./GoogleMapComponent"), {
  ssr: false,
});

const Directions = ({
  origin,
  destination,
  setoriginlatilong,
  setdestinationlatilong,
}) => {
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const calculateDistance = async () => {
      if (!origin || !destination) {
        return;
      }

      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const response = await axios.get(`/api/directions`, {
          params: { origin, destination },
        });

        const data = response.data;

        if (data.routes && data.routes.length > 0) {
          const end_locationlatlng =
            data.routes[0].legs[0].end_location || null;
          const start_locationlatlng =
            data.routes[0].legs[0].start_location || null;
          const distanceInMeters = data.routes[0].legs[0].distance.value;
          const durationInSeconds = data.routes[0].legs[0].duration.value;
          const distanceInKm = distanceInMeters / 1000;
          const estimatedPrice = (distanceInKm * 1.5).toFixed(2);

          const hours = Math.floor(durationInSeconds / 3600);
          const minutes = Math.floor((durationInSeconds % 3600) / 60);
          const seconds = durationInSeconds % 60;

          const formattedDuration = `${
            hours > 0 ? hours + "hora " : ""
          }${minutes} minutos e ${seconds}  segundos`;

          setoriginlatilong(start_locationlatlng);
          setdestinationlatilong(end_locationlatlng);
          setDuration(formattedDuration);
          setDistance(distanceInKm);
          setPrice(estimatedPrice);
        } else {
          alert("Rota não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao calcular a distância:", error);
      }
    };

    calculateDistance();
  }, [origin, destination]);

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Resultados da Busca
        </Typography>
        {distance !== null ? (
          <>
            <Typography variant="body1">
              <strong>Distância:</strong> {distance} km
            </Typography>
            <Typography variant="body1">
              <strong>Preço estimado:</strong> €{price}
            </Typography>
            <Typography variant="body1">
              <strong>Tempo estimado:</strong> {duration}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Carregando informações...
          </Typography>
        )}
      </CardContent>
    </Card>
    
  );
};

export default Directions;
