// import Dairycounter from "./mycomponent/dairycounter";
// import Dairycounter2 from "./mycomponent/dairycounter2";
// import CakeShop from "./mycomponent/cakeshopwithcontext";
// import Quecounter from "./mycomponent/quecounter";
import { Home } from "./mycomponent/Pages/home";
import { About } from "./mycomponent/Pages/about";
import { Menu } from "./mycomponent/menu";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Axiosapidemo from "./mycomponent/Pages/posts";
import Pagenotfound from "./mycomponent/Pages/pagenotfound";
import Postdetails from "./mycomponent/Pages/postdetails";
import Classifiedposts from "./mycomponent/Pages/classifiedposts";
import Newpost from "./mycomponent/Pages/newpost";
import Login from "./mycomponent/Pages/login";
import Register from "./mycomponent/Pages/register";
// import {BrowserRouter} from 'react-router-dom'



function App() {

  return (
    <div className= "container">
      {/* <Dairycounter/>
      <br />
      <br/>
      <hr/>
      <br />
      <br/>
      <Dairycounter2/>
      <br />
      <br/>
      <hr/>
      <br />
      <br/>
      <Quecounter/> */}
      {/* <CakeShop/> */}
      <BrowserRouter>
      <Menu/>
      <Routes>
      <Route path="/" element = {<Navigate to = "/home"/>}/>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/posts" element = {<Axiosapidemo/>}/>
        <Route path = "/posts/:ID"  element = {<Postdetails/>}/>
        <Route path="*" element = {<Pagenotfound/>}/>
        <Route path="/classifiedposts/*" element = {<Classifiedposts/>}/>
        <Route path="/classifiedposts" element = {<Navigate to = "/classifiedposts/latest"/> }/>
        <Route path="/newpost" element = {<Newpost/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
