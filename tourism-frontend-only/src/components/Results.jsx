import React from 'react'

export default function Results({ data }) {
    const { place, coords, weather, attractions } = data
    const { lat, lon } = coords
    const currentWeather = weather.current_weather || {}
    const daily = weather.daily || {}

    // Construct Google Maps Embed URL
    const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    return (
        <div id="results" className="fade-in space-y-8">

            {/* Location Header */}
            <div className="text-center mb-8">
                <h2 id="resLocation" className="text-4xl font-bold text-white drop-shadow-md mb-2">{place}</h2>
                <p id="resCoords" className="text-white/60 font-mono text-sm bg-black/20 inline-block px-4 py-1 rounded-full">
                    <i className="fa-solid fa-location-crosshairs mr-2"></i>
                    {lat}, {lon}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Weather Card */}
                <div className="glass rounded-3xl p-8 text-white relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i className="fa-solid fa-cloud-sun text-9xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                        <i className="fa-solid fa-temperature-half text-yellow-300"></i> Weather
                    </h3>
                    <div id="weatherContent" className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Current</span>
                            <span className="text-3xl font-bold">{currentWeather.temperature}°C</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Wind</span>
                            <span className="font-mono">{currentWeather.windspeed} km/h</span>
                        </div>
                        {daily.temperature_2m_max && daily.temperature_2m_max[0] && (
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <div className="text-sm text-white/60 mb-2">Forecast (Today)</div>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-200">Min: {daily.temperature_2m_min[0]}°C</span>
                                    <span className="text-red-200">Max: {daily.temperature_2m_max[0]}°C</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Attractions Card */}
                <div className="glass rounded-3xl p-8 text-white lg:col-span-2 relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i className="fa-solid fa-camera-retro text-9xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                        <i className="fa-solid fa-map-location-dot text-green-300"></i> Top Attractions
                    </h3>
                    <ul id="placesList" className="space-y-3 relative z-10">
                        {attractions && attractions.length > 0 ? (
                            attractions.map((place, index) => (
                                <li key={index} className="bg-white/5 hover:bg-white/10 p-4 rounded-xl flex items-center gap-4 transition-all duration-300 hover:translate-x-2 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg leading-tight">{place.name}</div>
                                        <div className="text-xs text-white/60 uppercase tracking-wider mt-1">{place.type}</div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="text-white/60 italic">No specific attractions found nearby.</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Map */}
            <div className="glass rounded-3xl p-2 shadow-2xl">
                <iframe
                    id="gmap_canvas"
                    className="w-full h-96 rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                    src={mapUrl}
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                ></iframe>
            </div>
        </div>
    )
}
