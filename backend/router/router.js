import express from "express"
const router =express.Router()
import { authUser,registerUser,getUserProfile,updateUserProfile,logoutUser } from "../controller/userController.js"
import { isAuthenticated } from "../middleware/authMiddleware.js"

router.post("/",registerUser)
router.post("/auth",authUser)
router.post("/logout",logoutUser)
router.route("/profile")
.get(isAuthenticated,getUserProfile)
.patch(isAuthenticated,updateUserProfile)

export default router