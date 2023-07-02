import React from "react";
import { Link } from "react-router-dom";
import Create from "../views/Create";

const Navbar = () => {
  return (
    <>
      <div className="bg-gray-800 flex justify-between p-4 text-white">
        <h1 className="font-bold">Health Declaration</h1>
        <div>
          <Link to="/" className="hover:font-bold pr-2">Home</Link>
          <Link to="/add" className="hover:font-bold">
            Add New
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
