import usermodel from "../Models/Usermodel.js";


export const getUSERdata = async(req,res)=>{
   
try{
const {userId} = req.body;

const user = await usermodel.findById(userId);

if(!user){
    return res.json({success:false, message:'User Not Found'});
}
res.json({success:true,
    userData:{
        name:user.name,
        isverified:user.isverified
    }
});

}
catch (error){
 res.json({success:false, message:error.message});
}

}

