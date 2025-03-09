import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContent } from '../Context/Appcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface User {
  otp: Number;
}

const VerifyEmail = () => {
  const [otp, SetOtp] = useState<string>(""); // Initialize OTP as a string
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);

  const onSubmitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(backendUrl + '/api/verify-account', { otp: otp.toString() });
      console.log("Backend URL:", `${backendUrl}/api/verify-account`);

      console.log(data)
      if (data.success) {
        toast.success(data.message);
        // getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "An error occurred");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="shadow-xl md:w-[30vw] md:py-[5vh] w-[60vw] rounded-xl gap-[5vh] bg-[#1b1c21] flex flex-col justify-center items-center">
        <h1 className="text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center">
          ENTER OTP!
        </h1>

        <div className="flex gap-[10px] justify-between mb-8 z-40">
          <input
            type="text"
            onChange={(e) => SetOtp(e.target.value)}
            value={otp}
            placeholder="Enter OTP"
            className="px-[2vw] text-xl py-[2vh] text-[#b0b1b2] font-light rounded-xl bg-[#1b1c21] border-2 border-[#28282d]"
            required
          />
        </div>

        <button className="px-[8vw] shadow-xl  border-2 border-[#494848] py-[2vh] rounded-2xl text-xl text-[#fff] mb-[2vh]">
          Submit OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
