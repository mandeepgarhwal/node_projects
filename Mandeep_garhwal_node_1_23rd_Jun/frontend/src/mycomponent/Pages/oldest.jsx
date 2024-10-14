import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Oldest() {
    let navigate = useNavigate()
    const [displayposts, setdisplayposts] = useState([])

    useEffect(() => {
      axios.get("  http://localhost:3003/app/notes")
        .then((res) => {
            let posts = res.data.notes,
            usedposts = posts.filter ((post) => post.oldest == true && post.newest == false)
            
            setdisplayposts (usedposts)})
        .catch((err) => console.log(err))
    }, [ ])
    function postlike(currpost){

        let dataupdate = {
              
              "_id": currpost._id,
              "title": currpost.title,
              "body": currpost.body,
              "oldest": true,
              "newest": false,
              "liked": true,
              "disliked": false,

          }
        console.log(dataupdate)
        axios.put(`http://localhost:3003/app/notes/${currpost._id}`, dataupdate)
        .then((res) =>  (alert("record is updated")))
        .catch((err) => console.log(err))
        navigate("/classifiedposts/oldest")

   window.location.reload()  

}
function postunlike(currpost){

    let dataupdate = {
        
          "_id": currpost._id,
          "title": currpost.title,
          "body": currpost.body,
          "oldest": true,
          "newest": false,
          "liked": false,
          "disliked": true,

      }
    console.log(dataupdate)
    axios.put(`http://localhost:3003/app/notes/${currpost._id}`, dataupdate)
    .then((res) =>  (alert("record is updated")))
    .catch((err) => console.log(err))
    navigate("/classifiedposts/oldest")
    window.location.reload()
    
}
function deletepost(element){
  console.log(element)
  axios.delete(`http://localhost:3003/app/notes/${element._id}`)
  .then(res => alert("record is deleted"))
  .catch(err => console.log(err))
  navigate("/classifiedposts/oldest")
  window.location.reload()
}
    function newrow(element){
        console.log("function is called")
        // let idedit = element.id + 100
        // let idnormal = element.id + 10
        return(
    <tr>
        <th scope="row" className='col-md-1'>{element._id}</th>
        <td className='col-md-3'>{element.title}</td>
        <td className='col-md-6'>{element.body}</td>
        <td className='col-md-2 text-center'>
        { (element.disliked == false && element.liked == true)?(
                    <i class="fa fa-thumbs-down" style= {{fontSize : "30px", color : "red", marginLeft : "40px"}}aria-hidden="true" onClick={() => (postunlike(element))}></i>):

            // <td className = {idnormal}><button className='btn btn-success btn-sm' onClick={() => (postunlike(element))}>Unlike</button></td>):
        (        <i class="fa fa-thumbs-up" style= {{fontSize : "30px", color : "green", marginLeft : "40px"}} aria-hidden="true" onClick={() => (postlike(element))}></i>)

        // <td className = {idnormal}><button className='btn btn-danger btn-sm' onClick={() => (postlike(element))}>Like</button></td>)
        
    } <i className="fa fa-trash-o" aria-hidden="true" style= {{fontSize : "30px", color : "orange", marginLeft : "60px"}} onClick={() => (deletepost(element))}></i>
    </td>

        </tr>
            
        )
    }

  return (
    <>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Title</th>
      <th scope="col">body</th>
      <th scope="col" colSpan={2} style={{textAlign : "center"}}>Actions</th>

    </tr>
  </thead>
  <tbody className="table-group-divider">
  {
            displayposts &&
            displayposts.length != 0 ?(
            displayposts.map((element) => (

                // console.log(element.title),
                newrow(element)
            
            ))) : 
            <tr>
                <td className='text-center text-primary' colSpan={5}>No existing record </td>
            </tr>

        }


  </tbody>
</table>

    
    </>
  )
}
