import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from "axios"
import like from "../assets/like.png"
import dislike from "../assets/dislike.png"
import Timeline from './timeline'
const uuid = require("uuid").v4
export default function Dashboard() {
  const [yourposts, setyourposts] = useState([])
  const [curposts, setcurposts] = useState([])
  useEffect(() => {
    // yourposts.splice(0, yourposts.length)
    // setyourposts([...yourposts])
    console.log(Cookies.get("authoredposts").split("/"))
    console.log(Cookies.get("likedcomments"))
    console.log(Cookies.get("dislikedcomments"))
    for (var x in Cookies.get("authoredposts").split("/")) {
      console.log(Cookies.get("authoredposts").split("/")[x].trim())
      if (Cookies.get("authoredposts").split("/")[x].trim() !== "") {
        axios.get(`http://localhost:5000/posts/${Cookies.get("authoredposts").split("/")[x].trim()}`)
          .then((res) => {
            console.log(res);
            yourposts.push(<>
              <div className='my-4 w-full flex flex-col rounded-2xl border-solid border-4 border-orange-600'>
                <h1 className='my-2'>Title: {res.data.details[0].title}</h1>
                <h1 className='my-2'>Body: {res.data.details[0].body}</h1>
                <div className='flex flex-row px-4 justify-end'>
                  <span className='flex flex-row mx-2'>
                    <h1 className=' align-middle text-xl font-bold mr-1'>{res.data.details[0].likes}</h1>
                    <img className = " h-6 w-6" src={like} alt="" />
                  </span>
                  <span className='flex flex-row mx-2'>
                    <h1 className=' align-middle text-xl font-bold mr-1'>{res.data.details[0].dislikes}</h1>
                    <img className = " h-6 w-6 mt-2" src={dislike} alt="" />
                  </span>
                  <span className='flex flex-row mx-2'>
                    <button id = {res.data.details[0].postID} className=' bg-orange-600 text-white text-xl px-2' onClick={(e) => deletepost(e.target.id)}>Delete</button>
                  </span>
                </div>
              </div></>)
          setyourposts([...yourposts])
          })
          .catch((err) => console.log(err))
        }
      }
    console.log(yourposts)
  }, [])
  const deletepost = (x) => {
    console.log(x)
    console.log("delete post")
    axios.delete(`http://localhost:5000/posts/${x}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    var currauthoredposts = Cookies.get("authoredposts").split("/")
    for (var r in currauthoredposts){
      if (currauthoredposts[r] === x){
        currauthoredposts.splice(r,1)
      }
    }
    Cookies.set("authoredposts", currauthoredposts.join("/"))
    axios.put(`http://localhost:5000/posts/${Cookies.get("userID")}`, {authoredposts : currauthoredposts.join("/")})
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }
  const addpost = () => {
    var qid = uuid()
    console.log(document.getElementById("title").value)
    console.log(document.getElementById("body").value)
    console.log(Cookies.get("name"))
    console.log(Cookies.get("userID"))
    var newpost = {
      title: document.getElementById("title").value,
      body: document.getElementById("body").value,
      postID: qid,
      authorID: Cookies.get("userID"),
      authorname: Cookies.get("name")
    }
    axios.post("http://localhost:5000/posts", newpost)
      .then((res) => {
        console.log(res);
        alert("Your post is sucessfully created");
        console.log(Cookies.get("authoredposts"))
        var authoredpost
        if (Cookies.get("authoredposts") === undefined) {
          authoredpost = qid
        }if (Cookies.get("authoredposts") === "" || Cookies.get("authoredposts") === "") {
          authoredpost = qid
        }else {
          authoredpost = `${Cookies.get("authoredposts")}/${qid}`
        }
        console.log(authoredpost)
        axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`,
          {
            authoredposts: authoredpost
          })
          .then((res) => { console.log(res); Cookies.set("authoredposts", authoredpost) })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }
  console.log(curposts)
  // if (curposts.length > 0) {
  //   yourposts.splice(0, yourposts.length)
  //   for (var x in curposts) {
  //     console.log(curposts[x])
  //     yourposts.push(<>
  //       <div className='w-full flex flex-col rounded-2xl border-solid border-4 border-orange-600'>
  //         <h1>Title: {curposts[x].title}</h1>
  //         <h1>Body: {curposts[x].body}</h1>
  //       </div>
  //     </>)
  //   }
  //   console.log(yourposts)
  //   // setyourposts([...yourposts])
  // }

  return (<>
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col w-1/3'>
        <h1 className=' text-center text-xl bg-orange-600 text-white'>Your Posts</h1>
        {
          yourposts
        }
      </div>
      <div className='flex flex-col w-1/3'>
        <h1 className=' text-center text-xl bg-orange-600 text-white'>Latest Posts</h1>
        <Timeline/>
      </div>
      <div className='flex flex-col w-1/3'>
        <h1 className=' text-center text-xl bg-orange-600 text-white mb-3'>New Post</h1>
        <h1 className=' text-center text-xl' >Title of Post</h1>
        <input type="text" id="title" className='w-full rounded-xl pl-2 border-orange-600 border-4 mb-3' />
        <h1 className=' text-center text-xl ' >Body of Post</h1>
        <textarea type="text" id="body" className='w-full rounded-xl pl-2 border-orange-600 border-4 h-48' />
        <div className='flex flex-row justify-center mt-3'>
          <button className='bg-orange-600 text-white text-xl p-3 rounded-3xl' onClick={addpost}>Submit</button>
        </div>
      </div>
    </div>
  </>
  )
}
