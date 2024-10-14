
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    let navigate = useNavigate()
    function adduserdone(e){
        e.preventDefault()
        // console.log(typeof(data))
        // let newid = document.getElementById("newId").value
        let newuserid = document.getElementById("newuserid").value
        let newpassword = document.getElementById("newpassword").value
        let newname = document.getElementById("newname").value
     
        let newuser = {
          "userId": newuserid,
          "id": "",
          "role": "guest",
          "name": newname,
          "password": newpassword

      }
      console.log (newuser)

      axios.post("http://localhost:3003/app/users", newuser)
      .then((res) => alert("New user added"))
      .catch(err => console.log(err))
      navigate('/login')
        }

  return (
    <>
    <h1 className='text-center text-primary'>Create new account</h1>

    <form id = "newuserform" >
          {/* <h2> Id</h2>
          <br />
          <input type="text" id = "newId" readOnly = {true} defaultValue = { }/>
          <br /> */}
          <br />
          <h2> User Id</h2>
          <br />
          <input type="text" id ="newuserid"  style={{width : "60vw"}} />
          <br />
          <br />
          <h2> Password</h2>
          <br />
          <input type="text" id ='newpassword' style={{width : "60vw"}} />
          <br />
          <br />
          <h2> Name</h2>
          <br />
          <input type="text" id ='newname' style={{width : "60vw"}} />
          <br />
          <br />
          <button className='btn btn-info'style={{fontSize : "20px"}} onClick={(e) => adduserdone(e)}>Create</button>
        </form>
    </>
  )
}
