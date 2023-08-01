import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

// to check if signed in
export const isSignedIn = async (req,res,next)=>{
    try{
        const getToken = JWT.verify(req.headers.authorization,(process.env.JWT_SECRET ||  'kjdkefmojit8549878'  ))
        req.user = getToken;
        next()
    }catch(err){
        console.log(err);
    }
}

// admin 
export const isAdmin = async (req,res,next)=>{
    try{
        const user =  await userModel.findById(req.user._id);
        if(user.role !== "admin"){
            return res.status(401).send({
                success:false,
                message: "unAuthorized Access"
            })
        }
        else{
            next()
        }
    }catch(err){
        console.log(err);
        res.status(401).send({
            success: false,
            message: "Error logging admin",
            err
        })
    }
}