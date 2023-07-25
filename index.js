import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnect from "./configs/databaseConnection.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from "cors";

// configure env
dotenv.config();

//connect to database
dbConnect();

//rest object 
const app = express();
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// routes
app.use("/api/auth/",authRoutes);
app.use("/api/category/",categoryRoutes);
app.use("/api/product/",productRoutes);

// rest api
app.get('/',(req,res)=>{
    res.send({
        message: "Welcome to shopping cart"
    })
})

// port
const PORT=process.env.PORT || 5000

// run listen
app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`.bgCyan.white)
})