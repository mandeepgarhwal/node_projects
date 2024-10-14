import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./mycomponents/signup";
import Dashboard from "./mycomponents/dashboard";
import Home from "./mycomponents/home";
import Menu from "./mycomponents/navbar";
function App() {
  return (<>
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
