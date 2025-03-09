import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContent } from '../Context/Appcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ResetPassword = () => {

const {backendUrl}=useContext(AppContent);
axios.defaults.withCredentials=true;
const navigate=useNavigate();
    const [email, setEmail] = useState('');
  const [newpassword, setNewPassword] = useState('');
   const[isEmailSent,setIsEmailSent]=useState(false)
   const[isOtpSubmitted,setIsOtpSubmitted]=useState(false)
  const [otp, SetOtp] = useState(0);
 const onSubmitEmail=async(e)=>{
          e.preventDefault();
        try{
          const { data } = await axios.post(backendUrl + '/api/send-reset-otp', { email});
          data.success ? toast.success(data.message) :toast.error(data.message)
          data.success && setIsEmailSent(true)
        }  catch(err){
           toast.error(err.message)
        }
    }

    const onSubmitOtp=async(e)=>{
      e.preventDefault();
   SetOtp(otp)
   setIsOtpSubmitted(true)
}

const onSubmitNewPassword=async(e)=>{
  e.preventDefault();
try{
  const { data } = await axios.post(backendUrl + '/api/reset-password', { email:email,otp:otp,newPassword:newpassword});
  data.success ? toast.success(data.message) :toast.error(data.message)
  data.success && navigate('/login')
}  catch(err){
   toast.error(err.message)
}
}
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
     
{!isEmailSent &&   

<form  onSubmit={onSubmitEmail} className="md:w-[30vw] shadow-xl md:py-[5vh] w-[60vw] rounded-xl gap-[5vh] bg-[#1b1c21] flex flex-col justify-center items-center">
        <h1 className="text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center">
          RESET PASSWORD
        </h1>
        <div className="flex gap-[10px] justify-between mb-8 z-40">
        

        <input
              type='email'
              placeholder='Enter Your Registered Email Id'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
      
              className="px-[2vw] text-xl py-[2vh] text-[#b0b1b2] font-light rounded-xl bg-[#1b1c21] border-2 border-[#28282d]"
              />
       
        </div>

        <button className="px-[8vw] py-[2vh] shadow-xl  border-2 border-[#807e7e] rounded-2xl text-xl text-[#fff] mb-[2vh]">
          Submit 
        </button>
      </form>

     }
     
     
{!isOtpSubmitted && isEmailSent &&


      <form onSubmit={onSubmitOtp} className="md:w-[30vw] shadow-xl md:py-[5vh] w-[60vw] rounded-xl gap-[5vh] bg-[#1b1c21] flex flex-col justify-center items-center">
        <h1 className="text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center">
          RESET PASSWORD OTP!
        </h1>

        <div className="flex gap-[10px] justify-between mb-8 z-40">
          <input
            type="text"
            onChange={(e) => SetOtp(e.target.value)}
            value={otp}
            placeholder="Enter the 6 digit code sent to your email id"
            className="px-[2vw] text-xl py-[2vh] text-[#b0b1b2] font-light rounded-xl bg-[#1b1c21] border-2 border-[#28282d]"
            required
          />
        </div>

        <button className="px-[8vw] shadow-xl  border-2 border-[#807e7e] py-[2vh] rounded-2xl text-xl text-[#fff] mb-[2vh]">
          Submit
        </button>
      </form>
    }


{isOtpSubmitted && isEmailSent &&
      <form onSubmit={onSubmitNewPassword} className="shadow-xl md:w-[30vw] md:py-[5vh] w-[60vw] rounded-xl gap-[5vh] bg-[#1b1c21] flex flex-col justify-center items-center">
        <h1 className="text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center">
          NEW PASSWORD
        </h1>
        <div className="flex gap-[10px] justify-between mb-8 z-40">
        

        <input
              type='password'
              placeholder='Enter new password!'
              onChange={(e) => setNewPassword(e.target.value)}
              value={newpassword}
      
              className="px-[2vw] text-xl py-[2vh] text-[#b0b1b2] font-light rounded-xl bg-[#1b1c21] border-2 border-[#28282d]"
              />
        
         
        </div>

        <button className="px-[8vw] py-[2vh] shadow-xl  border-2 border-[#807e7e] rounded-2xl text-xl text-[#fff] mb-[2vh]">
          Submit 
        </button>
      </form>
}
      
    </div>
  )
}

export default ResetPassword
