import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContent } from "../Context/Appcontext";
import axios from "axios";
// Define Slot Type
interface Slot {
  gameName: string;
  starttime: string;
  endtime: string;
}



const Othello: React.FC = () => {
const {backendUrl,isLoggedin}=useContext(AppContent)

  const userEmail = sessionStorage.getItem("userEmail");


    const handleOpenOhelloPage = () => {
        window.open('https://www.eothello.com/', '_blank');
      };

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
        const response = await fetch("https://cauvery-production.up.railway.app//api/slots");
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

    if (!selectedSlot) {
      Swal.fire("Error", "Please select a slot first!", "error");
      return;
    }
  
    // Check if slot is booked for the selected game (including Risk)
    const isBooked = slots.some(
      (slot) =>
        slot.gameName === 'Othello' && // Check if the slot's game name matches the selected game
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
        gameName:'Othello'
        }); 
  
          // const response = await fetch("https://cauvery-production.up.railway.app//api/slots", {
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
          setSlots([...slots, { starttime, endtime,gameName:"Othello" }]);
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
            <p className="md:text-6xl text-5xl font-black text-[#424347]">OTHELLO</p>
            <p className="text-[#696a70] px-[5vw] text-center">
            Othello is a two-player strategy game where players take turns placing discs on an 8x8 grid, flipping their opponent’s discs by sandwiching them. The game ends when no moves are possible, and the player with the most discs of their color wins.
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
        Othello, also known as Reversi, is a strategy board game where two players compete to have the majority of their color discs on the board at the end of the game. The game is played on an 8x8 grid, and players take turns placing discs of their color (either black or white) on the board. The goal is to flip your opponent's discs by sandwiching them between your own discs, either horizontally, vertically, or diagonally.

The game starts with four discs placed in the center, two black and two white, arranged diagonally. On a player's turn, they must place a disc of their color on the board in such a way that it traps one or more of the opponent's discs between the newly placed disc and another disc of their color. The trapped discs are flipped to the player's color.

Players must make a valid move on each turn, and if no valid move is possible, the player must pass. The game continues until the board is full, or both players can no longer make valid moves. The player with the most discs of their color on the board at the end of the game wins.

Othello is a game of strategy, where anticipating your opponent's moves and controlling the edges of the board is key to success.
        </p>

        <button onClick={handleOpenOhelloPage} className="px-[2vw] py-[1vh] text-xl rounded-2xl bg-[#696a70]">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Othello;
