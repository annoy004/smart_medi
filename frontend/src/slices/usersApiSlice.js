import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({ // isse main apislice ka endpoint hit karke fill kar sakta hu
    endpoints:(builders) => ({
        login: builders.mutation({  // build query is used to build the query without any fetch request to axios
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method:'POST',
                body:data,
            }),
        }),
        register:builders.mutation({
            query: (data) => ({
                url: `${USERS_URL}/`,
                method:'POST',
                body:data,
            }),
        }),
        logout:builders.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method:'POST',
            })
        }),
        profile: builders.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method:`PUT`,
                body:data,
            })
        })
       
    }),
});

export  const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation} = usersApiSlice; // we have to prefix with use and suffix with query