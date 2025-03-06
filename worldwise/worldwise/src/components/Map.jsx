import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Map.module.css'

import { useCities } from '../contexts/CitiesContext.jsx'

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

import Button from './Button.jsx';

import { useUrlPosition } from '../hooks/useUrlPosition.js';
import { useGeolocation } from '../hooks/useGeolocation.js';

function Map() {
    const { cities } = useCities();
    const navigate = useNavigate();
    const [mapPosition, setMapPosition] = useState([40, 0])
    const [lat, lng] = useUrlPosition();
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

    useEffect(() => {

        if (lat && lng) {
            setMapPosition([lat, lng])
        }
    }, [lat, lng])

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
        }

    }, [geolocationPosition])

    return (
        <div className={styles.mapContainer}>{!geolocationPosition &&
            <Button type='position' onClick={getPosition}>
                {isLoadingPosition ? 'Loading..' : 'Use your position'}
            </Button>}
            <MapContainer
                center={mapPosition}
                className={styles.map}
                zoom={13}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => <Marker key={city.id} position={[city.position.lat, city.position.lng]} >
                    <Popup>
                        <span>{city.cityName} </span>
                    </Popup>
                </Marker>)}

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>);
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    const map = useMapEvents({
        click(e) {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    })
}

export default Map;