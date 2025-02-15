import React from 'react';
// import Hero from './Hero';
import Hero from '../Hero/Hero'
import Memory from './Memory';
import Complaint from './Complaint';
import Bg from '../Background/Bg';
import './Home.css';
import Testimonials from './Testimonials';
import Footer from './Footer/Footer'
const Home = () => {
  return (
    <div className='overflow-hidden bg-[#0c2a21]'>
      
      {/* Background Component */}
      <div className='relative z-20 .bg-container'>
       
        <Bg  />
  
        <div className='-z-10 relative'>
        <Hero />
        </div>
       
        <Memory />
        <Testimonials/>
        <Complaint  />
       
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
