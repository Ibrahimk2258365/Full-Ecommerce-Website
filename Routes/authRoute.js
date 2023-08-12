import express from "express";
import {forgetpasswordController, loginController, profileController, regsiterConteroller, testController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//register || Method: post
router.post("/register",regsiterConteroller);

//LOGIN || METHOD POST
router.post("/login",loginController)
router.get("/test",requireSignIn,isAdmin,testController)
//protected route user dashboard
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).json({ok:true})
})
//forgot password
router.post("/forget-password",forgetpasswordController)
//protected route admin dashboard
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).json({ok:true})
})
//profile update
router.put("/profile",requireSignIn,profileController)
export default router;