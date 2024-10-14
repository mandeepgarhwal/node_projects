import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Oldest from "./oldest"
import Latest from './latest'
import Liked from './liked'
import Disliked from './disliked'
import axios from 'axios'

export default function Classifiedposts() {
    const navigate = useNavigate()
    // navigate('/classifiedposts/latest')
//     function addrecord() {
//         document.getElementById("newpostform").style.display = ""
//         document.getElementById("newpostbutton").style.display = "none"
// }



  return (
        <>
        {/* <button className='btn btn-primary' id = "newpostbutton"style={{fontSize : "20px"}} onClick={addrecord}>Add new post</button> */}
        
        <ul className="nav justify-content-center">
  <li className="nav-item">

    <Link className="nav-link active" aria-current="page" to="latest">Latest</Link>
    </li>
  <li className="nav-item">

    <Link className="nav-link" to="oldest">Oldest</Link>
    </li>
  <li className="nav-item">
    <Link className="nav-link " to="liked">Liked</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link " aria-disabled="true" to = "disliked">Disliked</Link>
  </li>
</ul>
<Routes>
     
     <Route path="latest"  element = {<Latest/>}/>
     <Route path="oldest" element = {<Oldest/>}/>
     <Route path="liked" element = {<Liked/>}/>
     <Route path = "disliked"  element = {<Disliked/>}/>
  
   </Routes>  
        </>
  )
}
