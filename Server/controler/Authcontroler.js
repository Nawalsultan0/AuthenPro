
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usermodel from "../Models/Usermodel.js";
import express from "express";
import transporter from "../config/nodemailer.js";
import cookieParser from "cookie-parser";
import { decrypt } from "dotenv";

///////register Acccpunt///////
export const register= async (req,res)=>{

    const{name,email,password}= req.body;
    
    if(!name||!email||!password){
        return res.json({success:false, message:'missing Details' })

    }

     try{
        const userexist=await usermodel.findOne({email})
        if(userexist){
      return res.json({success:false, message:'User exists already' })
  

        }
  
        const hashedPass= await bcrypt.hash(password,10);
        const user = new usermodel({name,email,password:hashedPass});
        await user.save(); 

        const token = jwt.sign({id:user._id}, process.env.JWT_GIFT,{ expiresIn:'7d'});
        res.cookie('token', token, {
          httpOnly:true,
          secure:process.env.NODE_ENV ==='production',
          sameSite:process.env.NODE_ENV==='production'?'none':'strict',
          maxAge:7*24*60*60*1000
        });
         /////// sending email////
         const mailOptions={
        from:process.env.SENDER_EMAIL,
        to:email,
        subject:'welcome to  Authify',
        html: `<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#f6f9fc;font-family:Inter, Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" style="max-width:600px;background:#ffffff;border-radius:16px;box-shadow:0 8px 30px rgba(18, 38, 63, 0.08);overflow:hidden;">
          
            <tr>
              <td style="padding:28px 32px 8px; text-align:left;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#7dd3fc,#c7a2ff);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:22px;">
                    A
                  </div>
                  <div>
                    <div style="font-size:18px;font-weight:700;color:#102a43;">Welcome to <span style="color:#6c63ff">Authify</span>!</div>
                    <div style="font-size:13px;color:#65748b;margin-top:4px;">Secure. Simple. Sweet.</div>
                  </div>
                </div>
              </td>
            </tr>

           <tr>
              <td style="padding:18px 32px 8px;">
                <h1 style="margin:0;font-size:20px;color:#0b2545;">Hey ${name} 👋</h1>
                <p style="margin:12px 0 18px;color:#334e68;line-height:1.45;">
                  Your account has been created successfully with <strong>${email}</strong>. We’re thrilled to have you on board!
                </p>

                <div style="background:#f0f8ff;border-radius:12px;padding:14px;display:flex;align-items:center;gap:12px;">
                  <div style="width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#ffd6e0,#ffd8a8);display:flex;align-items:center;justify-content:center;font-size:18px;">✨</div>
                  <div style="font-size:14px;color:#123b5a;">
                    Keep your account safe — consider enabling 2-factor authentication from your profile for an extra layer of security.
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                  <div style="color:#7b8b9a;font-size:13px;">
                    <strong>Authify</strong> — Built with care 💜
                    <div style="margin-top:6px;">Need help? Reply to this email or visit our docs.</div>
                  </div>
                  <div style="display:flex;gap:8px;align-items:center;">
                    <img alt="tiny-illustration" src="https://raw.githubusercontent.com/google/material-design-icons/master/png/places/beach_access/materialicons/24dp/2x/baseline_beach_access_black_24dp.png" width="36" height="36" style="border-radius:8px;opacity:0.9;">
                  </div>
                </div>
                <div style="margin-top:14px;color:#a1afbd;font-size:12px;">You received this email because you signed up for Authify. If this wasn't you, please ignore or contact support.</div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>` }
       await transporter.sendMail(mailOptions);
        return res.json({success:true});
     }
     catch(error){
        return res.json({success:false, message:error.message})
     }
}

////// login the register Account/////////////////

export const login =async(req,res)=>{
const {email, password}= req.body;

if(!email||!password){
   return res.json({success:false, message:'Email and Password are required' })
}

try{

  const user= await usermodel.findOne({email});
  if(!user){
    return  res.json({success:false, message:'Invaild email and passord'});
  }
  const ismatch = await bcrypt.compare(password,user.password);
  if(!ismatch){
     return  res.json({success:false, message:'Invaild email and passord'});
  }
        const token = jwt.sign({id:user._id}, process.env.JWT_GIFT,{ expiresIn:'7d'});

        res.cookie('token', token, {
          httpOnly:true,
          secure:process.env.NODE_ENV ==='production',
          sameSite:process.env.NODE_ENV==='production'?'none':'strict',
          maxAge:7*24*60*60*1000
        });
      
      return res.json({success:true});

}catch(error){
 return res.json({success:false, message:error.message })
}
}

///// logout the register Account/////////////

export  const logout = async(req,res)=>{
try{
res.clearCookie('token',{ 
          httpOnly:true,
          secure:process.env.NODE_ENV ==='production',
          sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        })
        return res.json({success:true,message:'Logged out'})
}

catch(error){
 return res.json({success:false, message:error.message })
}
}

////verify Email//////////

export const sendverifyOtp = async (req, res) => {
 try {
  const userId= req.userId;

  const user= await usermodel.findById(userId);
  if(user.isverified){
    return res.json ({success:false, message:"Account is Already verified"});
  }

  /// create 6 digit number use sting to use it as a string  
  const otp =String(Math.floor(100000+Math.random()*90000)); 
   
  user.verifyOtp=otp;
  user.verifyOtpExp= Date.now()+ 24 * 60 * 60 * 1000;
  await user.save();

  const mailOption={
    from:process.env.SENDER_EMAIL,
    to:user.email,
    subject:'Account Verification OTP',
    html: `<html>
<head>
  <meta charset="UTF-8">
  <title>Your OTP Code</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; text-align: center; color: #333;">
  
  <h2 style="color: #4f46e5;">🔐 Email Verification</h2>
  <p style="font-size: 16px; margin-top: 10px;">
    Use the OTP below to verify your account. It will expire in 10 minutes.
  </p>

  <div style="margin: 20px auto; padding: 12px 24px; background-color: #eef2ff; color: #4338ca; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; display: inline-block;">
    ${otp}
  </div>

  <p style="font-size: 14px; color: #6b7280;"> 
    Please do not share this code with anyone.
  </p> `
  }
  await transporter.sendMail(mailOption);
  res.json({success:true, message:"Verifictaion OTP sent on Email"});
    
 } catch (error) {
  res.json({success:false, message:error.message});
 } 
}

export const verifyEmail =async (req,res) => {
  const userId = req.userId;
  const { otp } = req.body;
    if(!userId||!otp){
      return res.json ({success:false, message:'Missing Details'});
    }
  try {
    const user= await usermodel.findById(userId);
    
    if(!user){
        return res.json ({success:false, message:'User not found '});
    }
   if(user.verifyOtp ==='' ||  user.verifyOtp !== otp){ 
    return res.json({success:false, message:'Invalid OTP '});
   }
   if(user.verifyOtpExp< Date.now()){
    return res.json({success:false, message:'Expired OTP '});
   }
   user.isverified=true;
   user.verifyOtp='';
   user.verifyOtpExp=0;
   
   await  user.save();
    return res.json({success:true, message:' Account Verified  Successfully'});
    }
   catch (error) {
    res.json({ success:false,message:error.message  });
  }
} 
  

//////check if user is authenticated ///////
 export const isAuthenticated = async (req, res)=>{
 
  try {
     const id= req.params.id;
    usermodel.findById({ _id:id })
    return res.json({success:true});
  } catch (error) {
    res.json({success:false, message:error.message});
  }
 }

 /////// send passward Reset otp/////
 export const sendresetOTP = async(req, res)=>{
  const{email}= req.body;
  if(!email){
    return res.json({success:false, message:'Email is required'});
  }
  try {
  const user = await usermodel.findOne({email});
  if(!user){
    return res.json({succes:false,message:'User not found'});
  }
  const otp = String(Math.floor(100000+ Math.random()*900000 ));
  user.resetOtp=otp;
  user.resetOtpExp=Date.now()+  15 * 60 * 1000;
  await user.save();
  
  const mailOpt={
    from: process.env.SENDER_EMAIL,
    to:user.email,
    subject:'Account verification OTP',
    html:`<head>
  <meta charset="UTF-8">
  <title>Your OTP Code</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; text-align: center; color: #333;">
  
  <h2 style="color: #4f46e5;">🔐 Email Verification</h2>
  <p style="font-size: 16px; margin-top: 10px;">
    Use the OTP below for resetting your passward. It will expire in 10 minutes.
  </p>

  <div style="margin: 20px auto; padding: 12px 24px; background-color: #eef2ff; color: #4338ca; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; display: inline-block;">
    ${otp}
  </div>

  <p style="font-size: 14px; color: #6b7280;"> 
    Please do not share this code with anyone.
  </p> `
  }
  await transporter.sendMail(mailOpt);
  return res.json({success:true, message:'OTP send to your Email'});

  } catch (error) {
    res.json({success:false,message:error.message});
  }
 }

//// REset user passward/////

 export const resetPass = async (req,res) => {
  const {email,otp, newpass}= req.body;
  if(!email||!otp||!newpass){
    return res.json({success:false, message:'Email, OTP and new Passward are required'});
  }  

  try {
    const user = await usermodel.findOne({email});
    if(!user){
      return res.json({success:false,message:'User not found '});
    }
    if(user.resetOtp === ''  || user.resetOtp !== otp ){
      return res.json({success:false, message:'Invalid Otp'});
    }
   
    if(user.resetOtpExp< Date.now()){
      return res.json({success:false, message:'OTP is Expired'});
    }
    
    const hashedPass = await bcrypt.hash(newpass,10);

    user.password= hashedPass;
    user.resetOtp='';
    user.resetOtpExp=0;
    await user.save();
    
    return res.json({success:true, message:'Password has been sent successfully'});

  } catch (error) {
    res.json({success:false, message:error.message})
  }
 }

 