// src/slices/pharmacyApiSlice.js
import { apiSlice } from './apiSlice.js';
import { PHARMACY_URL } from '../constant.js';

export const pharmacyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNearbyPharmacies: builder.query({
  
      query: ({ lat, lng, medicine, maxDistance = 5, deliveryOnly = false }) => ({
        url: `${PHARMACY_URL}/search`,       // GET /api/pharmacies/search
        params: { lat, lng, medicine, maxDistance, deliveryOnly },
      }),
     
      keepUnusedDataFor: 5,
    }),
  }),
});

// auto-generated hook
export const { useGetNearbyPharmaciesQuery } = pharmacyApiSlice;
