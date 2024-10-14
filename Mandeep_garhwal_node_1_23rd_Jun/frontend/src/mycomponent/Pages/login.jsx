
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Login() {

    const [logindetails, setlogindetails] = useState({"userId": " ",
    "password": " "})
    const [users, setusers] = useState([])
    useEffect(() => {
        console.log("useEffect called")
  
  
          axios.get("http://localhost:3003/app/users")
          .then((res) => {setusers(res.data)

                console.log(res.data)

              
          })
          .catch((err) => console.log(err))
  
      }, [ ])
    function loginprocess(){
        
        console.log("login function called")
        console.log(logindetails)
        let finduser = users.find((u)=> u.userId == logindetails.userId)
        if (finduser)
            {
                if (finduser.password == logindetails.password)
                {
                    alert(`Welcome ${finduser.name}.`)
                    console.log("user exists")
                    sessionStorage.setItem("role", finduser.role)
                    window.location.assign("/home")
                }
                else{
                    alert("wrong password")
                }
            }
            else{
                alert("No user found. Please register yourself")
            }
            document.getElementById("staticEmail").value = ""
            document.getElementById("inputPassword").value = ""
        }

    
    function register(){
        window.location.assign("/register")
    }
    
    return (
        <>
            <h1 className='text-center text-primary'>Enter your details</h1>
            <div className='col-md-12'>
                <div className='col-md-6 offset-md-3'>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">User Id</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="email@example.com" onChange={(e) => (setlogindetails({...logindetails, userId : e.target.value}))}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label ">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" onChange={(e) => (setlogindetails({...logindetails, password : e.target.value}))} />
                        </div>
                    </div>
                    <button className='btn btn-success mx-3'onClick={loginprocess}>Log In</button>
                    <button className='btn btn-success mx-3'onClick= {register}>Register</button>

                </div>
            </div>
        </>
    )
}
