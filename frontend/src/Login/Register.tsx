import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [login, setLogin] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userlist, setUserlist] = useState<User[]>([]);

  // Constants
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin";
  const API_BASE_URL = 'https://cauvery-hostel-website.onrender.com/api';

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/users`, {
          signal: AbortSignal.timeout(10000)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUserlist(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error", "Failed to fetch user data. Please try again later.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRegisterClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      Swal.fire("Error", "Email and password are required", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || 'Registration failed');
      }

      sessionStorage.setItem("userEmail", email);
      setActive(true);

      // Generate OTP
      const otpResponse = await fetch(`${API_BASE_URL}/generate-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const otpJson = await otpResponse.json();

      if (!otpResponse.ok) {
        throw new Error(otpJson.message || 'Failed to generate OTP');
      }

      Swal.fire("Success", "OTP sent successfully!", "success");

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const submitClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || 'OTP verification failed');
      }

      Swal.fire("Success!", "OTP verified successfully!", "success");
      setOpen(true);
      navigate('/');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify OTP';
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!userlist || userlist.length === 0) {
        Swal.fire("Error", "Unable to verify login at this time", "error");
        return;
      }

      if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && 
          password === ADMIN_PASSWORD) {
        sessionStorage.setItem("role", "admin");
        Swal.fire("Success!", "Admin login completed!", "success");
        navigate("/admin");
        return;
      }

      const foundUser = userlist.find(
        user => user.email.toLowerCase().trim() === email.toLowerCase().trim()
      );

      if (!foundUser) {
        Swal.fire("Error", "Invalid email address", "error");
        return;
      }

      if (!password || foundUser.password !== password.trim()) {
        Swal.fire("Error", "Invalid password", "error");
        return;
      }

      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("role", "user");

      Swal.fire("Success!", "Successfully logged in", "success");
      navigate('/');

    } catch (err) {
      console.error('Login error:', err);
      Swal.fire("Error", "An error occurred during login", "error");
    }
  };

  const gotoLogin = () => setLogin(true);

  return (
    <motion.div className='flex w-[100vw] h-[100vh] justify-center items-center align-middle'>
      <motion.div className='flex justify-center items-center align-middle'>
        {login ? (
          <form onSubmit={handleLoginClick} className='md:w-[30vw] md:py-[2vh] w-[60vw] h-[75vh] rounded-xl gap-[5vh] bg-[#1b1c21] button flex flex-col justify-center items-center'>
            <h1 className='text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center'>
              LOGIN HERE!
            </h1>
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
            <button
              disabled={isLoading}
              className='px-[8vw] py-[2vh] rounded-2xl button text-xl text-[#fff] mb-[2vh]'
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        ) : (
          <>
            {active ? (
              <form onSubmit={submitClick} className='md:w-[30vw] md:py-[5vh] w-[60vw] h-[75vh] rounded-xl gap-[5vh] bg-[#1b1c21] button flex flex-col justify-center items-center'>
                <h1 className='text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center'>
                  ENTER OTP!
                </h1>
                <input
                  placeholder='Enter Your Email'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={isLoading}
                  className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
                />
                <input
                  placeholder='Enter 6 digit OTP'
                  type='text'
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  disabled={isLoading}
                  className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
                />
                <button
                  disabled={isLoading}
                  className='px-[8vw] py-[2vh] rounded-2xl button text-xl text-[#fff] mb-[2vh]'
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                {open && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3 }}
                    className='px-[2vw] py-[2vh] rounded-xl bg-[grey]'
                  >
                    Successfully logged in!
                  </motion.div>
                )}
              </form>
            ) : (
              <form onSubmit={handleRegisterClick} className='md:w-[30vw] md:py-[2vh] w-[60vw] h-[75vh] rounded-xl gap-[5vh] bg-[#1b1c21] button flex flex-col justify-center items-center'>
                <h1 className='text-[#ffffffa7] md:text-4xl text-2xl pt-[2vh] font-black text-center'>
                  REGISTER HERE!
                </h1>
                <input
                  type='text'
                  placeholder='Name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  disabled={isLoading}
                  className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
                />
                <input
                  placeholder='Room Number'
                  type='number'
                  onChange={(e) => setRoom(e.target.value)}
                  value={room}
                  disabled={isLoading}
                  className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
                />
                <input
                  type='email'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={isLoading}
                  className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
                />
                <input
                  type='password'
                  placeholder='Create password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled={isLoading}
                  className='w-[90%] text-white text-xl font-light bg-[#1b1c21] border-b-[0.1px] border-b-[#28282d]'
                />
                <div className='flex'>
                  <p className='text-[#717273]'>Already Registered?</p>
                  <p onClick={gotoLogin} className='font-semibold hover:text-[#626263] text-[#b0b1b2]'> Login here</p>
                </div>
                <button
                  disabled={isLoading}
                  className='px-[8vw] py-[2vh] rounded-2xl button text-xl text-[#fff] mb-[2vh]'
                >
                  {isLoading ? 'Processing...' : 'Next'}
                </button>
              </form>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Login;