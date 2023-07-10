import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const HealthList = () => {
  const [healths, setHealths] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/health/')
          .then((res => setHealths(res.data)))
          .catch((err) => console.log(err));
        }, []);
  return (
    <>
      <Navbar/>
      <div>Health List</div>
      <div>
        <table>
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
              <td>{health.fullname}</td>
              <td>{health.temperature}</td>
              <td>{health.email}</td>
              <td>{health.phonenumber}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    
    </>
  )
}

export default HealthList