'use client';

import dynamic from "next/dynamic";
import axios from 'axios';
import { useState, useEffect } from 'react';

const GoogleMapComponent = dynamic(() => import("./GoogleMapComponent"), { ssr: false });

const Directions = ({ origin, destination, setoriginlatilong, setdestinationlatilong }) => {

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
                    params: { origin, destination }
                }); 
                
                const data = response.data;

                if (data.routes && data.routes.length > 0) {
                    const end_locationlatlng = data.routes[0].legs[0].end_location || null;
                    const start_locationlatlng = data.routes[0].legs[0].start_location || null;
                    const distanceInMeters = data.routes[0].legs[0].distance.value;
                    const durationInSeconds = data.routes[0].legs[0].duration.value;
                    const distanceInKm = distanceInMeters / 1000;
                    const estimatedPrice = (distanceInKm * 1.50).toFixed(2);
                    
                    const hours = Math.floor(durationInSeconds / 3600);
                    const minutes = Math.floor((durationInSeconds % 3600) / 60);
                    const seconds = durationInSeconds % 60;

                    const formattedDuration = `${hours > 0 ? hours + 'hora ' : ''}${minutes} minutos e ${seconds}  segundos`;


                    
                    setoriginlatilong(start_locationlatlng);
                    setdestinationlatilong(end_locationlatlng);
                    setDuration(formattedDuration);
                    setDistance(distanceInKm);
                    setPrice(estimatedPrice);
                } else {
                    alert('Rota não encontrada.');
                }
            } catch (error) {
                console.error('Erro ao calcular a distância:', error);
            }
        };

        calculateDistance();
    }, [origin, destination]);

    return (
        <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Resultados da Busca</h2>
            {distance !== null ? (
                <div className="mt-4">
                    <p><strong>Distância:</strong> {distance} km</p>
                    <p><strong>Preço estimado:</strong> €{price}</p>
                    <p><strong>Tempo estimado:</strong> {duration}</p>
                </div>
            ) : (
                <p>Carregando informações...</p>
            )}
        </div>
    );
};

export default Directions;
