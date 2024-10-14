import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import like from "../assets/like.png"
import dislike from "../assets/dislike.png"
const { parse, stringify } = require('flatted/esm')
const uuid = require("uuid").v4
export default function Commentbox(x) {
    const [currentcomments, setcurrentcomments] = useState([])
    const [curcomments, setcurcomments] = useState([])
    // console.log(x.postID)
    // const [currentpost, setcurrentpost] = useState()
    useEffect(() => {
        currentcomments.splice(0, currentcomments.length)
        console.log(x.post)
        if (x.post !== undefined) {
            console.log(x.post)
            console.log(x.post.comments)
            if (x.post.comments !== undefined && x.post.comments.trim() !== "") {
                console.log(x.post.comments)
                for (var y in x.post.comments.split("/")) {
                    console.log(x.post)
                    console.log(x.post.comments.split("/")[y].trim())
                    if (x.post.comments.split("/")[y].trim() !== "") {
                        axios.get(`http://localhost:5000/comments/${x.post.comments.split("/")[y].trim()}`)
                            .then( (res) => {
                                console.log(res);
                                curcomments.push(res.data.details[0])
                                var likeid = `${res.data.details[0].commentID}/l/${y - 1}`
                                var dislikeid = `${res.data.details[0].commentID}/dl/${y - 1}`
                                var commentdelid = `${res.data.details[0].commentID}/dc/${y-1}`
                                var buttonstatus = "none"
                                console.log(Cookies.get("authoredcomments"))
                                for (var p in Cookies.get("authoredcomments").split("/")) {
                                    if (res.data.details[0].commentID === Cookies.get("authoredcomments").split("/")[p]) {
                                        buttonstatus = ""
                                        break
                                    }
                                }
                                currentcomments.push(<>
                                    <div className='w-full flex flex-col rounded-2xl border-solid border-2 border-orange-600'>
                                        <h1 className='my-2'>{res.data.details[0].body}</h1>
                                        <div className='flex flex-row px-4 justify-end'>
                                            <span className='flex flex-row mx-2'>
                                                <h1 className=' align-middle text-xl font-bold mr-1'>{res.data.details[0].likes}</h1>
                                                <img id={likeid} className=" h-6 w-6" src={like} onClick={(e) => likecomment(e.target.id)} alt="" />
                                            </span>
                                            <span className='flex flex-row mx-2'>
                                                <h1 className=' align-middle text-xl font-bold mr-1'>{res.data.details[0].dislikes}</h1>
                                                <img id={dislikeid} className=" h-6 w-6 mt-2" src={dislike} onClick={(e) => {console.log(e.target.id); dislikecomment(e.target.id)}} alt="" />
                                            </span>
                                            <div style={{ display: buttonstatus }}  className=' flex flex-row justify-end'><button id={commentdelid} className=' btn btn-danger p-1' onClick={(e) => {console.log(e.target.id); deletecomment(e.target.id)}}>Delete</button></div>
                                        </div>
                                    </div></>)
                                setcurrentcomments([...currentcomments])
                            })
                            .catch((err) => console.log(err))
                    }
                }
            }
        }
        console.log(currentcomments)
    }, [])
    const deletecomment = (f) => {
        console.log(f)
        console.log("delete")
        axios.delete(`http://localhost:5000/comments/${f.split("/")[0]}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        var curauthoredcomments = Cookies.get("authoredcomments").split("/")
        console.log(curauthoredcomments)
        for (var t in curauthoredcomments) {
            if (curcomments[parseInt(f.split("/")[2])].commentID === curauthoredcomments[t]) {
                curauthoredcomments.splice(t, 1)
            }
        }
        console.log(curauthoredcomments)
        Cookies.set("authoredcomments", curauthoredcomments.join("/"))
        axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { authoredcomments: curauthoredcomments.join("/") })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        var curcom = x.post.comments.split("/")
        for (var p in curcom) {
            if (curcom[p] === f) {
                x.post.comments.split("/").splice(p, 1)
            }
        }
        axios.put(`http://localhost:5000/posts/${x.ID}`, { noofcomments: x.post.noofcomments - 1, comments: curcom.join("/") })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    const likecomment = (k) => {
        console.log("commment is liked")
        var id = k.split("/")[0]
        console.log(id)
        console.log(k)
        // console.log(parseInt(x.split("/")[2]))
        console.log(Cookies.get("likedcomments"))
        console.log(Cookies.get("dislikedcomments"))
        var flag = false
        var flagd = false
        for (var y in Cookies.get("likedcomments").split("/")) {
            if (Cookies.get("likedcomments").split("/")[y] === id) {
                flag = true
            } else {
                if (Cookies.get("dislikedcomments") !== undefined) {
                    for (var y in Cookies.get("dislikedcomments").split("/")) {
                        var temp = Cookies.get("dislikedcomments").split("/")
                        if (Cookies.get("dislikedcomments").split("/")[y] === id) {
                            console.log(y)
                            temp.splice(y, 1)
                            Cookies.set("dislikedcomments", temp.join("/"))
                            flagd = true
                        }
                    }
                }
            }
        }
        console.log(flag)
        console.log(flagd)
        console.log(Cookies.get("dislikedcomments"))
        if (curcomments[0]) {
            console.log("exists")
            console.log(curcomments[0])
        } else {
            return
        }
        console.log(parseInt(x.split("/")[2]))
        console.log(Cookies.get("likedcomments"))
        if (Cookies.get("likedcomments") !== undefined) {
            if (flag) {
                console.log("already liked")
                return
            } else {
                var newlikes
                var newdislikes
                var newlikedcomments
                if (curcomments[parseInt(k.split("/")[2])].likes) {
                    newlikes = curcomments[parseInt(k.split("/")[2])].likes + 1
                } else { newlikes = 1 }
                console.log(newlikes)
                if (flagd === false) {
                    console.log(2)
                    axios.put(`http://localhost:5000/comments/${id}`, { likes: newlikes })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                    if (Cookies.get("likedcomments") === undefined) {
                        newlikedcomments = id
                        console.log(newlikedcomments)
                    } else {
                        newlikedcomments = `${Cookies.get("likedcomments")}/${id}`
                        console.log(newlikedcomments)
                    }
                    Cookies.set("likedcomments", newlikedcomments)
                    console.log(newlikedcomments)
                    axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { likedcomments: newlikedcomments })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                } else {
                    console.log(3)
                    if (curcomments[parseInt(k.split("/")[2])].dislikes) {
                        newdislikes = curcomments[parseInt(k.split("/")[2])].dislikes - 1
                    } else { newdislikes = 1 }
                    console.log(newdislikes)
                    axios.put(`http://localhost:5000/comments/${id}`, { likes: newlikes, dislikes: newdislikes })
                    var newlikedcomments
                    if (Cookies.get("likedcomments") === undefined) {
                        newlikedcomments = id
                        console.log(newlikedcomments)
                    } else {
                        newlikedcomments = `${Cookies.get("likedcomments")}/${id}`
                        console.log(newlikedcomments)
                    }
                    Cookies.set("likedcomments", newlikedcomments)
                    axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { likedcomments: newlikedcomments, dislikedcomments: Cookies.get("dislikedcomments") })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                }

            }
        }
        // else {
        //     var newlikes
        //     var newdislikes
        //     var newlikedposts
        //     console.log(curposts[0][parseInt(x.split("/")[2])])
        //     if (curposts[0][parseInt(x.split("/")[2])].likes) {
        //         newlikes = curposts[0][parseInt(x.split("/")[2])].likes + 1
        //     } else { newlikes = 1 }
        //     if (flagd === false) {
        //         axios.put(`http://localhost:5000/posts/${id}`, { likes: newlikes })
        //         if (Cookies.get("likedposts") === undefined) {
        //             newlikedposts = id
        //         } else {
        //             newlikedposts = `${Cookies.get("likedposts")}/${id}`
        //         }
        //         axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { likedposts: newlikedposts })
        //             .then((res) => console.log(res))
        //             .catch((err) => console.log(err))
        //     } else {
        //         if (curposts[0][parseInt(x.split("/")[2])].dislikes) {
        //             newdislikes = curposts[0][parseInt(x.split("/")[2])].dislikes - 1
        //         } else { newdislikes = 1 }
        //         axios.put(`http://localhost:5000/posts/${id}`, { likes: newlikes, dislikes: newdislikes })
        //         var newlikedposts
        //         if (Cookies.get("likedposts") === undefined) {
        //             newlikedposts = id
        //         } else {
        //             newlikedposts = `${Cookies.get("likedposts")}/${id}`
        //         }
        //         axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { likedposts: newlikedposts, dislikedposts: Cookies.get("dislikedposts") })
        //             .then((res) => console.log(res))
        //             .catch((err) => console.log(err))
        //     }
        // }
    }
    const dislikecomment = (k) => {
        console.log("comment is disliked")
        console.log(parseInt(k.split("/")[2]))
        var id = k.split("/")[0]
        console.log(id)
        var flag = false
        var flagd = false
        console.log(Cookies.get("dislikedcomments"))
        console.log(Cookies.get("likedcomments"))
        for (var y in Cookies.get("dislikedcomments").split("/")) {
            if (Cookies.get("dislikedcomments").split("/")[y] === id) {
                flag = true
            } else {
                if (Cookies.get("likedcomments") !== undefined) {
                    for (var y in Cookies.get("likedcomments").split("/")) {
                        console.log(Cookies.get("likedcomments").split("/"))
                        var temp = Cookies.get("likedcomments").split("/")
                        if (Cookies.get("likedcomments").split("/")[y] === id) {
                            console.log(y)
                            temp.splice(y, 1)
                            Cookies.set("likedcomments", temp.join("/"))
                            flagd = true
                        }
                    }
                }
            }
        }
        console.log(flag)
        console.log(flagd)
        console.log(Cookies.get("likedcomments"))
        if (curcomments) {
            console.log("exists")
        } else {
            return
        }
        if (Cookies.get("dislikedcomments") !== undefined) {
            if (flag) {
                return
            } else {
                var newdislikes
                var newlikes
                var newdislikedcomments
                console.log(curcomments[parseInt(x.split("/")[2])])
                if (curcomments[parseInt(k.split("/")[2])].dislikes) {
                    newdislikes = curcomments[parseInt(k.split("/")[2])].dislikes + 1
                } else { newdislikes = 1 }
                console.log(newdislikes)
                if (flagd === false) {
                    console.log(2)
                    axios.put(`http://localhost:5000/comments/${id}`, { dislikes: newdislikes })
                    if (Cookies.get("dislikedcomments") === undefined) {
                        newdislikedcomments = id
                        console.log(newdislikedcomments)
                    } else {
                        newdislikedcomments = `${Cookies.get("dislikedcomments")}/${id}`
                        console.log(newdislikedcomments)
                    }
                    console.log(newdislikedcomments)
                    Cookies.set("dislikedcomments", newdislikedcomments)
                    axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { dislikedcomments: newdislikedcomments })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                } else {
                    console.log(3)
                    if (curcomments[parseInt(k.split("/")[2])].likes) {
                        newlikes = curcomments[parseInt(k.split("/")[2])].likes - 1
                    } else { newlikes = 1 }
                    console.log(newlikes)
                    axios.put(`http://localhost:5000/comments/${id}`, { dislikes: newdislikes, likes: newlikes })
                    var newdislikedcomments
                    if (Cookies.get("dislikedcomments") === undefined) {
                        newdislikedcomments = id
                    } else {
                        newdislikedcomments = `${Cookies.get("dislikedcomments")}/${id}`
                    }
                    console.log(newdislikedcomments)
                    Cookies.set("dislikedcomments", newdislikedcomments)
                    axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { dislikedcomments: newdislikedcomments, likedcomments: Cookies.get("likedcomments") })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                }
            }
        }
        // else {
        //         var newdislikes
        //         console.log(curposts[0][parseInt(x.split("/")[2])])
        //         if (curposts[0][parseInt(x.split("/")[2])].likes) {
        //             newdislikes = curposts[0][parseInt(x.split("/")[2])].dislikes + 1
        //         } else { newdislikes = 1 }
        //         if (flagd === false) {
        //             axios.put(`http://localhost:5000/posts/${id}`, { dislikes: newdislikes })
        //             if (Cookies.get("dislikedposts") !== undefined) {
        //                 newdislikedposts = id
        //             } else {
        //                 newdislikedposts = `${Cookies.get("dislikedposts")}/${id}`
        //             }
        //             axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { dislikedposts: newdislikedposts })
        //                 .then((res) => console.log(res))
        //                 .catch((err) => console.log(err))
        //         } else {
        //             if (curposts[0][parseInt(x.split("/")[2])].likes) {
        //                 newlikes = curposts[0][parseInt(x.split("/")[2])].likes - 1
        //             } else { newlikes = 1 }
        //             axios.put(`http://localhost:5000/posts/${id}`, { dislikes: newdislikes, likes: newlikes })
        //             var newdislikedposts
        //             if (Cookies.get("dislikedposts") !== undefined) {
        //                 newdislikedposts = id
        //             } else {
        //                 newdislikedposts = `${Cookies.get("dislikedposts")}/${id}`
        //             }
        //             axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { dislikedposts: newdislikedposts, likedposts: Cookies.get("likedposts") })
        //                 .then((res) => console.log(res))
        //                 .catch((err) => console.log(err))
        //         }
        //     }
    }
    const postcomment = () => {
        console.log(x)
        var newcommentID = uuid()
        var newcomment = {
            commentID: newcommentID,
            postID: x.ID,
            authorID: Cookies.get("userID"),
            authorname: Cookies.get("name"),
            body: document.getElementById("newcomment").value
        }
        console.log(newcomment)
        axios.post(`http://localhost:5000/comments/`, newcomment)
            .then((res) => { console.log(res); document.getElementById("newcomment").value = "" })
            .catch((err) => console.log(err))
        if (Cookies.get("authoredcomments") === undefined) {
            axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { authoredcomments: newcommentID })
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            console.log(newcommentID)
            Cookies.set("authoredcomments", newcommentID)
        } else {
            axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { authoredcomments: `${Cookies.get("authoredcomments")}/${newcommentID}` })
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            console.log(`${Cookies.get("authoredcomments")}/${newcommentID}`)
            Cookies.set("authoredcomments", `${Cookies.get("authoredcomments")}/${newcommentID}`)
        }
        var newnoofcomments
        var newcomments = ""
        if (x.post) {
            if (x.post.noofcomments === undefined) {
                newnoofcomments = 1
            } else {
                newnoofcomments = x.post.noofcomments + 1

            }
        }
        if (x.post) {
            if (x.post.comments === undefined) {
                newcomments = newcommentID
            } else {
                newcomments = `${x.post.comments}/${newcommentID}`
            }
        }
        console.log(newcomments)
        console.log(newnoofcomments)
        axios.put(`http://localhost:5000/posts/${x.ID}`, { noofcomments: newnoofcomments, comments: newcomments })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    return (<>
        <h1 className=' text-start text-xl' >Write A Comment</h1>
        <input type="text" id="newcomment" className='w-full rounded-xl pl-2 border-orange-600 border-4' />
        <div className=' flex flex-row justify-end'><button className=' btn btn-danger p-1' onClick={postcomment}>Post</button></div>
        {
            currentcomments
        }
    </>)
}
