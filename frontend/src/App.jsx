import { useState ,useEffect } from 'react'
import './App.css'
import Bg from './Background/Bg'
// import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Admin from './Components/Admin';
import Login from './Login/Register'
import Status from './status/status'
// import { Navigate } from "react-router-dom";
// import ProtectedRoute from './Login/Protect';
import Booking from './Booking/Booking';
import Genga from './Booking/Genga';
import Risk from './Booking/Risk';
import Monopoly from './Booking/Monopoly';
import Othello from './Booking/Othello';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import VerifyEmail from './Login/verifyEmail'
import ResetPassword from './Login/ResetPassword';
function App() {


  // const isAdmin = sessionStorage.getItem("role") === "admin";


  return (

    <Router>
      <ToastContainer/>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/status" element={<Status />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/genga" element={<Genga />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/monopoly" element={<Monopoly />} />
        <Route path="/othello" element={<Othello/>} />
        <Route path="/verify-email" element={<VerifyEmail/>} />

        <Route path="/reset-password" element={<ResetPassword />} />

        
        <Route path="/nhdgyfgffhhgfddhuufhuuf" element={<Admin />} />

      </Routes>
    </Router>

  
  )
}

export default App
