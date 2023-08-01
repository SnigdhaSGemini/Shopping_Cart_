import mongoose from "mongoose";
import dotenv from "dotenv";

// configure env
dotenv.config();

// Connect Database
const dbConnect = async () =>{
    try{
        const dbconnect = await mongoose.connect(process.env.MONGO_URL || `mongodb+srv://snigdhasingh:ss667@cluster0.yelsxn1.mongodb.net/?retryWrites=true&w=majority`)
        console.log(`Connected to database : ${dbconnect.connection.host}`.bgGreen.white)
    }catch(err){
        console.log(`Error in database : ${err}`.bgRed.white);
    }
}

export default dbConnect

