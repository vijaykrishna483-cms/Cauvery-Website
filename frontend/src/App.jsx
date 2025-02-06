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
import ProtectedRoute from './Login/Protect';
import Booking from './Booking/Booking';
import Genga from './Booking/Genga';
import Risk from './Booking/Risk';
import Monopoly from './Booking/Monopoly';
import Othello from './Booking/Othello';



function App() {


  const isAdmin = sessionStorage.getItem("role") === "admin";


  return (

    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/status" element={<Status />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/genga" element={<Genga />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/monopoly" element={<Monopoly />} />
        <Route path="/othello" element={<Othello/>} />

        {/* <Route path="/admin" element={<Admin/>} /> */}
       
       

<Route
          path="/admin"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>

  
  )
}

export default App
