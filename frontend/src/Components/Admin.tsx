import React, { useEffect, useState } from "react";
import Admincomp from "./Admincomp";
import Bg from "../Background/Bg";
import "./Home.css";

// Define the TypeScript interface for complaints
interface Complaint {
  _id: string;
  Name: string;
  RoomNO: number;
  RollNO: string;
  ContactNo: string;
  Complaint: string;
  resolved: boolean;
  createdAt: string;
}

const Admin = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  // Fetch complaints from API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          "https://cauvery-hostel-website.onrender.com/api/complaints"
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const json: Complaint[] = await response.json();
        console.log("API Response:", json);
        setComplaints(json);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Update resolved status in state
  const handleUpdate = (id: string, resolvedStatus: boolean) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint._id === id ? { ...complaint, resolved: resolvedStatus } : complaint
      )
    );
  };

  // Delete complaint from state
  const handleDeleteFromState = (id: string) => {
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint._id !== id)
    );
  };

  // Download complaints as CSV
  const downloadCSV = () => {
    if (complaints.length === 0) {
      alert("No complaints available to download.");
      return;
    }

    // Corrected headers based on Complaint model
    const headers = ["Name,RoomNO,RollNO,ContactNo,Complaint,Resolved,CreatedAt"];

    const csvRows = complaints.map((complaint) =>
      [
        complaint.Name,
        complaint.RoomNO,
        complaint.RollNO,
        complaint.ContactNo,
        `"${complaint.Complaint.replace(/"/g, '""')}"`, // Escape double quotes in text
        complaint.resolved ? "Yes" : "No",
        complaint.createdAt,
      ].join(",")
    );

    const csvData = [headers, ...csvRows].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "complaints.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Sort complaints so unresolved ones appear first
  const sortComplaints = () => {
    setComplaints((prev) =>
      [...prev].sort((a, b) => Number(a.resolved) - Number(b.resolved))
    );
  };

  return (
    <div className="overflow-hidden relative z-10 .bg-container">
      <Bg />
      <h1 className="text-[5vw] font-black text-[#ffffff2c] pt-[10vh] flex justify-center items">
        COMPLAINTS
      </h1>

      <div className="flex relative z-20 justify-center items-center gap-[2vw]">
        <button
          onClick={downloadCSV}
          className="px-[2vw] py-[2vh] cursor-pointer rounded-2xl button text-xl text-[#616060] mb-[2vh]"
        >
          Download CSV
        </button>

        <button
          onClick={sortComplaints}
          className="px-[2vw] py-[2vh] rounded-2xl button text-xl text-[#616060] mb-[2vh]"
        >
          Show Unsolved on Top
        </button>
      </div>

      <div className="flex flex-col justify-center items-center rounded-xl">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <Admincomp
              key={complaint._id}
              complaints={complaint}
              onDelete={handleDeleteFromState}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p>No complaints found</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
