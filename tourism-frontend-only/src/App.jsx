import React, { useState, useRef } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Loader from './components/Loader'
import Results from './components/Results'
import ErrorToast from './components/ErrorToast'

export default function App() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const cityRef = useRef()

    async function planTrip() {
        const city = (cityRef.current?.value || '').trim()
        if (!city) return
        setError(null)
        setData(null)
        setLoading(true)

        try {
            // ADAPTED: Use relative path. Vite proxy handles this in dev, Vercel handles in prod.
            const resp = await axios.post('/api/v1/tourism', { place: city }, { timeout: 30000 })
            const res = resp.data
            if (res.error) {
                setError(res.message || res.error || 'Unknown error')
            } else {
                setData(res)
            }
        } catch (err) {
            setError('Could not reach the agents. Ensure backend is running at http://localhost:3000')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <Header cityRef={cityRef} onSearch={planTrip} loading={loading} />
            {loading && <Loader />}
            <ErrorToast error={error} onClose={() => setError(null)} />
            {data && <Results data={data} />}
            <div className="mt-8 text-center text-white/70">Built with Nominatim • Open-Meteo • Overpass</div>
        </div>
    )
}
