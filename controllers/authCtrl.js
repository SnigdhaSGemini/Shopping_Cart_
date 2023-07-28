import userModel from "../models/userModel.js";
import {  bcryptPassword, checkPassword } from "../utils/authUtils.js";
import JWT from 'jsonwebtoken';
import orderModel from "../models/orderModel.js";



export const registerCtrl = async (req,res) =>{
    try{
        const {name, email , password , mobile,secretKey, address } = req.body;
        
        // Validations
        if(!name){
            return res.send({
                message:"Name is Required"
            })
        }
        if(!email){
            return res.send({
                message:"email is Required"
            })
        }
        if(!password){
            return res.send({
                message:"password is Required"
            })
        }
        if(!mobile){
            return res.send({
                message:"mobile is Required"
            })
        }
        if(!secretKey){
            return res.send({
                message:"secret key is Required"
            })
        }
        if(!address){
            return res.send({
                message:"address is Required"
            })
        }

        // check existing user
        const user = await userModel.findOne({email})
        if(user){return res.status(200).send({
            success:false,
            message: "Already a user"
        })}

        // secure password
        const bcryptedPassword = await bcryptPassword(password);

        const newUser = await new userModel({
            name,
            email,
            mobile,
            address,
            password: bcryptedPassword,
            secretKey
        }).save()

        res.status(201).send({
            success:true,
            message: "User Registered!",
            newUser
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message: "Error in Registration",
            err
        })
    }
}

export const loginCtrl = async (req,res) =>{
    try{
        const {email,password} = req.body;

        // Validations
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Please enter valid details"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message: "email is not registered"
            })
        }
        const checkPass = await checkPassword(password,user.password);
        if(!checkPass){
            return res.status(200).send({
                success: false,
                message: "password is incorrect"

            })
        }

        const createToken  = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d' });
        res.status(200).send({
            success:true,
            message: "User Logged In!",
            user:{
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
                role: user.role
            },
            createToken
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message: "Error in Login",
            err
        })
    }
}

// forgot password
export const forgotPasswordCtrl = async (req,res) =>{
    try{
        const {email,secretKey, newPassword} = req.body;
        if(!email){
            res.status(400).send({message: "Email is Required"})
        }
        if(!secretKey){
            res.status(400).send({message: "Secret Key is Required"})
        }
        if(!newPassword){
            res.status(400).send({message: "New Password is Required"})
        }

        // confirm  user
        const user = await userModel.findOne({email,secretKey});

        // Validations
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Secret Key"
            })
        }
        const bcryptedPassword = await bcryptPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password: bcryptedPassword});
        res.status(200).send({
            success: true,
            message: "Password Reset!"
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message: "Something Went Wrong!",
            err
        })
    }
}


export const testCtrl = (req,res)=>{
    res.send("protected route")
}

// edit account details
export const editAccountCtrl = async (req,res) =>{
    try{
        const {name, email, password, address, mobile} = req.body;
        const user = await userModel.findById(req.user._id);

        if(password && password.length < 8){
            return res.json({error: "Password is Required and should be greater than 8 characters"})
        }
        const bcryptedPassword = password ? await bcryptPassword(password) : undefined;
        const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: bcryptedPassword || user.password,
            address: address || user.address,
            mobile: mobile || user.mobile

        },{new:true});
        res.status(200).send({
            success: true,
            message: "User Account Edited!",
            updateUser
        })
    }
        catch(err){
            console.log(err);
            res.status(400).send({
                success:false,
                message: "Error while profile editing!",
                err
            })
        }
}

// orders
export const getOrdersCtrl = async (req,res) =>{
    try{
        const orders = await orderModel.find({buyer: req.user._id}).populate("products","-image").populate("buyer", "name");
        res.json(orders)

    }catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                message: "Error while Getting Orders!",
                err
            })
        }
}

// get all
export const getAllOrdersCtrl = async (req,res) =>{
    try{
        const orders = await orderModel.find({}).populate("products","-image").populate("buyer", "name").sort({createdAt: -1});
        res.json(orders)

    }catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                message: "Error while Getting All Orders!",
                err
            })
        }
}

// update
export const  setOrdersCtrl = async (req,res) =>{
    try{
        const {oid} = req.params;
        const { status } = req.body;
        const orders  = await orderModel.findByIdAndUpdate(oid, {status} , {new: true});
        res.json(orders);
    }catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                message: "Error while Updating Order!",
                err
            })
        }
}