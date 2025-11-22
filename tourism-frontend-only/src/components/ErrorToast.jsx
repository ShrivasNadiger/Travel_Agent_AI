import React, { useEffect } from 'react'

export default function ErrorToast({ error, onClose }) {
    useEffect(() => {
        if (error) {
            const timer = setTimeout(onClose, 5000)
            return () => clearTimeout(timer)
        }
    }, [error, onClose])

    if (!error) return null

    return (
        <div id="errorBox" className="fixed top-6 right-6 z-50 animate-slide-in">
            <div className="glass bg-red-500/20 border border-red-500/30 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-4 max-w-md">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-lg">
                    <i className="fa-solid fa-triangle-exclamation text-white"></i>
                </div>
                <div>
                    <h4 className="font-bold text-red-100">Error</h4>
                    <p id="errorMsg" className="text-sm text-red-50">{error}</p>
                </div>
                <button onClick={onClose} className="ml-auto text-white/50 hover:text-white transition-colors">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    )
}
