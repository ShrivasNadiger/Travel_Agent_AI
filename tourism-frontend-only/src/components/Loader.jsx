import React from 'react'

export default function Loader() {
    return (
        <div id="loader" className="flex flex-col items-center justify-center py-12 fade-in">
            <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-white rounded-full animate-spin"></div>
                <i className="fa-solid fa-plane text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl animate-pulse"></i>
            </div>
            <p className="text-white mt-6 font-semibold tracking-wider animate-pulse">Consulting AI Agents...</p>
        </div>
    )
}
