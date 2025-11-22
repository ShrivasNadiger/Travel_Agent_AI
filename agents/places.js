import fetch from 'node-fetch';

/**
 * Places Agent
 * Uses Overpass API to find tourist attractions near coordinates.
 * 
 * @param {string} lat - Latitude
 * @param {string} lon - Longitude
 * @returns {Promise<Array>} - Returns array of attractions (up to 5).
 */
export async function getPlaces(lat, lon) {
    try {
        // Search radius: 5000m
        // Tags: tourism, historic, amenity=museum
        const query = `
      [out:json];
      (
        node["tourism"](around:5000,${lat},${lon});
        way["tourism"](around:5000,${lat},${lon});
        node["historic"](around:5000,${lat},${lon});
        way["historic"](around:5000,${lat},${lon});
        node["amenity"="museum"](around:5000,${lat},${lon});
        way["amenity"="museum"](around:5000,${lat},${lon});
      );
      out center 5;
    `;

        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        console.log(`[Places Agent] Fetching from Overpass API...`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Overpass API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.elements) {
            return data.elements.map(el => {
                const tags = el.tags || {};
                return {
                    name: tags.name || "Unknown Attraction",
                    type: tags.tourism || tags.historic || tags.amenity || "attraction",
                    lat: el.lat || el.center?.lat,
                    lon: el.lon || el.center?.lon,
                    tags: tags
                };
            });
        }

        return [];
    } catch (error) {
        console.error(`[Places Agent] Error:`, error.message);
        return [];
    }
}
