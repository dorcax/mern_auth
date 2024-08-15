import{createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// The createApi and fetchBaseQuery functions from @reduxjs/toolkit/query/react are used to simplify data fetching and caching in Redux applications
// createApi is a function from Redux Toolkit Query (RTK Query) that helps in defining endpoints for your API. It provides a set of tools and utilities to fetch, cache, and synchronize data between your application and your server
// fetchBaseQuery is a function that creates a base query function for createApi using the fetch API. It simplifies making HTTP requests by providing default settings and configuration


const baseQuery=fetchBaseQuery({
    baseUrl:""
})



export const apiSlice =createApi({
    baseQuery,
    tagTypes:["User"],
    endpoints:(builder)=>({

    })
})