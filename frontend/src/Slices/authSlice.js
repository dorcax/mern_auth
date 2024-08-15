import { createSlice } from "@reduxjs/toolkit";
// a slice is where keep a pieces of state ,reducer that in action

// auth slice deals with local stuff it take  the user data that will get back from the api and put it in localstorage
// api slice is where we make request to the backend to authenticate ,register,getprofile etc 

const initialState ={
    userInfo:localStorage.getItem("userInfo") ?JSON.parse(localStorage.getItem("userInfo")):null

}
 const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        // setCredentials: Updates userInfo in the state and also updates localStorage with the stringified action.payload.
      setCredentials:(state,action)=>{
        state.userInfo =action.payload,
        localStorage.setItem("userInfo",JSON.stringify(action.payload))
      },
    //   logout: Clears userInfo from the state and removes it from localStorag
      logout:(state,action)=>{
        state.userInfo =null,
        localStorage.removeItem("userInfo")
      }
    }
 })


 export const {setCredentials,logout}=authSlice.actions

 export default authSlice.reducer