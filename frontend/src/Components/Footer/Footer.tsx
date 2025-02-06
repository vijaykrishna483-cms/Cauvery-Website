import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import './Footer.scss'
import { useNavigate } from 'react-router-dom';
const Footer = () => {
const navigate=useNavigate()

  const logclick=()=>{
    navigate('/')
  }

  return (
    <div className='md:mt-[0vh] mt-[30vh]'>
      <footer className="footer ">
  <div className="footer__parralax">
    <div className="footer__parralax-trees"></div>
    <div className="footer__parralax-moto"></div>
    <div className="footer__parralax-secondplan"></div>
    <div className="footer__parralax-premierplan"></div>
    <div className="footer__parralax-voiture"></div>
  </div>
  <div className="container px-[5vw]">
    <div className="flex md:flex-row flex-col  justify-between w-[100vw]">
      <div className="footer__col">
        <h3 className="text-3xl font-bold text-[#908f8f]">
          <i data-feather=""></i> <span>Adress</span></h3>
        {/* <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a href="" className="footer__nav-link">
                Mentions légales
              </a>
            </li>
            <li className="footer__nav-item">
              <a href="" className="footer__nav-link">
                Politique de confidentialité
              </a>
            </li>
            <li className="footer__nav-item">
              <a href="" className="footer__nav-link">
                CGV
              </a>
            </li>
            <li className="footer__nav-item">
              <a href="" className="footer__nav-link">
                Livraisons et retours
              </a>
            </li>
            <li className="footer__nav-item">
              <a href="" className="footer__nav-link">
                Règlement concours
              </a>
            </li>
          </ul>
        </nav> */}

        <p className='text-xl text-[#ffffffa9]'>
          Cauvery Hostel,IIT Madras, <br/>
          Chennai,TamilNadu<br/>
          Pin:600036

        </p>
      </div>
      <div className="footer__col">
        <h3 className="text-3xl font-bold text-[#908f8f]">
          <i data-feather=""></i> <span>Contact Us</span></h3>
        <nav className="">
          <ul className="flex flex-col gap-[5px] text-xl text-[#a9a9a9]">
            {/* <li className="footer__nav-item">
             Gensec:+91 87686867562
            </li>
            <li className="footer__nav-item">
             Techsec:+91 87686867562
            </li> */}
            <li className="footer__nav-item">
             Manager:+91 87686867562
            </li>
            <li className="footer__nav-item">
            cauveryhostel@gmail.com
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer__col w-[30%]">
        <h3 className="text-3xl font-bold text-[#908f8f]">
          <i data-feather="send"></i> <span>SIGN</span></h3>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a href="mailto:contact.laboiserie@gmail.com" className="w-[90vw] md:w-[70%]">
              To get started, simply create your account by clicking the button below and follow the steps to register.
              </a>
            </li>
<div  className='z-20 flex gap-[2px] align-middle justify-start items-center'>           <MdOutlineKeyboardDoubleArrowRight className='arroes text-3xl font-light'/>
<p onClick={logclick} >SIGN UP</p>
</div>
          </ul>
        </nav>
      </div>
    </div>
      <div className="footer__copyrights">
        <p>copyrights owned by<a href="https://twitter.com/silvereledev" target="_blank">@cauveryhostel</a></p>
      </div>
  </div>
</footer>
    </div>
  )
}

export default Footer
