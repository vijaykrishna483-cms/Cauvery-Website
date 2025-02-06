import React, { useEffect, useState } from 'react';
import Admincomp from './Admincomp';
import Bg from '../Background/Bg';
import './Home.css'
const Admin = () => {


  const handleUpdate = (id, resolvedStatus) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint._id === id ? { ...complaint, resolved: resolvedStatus } : complaint
      )
    );
  };
  


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
    <div className='overflow-hidden relative  z-10 .bg-container'>
        <Bg/>
  <h1 className='text-[5vw] font-black text-[#ffffff2c] pt-[10vh] flex justify-center items '>COMPLAINTS</h1>
        <div className='flex  flex-col  justify-center   items-center rounded-xl'>
      {complaints && complaints.length > 0 ? (
        complaints.map((complaint) => (
          <Admincomp key={complaint._id} complaints={complaint} onDelete={handleDeleteFromState} onUpdate={handleUpdate}/>
        ))
      ) : (
        <p>No complaints found</p>
      )}

</div>
    </div>
  );
};

export default Admin;
