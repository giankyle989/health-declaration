import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Edit = () => {
  const { id } = useParams()
  const [fullname, setFullName] = useState('')
  const [temperature, setTemperature] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:5000/health/${id}`)
          .then((res) => {
            setFullName(res.data.fullname)
            setTemperature(res.data.temperature)
            setEmail(res.data.email)
            setPhoneNumber(res.data.phonenumber)
          })
          .catch((err)  => console.log(err))
  }, [id])
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const editHealth = {
      fullname,
      temperature,
      email,
      phonenumber
    }

    axios.put(`http://localhost:5000/health/${id}`, editHealth)
          .then((res) => {
            console.log(res.data);
            window.location = "/"
          })
          .catch(err => console.log("Error: " + err))

  }
  return (
    <>
    <Navbar/>
    <h1>Edit Information</h1>
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

export default Edit