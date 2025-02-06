import React from 'react';
import Hero from './Hero';
import Memory from './Memory';
import Complaint from './Complaint';
import Bg from '../Background/Bg';
import './Home.css';
import Testimonials from './Testimonials';
import Footer from './Footer/Footer'
const Home = () => {
  return (
    <div className='overflow-hidden'>
      
      {/* Background Component */}
      <div className='relative z-10 .bg-container'>
        <Bg  />
        
        <Hero />
        <Memory />
        <Testimonials/>
        <Complaint  />
       
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
