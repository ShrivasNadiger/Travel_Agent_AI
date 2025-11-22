import React from 'react'

export default function Header({ cityRef, onSearch, loading }) {
    return (
        <>
            <nav className="flex justify-between items-center mb-16 fade-in pt-4">
                <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                        <i className="fa-solid fa-earth-americas text-4xl text-blue-500"></i>
                        <i className="fa-solid fa-plane text-lg text-purple-600 absolute top-3 right-3 bg-white/80 rounded-full p-0.5 shadow-sm transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"></i>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md leading-none">
                            Travel<span className="text-yellow-300">Agent</span>
                        </h1>
                        <p className="text-xs text-white/80 font-medium tracking-widest uppercase mt-1">AI Powered Explorer</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2 glass-pill px-6 py-2 rounded-full text-white/90 text-sm font-semibold border border-white/20">
                    <span className="flex items-center gap-2 px-2"><i className="fa-solid fa-cloud text-blue-200"></i> Open-Meteo</span>
                    <span className="w-px h-4 bg-white/30"></span>
                    <span className="flex items-center gap-2 px-2"><i className="fa-solid fa-map text-green-200"></i> OpenStreetMap</span>
                </div>
            </nav>

            <div className="max-w-3xl mx-auto mb-16 fade-in delay-100 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg tracking-tight leading-tight">
                    Discover Your Next <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">Great Adventure</span>
                </h2>

                <div className="glass p-2 rounded-full flex shadow-2xl relative z-30 transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="pl-6 flex items-center justify-center text-white/70">
                        <i className="fa-solid fa-magnifying-glass text-xl"></i>
                    </div>
                    <input id="cityInput" ref={cityRef} type="text" placeholder="Where to next? (e.g. Kyoto, Paris)"
                        className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg text-white placeholder-white/60 font-medium w-full"
                        onKeyDown={(e) => { if (e.key === 'Enter') onSearch() }} />
                    <button onClick={onSearch} className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 group" disabled={loading}>
                        <span id="btnText">{loading ? 'Processing' : 'Explore'}</span>
                        <i id="btnIcon" className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-arrow-right'} group-hover:translate-x-1 transition-transform`}></i>
                    </button>
                </div>
            </div>
        </>
    )
}
