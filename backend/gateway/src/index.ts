import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import proxy from 'express-http-proxy';
import cors from "cors"
import { isAuth } from './middleware/isAuth.js';
import { getCurrentUser } from './controllers/userController.js';

dotenv.config();

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/me",isAuth,getCurrentUser)


const PORT = process.env.PORT || 8000;


app.get('/',(req,res)=>{
    res.json("Hello from DigiSeller GateWay")
})

app.use("/api/auth",proxy(process.env.AUTH_SERVICE_URL as string))


app.listen(PORT,()=>{
  
    console.log(`GateWay started at ${PORT}`)
})