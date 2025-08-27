import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verifyOtp:{
        type:String,
        default:''
    },
     verifyOtpExp:{
        type:Number,
        default:0
    },
     isverified:{
        type:Boolean,
        default:false
    },
    resetOtp:{
        type:String,
        default:''
    },
      resetOtpExp:{
        type:String,
        default:0
    }
})

const usermodel = mongoose.model('user',userschema);
 export default usermodel;