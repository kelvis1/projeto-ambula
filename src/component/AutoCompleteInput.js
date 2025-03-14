'use client';

import React, { useEffect, useState } from 'react';

const AutoCompleteInput = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    const handleButtonClick = () => {
        alert(`Ponto de partida: ${origin}\nDestino: ${destination}`);
    };

    useEffect(() => {
        const loadScript = (url, callback) => {
            const script = document.createElement('script');
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
                    
                    const originAutocomplete = new google.maps.places.Autocomplete(document.getElementById('origin'), {
                        types: ['geocode'],
                    });
                    originAutocomplete.addListener('place_changed', () => {
                        const place = originAutocomplete.getPlace();
                        if (place.geometry) {
                            setOrigin(place.formatted_address); 
                        }
                    });
                    
                    const destinationAutocomplete = new google.maps.places.Autocomplete(document.getElementById('destination'), {
                        types: ['geocode'],
                    });
                    destinationAutocomplete.addListener('place_changed', () => {
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
        <div>
            <input id="origin" type="text" placeholder="Digite o ponto de partida" value={origin}
            onChange={(e) => setOrigin(e.target.value)}  />

            <input id="destination" type="text" placeholder="Digite o destino"  value={destination}
        onChange={(e) => setDestination(e.target.value)} />

            <button onClick={handleButtonClick}>
                Pesquisar
            </button>
        </div>
    );
};

export default AutoCompleteInput;
