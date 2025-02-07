import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';


interface User {
  email: string;
  password: string;
}




const login = () => {

 const navigate=useNavigate();
 const [open,setOpen]=useState(false)

const [active,setActive]=useState(false)
    const nextClick =()=>{
        setActive(true)
    }
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

 const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [otpExpires, setOtpExpires] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const[login,setLogin] = useState(false)
  // const ADMIN_EMAIL = 'admin@example.com';
  // const ADMIN_PASSWORD = 'securepassword';
  
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
        alert("Email and password are required");
        return;
    }

    const userData = { email, password };

    try {
        const response = await fetch('https://cauvery-hostel-website.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const json = await response.json();

        if (!response.ok) {
            alert("User already exists");
            return;
        }

        console.log('User registered successfully:', json);
        sessionStorage.setItem("userEmail", email);  // ✅ Save email
        setActive(true);

        // Request OTP Generation
        const otpResponse = await fetch('https://cauvery-hostel-website.onrender.com/api/generate-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const otpJson = await otpResponse.json();

        if (!otpResponse.ok) {
            setError(otpJson.message || 'Failed to generate OTP');
            return;
        }

        console.log('OTP sent successfully');

    } catch (err) {
        console.error('Error:', err);
        alert("Failed to connect to the server");
    }
};

const submitClick = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://cauvery-hostel-website.onrender.com/api/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),  // Send email & OTP
        });

        const json = await response.json();

        if (!response.ok) {
            console.log('OTP verification failed:', json.message);
            setError(json.message); // Show error to user
            return;
        }
        Swal.fire("Success!", "OTP verified successfully!", "success");
        // alert('OTP verified successfully!'); // Success popup
        setOpen(true)
        navigate('/');  
       
    } catch (err) {
      Swal.fire("Error", "Failed to verify OTP Please try again.", "error");

        // alert('Error: Failed to verify OTP. Please try again.');
        // setError('Failed to verify OTP. Please try again.');
    }
};




const [userlist, setUserlist] = useState<User[]>([]);

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



const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin"; 
const [item, setItem] = useState("");

const handleLoginClick = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Userlist at login:', userlist);
  console.log('Searching for:', email);

  try {
      if (!userlist || userlist.length === 0) {
          Swal.fire("User Not Found", "No account found with this email.", "error");
          return;
      }

      if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
          sessionStorage.setItem("role", "admin"); // ✅ Store admin role
          Swal.fire("Success!", "Admin login completed!", "success");
          navigate("/admin");
          return;
      }

      const foundUser = userlist.find(
          (user) => user.email.toLowerCase().trim() === email.toLowerCase().trim()
      );

      if (!foundUser) {
          Swal.fire("Error!", "Invalid email address.", "error");
          return;
      }

      if (!password || foundUser.password !== password.trim()) {
          Swal.fire("Error!", "Invalid password.", "error");
          return;
      }

      sessionStorage.setItem("userEmail", email);  // ✅ Save user email in sessionStorage
      sessionStorage.setItem("role", "user"); 

      Swal.fire("Success!", "Successfully Logged in", "success");
      navigate('/');

  } catch (err) {
      console.error('Login error:', err);
      alert("An error occurred during login. Please try again.");
  }
};


const gotoLogin=()=>{
setLogin(true)
}

  return (
    <motion.div className='flex w-[100vw] h-[100vh] justify-center items-center align-middle'>
       <motion.div className='flex justify-center items-center align-middle'>
{login ? <> 

  <form onSubmit={handleLoginClick}  className='md:w-[30vw] md:py-[2vh] w-[60vw] h-[75vh] rounded-xl gap-[5vh] bg-[#1b1c21] button flex flex-col justify-center items-center'>
          <h1 className='text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center'>
            LOGIN HERE!
          </h1>
        
       
          
       
          <input  
            type='email'
             placeholder='Enter Your Smail'
             onChange={(e) => setEmail(e.target.value)} 
             value={email}
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
       
       
       <input  
            type='text'
             placeholder='Password'
             onChange={(e) => setpassword(e.target.value)} 
             value={password}
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
       

       
          <button  className='px-[8vw] py-[2vh] rounded-2xl button text-xl text-[#fff] mb-[2vh]'>
            Login
          </button>
        </form>


</>:


<>  {active?<> <form onSubmit={submitClick} className='md:w-[30vw] md:py-[5vh] w-[60vw] h-[75vh] rounded-xl gap-[5vh] bg-[#1b1c21] button flex flex-col justify-center items-center'>
          <h1 className='text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center'>
            ENTER OTP!
          </h1>
          <input 
            placeholder='Enter Your Smail' 
            type='email'
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
         <input 
    placeholder='Enter 6 digit OTP' 
    type='text'
    onChange={(e) => setOtp(e.target.value)} // FIX: Store user input in state
    value={otp}  // Ensure OTP state is updated
    className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
/>
          <button className='px-[8vw] py-[2vh] rounded-2xl button text-xl text-[#fff] mb-[2vh]'>
            Login
          </button>
         { open ?
          <>
          <motion.div initial={{ opacity: 0,  }}
                    animate={{ opacity: 1,  }}
                    exit={{ opacity: 0,  }}
                    transition={{ duration: 3 }} className='px-[2vw] py-[2vh] rouned-xl bg-[grey]'>Wooh..!!!Successfully Logged in.</motion.div>
          </>
             :<>
                       {/* <motion.div className='px-[2vw] py-[2vh] rounded-xl bg-[grey]'>Wooh..!!!Successfully Logged in.</motion.div> */}

             </>
        }
        </form> 
        
        
        
        
         </>:<>


        
            <form onSubmit={handleRegisterClick}  className='md:w-[30vw] md:py-[2vh] w-[60vw] h-[75vh] rounded-xl gap-[5vh] bg-[#1b1c21] button flex flex-col justify-center items-center'>
          <h1 className='text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center'>
            REGISTER HERE!
          </h1>
          <input  
            type='text'
             placeholder='Name'
             onChange={(e) => setName(e.target.value)} 
             value={name}
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
          <input 
            placeholder='RoomNumber' 
            type='number'
            onChange={(e) => setRoom(e.target.value)} 
            value={room}
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
             <input  
            type='email'
             placeholder='Email'
             onChange={(e) => setEmail(e.target.value)} 
             value={email}
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
           <input  
            type='text'
             placeholder='Create password'
             onChange={(e) => setpassword(e.target.value)} 
             value={password}
            className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
          />
       

       
       
       
       
      <div className='flex '>
      <p className='text-[#717273]'>Already Registered?</p> <p onClick={gotoLogin} className=' font-semibold hover:text-[#626263] text-[#b0b1b2]'> Login here</p></div>
          <button  className='px-[8vw] py-[2vh] rounded-2xl button text-xl text-[#fff] mb-[2vh]'>
            Next
          </button>
        </form></>}
</>}
      

       
      </motion.div>
    </motion.div>
  )
}

export default login
