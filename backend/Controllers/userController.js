const userModel = require('../models/User')

const getuserData =async (req,res)=>{
    try{
      const {userID}=req.body
           const user = await userModel.findById( userID );
          if(!user){
              return  res.json({sucess:false, message: 'user not found' });
      
          }
          res.json({
            success:true,userData:{
                name:user.name,
                email:user.email,
                isAccountVerified:user.isAccountVerified,
            }
          })
    }catch(err){
res.json({success:false,message:err.message})
    }
}
module.exports={
    getuserData
}