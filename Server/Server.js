import express from "express";
import cors from"cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./Routes/authRouter.js";
import UserRoutes from "./Routes/UserRoutes.js"; 


const app =express();
const port = process.env.PORT|| 5000
connectDB();   

const allowedOrigin=['http://localhost:5173']

app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:allowedOrigin,credentials:true}));


/////api Endpoit 
app.get('/',(req,res)=>{
    res.send('API is working ');
})
 app.use('/api/auth',authRouter)
 app.use('/api/user',UserRoutes)

app.listen (5000,()=>{
    console.log(' server started on port 5000 ');
})