const jwt =require('jsonwebtoken');
const { use } = require('../routes/Routes');

const userAuth =async (req,res,next)=>{
    
    const {token}=req.cookies;

    if(!token){
        return res.json({success:false,message:'Not authorised login again'})
    }
    try{
     const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
     if(tokenDecode.id){
        req.body.userID=tokenDecode.id
     }else{
        return res.json({success:false,message:'Not authorised login id'})

     }
     next()
    }catch(err){
        return res.json({success:false,message:err.message})

    }
}

module.exports=userAuth