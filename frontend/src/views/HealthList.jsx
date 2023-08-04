import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";


const HealthList = () => {
  const [healths, setHealths] = useState([]);
    //Get token object
    const tokenObject = JSON.parse(localStorage.getItem('token'));

    //Get token string only
    const token = tokenObject.token;
  
    const headerToken =  {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
  useEffect(() => {
    axios.get("http://localhost:5000/health", headerToken)
    .then((res) => {
      setHealths(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/health/${id}`, headerToken)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="overlap-x-hidden w-screen">
        <Navbar />
        <div>Health List</div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg break-all">
          <table className="overflow-x-hidden text-xs text-center mx-auto">
            <thead>
              <tr className="border border-black">
                <th className="border border-black">Full Name</th>
                <th className="border border-black">Temperature</th>
                <th className="border border-black">Email</th>
                <th className="border border-black">Phone Number</th>
                <th className="border border-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {healths.map((health) => (
                <tr className="border border-black" key={health._id}>
                  <td className="px-2 py-4 border border-slate-600">{health.fullname}</td>
                  <td className="px-2 py-4 border border-slate-600">{health.temperature}</td>
                  <td className="px-2 py-4 border border-slate-600">{health.email}</td>
                  <td className="px-2 py-4 border border-slate-600">{health.phonenumber}</td>
                  <td className="flex flex-col">
                    <Link to={`/edit/${health._id}`} className="bg-green-300 p-2">
                      Edit
                    </Link>
                    <a
                      className="bg-red-300 p-2"
                      href="#"
                      onClick={() => handleDelete(health._id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HealthList;
