import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css'
import { useCities } from '../contexts/CitiesContext.jsx'

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation.js';

function Map() {
    const { cities } = useCities();
    const navigate = useNavigate();
    const [mapPosition, setMapPosition] = useState([40, 0])
    const [searchParams, setSearchParams] = useSearchParams();
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation([40, 0]);


    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    useEffect(() => {

        if (lat && lng) {
            setMapPosition([lat, lng])
        }
    }, [lat, lng])

    return (
        <div className={styles.mapContainer} onClick={() => { navigate('form') }}>
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