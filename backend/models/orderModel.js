import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        type:mongoose.ObjectId,
        ref: "Product",

    }],
    payment: {},
    buyer:{
        type:mongoose.ObjectId,
        ref: "user",

    },
    status: {
        type:String,
        default: "Ordered",
        enum:["Ordered" ,"Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]
    }

},{timestamps: true})

export default mongoose.model("Order",orderSchema)