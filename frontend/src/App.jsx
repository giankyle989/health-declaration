import { Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import Navbar from "./components/Navbar"
import Create from "./views/Create"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<Create/>} />

      </Routes>
    </>
  )
}

export default App
