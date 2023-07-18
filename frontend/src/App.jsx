import { Route, Routes } from "react-router-dom";
import Home from "./views/HealthList";
import Navbar from "./components/Navbar";
import Create from "./views/Create";
import Edit from "./views/Edit";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path={`/edit/:id`} element={<Edit/>}/>
          <Route path="/create" element={<Create />} />
        </Routes>
    </>
  );
}

export default App;
