// Importing createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
// Defining initial state for the auth slice
const initialState = {
        // Attempting to retrieve user info from localStorage, if it exists
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

}
const authSlice = createSlice({
    // Creating a slice of the Redux store named 'auth'
    name:'auth',
    initialState,     // Initial state for the slice
    reducers: {    // Reducer functions for handling actions
        setCredentials: (state, action) =>{
            //we will hit our backend through user apiSlice and userinfo will be sent in action and then set to userInfo using action.payload
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload)); // Storing userInfo in localStorage after converting it to JSON string
        },
        logout:(state, action)=>{
          state.userInfo = null;
          localStorage.removeItem('userInfo');
        }
    }
});
export const {setCredentials, logout} = authSlice.actions;// Extracting the action creator from the authSlice
export default authSlice.reducer;


