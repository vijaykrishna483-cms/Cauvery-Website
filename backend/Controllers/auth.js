const userModel = require('../models/User')
const slotModel =require('../models/Slot')
const crypto=require('crypto')
const {sendOtp} = require('../utils/sendMail')
// const {sendConfirmation}=require('../utils/bookedMail')
const Slot = require('../models/Slot')
const {transporter} =  require('../utils/bookedMail')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const register = async (req, res) => {
    const { name,email, password } = req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"missing details"})
    } 
    try {

        const existUser = await userModel.findOne({ email });

        if (existUser) {
            return res.status(400).json({success:false, message: 'User already exists' });
        }
       const hashedPassword=await bcrypt.hash(password,10)
      

        // Create new user
        const user= new userModel({name,email,password:hashedPassword})
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'? 'none':'strict',
            maxAge:7 * 24 * 60 * 60* 1000
        })
       
       if (user.isAccountVerified) {
        return res.json({success:"false", message: 'already verified' });
    }
    const otp=String(Math.floor(100000 + Math.random()*9000))
    // Check if OTP is expired
   user.verifyOtp=otp;
   user.verifyOtpExpireAt=Date.now()+ 24 * 60 *60 *1000
   await user.save()
   const mailOptions={
    from:process.env.SENDER_EMAIL,
to:user.email,
subject:'Acoount verification otp',
text:`welcome to cauvery website with email id: ${email} ,Your otp is ${otp}`
 }
await transporter.sendMail(mailOptions)

// res.json({sucess:true, message: 'OTP verified successfully' });


    //    await user.save()
        return res.json({success:true,message:'succesfully resgisterd'});
    } catch (err) {
        // console.error('Error in registration:', err);
        return res.json({success:false, message:err.message });
    }
};




const login = async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password){
        return res.json({success:false,message:"email and password are required"})
    } 
    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid mail' });
        }
       const isMatch = await bcrypt.compare(password,user.password)
       
       if(!isMatch){
        return res.status(400).json({ message: 'Invalid password' });

       }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'? 'none':'strict',
            maxAge:7 * 24 * 60 * 60* 1000
        })
        return res.json({success:true});
    } catch (err) {
        // console.error('Error in login:', err);
        return res.json({success:false, message:err.message });
    }
};

const logout =async(req,res)=>{
    try{
      res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'? 'none':'strict',
      })
      return res.json({success:true,message:'logout sucessful'})
    }catch(err){
        return res.json({success:false, message:err.message });

    }
}




// // Generate OTP and send via email
// const generateOtp = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         // Generate a 6-digit OTP
//         const otp = crypto.randomInt(100000, 1000000).toString();

//         // Set OTP and expiration time
//         user.otp = otp;
//         user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

//         // Save user details
//         await user.save(); // Ensure the OTP is saved in DB
        
//         // Send OTP to user's email (ensure sendOtp function works properly)
//         await sendOtp(email, otp);

//         return res.status(200).json({ message: 'OTP sent to email', otp }); // Send OTP in response for testing
//     } catch (err) {
//         console.error('Error generating OTP:', err);
//         return res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

const sendVerifyOtp = async (req, res) => {

    try {
        const {userID}=req.body
        const user = await userModel.findById( userID );

        if (user.isAccountVerified) {
            return res.json({success:"false", message: 'already verified' });
        }
        const otp=String(Math.floor(100000 + Math.random()*9000))
        // Check if OTP is expired
       user.verifyOtp=otp;
       user.verifyOtpExpireAt=Date.now()+ 24 * 60 *60 *1000
       await user.save()
       const mailOptions={
        from:process.env.SENDER_EMAIL,
    to:user.email,
    subject:'Acoount verificatio otp',
    text:`Your otp is ${otp}`
     }
    await transporter.sendMail(mailOptions)
 res.json({success:true, message: 'OTP verified successfully' });
   
} catch (err) {
        console.error('Error verifying OTP:', err);
        return   res.json({success:false, message: err.message });

    }
};
const verifyEmail = async (req, res) => {
    const { userID, otp } = req.body;
    
    if (!userID || !otp) {
        return res.json({ success: false, message: 'Missing details' });
    }
// console.log(`${userID}`)
    try {
        const user = await userModel.findById(userID);
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        console.log(`Stored OTP: ${user.verifyOtp}`);
        console.log(`Entered OTP: ${otp}`);
        console.log(`OTP Expiry: ${user.verifyOtpExpireAt}`);
        console.log(`Current Time: ${Date.now()}`);
        
        // Compare OTPs as strings
        if (String(user.verifyOtp) !== String(otp)) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        // Check for OTP expiration
        if (!user.verifyOtpExpireAt || user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        // Mark the account as verified
        user.isAccountVerified = true;
        user.verifyOtp = '';  // Clear OTP after successful verification
        user.verifyOtpExpireAt = null;  // Optionally, set expiration to null

        await user.save();
        
        return res.json({ success: true, message: 'Email verified' });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};



// //get all




// const getallUsers = async (req, res) => {
//     try {
//         const users = await User.find({}).sort({ createdAt: -1 });
//         console.log("Fetched Users from DB:", users); // Debugging

//         if (!users || users.length === 0) {
//             return res.status(404).json({ message: "No users found" });
//         }

//         res.status(200).json(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({ message: "Server error", error });
//     }
// };






const getAllslot= async (req,res)=>{

    try{
        const response = await slotModel.find({}).sort({createdAt:-1});
        console.log("fetching succesfull")
        res.status(200).json(response)
    }catch(err){
        console.error("Error fetching slots");
    }
}
const slotAdd = async (req, res) => {
    const { starttime, endtime, gameName } = req.body; // Extract userID from req.body
    const {userID}=req.body
     

    try {
        // Check if user exists using userID
        const user = await userModel.findById( userID );
        if (!user) {
            return res.json({booked:false, message: "Slot booked unsuccessfully" });
        }

        // Check if the slot is already booked
        const existSlot = await slotModel.findOne({ 
            starttime,
            endtime,
            gameName 
        });

        if (existSlot) {
            return res.status(400).json({ message: "Slot already booked for this game" });
        } 

        // Create new slot
        const newSlot = await slotModel.create({ starttime, endtime, gameName });
      
        // const newSlot = new slotModel({ starttime, endtime, gameName });
        
        console.log("Slot created");
        // Email options
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email, // ✅ Use the retrieved user's email
            subject: "🎉 Booking Confirmation - Your Slot is Reserved!",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #2c3e50; text-align: center;">🎯 Booking Confirmation</h2>
                    <p style="font-size: 16px; color: #555;">Hello <strong>${user.name}</strong>,</p>
                    <p style="font-size: 16px; color: #555;">
                        Your slot for <strong style="color: #2980b9;">${gameName}</strong> has been successfully booked! 🎉
                    </p>
                    <div style="background-color: #ecf0f1; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="font-size: 18px; font-weight: bold; color: #333;">⏳ Slot Details:</p>
                        <p style="font-size: 16px; color: #27ae60; font-weight: bold;">${starttime} - ${endtime}</p>
                    </div>
                    <p style="font-size: 16px; color: #555;">
                        📌 <strong>Instructions:</strong><br>
                        ✅ Show this email to the security office to collect the board game.<br>
                        ✅ Enjoy the game with your friends! 🎮<br>
                        ✅Return the board game to the security office at the end of your slot (${endtime}).<br>
                    </p>
                    <p style="font-size: 16px; text-align: center; color: #555;">
                        <strong>Have fun and play responsibly! 🎲</strong>
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    <p style="font-size: 14px; color: #888; text-align: center;">
                        This is an automated message. Please do not reply.
                    </p>
                </div>
            `,
        };
        
        

        // Debugging - Log the email options
        console.log("Sending email with options:", mailOptions);

        try {
            // console.log("Sending email to:", user.email);

            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: ", info);
        } catch (mailError) {
            res.json({booked:false, message: "Slot booked unsuccessfully" });
        }

        console.log("Slot booked successfully");
        return res.json({booked:true, message: "Slot booked successfully" });

    } catch (err) {
        console.error("Error in adding slot:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
;



  const isAuthenticated = async(req,res)=>{
    try{
     return res.json({success:true})
    }catch(err){
        res.json({success:false,message:err.message})
    }
  }
  


const sendResetOtp=async(req,res)=>{
    const {email} =req.body;

    if(!email){
        return res.json({success:false,message:"email requred"})
    }
    try{
const user = await userModel.findOne({email})
if(!user){
    return res.json({success:false,message:"user not found"})

}

const otp=String(Math.floor(100000 + Math.random()*9000))
// Check if OTP is expired
user.resetOtp=otp;
user.resetOtpExpireAt=Date.now()+  15 *60 *1000
await user.save()
const mailOptions={
from:process.env.SENDER_EMAIL,
to:user.email,
subject:'Password reset otp',
text:`Your otp for resetting password is ${otp}`
}
await transporter.sendMail(mailOptions)
res.json({success:true, message: 'OTP send to ur email' });


    }catch(err){
        return   res.json({success:false, message: err.message });
    }
  }


  const resetpassword = async (req,res)=>{
    const {email,otp,newPassword}=req.body
    if( !email || !otp || !newPassword){
        return res.json({success:false, message: 'Email,OTP,NewPassword are required' });
    }
    try{
        const user = await userModel.findOne({email})
         if(!user){
            return   res.json({success:false, message: "user not found" });
 
         }

         if(user.resetOtp==='' || user.resetOtp !==otp){
            return   res.json({success:false, message: "invalid otp" });

         }

         if(user.resetOtpExpireAt<Date.now()){
            return   res.json({success:false, message: " otp Expired" });

         }

         const hashedPassword = await bcrypt.hash(newPassword,10)
         user.password= hashedPassword;
         user.resetOtp=''
         user.resetOtpExpireAt=0

         await user.save();
         return   res.json({success:true, message: " password changes succesfully" });

    }catch(err){
        return   res.json({success:false, message: err.message });
    }
  }

module.exports={
    // verifyOtp,
    // generateOtp,
    sendVerifyOtp,
    verifyEmail,
    register,
    isAuthenticated,
    sendResetOtp,
    resetpassword,
    login,
    logout,
    // getallUsers,
    slotAdd,
    getAllslot
}