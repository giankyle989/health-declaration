import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const HealthList = () => {
  const [healths, setHealths] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/health/")
      .then((res) => setHealths(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/health/${id}`)
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
        <div className="w-screen pt-10 mx-4">
          <table className="w-full overflow-x-hidden text-xs text-left mx-auto">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Temperature</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {healths.map((health) => (
                <tr key={health._id}>
                  <td className="px-4 py-6">{health.fullname}</td>
                  <td className="px-4 py-6">{health.temperature}</td>
                  <td className="px-4 py-6">{health.email}</td>
                  <td className="px-4 py-6">{health.phonenumber}</td>
                  <td className="flex flex-col">
                    <Link to={`/edit/${health._id}`} className="bg-green-300">Edit</Link>
                    <a
                      className="bg-red-300"
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
