import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useState } from 'react'
import { getCenter } from 'geolib'
import Image from 'next/image'

const Map = ({ searchResults }) => {
    const [selectedLocation, setSelectedLocation] = useState({})
    const coordinates = searchResults.map(item => {
        return {
            longitude: item.long,
            latitude: item.lat,
        }
    })

    const centerCoordinates = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        zoom: 11,
        latitude: centerCoordinates.latitude,
        longitude: centerCoordinates.longitude,
    })
    return (
        <ReactMapGL
            mapStyle="mapbox://styles/amoghkapoor/cktgrmpxv046e18sakhvm2xyg"
            mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >

            {searchResults.map(item => (
                <div key={item.long}>
                    <Marker
                        longitude={item.long}
                        latitude={item.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <div onClick={() => setSelectedLocation(item)} className="relative h-8 cursor-pointer animate-bounce w-8" aria-label="marker">
                            <Image src="https://images-na.ssl-images-amazon.com/images/I/415y53wUJnL.png" layout="fill" objectFit="cover" />
                        </div>
                    </Marker>
                    {selectedLocation.long === item.long ?
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={item.lat}
                            longitude={item.long}
                            className="z-50"
                        >
                            {item.title}
                        </Popup> : null}
                </div>
            ))}
        </ReactMapGL>
    )
}
export default Map
