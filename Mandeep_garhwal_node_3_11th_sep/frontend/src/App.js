import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./home";
import Signup from "./signup";
import Login from "./login";
import Addmovie from "./addmovie";
import Navbar from "./navbar";
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/movieentry" element={<Addmovie />}></Route>
    </Routes>
    </BrowserRouter>

  </>
  );
}

export default App;
