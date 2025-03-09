// import mongoose from "mongoose";
const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
  name:{type:String,
    required:true,
    unique:true
  },
  email:{type:String,
    required:true,
    unique:true
  },
  password:{type:String,
    required:true,
    unique:true,
  },
  // otp:{type:String,

  // },

  // otpExpires:{type:Date,

  // },


  verifyOtp:{type:String,default:''},
  verifyOtpExpireAt:{type:Number,default:0},
  isAccountVerified:{type:Boolean,default:false},
  resetOtp:{type:String,default:''},
  resetOtpExpireAt:{type:Number,default:0}


})

// const User =mongoose.model('User',userSchema)

// export default User
const userModel=mongoose.models.user || mongoose.model('user',userSchema)
module.exports = userModel


