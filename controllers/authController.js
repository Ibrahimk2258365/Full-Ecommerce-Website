import { comparedPassword, hashPassword } from "../Helpers/authHelpers.js";
import userModel from "../Models/userModel.js";
import productModel from "../Models/productModel.js";
import Jwt from "jsonwebtoken";
export const regsiterConteroller = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;
        if (!name) {
            return res.send({ message: "Name is Required" })
        }
        if (!email) {
            return res.send({ message: "Email is Required" })
        }
        if (!password) {
            return res.send({ message: "Password is Required" })
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" })
        }
        if (!address) {
            return res.send({ message: "Address is Required" })
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" })
        }
        //check user
        const existingUser = await userModel.findOne({ email: email });
        //user exist
        if (existingUser) {
            return res.status(200).send({
                message: "Already Register Please Login",
                success: false
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, address, phone, password: hashedPassword,answer }).save();
        res.status(201).send({ message: "User Register Successfully", success: true, user })
    } catch (error) {
        console.log(`error in registration ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error: error
        })
    }
}
//login controller

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email, !password) {
            return res.status(404).send({ message: "Invalid Email or Password", success: false })
        }
        //CHECK USER
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(200).send({ message: "Email Not Found!", success: false })
        }
        const match = await comparedPassword(password, user.password);
        if (!match) {
            return res.status(200).send({ message: "Invalid Password", success: false })
        }
        //token
        const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        
        res.status(200).send({
            message: 'User Login Successfully',
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                answer:user.answer,
                _id:user._id,
                role:user.role
            },
            token
        })
    } catch (error) {
        console.log(`error while login ${error}`);
    }
}

//test controller
export const testController = async (req, res) => {
    res.send("test protected")
}

//forget controller 
export const forgetpasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        console.log(email);
        if (!email) {
            return res.status(400).send({ success: "false", message: "Email is required" })
        }
        if (!answer) {
            return res.status(400).send({ success: "false", message: "Answer is required" })
        }
        if (!newPassword) {
            return res.status(400).send({ success: "false", message: "new Password is required" })
        }
        // check
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(500).send({ message: "Wrong Email or Answer", success: false, })
        }
        
        if (user) {
            if (user.answer !== answer) {
                return res.status(200).send({message:"Answer is not Correct",success:false})
            }else{
                 // hased password
        const hashednewpassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashednewpassword })
        res.status(200).send({message:"Password update Successfully",success:true})
            }
        }
        
       
    } catch (error) {
        console.log(`error in forget controller${error}`);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
//profileController
export const profileController = async(req,res)=>{
    try {
        const { name, password, phone, address , _id}= req.body;
        if (password && password.lenght < 3) {
            return res.json("password is required and 6 character long")
        }
        const hashedpassword = password ? await hashPassword(password) : undefined
        

     const user = await userModel.findById({_id:req.userid._id})
    //  console.log(user);
        const userprofile = await userModel.findByIdAndUpdate({_id:user._id},{
            name: name || user.name,
            password:hashedpassword || user.password,
            phone: phone || user.phone,
            address : address || user.address
        },{new:true})
        res.status(200).send({
            userprofile,
            success:true,
            message : "user profle update successfully"
        })
    } catch (error) {
        console.log(`error in update profile controller${error}`);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}