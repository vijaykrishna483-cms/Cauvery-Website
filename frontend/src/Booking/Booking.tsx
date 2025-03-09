import React from 'react';
import { useNavigate } from 'react-router-dom';
import Bg from '../Background/Bg';
import '../Components/Home.css'
const games = [
  {
    name: "MONOPOLY",
    image: "monopoly.jpg",
    route: "/monopoly",
    description1: "Monopoly is a classic real estate trading game.",
    description2: "Buy, sell, and trade properties to bankrupt your opponents!"
  },
  {
    name: "JENGA",
    image: "jenga.jpg",
    route: "/genga",
    description1: "Genga is a tower-building game requiring precision.",
    description2: "Remove blocks without collapsing the structure!"
  },
  {
    name: "RISK",
    image: "risk.jpg",
    route: "/risk",
    description1: "Risk is a global strategy board game.",
    description2: "Conquer territories and eliminate opponents!"
  },
  {
    name: "OTHELLO",
    image: "othello.jpg",
    route: "/othello",
    description1: "Othello is a strategy game with black and white pieces.",
    description2: "Flip opponent's pieces and control the board!"
  }
];

const Booking = () => {
  const navigate = useNavigate();

  return (
    <div className='relative z-20 bg-container flex flex-col justify-center items-center'>
 
      <Bg/>

      

     
      <p className='md:text-[7vw] text-6xl font-black text-[#ffffff2c] mb-[5vh] text-center'>
        BOARD GAME <br /> BOOKING
      </p>
      
      <div className='flex md:flex-row flex-col  justify-center gap-[2vw] items-center text-center'>
        {games.map((game, index) => (
          <div 
            key={index} 
            className='rounded-2xl  flex flex-col gap-[2vh] items-center cursor-pointer' 
            onClick={() => navigate(game.route)}
          >
            <img src={game.image} className='w-[70vw] h-[70vw] md:w-[20vw] md:h-[20vw] rounded-2xl button' />
            <p className='text-3xl font-bold text-[#424347]'>{game.name}</p>
            {/* <p className='text-md text-[#696a70] text-center w-[20vw]'>{game.description1}</p>
            <p className='text-md text-[#696a70] text-center w-[20vw]'>{game.description2}</p> */}
            <button className="px-6 relative z-20 py-2 text-xl text-white bg-[#424347] rounded-2xl">
              Book Now
            </button>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Booking;
