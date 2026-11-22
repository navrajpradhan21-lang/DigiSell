import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("MongoDB Connected")

    }catch(error){
        console.log("Error connecting to MongoDB:",error);
        process.exit(1);

    }
};