import React, { useEffect, useState } from 'react';
import { FiPhoneCall } from "react-icons/fi";
import './Memory.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
interface User {
  email: string;
  password: string;
}



const Complaint = () => {


  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [roll, setRoll] = useState('');
  const [phone, setPhone] = useState('');
  const [complaints, setComplaint] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);


const [userlist, setUserlist] = useState<User[]>([]);

const navigate=useNavigate()

const [isLoggedIn, setIsLoggedIn] = useState(false);

// Check login status from sessionStorage
useEffect(() => {
  const userRole = sessionStorage.getItem("role"); // "admin" or "user"
  if (userRole) {
    setIsLoggedIn(true);
  }
}, []);





useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://cauvery-hostel-website.onrender.com/api/users'); // Ensure correct URL
      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (response.ok) {
        setUserlist(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, []);



  const handlesubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setError(null);
    setEmptyFields([]);

    if (!name || !room || !roll || !complaints || !phone) {
      return;
    }

    const complaint = { 
      Name: name, 
      RoomNO: room, 
      RollNO: roll, 
      ContactNo: phone,
      Complaint: complaints 
    };

    try {

      if (!isLoggedIn) {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "You must be logged in to register a complaint.",
          confirmButtonColor: "#d33",
        });
        navigate("/login"); // Redirect to login page
        return;
      }
  
      const response = await fetch('https://cauvery-hostel-website.onrender.com/api/complaints', {
        method: 'POST',
        body: JSON.stringify(complaint),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error || 'Something went wrong');
        setEmptyFields(json.emptyFields || []);
        return;
      }

      setEmptyFields([]);
      setName('');
      setRoom('');
      setRoll('');
      setPhone('');
      setComplaint('');
      setError(null);
      Swal.fire({
        icon: "success",
        title: "Complaint Registered",
        text: "Your complaint has been successfully submitted.",
        confirmButtonColor: "#4CAF50",
      });    } catch (err) {
      // Handle error if needed
    }
  };

  return (
    <div className='flex w-[100vw]  md:mb-[20vh] mb-[60vh] h-[100vh] justify-center items-center flex-col md:flex-row'>
      <div className='md:w-[50vw] w-[100vw] md:h-[100vh] flex flex-col justify-center items-center'>
        <h1 className='text-[#ffffffa7] text-center md:text-6xl text-3xl font-black'>CONTACT US</h1>
        <p className='md:text-xl text-sm font-light text-[#ffffff50] md:w-[35vw] text-center'>
          If you're experiencing any issues or have concerns regarding your stay, we encourage you to register your complaint here. Your comfort and well-being are our top priority, and we strive to create a positive and hassle-free environment for all residents.
        </p>
        <p className='md:text-xl font-bold mb-[1vh] mt-[2vh] text-[#ffffffa7]'>SECURITY</p>
        <div className='flex flex-row justify-center items-center align-middle gap-[5px]'>
          <p className='md:text-md text-[#ffffff50]'><FiPhoneCall /></p>  
          <p className='md:text-xl text-[#ffffff50]'>+91 8943687488</p>
        </div>
        <p className='md:text-xl font-bold mb-[1vh] mt-[2vh] text-[#ffffffa7]'>EMERGENCY</p>
        <div className='flex flex-row justify-center items-center align-middle gap-[5px]'>
          <p className='md:text-md text-[#ffffff50]'><FiPhoneCall /></p>  
          <p className='md:text-xl text-[#ffffff50]'>+91 8943687488</p>
        </div>
        <p className='md:text-xl font-bold mb-[1vh] mt-[2vh] text-[#ffffffa7]'>GENSEC</p>
        <div className='flex flex-row justify-center items-center align-middle gap-[5px]'>
          <p className='md:text-md text-[#ffffff50]'><FiPhoneCall /></p>  
          <p className='md:text-xl text-[#ffffff50]'>+91 8943687488</p>
        </div>
      </div>

      <div className='relative md:mt-[]  mt-[10vh]'>
        <form onSubmit={handlesubmit} className='md:w-[40vw] w-[90vw] h-[75vh] rounded-xl gap-[5vh] bg-[#1b1c21] button flex flex-col justify-center items-center'>
          <h1 className='text-[#ffffffa7] md:text-5xl text-2xl pt-[2vh] font-black text-center'>
            REGISTER COMPLAINT <br />HERE!
          </h1>
          <input 
            placeholder='Name' 
            type='text'
            onChange={(e) => setName(e.target.value)} 
            value={name}
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
          <input  
            type='number'
            onChange={(e) => setRoom(e.target.value)} 
            value={room}
            placeholder='Room no.'  
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
          <input  
            type='text'
            onChange={(e) => setRoll(e.target.value)} 
            value={roll}
            placeholder='Roll No.'  
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
          <input  
            type="tel" 
            onChange={(e) => setPhone(e.target.value)} 
            value={phone}
            placeholder="Contact No:"
            pattern="\d{10}"
            className="w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]"
          />
          <textarea 
            onChange={(e) => setComplaint(e.target.value)} 
            value={complaints} 
            placeholder='Write your complaint here!' 
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
          <button
            disabled={!name || !room || !roll || !complaints || !phone}
            className={`px-[8vw] py-[2vh] rounded-2xl button text-xl z-20 text-[#fff] mb-[2vh] ${!name || !room || !roll || !complaints || !phone ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Complaint;
