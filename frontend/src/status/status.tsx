import React, { useEffect, useState } from 'react'
import Bg from '../Background/Bg';
import Admincomp from './statustemp';

const status = () => {
  interface Complaint {

    // name:
    _id: string;
    title: string;
    description: string;
    // Add other properties as needed
  }
  const handleDeleteFromState = (id) => {
    setComplaints(complaints.filter(complaint => complaint._id !== id));
  };
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('https://cauvery-hostel-website.onrender.com/api/complaints');
        console.log("Raw Response:", response); // Debugging

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const json = await response.json(); // Parse JSON
        console.log("API Response:", json); // Log JSON output

        setComplaints(json); // Update state with complaints
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className='overflow-hidden  .bg-container'>
       <div className='z-30 relative'><Bg/></div> 
  <h1 className='text-[5vw] font-black text-[#ffffff2c] pt-[10vh] flex justify-center items '>COMPLAINTS</h1>
        <div className='flex  flex-col  justify-center   items-center rounded-xl'>
      {complaints && complaints.length > 0 ? (
        complaints.map((complaint) => (
          <Admincomp key={complaint._id} complaints={complaint} onDelete={handleDeleteFromState} onUpdate={undefined}/>
        ))
      ) : (
        <p>No complaints found</p>
      )}

</div>
    </div>
  )
}

export default status
