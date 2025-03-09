import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Bg from "../Background/Bg";

import '../Components/Home.css'
import { AppContent } from "../Context/Appcontext";
import { useContext } from "react";
import axios from "axios";



// Define Slot Type
interface Slot {
  gameName: string;
  starttime: string;
  endtime: string;
}



const Genga: React.FC = () => {

const navigate=useNavigate()




const {backendUrl,isLoggedin}=useContext(AppContent)

const userEmail = sessionStorage.getItem("userEmail");
  // const isUser = sessionStorage.getItem("role") === "user";
  // State Variables
  const [slots, setSlots] = useState<Slot[]>([]); // Stores booked slots
  const [selectedSlot, setSelectedSlot] = useState<string>(""); // Selected slot
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null); // Slot availability
  const [starttime, setStarttime] = useState<string>(""); // Start time state
  const [endtime, setEndtime] = useState<string>(""); // End time state

  // Fetch booked slots on mount
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(backendUrl+'/api/slots');
        const data = await response.json();

        if (response.ok) {
          setSlots(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch slot details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, []);

  // Handle slot selection
  const handleSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slot = e.target.value;
    setSelectedSlot(slot);
    setIsAvailable(null); // Reset availability state

    if (slot) {
      const [start, end] = slot.split(" - ");
      setStarttime(start);
      setEndtime(end);
    }
  };

  // Handle slot availability check
   // Handle slot availability check
   const handleSearch = () => {
     if (!selectedSlot) {
       Swal.fire("Error", "Please select a slot first!", "error");
       return;
     }
   
     // Check if slot is booked for the selected game (including Risk)
     const isBooked = slots.some(
       (slot) =>
         slot.gameName === "Jenga" && // Check if the slot's game name matches the selected game
         slot.starttime === starttime && // Check if starttime matches
         slot.endtime === endtime // Check if endtime matches
     );
   
     setIsAvailable(!isBooked);
   };

  // Handle booking a slot
  const handleBook = async (e) => {
    e.preventDefault();

    if (!selectedSlot || isAvailable !== true) return;
    if(isLoggedin){
      try {
           
     const { data }= await axios.post(`${backendUrl}/api/slots`, {
     starttime:starttime,
     endtime:endtime,
      gameName:'Jenga'
      }); 

      
  
        if (!data.booked) {
          Swal.fire("Error", "Something went wrong!", "error");
          return;
        }
  if(data.booked){
    Swal.fire("Success", "Slot booked successfully!", "success");
        // Update UI after booking
        setSlots([...slots, { starttime, endtime,gameName:"Jenga" }]);
        setIsAvailable(null); // Reset availability state


  }
    
      } catch (error) {
        console.error("Booking error:", error);
      }

    }else{
          Swal.fire({
               icon: "error",
               title: "Access Denied",
               text: "You must be logged in to register a complaint.",
               confirmButtonColor: "#d33",
             });
             navigate("/login");
    }
   
  };
  const handleOpenJengaPage = () => {
    window.open('https://en.wikipedia.org/wiki/Jenga', '_blank');
  };


  return (
    <div className="w-[100vw] md:pt-[]  relative z-20  overflow-hidden  md:h-[100vh] md:flex-row flex-col flex">
      {/* Left Section */}
{/* <Bg/> */}
      
      <div className="md:w-[60vw] px-[2vw]  md:px-[5vw] h-[100vh] flex flex-col justify-center items-center">
        <div className="px-[3vw] rounded-2xl flex flex-col md:flex-row justify-center items-center">
          <img src="jenga.jpg" className="md:w-[20vw] md:h-[20vw] rounded-2xl" />
          <div className="flex flex-col justify-center items-center">
            <p className="md:text-6xl text-5xl font-black text-[#424347]">JENGA</p>
            <p className="text-[#696a70] px-[5vw] text-center">
Jenga is a block-stacking game where players take turns removing one block at a time from a tower and placing it on top without causing it to collapse. The game ends when the tower falls, and the last player to successfully place a block wins.
            </p>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="flex relative z-20 flex-col mt-[5vh] gap-[2vh] justify-center items-center">
          <p className="text-[#696a70] md:text-3xl">Choose the Slot You Want to Play:</p>

          <select
  className="w-full relative z-20 rounded-xl px-3 h-10 bg-[#c0bebe3f] p-2 mt-3"
  onChange={handleSlotChange}
  value={selectedSlot}
>
  <option value="">Select a slot</option>
  {Array.from({ length: 12 }, (_, i) => {
    const start = i * 2;
    const end = start + 2;
    return (
      <option key={i} value={`${start.toString().padStart(2, "0")}:00 - ${end.toString().padStart(2, "0")}:00`}>
        {`${start.toString().padStart(2, "0")}:00 - ${end.toString().padStart(2, "0")}:00`}
      </option>
    );
  })}
</select>


          {/* Display selected slot */}
          {selectedSlot && (
            <div className="mt-4 text-[#ebe3d199]">
              <p>Selected Slot: {selectedSlot}</p>
            </div>
          )}

          {/* Search Button */}
          <div className="w-full flex justify-center mt-4">
            <button
              className="px-6 py-2 text-xl text-white bg-[#010309] rounded-2xl"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Availability Message */}
          {isAvailable === false && (
            <p className="text-red-500 text-lg mt-2">Slot is already booked!</p>
          )}

          {/* Book Now Button */}
          {isAvailable === true && (
            <button
              className="px-6 py-2 text-xl rounded-2xl bg-[#696a70] text-white mt-2"
              onClick={handleBook}
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-[40vw]  md:mt-[0vh] mt-[45vh] relative h-[100vh] flex flex-col justify-center gap-[3vh] items-center button">
        <p className="text-6xl text-center font-black text-[#424347]">HOW TO PLAY?</p>

        <p className="text-[#696a70]  px-[5vw] text-center">
        Jenga is a classic skill-based board game where players take turns removing wooden blocks from a stacked tower and placing them on top. The objective is to keep the tower standing while making it increasingly unstable, requiring careful hand-eye coordination and strategic thinking.

The game starts with 54 wooden blocks stacked in layers of three, alternating directions. On a player's turn, they must carefully remove a single block from anywhere below the highest complete layer and place it on top of the tower. Players can only use one hand at a time and must be cautious not to cause the tower to collapse.

As the game progresses, the tower becomes more unstable, making each move riskier. If a player cannot find a stable block to remove or places a block in a way that makes the tower fall, they lose the game. The last player to successfully place a block before the tower collapses is the winner.

Jenga is a game of patience, precision, and strategy. Controlling the balance of the tower and predicting the weakest points can help players outlast their opponents.
        </p>

        <button onClick={handleOpenJengaPage} className="px-[2vw] py-[1vh] text-xl rounded-2xl bg-[#696a70]">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Genga;
