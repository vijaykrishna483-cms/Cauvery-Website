import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContent } from "../Context/Appcontext";
import { useContext } from "react";
import axios from "axios";
// Define Slot Type
interface Slot {
  gameName: string;
  starttime: string;
  endtime: string;
}



const Risk: React.FC = () => {
const {backendUrl,isLoggedin,userData}=useContext(AppContent)



      
const navigate=useNavigate()
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
        const response = await fetch("http://localhost:4000/api/slots");
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
  const handleSearch = () => {
// console.log(userData.email)
    if (!selectedSlot) {
      Swal.fire("Error", "Please select a slot first!", "error");
      return;
    }
  
    // Check if slot is booked for the selected game (including Risk)
    const isBooked = slots.some(
      (slot) =>
        slot.gameName === 'Risk' && // Check if the slot's game name matches the selected game
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
      gameName:'Risk'
      }); 

        // const response = await fetch("http://localhost:4000/api/slots", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ starttime, endtime ,gameName:'Risk' }),
        // });
  
        // const json = await response.json();
  
        if (!data.booked) {
          Swal.fire("Error", "Something went wrong!", "error");
          return;
        }
  if(data.booked){
    Swal.fire("Success", "Slot booked successfully!", "success");
        // Update UI after booking
        setSlots([...slots, { starttime, endtime,gameName:"Risk" }]);
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


  return (
    <div className="w-[100vw] overflow-hidden md:pt-[] pt-[6vh] md:h-[100vh] md:flex-row flex-col flex">
    {/* Left Section */}

    
    <div className="md:w-[60vw]  px-[2vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="px-[3vw] rounded-2xl flex flex-col md:flex-row justify-center items-center">
        <img src="monopoly.jpg" className="md:w-[20vw] md:h-[20vw] rounded-2xl" />
        <div className="flex flex-col justify-center items-center">
          <p className="md:text-6xl text-5xl font-black text-[#424347]">RISK</p>
            <p className="text-[#696a70] px-[5vw] text-center">
            Risk is a strategy board game where players deploy armies, conquer territories, and battle opponents to achieve world domination. Players take turns reinforcing troops, attacking with dice rolls, and fortifying positions until one player wins.
            </p>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="flex flex-col mt-[5vh] gap-[2vh] justify-center items-center">
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
      <div className="md:w-[40vw] md:mt-[0vh] mt-[45vh] relative h-[100vh] flex flex-col justify-center gap-[3vh] items-center button">
        <p className="text-6xl text-center font-black text-[#424347]">HOW TO PLAY?</p>

        <p className="text-[#696a70] px-[5vw] text-center">
        Risk is a strategic board game where players compete to conquer territories and eliminate opponents to achieve world domination. The game is played on a world map divided into territories, which are grouped into continents. Players deploy armies, attack opponents, and fortify their positions to expand their control.

At the start, players claim territories and place their armies. Each turn consists of three phases: reinforcement, where players receive additional armies based on controlled territories and continents; attack, where players can battle opponents using dice rolls; and fortification, where armies can be moved to strengthen key positions.

Battles are determined by rolling dice, with attackers rolling up to three dice and defenders rolling up to two. The highest dice results are compared, and the player with the lower roll loses armies. Players can continue attacking until they decide to stop or run out of armies.

Players earn territory cards by capturing at least one new territory per turn. These can be traded for extra reinforcements. The game continues until one player achieves the set victory conditions, which may vary based on the chosen game mode.

Risk is a game of strategy, negotiation, and calculated aggression, where players must balance expansion, defense, and diplomacy to emerge victorious.
        </p>

        <button className="px-[2vw] py-[1vh] text-xl rounded-2xl bg-[#696a70]">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Risk;
