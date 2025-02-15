import React from 'react'
import './Hero.css'
const Hero = () => {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with id "${id}" not found.`);
    }
  };
  return (
    <div>
      <div className='w-[100vw] h-[100vh] flex flex-col justify-center  maindiv'>
    {/* <div className='w-[50vw] -z-1 h-[100vh] absolute blur-background left-0 bg-[#ffffff2f] overlay'>
        
    </div> */}


<div className=' flex flex-col justify-center items-center  z-20 rlative'>
<h1 className='md:text-[16vw] text-7xl  items-center  font-black '><span className='z-20 rlative text-[#ffffffac]'>CAU</span><span className='text-[#ffffffcb]'>VERY</span></h1>
<p className='text-[#fbfcf93b] text-3xl md:text-9xl text-center  font-black'>HOSTEL</p>

<div className='flex flex-col gap-[3vh] ml-[] mt-[4vh] z-20 rlative items-center  justify-center text-center'>
        <p className='text-center text-[#ffffffb5] w-[90%] md:w-[35%]'>
            <strong className='text-[#ffffff7b] text-3xl'>Cauvery 2024 ,B23 <br/></strong>
            Cauvery Hostel is one of the residential hostels at IIT Madras, housing students from various batches. The B.Tech 2023 batch residing in Cauvery Hostel is part of a vibrant and diverse community, fostering both academic and extracurricular activities. Known for its strong camaraderie, the batch actively participates in institute events, technical projects, and cultural fests.
            </p>
            <button onClick={() => scrollToSection("memories")} className='text-left text-[#000] rounded-2xl w-fit h-fit px-[3vw] md:px-[1vw] py-[1vh] bg-[#fff]'>View More</button>
    </div>
</div>


  
      </div>
    </div>
  )
}

export default Hero
