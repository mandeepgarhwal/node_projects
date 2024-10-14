import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import thumbnail from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate()
    const signin = () => {
        if (document.getElementById("name").value.trim() === "" || document.getElementById("password").value.trim() === "") {
            alert("You can not leave any field blank.")
        } else {
            axios.put("http://localhost:5000/users/search", { name: document.getElementById("name").value })
                .then((response) => {
                    console.log(response.data.details)
                    if (response.data.details.length === 0) {
                        alert("no such user exists")
                    } else {
                        console.log(response.data.details.length)
                        if (response.data.details[0].password === document.getElementById("password").value ) {
                            Cookies.set("name", response.data.details[0].name)
                            Cookies.set("userID", response.data.details[0].userID)
                            Cookies.set ("authoredposts", response.data.details[0].authoredposts)
                            Cookies.set ("authoredcomments", response.data.details[0].authoredcomments)
                            Cookies.set ("likedposts", response.data.details[0].likedposts)
                            Cookies.set ("likedcomments", response.data.details[0].likedcomments)
                            Cookies.set ("dislikedcomments", response.data.details[0].dislikedcomments)
                            console.log(response.data.details[0].likedposts)
                            Cookies.set ("dislikedposts", response.data.details[0].dislikedposts)
                            console.log(response.data.details[0].dislikedposts)
                            console.log(Cookies.get("dislikedposts"))
                            console.log(Cookies.get("userID"))
                            navigate("/dashboard")
                        } else {
                            alert("Please enter the correct password")
                        }
                    }
                }).catch((err) => console.log(err))
        }
    }
    const signup = () => {
        navigate("/signup")
    }
    return (<>
    <div className='flex flex-row justify-center'>
        <div className=' w-3/12 rounded-2xl'>
            <div className='flex justify-center pr-2 '>
                <img src={thumbnail} alt="" className='rounded-full' />
            </div>
            <br />
            <br />
            <input type="text" autoComplete='off' placeholder='Please Enter Your name' id='name' className=' w-full h-8 rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value) }} />
            <br />
            <br />
            <input type="text" autoComplete='off' placeholder='Please Enter Your Password' id='password' className=' w-full h-8 rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value) }} />
            <br />
            <br />
            <div className='flex flex-row justify-content-around '>
                <button className='btn btn-primary' onClick={signin}>Log In</button>
                <button className='btn btn-primary' onClick={signup}>Signup</button>
            </div>
        </div>
        </div>

    </>)
}
