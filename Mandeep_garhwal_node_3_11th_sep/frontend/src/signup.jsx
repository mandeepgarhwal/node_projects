import React , {useState} from 'react'
import Cookies from "js-cookie"
import axios from "axios"
import loginbg from "../src/assets/loginbg.jpg"
import { useNavigate } from 'react-router-dom'
import thumbnail from "../src/assets/logo.webp"
const uuid = require("uuid").v4
export default function Signup() {
  const [newname, setnewname] = useState()
  const [newpassword, setnewpassword] = useState()
  const [newnumber, setnewnumber] = useState()
  const navigate = useNavigate()
  const adduser = () => {
    console.log(
      {
        name: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value.trim(),
        mobile: document.getElementById("number").value.trim(),
        usertype: document.getElementById("role").value.trim(),
        email: document.getElementById("email").value.trim(),
        userID : uuid()
      }
    )
    if (document.getElementById("username").value.trim() === "" || document.getElementById("password").value.trim() === "" || document.getElementById("number").value.trim() === "" || document.getElementById("email").value.trim() === "" || document.getElementById("role").value.trim() === "" ) {
      alert("You can not leave any field blank.")

    } else {
      axios.post("http://localhost:5000/users",
        {
          name: document.getElementById("username").value.trim(),
          password: document.getElementById("password").value.trim(),
          mobile: document.getElementById("number").value.trim(),
          usertype: document.getElementById("role").value.trim(),
          email: document.getElementById("email").value.trim(),
          userID : uuid()
        })
        .then((response) => {
          console.log(response)
          alert("New Data User added")
          document.getElementById("username").value = ""
          document.getElementById("password").value = ""
          document.getElementById("number").value = ""
          document.getElementById("role").value = ""
          document.getElementById("email").value = ""
          navigate("/login")
        }
        ).catch((err) => {
          console.log(err)
          console.log(err.response.data.message)
          if (err.response.data.message === "phone number is already registered") {
            alert("This phone number is already registered")
            window.location.reload()
          } else if (err.response.data.message === "this name is already registered") {
            alert("This name is already registered")
            window.location.reload()
          }
          else {
            alert("User can not be added. Please try again")
            window.location.reload()
          }
        })
    }
  }
  return (
    <div className="min-h-screen pt-5" style={{ backgroundImage: `url(${loginbg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
    <h1 className=' text-3xl text-white font-extrabold flex flex-row justify-center'>Sign Up</h1>
    <div className='flex flex-row justify-center'>
      <div className=' w-6/12 rounded-2xl'>
        <div className='flex justify-center pr-2 '>
          <img src={thumbnail} alt="" className='rounded-full h-[250px]' />
        </div>
        <br />
        <br />
        <div className='flex flex-row'>
        <h1 className=' text-xl text-white w-6/12 mr-2'>Please Enter Your Name:</h1>
        <input type="text" placeholder='Please Enter Name of New User' id='username' className=' w-6/12 h-8 rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value); setnewname(e.target.value) }} />
        </div>
        <br />
        <br />
        <div className='flex flex-row'>
        <h1 className=' text-xl text-white w-6/12 mr-2 mt-2'>Please select Your Plan :</h1>
        <select name="level" id="role" className=' w-6/12 h-8 rounded-2xl pl-3 m-2' >
          <optgroup label="Please select the suitable option">
            <option value="" className='text-white'>Please select Your Plan</option>
            <option value="free">Free Experience</option>
            <option value="paid">Premium Experience</option>
          </optgroup>
        </select>
        </div>
        <br />
        <br />
        <div className='flex flex-row'>
        <h1 className=' text-xl text-white w-6/12 mr-2'>Please Enter New Password:</h1>
        <input type="text" placeholder='Please Enter Password of New User ' id='password' className=' w-6/12 h-8 rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value); setnewpassword(e.target.value) }} />
        </div>
        <br />
        <br />
        <div className='flex flex-row'>
        <h1 className=' text-xl text-white w-6/12 mr-2'>Please Enter your mobile number:</h1>
        <input type="number" placeholder='Please Enter Mobile Number of New User' id='number' className=' w-6/12 h-8 rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value); setnewnumber(e.target.value) }} />
        </div>
        <br />
        <br />
        <div className='flex flex-row'>
        <h1 className=' text-xl text-white w-6/12 mr-2'>Please Enter Your Email:</h1>
        <input type="email" placeholder='Please Enter Email of New User' id='email' className=' w-6/12 h-8 rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value); setnewnumber(e.target.value) }} />
        </div>
        <br />
        <br />
        <div className='flex flex-row justify-around'>
          <button className='btn btn-primary' onClick={() => adduser()}>Register</button>
        </div>
      </div>
    </div>
  </div>
  )
}
