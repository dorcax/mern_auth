import {apiSlice} from "./apiSlice"

const USERS_URL ="/api/user";

export const usersApiSlice =apiSlice.injectEndpoints({

    endpoints:(builder)=>({
      login: builder.mutation({
        query:(datas)=>({
        url:`${USERS_URL}/auth`,
        method:"POST",
        body:datas
        })
      }),
      logout: builder.mutation({
        query:()=>({
          url:`${USERS_URL}/logout`,
          method:"POST",
        })
      }),
      register:builder.mutation({
        query:(data)=>({
          url:`${USERS_URL}`,
          method:"POST",
          body:data

        })
      }),
      updateProfile:builder.mutation({
        query:(data)=>({
          url:`${USERS_URL}/profile`,
          method:"PATCH",
          body:data
        })

      })
    })
})

export const{useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateProfileMutation}=usersApiSlice