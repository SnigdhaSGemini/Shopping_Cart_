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

// objects
const app = express();
app.use(cors()) // sets the necessary headers in the HTTP response to enable Cross-Origin Resource Sharing.
app.use(morgan("dev")) //  for each incoming HTTP request, it will log information about the request using the "dev" format.
app.use(express.json()) //responsible for parsing incoming JSON data in the request body, making it available in the req.body property of the incoming request object

// routes
app.use("/api/auth/",authRoutes);
app.use("/api/category/",categoryRoutes);
app.use("/api/product/",productRoutes);

//  api
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