import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/db.js';
import authRouter from './routes/auth.routes.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());



const PORT = Number(process.env.PORT) || 8001;


app.get('/',(req,res)=>{
    res.json("Hello from DigiSeller AuthService")
})
app.use("/",authRouter);


const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`AuthService started at ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error('Failed to start AuthService:', error);
    process.exit(1);
});
