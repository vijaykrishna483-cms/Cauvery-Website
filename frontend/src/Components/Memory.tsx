import React from 'react'
import './Memory.css'
const Memory = () => {
  return (
    // <div className=' w-[100vw] min-h-[100vh] flex flex-col md:mb-[]  mb-[20vh] justify-center items-center pt-[4vh]'>
      

    //   <div className='flex flex-row gap-[1vw] justify-center items-center align-middle'>
    //    <img src='two.png' className='md:w-[21vw] mr-[20vw] md:h-[45vh] w-[81vw] h-[40vh]' />
    //    <img src='one.jpg' className=' absolute md:w-[30vw] md:h-[60vh] w-[71vw] h-[45vh]' />

    //    <img src='three.jpg' className='md:w-[21vw] md:h-[45vh] w-[51vw] h-[40vh]' />

    //   </div>
    //    <p className='md:text-[8vw] text-6xl font-black text-[#ffffff2c] mt-[40vh] absolute'>MEMORIES</p>

    // <button className='button mt-[20vh]  rounded-xl py-[5px] px-[20px]'>View more</button>
    // </div>
<div className='flex flex-col justify-center'>
<p className='md:text-[8vw] text-5xl md:text-6xl font-black text-[#ffffff2c]  text-center'>MEMORIES</p>
    <div className="external">
    <div className="horizontal-scroll-wrapper">
      <div className="img-wrapper slower">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src="image1.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper faster">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src="image2.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper slower vertical">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src="image3.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper slower slower-down">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src="image4.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src="image5.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper slower">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src="image6.jpeg" alt="" />
        </a>
      </div>

      <div className="img-wrapper faster1">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src="image7.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper slower slower2">
        <a href="https://altphotos.com/photo/cafe-terrace-with-a-row-of-retro-tables-261/" target="_blank" rel="noopener noreferrer">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/cafe-table-street.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper">
        <a href="https://altphotos.com/photo/street-scene-with-pedestrians-and-dogs-318/" target="_blank" rel="noopener noreferrer">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/street-scene-people.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper slower">
        <a href="https://altphotos.com/photo/tourist-barge-on-the-river-seine-near-notre-dame-266/" target="_blank" rel="noopener noreferrer">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/notre-dame-river-boat.jpg" alt="" />
        </a>
      </div>

      <div className="img-wrapper slower last">
        <a href="https://altphotos.com/photo/skulls-decoration-in-a-shop-window-331/" target="_blank" rel="noopener noreferrer">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/shop-window-reflection.jpg" alt="" />
        </a>
      </div>
    </div>
    {/* <p className="scroll-info">
      <span className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 100 100">
          <path d="M50,67.1c-0.6,0-1.2-0.2-1.8-0.7c-3.8-3.8-7.7-7.7-11.5-11.5c-2.3-2.3,1.2-5.8,3.5-3.5c2.5,2.5,4.9,4.9,7.4,7.4 c0-13.7,0-27.4,0-41.2c0-0.6,0.2-1.2,0.5-1.5c0,0,0,0,0,0c0.4-0.6,1.1-1,2-0.9c13.7,0.3,26.4,7.2,33.5,19.1 C96.5,55.9,84.7,85,60.2,91.6C35.5,98.2,11.6,79.1,11.1,54c-0.1-3.2,4.9-3.2,5,0c0.3,13.8,8.4,26.4,21.3,31.5 c12.5,5,27.1,1.9,36.6-7.5c9.5-9.5,12.5-24.1,7.5-36.6c-4.8-12.1-16.3-20.1-29-21.2c0,12.8,0,25.5,0,38.3 c2.5-2.5,4.9-4.9,7.4-7.4c2.3-2.3,5.8,1.3,3.5,3.5c-3.9,3.9-7.8,7.8-11.8,11.8C51.2,66.9,50.6,67.1,50,67.1z"/>
        </svg>
      </span>
      Try scrolling down
    </p> */}
    {/* <header>
      <p>Postcards from Paris.</p>
      <h1>Css-only parallax horizontal gallery</h1>
      <p>Grab (these and more) photos from - <a href="https://altphotos.com/free/paris/" target="_blank" rel="noopener noreferrer">altphotos.</a></p>
    </header> */}
  </div>

  </div>
  )
}

export default Memory
