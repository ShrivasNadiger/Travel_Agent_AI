import fetch from 'node-fetch';

/**
 * Weather Agent
 * Uses Open-Meteo API to get current weather and forecast.
 * 
 * @param {string} lat - Latitude
 * @param {string} lon - Longitude
 * @returns {Promise<Object|null>} - Returns weather data object or null on failure.
 */
export async function getWeather(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
        console.log(`[Weather Agent] Fetching: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Open-Meteo API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[Weather Agent] Error:`, error.message);
        return null;
    }
}
