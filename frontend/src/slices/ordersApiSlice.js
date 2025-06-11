import {apiSlice} from './apiSlice.js'
import { ORDERS_URL ,PAYPAL_URL} from '../constant.js'

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
              url: ORDERS_URL,
              method: 'POST',
              body: {...order}  
            })
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`

            }),
            keepUnusedDataFor:5
        }),
       payOrder: builder.mutation ({
        query: ({orderId,details}) => ({ // jab do parameter rahenge aur seperately  karna hoga toh hum log destructure karenge
            url: `${ORDERS_URL}/${orderId}/pay`,
            method:'PUT',
            body: {...details},
        })
       }),                

       getMyOrders: builder.query({
        query: () => ({
            url: `${ORDERS_URL}/mine`,

        }),
        keepUnusedDataFor:5
        }),
     
       getPayPalClientId: builder.query({
        query: ()=> ({
            url:PAYPAL_URL,

        }),
        keepUnusedDataFor:5
       }),
   
       

    }),
});

export const {useCreateOrderMutation,useGetOrderDetailsQuery,usePayOrderMutation,useGetPayPalClientIdQuery,useGetMyOrdersQuery} = ordersApiSlice;