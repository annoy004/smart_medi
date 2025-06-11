import {createApi,fetchBaseQuery}  from '@reduxjs/toolkit/query/react'
//fetch base query helps to make request to backend api
// since we are dealing with backend api we have to export 
import { BASE_URL } from '../constant';

export const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['Product','Order','User'],
    endpoints :(builder) => ({}) // we can do error handling and not have to try catch through builder 
})