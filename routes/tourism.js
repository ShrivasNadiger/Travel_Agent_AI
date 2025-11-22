import express from 'express';
import { getCoordinates } from '../agents/geocode.js';
import { getWeather } from '../agents/weather.js';
import { getPlaces } from '../agents/places.js';

const router = express.Router();

/**
 * POST /api/v1/tourism
 * Orchestrates the tourism data gathering.
 */
router.post('/tourism', async (req, res) => {
    try {
        const { place } = req.body;

        if (!place) {
            return res.status(400).json({ error: 'Place name is required' });
        }

        console.log(`[Orchestrator] Received request for: ${place}`);

        // 1. Geocoding
        const coords = await getCoordinates(place);
        if (!coords) {
            return res.status(404).json({ message: "I don't know this place exists" });
        }

        console.log(`[Orchestrator] Coordinates found: ${coords.lat}, ${coords.lon}`);

        // 2. Parallel execution for Weather and Places
        const [weather, attractions] = await Promise.all([
            getWeather(coords.lat, coords.lon),
            getPlaces(coords.lat, coords.lon)
        ]);

        // Construct final response
        const response = {
            place: coords.display_name,
            coords: {
                lat: coords.lat,
                lon: coords.lon
            },
            weather: weather || { message: "Weather data unavailable" },
            attractions: attractions
        };

        res.json(response);

    } catch (error) {
        console.error(`[Orchestrator] Error:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
