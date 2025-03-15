import React, { useContext, useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Swal from 'sweetalert2';
import { AppContent } from '../Context/Appcontext';
import axios from 'axios'
interface User {
  email: string;
  password: string;
}
import { toast } from 'react-toastify';



const Login = () => {
  const navigate = useNavigate();



  const [state, setState] = useState('sign up');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [userlist, setUserlist] = useState<User[]>([]);



const {backendUrl,setIsLoggedin,isLoggedin,getUserData,userData}=useContext(AppContent)
const onsubmithandler = async (e) => {
  try {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    console.log("Submitting form...");

    if (state === 'sign up') {
      console.log("Signing up...");
      console.log("Sending data:", { name, email, password }); 
      console.log("Backend URL:", `${backendUrl}/api/register`);

      const { data }= await axios.post(`${backendUrl}/api/register`, {
        name:name,
        email:email,
        password:password
      });
      //  console.log(data

      if (data.success) {
        console.log("Signup successful");
        setIsLoggedin(true);
        navigate('/verify-email');
        getUserData(); // Check function name
      } else {
        toast.error('Signup unsuccessful');
      }
    } 
    
    
    else {
      console.log("Logging in...");
      const { data } = await axios.post(`${backendUrl}/api/login`, {
        email,
        password
      });

      if (data.success) {
        console.log("Login successful");
        setIsLoggedin(true);
        // userData.isAccountVerified=false
        // getUserData();
        navigate('/');
      } else {
        toast.error('Login unsuccessful');
      }
    }
  } catch (err) {
    console.error("Error response:", err.response?.data || err.message);
        toast.error('Request failed');
  }
};


  return (
    <motion.div className='flex w-[100vw] h-[100vh] justify-center items-center align-middle'>
      <motion.div className='flex justify-center items-center align-middle'>
      
          <form onSubmit={onsubmithandler} className='md:w-[30vw] md:py-[2vh] w-[90vw] h-[75vh] rounded-xl gap-[5vh] bg-[#1b1c21] button flex flex-col justify-center items-center'>
            <h1 className='text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center'>
            {state==='sign up' ? 'Create Account ': 'Login'}  
            </h1>

            {state==='sign up'  && (
     <input
     type='text'
     placeholder='Name'
     onChange={(e) => setName(e.target.value)}
     value={name}
     disabled={isLoading}
     className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'

   />
            )}  
       

            <input
              type='email'
              placeholder='Enter Your Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={isLoading}
              className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
            />
            <input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={isLoading}
              className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
            />
            <p onClick={()=>navigate('/reset-password')} className='pt-[1vh] mb- cursor-pointer text-indigo-500'>Forget Password?</p>
           
           
            {state==='sign up'  ? (       <p className='text-[#b0b1b2] text-center text-sm md:text-lg '>Already Have an account? <span onClick={()=>setState('Login')} className='text-blue-400 underline cursor-pointer'>Login here</span></p>
):(          <p className='text-[#b0b1b2] text-center text-sm md:text-lg '>Don't have an account? <span onClick={()=>setState('sign up')} className='text-blue-400 underline cursor-pointer'>Sign up</span></p>
)}

           
           <button
              disabled={isLoading}
              className='px-[8vw] py-[2vh] rounded-2xl button text-xl text-[#fff] mb-[2vh]'
            >
            {state==='sign up' ? 'Sign Up ': 'Login'}  
            </button>
          
          </form>

     
        
 
      </motion.div>
    </motion.div>
  );
};

export default Login;