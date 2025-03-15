const express = require('express');
const { model } = require('mongoose');
const router = express.Router()
// import {register, generateOtp,verifyOtp} from '../Controllers/auth'
const {
    register,
    login,
    logout,
   sendVerifyOtp,
    verifyEmail,
    slotAdd,
    getAllslot,
    isAuthenticated,
    sendResetOtp,
    resetpassword

} = require('../Controllers/auth')


const Complaint=require('../models/ComplaintsModel');
const userAuth = require('../middleware/userAuth');
const { getuserData } = require('../Controllers/userController');

//register
// router.get('/users' ,getallUsers)

router.post('/register' ,register)
router.post('/login' ,login)
router.post('/logout' ,logout)


router.post('/send-verify-otp' ,userAuth,sendVerifyOtp)
router.post('/verify-account' ,userAuth,verifyEmail)
router.get('/is-auth' ,userAuth,isAuthenticated
)

router.post('/send-reset-otp' ,sendResetOtp)
router.post('/reset-password' ,resetpassword)

router.get('/data' ,userAuth,getuserData)





//slot adding
router.post('/slots',userAuth,slotAdd)
router.get('/slots' ,getAllslot)


//get all complaints

router.get('/complaints', async (req, res) => {
    const complaints = await Complaint.find({}).sort({createdAt: -1})

    res.status(200).json(complaints)
});




//get a single complaints

router.get('/complaints/:id', async (req, res) => {
const { id } = req.params
// if(!mongoose.Types.ObjectId,isValid(id)){
//     return res.status(404).json({error:'no such workout'})
// }
    const complaint= await Complaint.findById(id)

    if(!complaint){
        return res.status(404).json({error:'No such Workout'})
    }
    res.status(200).json(complaint)

})




//register a complaint

router.post('/complaints', async (req, res) => {
    const { Name, RollNO, RoomNO,ContactNo, Complaint: complaintText } = req.body;

    try {
        const complaint = await Complaint.create({
            Name,
            RollNO,
            RoomNO,
            ContactNo,
            Complaint: complaintText
        });

        res.status(200).json(complaint);
    } catch (error) {

        res.status(400).json({ error: error.message });
    }
});

//delete a complaint
router.delete('/complaints/:id', async (req, res) => {
    const { id } = req.params;
  
    // // Validate ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).json({ error: 'Invalid ID' });
    // }
  
    const complaint = await Complaint.findOneAndDelete({ _id: id });
  
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
  
    res.status(200).json({ message: 'Complaint deleted', complaint });
  });
  
//update the complaint

router.patch('/complaints/:id', async (req, res) => {
    const { id } = req.params;
    const { resolved } = req.body; // Boolean (true/false)

    try {
        // Validate if complaint exists and update it
        const complaint = await Complaint.findByIdAndUpdate(id, { resolved }, { new: true });

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint updated successfully', complaint });
    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports=router