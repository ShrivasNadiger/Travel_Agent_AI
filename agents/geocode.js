import fetch from 'node-fetch';

/**
 * Geocoding Agent
 * Uses Nominatim API to get coordinates for a place name.
 * 
 * @param {string} place - The name of the place to search for.
 * @returns {Promise<Object|null>} - Returns { display_name, lat, lon } or null if not found.
 */
export async function getCoordinates(place) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`;
    console.log(`[Geocode Agent] Fetching: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TravelAgent_AI_Project/1.0' // Nominatim requires a User-Agent
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        display_name: result.display_name,
        lat: result.lat,
        lon: result.lon
      };
    } else {
      console.log(`[Geocode Agent] No results found for "${place}"`);
      return null;
    }
  } catch (error) {
    console.error(`[Geocode Agent] Error:`, error.message);
    return null;
  }
}
