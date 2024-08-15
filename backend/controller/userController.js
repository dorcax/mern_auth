import asyncHandler from "express-async-handler"
import User from "../models/uuserModel.js"
import generateToken from "../utils/generateToken.js"

import bcrypt from "bcrypt"
//@desc Auth user/set token
// route Post /api/users/auth
// @access public
export const authUser =asyncHandler(async(req,res)=>{
 const{email,password} =req.body
//  check if email exist
const user =await User.findOne({email})
if(user){
    // check if password is correct 
    const isMatch =await bcrypt.compare(password,user.password)
    if(isMatch){
        generateToken(res,user._id)
        res.status(200).json({user:user})
    }else{
        res.status(401).json("invalid user")
    }
}else{
    res.status(401).json("invalid email or password")
}
})



//@desc register user 

//route POST/api/user/
//@access  public

export const registerUser =asyncHandler(async(req,res)=>{
   const{name,email,password} =req.body
//    check if a user exist
   const emailExist =await User.findOne({email})
   if(emailExist){
    res.status(404).json("user already exist")
   }

// hash user password before creating
const salt =await bcrypt.genSalt(10)
const hashedPassword =await bcrypt.hash(password,salt)
// create new user
     const user =await User.create({
        name,email,password:hashedPassword
     })
     res.status(201).json({user:user})
})


//@desc logout user 
//route POST/api/user/logout
//@access  public

export const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"user logged out"})
})


//@desc     Get  user Profile
//route Get/api/user/profile
//@access  private
export const  getUserProfile =asyncHandler(async(req,res)=>{
   const user ={ _id :req.user._id}
    res.status(200).json({message:user})
})


//@desc     update user Profile
//route     PATCH/api/user/profile
//@access  private

export const updateUserProfile =asyncHandler(async(req,res)=>{
    const user =await User.findOneAndUpdate({_id:req.user._id},{...req.body},{new:true})
    res.status(200).json({user:user})
})
// mongodb+srv://dorcasibrahim667:dorcas123456@mernauth.uhyxa.mongodb.net/