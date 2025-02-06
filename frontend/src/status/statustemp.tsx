import React, { useState } from 'react';
import './Memory.css';
import { formatDistanceToNow } from 'date-fns';

const Temp = ({ complaints, onDelete, onUpdate }) => {
  const [isResolved, setIsResolved] = useState(complaints.resolved);

  // ✅ Delete Complaint
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://cauvery-hostel-website.onrender.com/api/complaints/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      onDelete(id); // Update state in parent component
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  // ✅ Toggle Complaint Status
  const handleToggle = async () => {
    const newResolvedStatus = !isResolved;

    try {
      const response = await fetch(`https://cauvery-hostel-website.onrender.com/api/complaints/${complaints._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resolved: newResolvedStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update complaint');
      }

      setIsResolved(newResolvedStatus); // Update UI instantly
      onUpdate(complaints._id, newResolvedStatus); // Update parent state
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  return (
    <div className='flex flex-row bg-[#1b1c21a5] button relative z-20 mb-[7vh] md:w-[50vw] w-[80vw] button px-[4vw] md:px-[2vw] py-[2vh] rounded-2xl justify-between items-center'>
      <div className='flex flex-col gap-[1vh] justify-center w-[75%] items-left'>
        <div className='flex md:flex-row flex-col gap-[20px] md:items-center align-middle'>
          {/* <h3 className='text-[#757578] text-3xl font-bold'>{complaints.Name}</h3>
          <p className='text-[#616060] text-2xl font-bold'>{complaints.RollNO}</p> */}
        </div>

        {/* <p className='text-[#616060] text-2xl font-bold'>Room NO: {complaints.RoomNO}</p>
        <p className='text-[#616060] text-2xl font-bold'>Room NO: {complaints.ContactNo}</p> */}

        <p className='text-[#616060] w-[80vw] md:text-sm font-bold'>{complaints.Complaint}</p>
        <p className='text-[#898787] text-sm font-bold'>{formatDistanceToNow(new Date(complaints.createdAt), { addSuffix: true })}</p>

      







      </div>

      {/* ✅ Toggle Button */}
      <div className='flex flex-col w-[25%] justify-center items-center  gap-[5px]'>
{/* 
      <button onClick={() => handleDelete(complaints._id)}  className="tooltip">
  <span className="tooltiptext">delete</span>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
</svg>
</button> */}

      <p className='text-[#757373] text-center'>Pending | Resolved </p>
      <div className="toggle ">
    

      <input 
  type="checkbox" 
  id={`btn-${complaints._id}`} 
  checked={isResolved} 
  onChange={handleToggle} 
/>
<label htmlFor={`btn-${complaints._id}`}>

          <span className="thumb"></span>
        </label>
        <div className="light"></div>
      </div> 

      </div>
    </div>
  );
};

export default Temp;
