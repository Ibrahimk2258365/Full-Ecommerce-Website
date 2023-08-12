import jwt from 'jsonwebtoken';
import userModel from '../Models/userModel.js';

//protected routes token based

export const requireSignIn = async (req,res,next)=>{
    try {
        const decode  = await jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        console.log(decode);
       req.userid = decode;
        next();
    } catch (error) {
        console.log(`error in jwt sign in required ${error}`);
    }
}

//admin access

export const isAdmin = async (req,res,next)=>{
    try {
        // console.log(req.user);
        const user = await userModel.findById({_id:req.userid._id});
        if(user.role !== 1){
            return res.status(404).send({
                message:"UnAuthorize Access",
                success:false
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(`error in admin access middlware ${error}`);
        res.status(404).send({
            message:"Error in admin middleware",
            success:false
        })
    }
}