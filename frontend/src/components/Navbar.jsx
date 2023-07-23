import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/logout", null);
  
      if (response.status === 200) {
        // Logout successful, clear user info from local storage and redirect to the login page
        localStorage.removeItem("token");
        navigate("/login"); // Assuming you're using Reach Router for navigation
      } else {
        // Handle server-side errors
        throw new Error(response.data.message);
      }
    } catch (error) {
      // Handle any network or other client-side errors
      console.error("Error during logout:", error.message);
    }
  };
  
  return (
    <>
      <div className="bg-gray-800 flex justify-between p-4 text-white">
        <h1 className="font-bold">Health Declaration</h1>
        <div>
          <Link to="/" className="hover:font-bold pr-2">Health List</Link>
          <Link to="/create" className="hover:font-bold">
            Add New
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
