// components/MapComponent.js
import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const pharmacies = [
  { name: 'MediPlus', lat: 19.078, lng: 72.877 },
  { name: 'HealthKart', lat: 19.079, lng: 72.879 },
  { name: 'PharmaOne', lat: 19.08, lng: 72.881 },
  { name: 'GreenMed', lat: 19.076, lng: 72.876 },
  { name: 'City Pharmacy', lat: 19.077, lng: 72.874 },
  { name: 'MedCare', lat: 19.081, lng: 72.875 },
  { name: 'Wellness Hub', lat: 19.073, lng: 72.873 },
  { name: 'Aarogya', lat: 19.072, lng: 72.879 },
  { name: 'LifeSaver', lat: 19.075, lng: 72.882 },
  { name: 'Apna Chemist', lat: 19.0785, lng: 72.885 },
  { name: 'EasyMeds', lat: 19.0792, lng: 72.883 },
  { name: 'Jeevan Rekha', lat: 19.0777, lng: 72.886 },
];

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    // Create the map first
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/satellite/style.json?key=6nj3a1BhW60gpVKTytFV',
      center: [72.8777, 19.0760],
      zoom: 13,
    });

    // Add pharmacy markers
    pharmacies.forEach((p) => {
      new maplibregl.Marker({ color: 'red' })
        .setLngLat([p.lng, p.lat])
        .setPopup(new maplibregl.Popup().setText(p.name))
        .addTo(map.current);
    });

    // Get user's current location and center the map
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          // Center map on user location
          map.current.setCenter([longitude, latitude]);

          // Add user location marker
          new maplibregl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .setPopup(new maplibregl.Popup().setText('Your Location'))
            .addTo(map.current);
        },
        (err) => {
          console.error('Geolocation error:', err);
        }, {
    enableHighAccuracy: true,   // ✅ use this
    timeout: 10000,             // optional: max wait time 10s
    maximumAge: 0,              // don't use cached position
  }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: '400px', width: '100%', marginTop: '1rem' }}
    />
  );
};

export default MapComponent;
