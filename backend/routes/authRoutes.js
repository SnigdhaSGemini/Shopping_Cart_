import express from "express";
import {registerCtrl, loginCtrl, testCtrl, forgotPasswordCtrl, editAccountCtrl, getOrdersCtrl, getAllOrdersCtrl, setOrdersCtrl} from '../controllers/authCtrl.js'
import { isAdmin, isSignedIn } from "../middlewares/authMiddleware.js";

// registeration
const route = express.Router();

route.post('/register',registerCtrl);

// login
route.post('/login',loginCtrl)

// forgot password
route.post('/forgot-password',forgotPasswordCtrl)

route.get("/test",isSignedIn,isAdmin,testCtrl)

// check user authentication
route.get('/auth-user',isSignedIn,(req,res)=>{
    res.status(200).send({ok: true});
})

// check admin authentication
route.get('/auth-admin',isSignedIn,isAdmin,(req,res)=>{
    res.status(200).send({ok: true});
})

// edit account details
route.put("/account", isSignedIn, editAccountCtrl)

// orders
route.get("/orders" , isSignedIn, getOrdersCtrl)

// all orders
route.get("/all-orders" , isSignedIn, isAdmin, getAllOrdersCtrl)

// order update
// all orders
route.put("/set-orders/:oid" , isSignedIn, isAdmin, setOrdersCtrl)

export default route;