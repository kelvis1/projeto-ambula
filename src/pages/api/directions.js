import axios from "axios";

export default async function handler(req, res) {

    const { origin, destination } = req.query;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!origin || !destination) {
        return res.status(400).json({ error: "Origem e destino são obrigatórios" });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        
        const response = await axios.get(url, {
            headers: {
                'Connection': 'close' // Adicionando "Connection: close"
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Erro ao obter dados do Google Maps:", error);
        res.status(500).json({ error: "Erro ao buscar rota" });
    }
}
