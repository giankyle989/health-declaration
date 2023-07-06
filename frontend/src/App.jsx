import { Route, Routes } from "react-router-dom"
import Home from "./views/HealthList"
import Navbar from "./components/Navbar"
import Create from "./views/Create"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>} />

      </Routes>
    </>
  )
}

export default App
