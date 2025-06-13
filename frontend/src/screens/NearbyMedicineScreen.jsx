import React, { useState, useEffect } from 'react';
import { useGetNearbyPharmaciesQuery } from '../slices/pharmacyApiSlice.js';

const NearbyMedicineScreen = () => {
  const [medicine, setMedicine] = useState('');
  const [coords, setCoords] = useState({ lat: null, lng: null });
  
  // run query only when we have both coords & medicine name
  const {
    data: pharmacies,
    isLoading,
    isError,
    refetch,
  } = useGetNearbyPharmaciesQuery(
    {
      lat: coords.lat,
      lng: coords.lng,
      medicine,
      maxDistance: 5,
      deliveryOnly: false,
    },
    { skip: coords.lat == null || !medicine }
  );


  
  // get geolocation once
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => setCoords({ lat: latitude, lng: longitude }),
      () => console.error('Location denied')
    );
  }, []);

  const handleSearch = () => {
    // triggers a refetch if it was skipped initially
    refetch();
  };

  return (
    <div>
      <input
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
        placeholder="Medicine..."
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Searching…' : 'Search Nearby'}
      </button>

      {isError && <div>Error loading data.</div>}
      {pharmacies?.length === 0 && <div>No pharmacies found.</div>}

      <ul>
        {pharmacies?.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong> — ₹{p.price} — Stock: {p.stock}{' '}
            — {p.hasDelivery ? 'Delivery' : 'Pickup'} — ETA: {p.eta}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyMedicineScreen;
