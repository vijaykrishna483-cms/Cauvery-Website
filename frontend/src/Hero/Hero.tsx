import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  const { scrollY } = useScroll(); // Detects scroll position

  // Create a fade-out and parallax effect based on scroll
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Fades out at 300px scroll
  const y = useTransform(scrollY, [0, 300], [0, -100]); // Moves up while fading

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with id "${id}" not found.`);
    }
  };

  return (
    <motion.div
      className="w-[100vw] h-[100vh] flex flex-col justify-center maindiv"
      style={{ opacity, y }} // Apply fade-out and move-up effect
    >
      <motion.div
        className="flex flex-col justify-center items-center z-20 relative"
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="md:text-[16vw] text-7xl font-black"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-[#ffffffac]">CAU</span>
          <span className="text-[#ffffffcb]">VERY</span>
        </motion.h1>

        <motion.p
          className="text-[#fbfcf93b] text-3xl md:text-9xl text-center font-black"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          HOSTEL
        </motion.p>

        <motion.div
          className="flex flex-col gap-[3vh] mt-[4vh] z-20 relative items-center justify-center text-center"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-center text-[#ffffffb5] w-[90%] md:w-[35%]">
            <strong className="text-[#ffffff7b] text-3xl">Cauvery 2024, B23 <br /></strong>
            Cauvery Hostel is one of the residential hostels at IIT Madras, housing students from various batches. The B.Tech 2023 batch residing in Cauvery Hostel is part of a vibrant and diverse community, fostering both academic and extracurricular activities.
          </p>
          <motion.button
            onClick={() => scrollToSection("memories")}
            className="text-left text-[#000] rounded-2xl w-fit h-fit px-[3vw] md:px-[1vw] py-[1vh] bg-[#fff]"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            View More
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
