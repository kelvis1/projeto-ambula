"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';

const GoogleMapComponent = dynamic(() => import("./GoogleMapComponent"), {
  ssr: false,
});
const Directions = dynamic(() => import("./Directions"), { ssr: false });

const AutoCompleteInput = () => {
  const [origin, setOrigin] = useState("");
  const [originlatilong, setoriginlatilong] = useState(null);
  const [destinetionlatilong, setdestinationlatilong] = useState(null);
  const [destination, setDestination] = useState("");
  const [showDirections, setShowDirections] = useState(false);

  const handleButtonClick = () => {
    if (!origin || !destination) {
      alert("Por favor, insira origem e destino.");
      return;
    }
    setShowDirections(true);
  };

  useEffect(() => {
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.head.appendChild(script);
    };

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`,
      () => {
        if (window.google) {
          const originAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById("origin"),
            { types: ["geocode"] }
          );
          originAutocomplete.addListener("place_changed", () => {
            const place = originAutocomplete.getPlace();
            if (place.geometry) {
              setOrigin(place.formatted_address);
            }
          });

          const destinationAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById("destination"),
            { types: ["geocode"] }
          );
          destinationAutocomplete.addListener("place_changed", () => {
            const place = destinationAutocomplete.getPlace();
            if (place.geometry) {
              setDestination(place.formatted_address);
            }
          });
        }
      }
    );
  }, []);

  return (
    <div className="mapacontainer">
      <div className="textocontainer">
        <Paper className="paper" elevation={7}>

        <div className="origemtextfield">
          <TextField
            id="origin"
            type="text"
            placeholder="Digite o ponto de partida"
            label="Origem"
            variant="filled"
            fullWidth
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div className="destinotextfield">
          <TextField
            id="destination"
            type="text"
            placeholder="Digite o destino"
            label="Destino"
            variant="filled"
            fullWidth
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="buttonpesquisar">
          <Button fullWidth variant="contained" onClick={handleButtonClick}>
            Pesquisar
          </Button>
        </div>
        {showDirections && (
          <Directions
            origin={origin}
            destination={destination}
            setoriginlatilong={setoriginlatilong}
            setdestinationlatilong={setdestinationlatilong}
          />
        )}
        </Paper>
      </div>
      <div className="googlemapacontainer">
        <GoogleMapComponent
          origin={originlatilong}
          destination={destinetionlatilong}
        />
      </div>
    </div>
  );
};

export default AutoCompleteInput;
