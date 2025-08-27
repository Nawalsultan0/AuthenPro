import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";

 const userauth = async(req, res, next)=>{
    
    const {token} = req.cookies;

    if(!token ){
        return res.json ({success:false, message: 'Not Authorized Login Again'});
    }
    try {
        const  tokenDecode=jwt.verify(token,process.env.JWT_GIFT);
        if(tokenDecode.id){
        req.body.userId=tokenDecode.id;
        }
        else{
            return res.json({success:false, message:'Not Authorized Login Again'});
        }
        next();
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}
export default userauth;