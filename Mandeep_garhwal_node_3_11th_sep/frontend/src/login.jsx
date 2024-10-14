import React from 'react'
import loginbg from "../src/assets/loginbg.jpg"
import { useNavigate } from 'react-router-dom'
import thumbnail from "../src/assets/logo.webp"
import Cookies from "js-cookie"
import axios from "axios"
export default function Login() {
  const navigate = useNavigate()
  const signin = () => {
    // console.log(document.getElementById("number").text)
    // console.log(document.getElementById("number").innerText)
    // console.log(document.getElementById("number").innerHTML)
    // console.log(document.getElementById("number").value)
    if (document.getElementById("number").value.trim() === "" || document.getElementById("password").value.trim() === "") {
      alert("You can not leave any field blank.")
      //   toast('You can not leave any field blank.', {
      //     position: "top-center",
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",

      // })
    } else {
      axios.put("http://localhost:5000/users/search", { mobile: document.getElementById("number").value })
        .then((response) => {
          console.log(response.data.details)
          if (response.data.details.length == 0) {
            alert("no such user exists")
          } else {
            console.log(response.data.details[0])
            console.log(response.data.details[0].likedgenre)
            if (response.data.details[0].password === document.getElementById("password").value) {
              Cookies.set("user", response.data.details[0].name)
              Cookies.set("usertype", response.data.details[0].usertype)
              Cookies.set("mobile", response.data.details[0].mobile)
              Cookies.set("userID", response.data.details[0].userID)
              Cookies.set("likedmovies", response.data.details[0].likedmovies)
              Cookies.set("likedgenre", response.data.details[0].likedgenre)
              console.log(Cookies.get("user"))

              window.location.assign("/home")
            } else {
              alert("Please enter the correct password")
            }
          }
        }).catch((err) => console.log(err))
    }
  }
  return (<>
    <div className="min-h-screen pt-5" style={{ backgroundImage: `url(${loginbg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <h1 className=' text-3xl text-white font-extrabold flex flex-row justify-center'>Log In</h1>
      <div className='flex flex-row justify-center'>
        <div className=' w-3/12 rounded-2xl'>
          <div className='flex justify-center pr-2 '>
            <img src={thumbnail} alt="" className='rounded-full' />
          </div>
          <br />
          <br />
          <input type="text" autoComplete='off' placeholder='Please Enter Your mobile number' id='number' className=' w-full h-8 rounded-2xl pl-3' />
          <br />
          <br />
          <input type="text" autoComplete='off' placeholder='Please Enter Your Password' id='password' className=' w-full h-8 rounded-2xl pl-3' />
          <br />
          <br />
          <div className='flex flex-row justify-around'>
            <button className='btn btn-primary' onClick={() => signin()}>Log In</button>
            <button className='btn btn-primary' onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </>

  )
}
