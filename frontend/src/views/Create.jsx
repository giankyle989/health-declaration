import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'


const Create = () => {
  const [fullname, setFullName] = useState('')
  const [temperature, setTemperature] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
      //Get token object
      const tokenObject = JSON.parse(localStorage.getItem('token'));

      //Get token string only
      const token = tokenObject.token;
    
      const headerToken =  {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const health = {
      fullname,
      temperature,
      email,
      phonenumber,
    };
  
    axios
      .post("http://localhost:5000/health/add", health, headerToken)
      .then((res) => {
        console.log(res.data);
        setFullName("");
        setTemperature("");
        setEmail("");
        setPhoneNumber("");
        window.location = "/";
      })
      .catch((err) => console.log("Error: " + err));
  };
  return (
    <>
    <Navbar/>
      <h1>Create Information</h1>
      <form className='m-4' onSubmit={handleSubmit}>
        <input className='border-2 border-black' type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder='Full Name'/>
        <input className='border-2 border-black' type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} step="0.1"  placeholder='Temperature'/>
        <input className='border-2 border-black' type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email'/>
        <input className='border-2 border-black' type="tel" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}  placeholder='Phone Number'/>
        <button type='submit' className='ml-4 border-2 border-blue-600'>Submit</button>
      </form>

    </>
  )
}

export default Create