import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/db.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());



const PORT = process.env.PORT || 8001;


app.get('/',(req,res)=>{
    res.json("Hello from DigiSeller AuthService")
})



app.listen(PORT,()=>{
    connectDb()
    console.log(`AuthService started at ${PORT}`)
})