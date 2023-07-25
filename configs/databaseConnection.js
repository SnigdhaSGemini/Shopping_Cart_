import mongoose from "mongoose";

// Connect Database
const dbConnect = async () =>{
    try{
        const dbconnect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database : ${dbconnect.connection.host}`.bgGreen.white)
    }catch(err){
        console.log(`Error in database : ${err}`.bgRed.white);
    }
}

export default dbConnect

