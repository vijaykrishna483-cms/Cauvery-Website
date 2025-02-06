import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const userEmail = sessionStorage.getItem("userEmail");
// Define Slot Type
interface Slot {
  gameName: string;
  starttime: string;
  endtime: string;
}



const Risk: React.FC = () => {
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
  const handleBook = async () => {
    if (!selectedSlot || isAvailable !== true) return;
  
    try {
      const response = await fetch("http://localhost:4000/api/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          starttime,
          endtime,
          email: userEmail,
          gameName: 'Risk',  // Make sure 'Risk' is a valid value in your enum
        }),
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        Swal.fire("Error", json.message || "Something went wrong!", "error");
        console.error("Booking failed:", json.message);
        return;
      }
  
      Swal.fire("Success", "Slot booked successfully!", "success");
  
      // Update UI after booking
      setSlots([...slots, { starttime, endtime, gameName: "Risk" }]);
      setIsAvailable(null); // Reset availability state
    } catch (error) {
      console.error("Booking error:", error);
      Swal.fire("Error", "Booking failed. Please try again.", "error");
    }
  };
  

  return (
    <div className="w-[100vw] md:pt-[] pt-[6vh] md:h-[100vh] md:flex-row flex-col flex">
    {/* Left Section */}

    
    <div className="md:w-[60vw]  px-[2vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="px-[3vw] rounded-2xl flex flex-col md:flex-row justify-center items-center">
        <img src="monopoly.jpg" className="md:w-[20vw] md:h-[20vw] rounded-2xl" />
        <div className="flex flex-col justify-center items-center">
          <p className="md:text-6xl text-5xl font-black text-[#424347]">RISK</p>
            <p className="text-[#696a70] px-[5vw] text-center">
              Jenga is a game where players remove and restack blocks from a
              tower without causing it to collapse. The structure becomes more
              unstable with each turn, and the player who makes it fall loses.
            </p>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="flex flex-col mt-[5vh] gap-[2vh] justify-center items-center">
          <p className="text-[#696a70] md:text-3xl">Choose the Slot You Want to Play:</p>

          <select
            className="w-full rounded-xl px-3 h-10 bg-[#c0bebe3f] p-2 mt-3"
            onChange={handleSlotChange}
            value={selectedSlot}
          >
            <option value="">Select a slot</option>
            {Array.from({ length: 12 }, (_, i) => {
              const start = 8 + i * 2;
              const end = start + 2;
              return (
                <option key={i} value={`${start}:00 - ${end}:00`}>
                  {`${start}:00 - ${end}:00`}
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
      <div className="md:w-[40vw] md:mt-[0vh] mt-[45vh] relative h-[100vh] flex flex-col justify-center gap-[3vh] items-center md:button">
        <p className="text-6xl text-center font-black text-[#424347]">HOW TO PLAY?</p>

        <p className="text-[#696a70] px-[5vw] text-center">
          Genga, inspired by the classic game of Jenga, is a game of precision
          and strategy where players take turns removing blocks from a carefully
          constructed tower and then placing them on the top. The game begins
          with a tower built from layers of blocks—each layer typically
          consisting of three blocks placed side by side, with each successive
          layer rotated 90 degrees rom layers of blocks—each layer typically
          consisting of three blocks placed side by side, with each successive
          layer rotated 90 degrees relative to the one below it. The challenge
          starts as soon as the tower is complete and players begin their turns.
          layer typically
          consisting of three blocks placed side by side, with each successive
          layer rotated 90 degrees relative to the one below irelative to the one below it. The challenge
          starts as soon as the tower is complete and players begin their turns.
          layer typically
          consisting of three blocks placed side by side, with each successive
          layer rotated 90 degrees relative to the one below it. The challenge
          starts as soon as the tower is complete and players begin their turns.
          layer typically
          consisting of three blocks placed side by side, with each successive
          layer rotated 90 degrees relative to the one below it. The challenge
          starts as soon as the tower is complete and players begin their turns.

        </p>

        <button className="px-[2vw] py-[1vh] text-xl rounded-2xl bg-[#696a70]">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Risk;
