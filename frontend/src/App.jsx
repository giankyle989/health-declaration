import { Route, Routes } from "react-router-dom";
import Home from "./views/HealthList";
import Navbar from "./components/Navbar";
import Create from "./views/Create";
import Edit from "./views/Edit";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/edit/:id`} element={<Edit/>}/>
          <Route path="/create" element={<Create />} />
        </Routes>
    </>
  );
}

export default App;
