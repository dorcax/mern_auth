import jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import User from "../models/uuserModel.js";



const isAuthenticated =asyncHandler(async(req,res,next)=>{
    let token;
    token =req.cookies.jwt;

    if(token){
try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById({_id:decoded.userId}).select("-password")
   next()
    
} catch (error) {
    res.status(404)
    throw new Error("Not Authorized,invalid token")
}
    }else{
        res.status(404)
        throw new Error("Not authorized,no token")

    }

})

export {isAuthenticated}