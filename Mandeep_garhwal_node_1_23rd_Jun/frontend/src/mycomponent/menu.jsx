import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
// import { Routes, Route } from 'react-router-dom'
// import Oldest from "./Pages/oldest"

export const  Menu = () =>{
    const params = useParams()
    const [currentrole, setcurrentrole] = useState("")
    // let role_user = " "
    useEffect(() =>{
        setcurrentrole(sessionStorage.getItem("role"))
        // role_user = sessionStorage.getItem("role"),
        // setcurrentrole(role_user)
    }, [params]
    )
    function logout(){
        sessionStorage.removeItem('role')
        window.location.assign('/home')
    }
     return(   
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" style={{color : "white", backgroundColor : "green", borderRadius : "30px", padding: "10px"}} to="/">Social App</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0" /> */}
            { currentrole? (
                currentrole == "author" ?(
                 <>
                <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                <Link className="nav-link active" aria-current="page" to="/home">
                  Home
                  </Link>
              </li>
              <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                <Link className="nav-link" to="/about">
                  About
                  </Link>
              </li>
              <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                <Link className="nav-link" to="/posts">
                   All posts
                  </Link>
              </li>
              <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                <Link className="nav-link" to="/classifiedposts">
                  Classified posts
                  </Link>
              </li>
              <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                <Link className="nav-link" to="/newpost">
                  New post
                  </Link>
              </li>
              <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                    <button className="btn btn-primary" onClick={logout}> Log Out</button>
              </li>
              </>   ):(
                 <>
                 <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                 <Link className="nav-link active" aria-current="page" to="/home">
                   Home
                   </Link>
               </li>
               <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                 <Link className="nav-link" to="/about">
                   About
                   </Link>
               </li>
               <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                 <Link className="nav-link" to="/posts">
                    All posts
                   </Link>
               </li>
               <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                 <Link className="nav-link" to="/classifiedposts">
                   Classified posts
                   </Link>
               </li>
               <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
                    <button className="btn btn-primary" onClick={logout}> Log Out</button>
              </li>
               </>
              )
            ):(
                <>
                <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
          <Link className="nav-link" to="/login">
            Login
            </Link>
        </li>
        <li className="nav-item" style={{listStyle : "none", fontSize: "20px", paddingLeft : "5px", paddingRight : "5px", paddingTop : "3px"}}>
          <Link className="nav-link" to="/register">
            Register
            </Link>
        </li>
                </>
            )
        
        
        }
    </div>
  </div>
</nav>
{/* <Routes>
     
     <Route path="latest" />
     <Route path="oldest" element = {<Oldest/>}/>
     <Route path="liked" />
     <Route path = "disliked"  />
  
   </Routes>   */}
        </>
     ) 
}