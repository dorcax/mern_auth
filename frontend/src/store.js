import{configureStore} from "@reduxjs/toolkit"
import authReducer from "./Slices/authSlice.js"
import { apiSlice } from "./Slices/apiSlice.js"
// authReducer: This is the reducer function that is part of the authSlice. This function is responsible for handling state changes based on dispatched actions.
const store =configureStore({
    // This is where you would define your reducers (for managing the state of your application). For now, it's empty, but you'll eventually add your slice reducers here.
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    // get default middleware
    //  This line retrieves the default middleware from Redux Toolkit. If you wanted to add custom middleware, you would do so here.
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
        devTools :true
    

})

export default store