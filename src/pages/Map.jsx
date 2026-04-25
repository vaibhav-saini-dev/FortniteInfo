import React, { Suspense } from 'react'
import { useEffect, useState } from 'react';
import '../CSS/Map.css'

const MemoizedMap = React.memo(React.lazy(() => import('../components/MapInfo')))

export default function Map() {
    const [mapWithPoisLink, setMapWithPoisLink] = useState('');
    const [mapWithoutPoisLink, setMapWithoutPoisLink] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getMap() {
            setError(null)
            try {
                const response = await fetch("https://fortnite-api.com/v1/map")
                const data = await response.json();

                setMapWithPoisLink(data?.data?.images?.pois || '')
                setMapWithoutPoisLink(data?.data?.images?.blank || '')
            } catch (error) {
                if (error instanceof SyntaxError) {
                    setError("Invalid data recieved from server.")
                } else {
                    setError("An error occurred while retrieving the map data.")
                }
            }
        }

        getMap();
    }, []);

    return (
        <>
            <div className="containerResize pt-4">
                <Suspense fallback={
                    <div className="parentHomeContainer">
                        <div className="homeContainer">
                            <p className="homeBodyText">Loading...</p>
                        </div>
                    </div>
                }>
                    <MemoizedMap
                        mapType="Map With POIS"
                        mapLink={mapWithPoisLink}
                        error={error}
                    />
                    <br />

                    <MemoizedMap
                        mapType="Map Without POIS"
                        mapLink={mapWithoutPoisLink}
                        error={error}
                    />
                </Suspense>
            </div>
        </>
    )
}