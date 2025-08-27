import express from 'express';
import {  isAuthenticated, login, logout, register, resetPass, sendresetOTP, 
    sendverifyOtp, verifyEmail,  } from 
'../controler/Authcontroler.js';
import userauth from '../Middlewear/userauth.js';


 const  authRouter=  express.Router();
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/sendverifyotp',userauth, sendverifyOtp );
authRouter.post('/verify-account',userauth,verifyEmail);
authRouter.get('/isAuth',userauth, isAuthenticated);
authRouter.post('/sendresetotp', sendresetOTP);
authRouter.post('/resetpass', resetPass);





export default authRouter;