import React, { useContext, useEffect, useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { CgFacebook } from "react-icons/cg";
import './Bg.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContent } from '../Context/Appcontext';
import axios from 'axios';

const slidingVariants = {
  hidden: { x: '100%', opacity: 0 },   // Start off-screen to the right
  visible: { x: 0, opacity: 1 },         // Animate to its natural position
  exit: { x: '-100%', opacity: 0 }        // Optionally slide out to the left on exit
};
const Bg = () => {
  const [open, setOpen] = useState(false);
  const isAdmin = sessionStorage.getItem("role") === "admin";
  const isUser = sessionStorage.getItem("role") === "user";
// const [isUser,setIsUser]=useState(true)
  const handleclick = () => {
    setOpen(prevState => !prevState); // Toggle the menu
  }

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // Check if width is <= 768px
    setOpen(isMobile); // If true, set 'open' to true
  }, []);
const statusComplaintts=()=>{
  navigate('/status')
}

const handleComplaints=()=>{
  navigate('/admin')
}

const gotolog = () => {
  if (isUser) {
    // If the user is logged in, remove the role from sessionStorage to log out
    sessionStorage.removeItem("role"); // Remove role from sessionStorage to log out
  }
  // Navigate to the login page
  navigate('/login');
};
const gameBook=()=>{
  navigate('/booking')
}

const navigate=useNavigate()
// const [isLoggedIn, setIsLoggedIn] = useState(false);

// Check login status from sessionStorage when the component mounts
// useEffect(() => {
//   const userRole = sessionStorage.getItem("role"); // "admin" or "user"
//   if (userRole) {
//     setIsLoggedIn(true);
//   }

// }, []);
const handleOpenInsta = () => {
  window.open('https://www.instagram.com/cauveryhostel/', '_blank'); // Opens in a new tab
};

const toHome=()=>{
  navigate('/')
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    console.warn(`Element with id "${id}" not found.`);
  }
};







const {userData,backendUrl,isLoggedin,setIsLoggedIn,setuserData}=useContext(AppContent)

const logout = async (e) => {
try{

    axios.defaults.withCredentials=true
const {data}=await axios.post(backendUrl+'/api/logout')
data.success &&  setIsLoggedIn(false)
data.success &&  setuserData(false)
// userData.isAccountVerified=false
setIsLoggedIn(false)
navigate('/')

}catch(err){

}
}

  return (
    <motion.div     className={`bg-container w-[100vw] h-[100vh] fixed  ${open ? 'z-50' : 'z-0'}`}>
      <img src='blur.png' className='absolute top-[-140vh]' alt="Blur Background"/>

      <motion.div className=' flex flex-row justify-between w-[100vw] h-[100vh] px-[2vw]'>

        {/* Left Section - Logo & Social Icons */}
        <motion.div className='flex flex-col justify-between h-[100vh] py-[vh] md:py-[6vh] '>
          <motion.div className=''>  
            <img src='logos.png' className='opacity-100 md:w-[5vw] w-[20vw] rounded-full' alt="Logo" />
          </motion.div>

          <motion.div className='flex flex-col gap-[3vh]'>
            <motion.div className='text-2xl text-[#ffffff63] z-10'><FaWhatsapp/> </motion.div>  
            <motion.div className='text-2xl text-[#ffffff63] z-10' onClick={handleOpenInsta}><IoLogoInstagram/> </motion.div>   
            <motion.div className='text-2xl text-[#ffffff63] z-10'><CgFacebook/> </motion.div>  
          </motion.div>
        </motion.div>

        {/* Right Section - Menu Icon */}
        <motion.div   className={`menu_butn mt-[2vh]  flex flex-col md:py-[4vh] py-[3vh] px-[3vw] z-50 relative ${open ? '-left-[1vw]' : ''}`}  >
          <motion.div className="demo relative z-999">
            <motion.div onClick={handleclick} className="menu-icon">
              <input className="menu-icon__cheeckbox" type="checkbox" checked={open} readOnly />
              <motion.div>
                <span></span>
                <span></span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        { open ? (
          <motion.div   variants={slidingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'spring', stiffness: 140, damping: 20 }}  className='bg-[#688364]  button z-9999 w-[70vw] md:w-[20vw] flex flex-col justify-evenly py-[4vh] items-center ml-[30vw] md:ml-[79vw] h-[100vh] absolute'>
            <h1 className='md:text-3xl text-2xl md:mt-[] mt-[5vh] text-center font-bold text-[#ffffff] md:mb-[5vh]'>CAUVERY</h1>

            <motion.div className='w-[100%] flex flex-col justify-center items-center gap-[3vh]'>
              {/* <motion.div className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Register Complaints
              </motion.div> */}

              {/* <motion.div className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Memories
              </motion.div> */}
              <motion.div onClick={toHome} className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Home
              </motion.div>

              <motion.div  onClick={() => scrollToSection("complaints")} className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Contact Us
              </motion.div>

              {/* <motion.div className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Testimonials
              </motion.div> */}

              <motion.div onClick={gameBook} className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Game Booking
              </motion.div>

              {/* <motion.div className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                TV Room Booking
              </motion.div> */}
              {isAdmin? <> <motion.div onClick={handleComplaints} className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Complaints
              </motion.div>
                 </>:
                <motion.div onClick={statusComplaintts} className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Complaint Status
              </motion.div>}
              {/* <motion.div onClick={statusComplaintts} className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
                Complaint Status
              </motion.div>
   */}



{/* {!userData.isAccountVerified &&
  <motion.div  className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
Verify Email
              </motion.div> } */}



              <motion.div onClick={gotolog} className='bg-[#37432e] text-xl text-[#989696] button w-[80%] px-[2vw] py-[1vh] rounded-xl'>
     
              {isLoggedin ? <p onClick={logout}>Logout</p> : <p>Log In</p>}
              </motion.div>


            </motion.div>

            <motion.div className='flex flex-row gap-[3vh]'>
              <motion.div className='text-2xl text-[#ffffff63] z-10'><FaWhatsapp/> </motion.div>  
              <motion.div className='text-2xl text-[#ffffff63] z-10'><IoLogoInstagram/> </motion.div>   
              <motion.div className='text-2xl text-[#ffffff63] z-10'><CgFacebook/> </motion.div>  
            </motion.div>
          </motion.div>
        ) : null}
      </motion.div>
    </motion.div>
  );
};

export default Bg;
