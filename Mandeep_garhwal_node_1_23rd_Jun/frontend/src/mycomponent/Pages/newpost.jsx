
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Newpost() {
    let navigate = useNavigate()
    function addrecorddone(e){
        e.preventDefault()
        // console.log(typeof(data))
        // let newid = document.getElementById("newId").value
        let newtitle = document.getElementById("newtitle").value
        let newbody = document.getElementById("newbody").value
     
        let newrecord = {
       
          "id": "",
          "title": newtitle,
          "body": newbody,
          "oldest": false,
          "newest" : true,
          "liked"  : false,
          "disliked" : false,
      }
      console.log (newrecord)

      axios.post("http://localhost:3003/app/notes", newrecord)
      .then((res) => alert("New record added"))
      .catch(err => console.log(err))
      navigate('/classifiedposts/latest')
        }

  return (
    <>
    <h1 className='text-center text-primary'>Create New Post</h1>

    <form id = "newpostform" >
          {/* <h2> Id</h2>
          <br />
          <input type="text" id = "newId" readOnly = {true} defaultValue = { }/>
          <br /> */}
          <br />
          <h2> Title</h2>
          <br />
          <input type="text" id ="newtitle"  style={{width : "60vw"}} />
          <br />
          <br />
          <h2> Body</h2>
          <br />
          <input type="text" id ='newbody' style={{width : "60vw"}} />
          <br />
          <br />
          <button className='btn btn-info'style={{fontSize : "20px"}} onClick={(e) => addrecorddone(e)}>Create</button>
        </form>
    </>
  )
}
