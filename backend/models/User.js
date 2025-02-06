// import mongoose from "mongoose";
const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({

  email:{type:String,
    required:true,
    unique:true
  },
  password:{type:String,
    required:true,
  },
  otp:{type:String,

  },

  otpExpires:{type:Date,

  }

})

// const User =mongoose.model('User',userSchema)

// export default User

module.exports = mongoose.model('User',userSchema)


