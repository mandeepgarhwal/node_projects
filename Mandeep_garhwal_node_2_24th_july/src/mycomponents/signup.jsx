import React, { useState, useEffect } from 'react'
import axios from 'axios'
import thumbnail from "../assets/logo.png"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
const uuid = require("uuid").v4
export default function Signup() {
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("name") !== undefined) {
            navigate("/dashboard");
        }
    }, [])
    const adduser = () => {
        if (document.getElementById("username").value.trim() === "" || document.getElementById("password").value.trim() === "" ) {
            alert("You can not leave any field blank.")
        } else {
            var uid = uuid()
            axios.post("http://localhost:5000/users",
                {
                    name: document.getElementById("username").value.trim(),
                    password: document.getElementById("password").value.trim(),
                    userID: uid
                })
                .then((response) => {
                    console.log(response)
                    alert(`You are registered with ID: ${uid}`)
                    Cookies.set("name", document.getElementById("username").value.trim())
                    document.getElementById("username").value = ""
                    document.getElementById("password").value = ""
                    navigate("/dashboard");
                }
                ).catch((err) => {
                    console.log(err)
                    console.log(err.response.data.message)
                    if (err.response.data.message === "Name has to be unique!!!") {
                        alert("Name has to be unique!!!")
                        window.location.reload()
                    } else {
                        alert("User can not be added. Please try again")
                        window.location.reload()
                    }
                })
        }
    }
    return (<>
        <div className='flex justify-center pr-2 '>
            <img src={thumbnail} alt="" className='rounded-full' />
        </div>
        <div className='flex flex-row justify-center'>
            <div className=' w-fit rounded-2xl'>
                <h1 className=' text-lg font-bold'>New User Registration Form</h1>
                <br />
                <br />
                <div className='flex flex-col'>
                    <h1 className=' text-xl w-full mr-2'>Please Enter Your name :</h1>
                    <input type="text" placeholder='Please Enter Your Name' id='username' className=' w-full h-8 rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value) }} />
                </div>
                <br />
                <br />
                <div className='flex flex-col'>
                    <h1 className=' text-xl w-full mr-2'>Please Enter Your Password :</h1>
                    <input type="text" placeholder='Please Enter Your Password' id='password' className=' w-full h-8 rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value) }} />
                </div>
                <br />
                <br />
                <button className='btn btn-primary' onClick={adduser}>Register</button>
            </div>
        </div>

    </>
    )
}

