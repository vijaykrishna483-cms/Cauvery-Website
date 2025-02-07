const User = require('../models/User')
const crypto=require('crypto')
const {sendOtp} = require('../utils/sendMail')
const Slots=require('../models/Slot')
const {sendConfirmation}=require('../utils/bookedMail')
const Slot = require('../models/Slot')
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = await User.create({ email, password });

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Error in registration:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Generate OTP and send via email
const generateOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 1000000).toString();

        // Set OTP and expiration time
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        // Save user details
        await user.save(); // Ensure the OTP is saved in DB
        
        // Send OTP to user's email (ensure sendOtp function works properly)
        await sendOtp(email, otp);

        return res.status(200).json({ message: 'OTP sent to email', otp }); // Send OTP in response for testing
    } catch (err) {
        console.error('Error generating OTP:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if OTP is expired
        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Check if OTP matches
        if (user.otp !== otp) {  // Ensure types match
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Clear OTP after successful verification
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        console.error('Error verifying OTP:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};




//get all




const getallUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        console.log("Fetched Users from DB:", users); // Debugging

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


const getAllslot= async (req,res)=>{

    try{
        const response = await Slot.find({}).sort({createdAt:-1});
        console.log("fetching succesfull")
        res.status(200).json(response)
    }catch(err){
        console.error("Error fetching slots");
    }
}

const slotAdd = async (req, res) => {
    const { starttime, endtime, email, gameName } = req.body;
  
    try {
      // Check if the slot is already booked for the same game
      const existSlot = await Slots.findOne({ starttime, endtime, gameName });
  
      if (existSlot) {
        return ;
      }
  
      // Create a new slot if it doesn't exist
      const newSlot = await Slots.create({ starttime, endtime, gameName });
      await sendConfirmation(email, starttime, endtime, gameName);
      
      return res.status(201).json({ message: 'Slot booked successfully' });
    } catch (err) {
      console.error("Error in adding slot:", err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  
  

module.exports={
    verifyOtp,
    generateOtp,
    register,
    getallUsers,
    slotAdd,
    getAllslot
}