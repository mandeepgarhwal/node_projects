import React, { useState, useEffect } from 'react'
import axios from "axios"
import like from "../assets/like.png"
import dislike from "../assets/dislike.png"
import comment from "../assets/comments.png"
import Cookies from 'js-cookie'
import Commentbox from './commentbox'
export default function Timeline() {
    const [latestposts, setlatestposts] = useState([])
    const [curposts, setcurposts] = useState([])
    useEffect(() => {
        const interval = setInterval(async () => {
            curposts.splice(0, curposts.length)
            await  axios.get(`http://localhost:5000/posts/`)
                .then(async (res) => {
                    console.log(res.data.posts);
                    console.log(res)
                    curposts.push(res.data.posts);
                    latestposts.splice(0, latestposts.length)
                    for (var x in res.data.posts) {
                        var likeid = `${res.data.posts[x].postID}/l/${x}`
                        var dislikeid = `${res.data.posts[x].postID}/d/${x}`
                        var commentid = `${res.data.posts[x].postID}`
                        var noofcomments
                        var post
                        if (res.data.posts[x].noofcomments === undefined){
                            noofcomments = 0
                        }else{
                            noofcomments = res.data.posts[x].noofcomments
                        }
                        await axios.get(`http://localhost:5000/posts/${res.data.posts[x].postID}`)
                        .then((res) => { post = res.data.details[0]})
                        .catch((err) => console.log(err))
                        console.log(post)
                        latestposts.push(<>
                            <div className='mt-10 w-full flex flex-col rounded-2xl border-solid border-4 border-orange-600'>
                                <h1 className='my-2'>Title: {res.data.posts[x].title}</h1>
                                <h1 className='my-2'>Body: {res.data.posts[x].body}</h1>
                                <div className='flex flex-row px-4 justify-end'>
                                    <span className='flex flex-row mx-2'>
                                        <h1 className=' align-middle text-xl font-bold mr-1'>{noofcomments}</h1>
                                        <img className=" h-6 w-10 mt-1" src={comment} alt="" />
                                    </span>
                                    <span className='flex flex-row mx-2'>
                                        <h1 className=' align-middle text-xl font-bold mr-1'>{res.data.posts[x].likes}</h1>
                                        <img id={likeid} className=" h-6 w-6" src={like} alt="" onClick={(e) => likepost(e.target.id)} />
                                    </span>
                                    <span className='flex flex-row mx-2'>
                                        <h1 className=' align-middle text-xl font-bold mr-1'>{res.data.posts[x].dislikes}</h1>
                                        <img id={dislikeid} className=" h-6 w-6 mt-2" src={dislike} alt="" onClick={(e) => dislikepost(e.target.id)} />
                                    </span>
                                </div>
                            </div>
                            <Commentbox ID = {commentid} post = {post} />
                            </>)
                    }
                    setlatestposts([...latestposts])
                })
        }, 10000);

        return () => clearInterval(interval);


    }, [])
    const likepost = (x) => {
        console.log("post is liked")
        var id = x.split("/")[0]
        console.log(curposts.length)
        console.log(id)
        console.log(curposts)
        console.log(x)
        console.log(parseInt(x.split("/")[2]))
        console.log(Cookies.get("likedposts").split("/"))
        console.log(Cookies.get("dislikedposts"))
        var flag = false
        var flagd = false
        for (var y in Cookies.get("likedposts").split("/")) {
            if (Cookies.get("likedposts").split("/")[y] === id) {
                flag = true
            } else {
                if (Cookies.get("dislikedposts") !== undefined) {
                    for (var y in Cookies.get("dislikedposts").split("/")) {
                        var temp = Cookies.get("dislikedposts").split("/")
                        if (Cookies.get("dislikedposts").split("/")[y] === id) {
                            console.log(y)
                            temp.splice(y, 1)
                            Cookies.set("dislikedposts", temp.join("/"))
                            flagd = true
                        }
                    }
                }
            }
        }
        console.log(flag)
        console.log(flagd)
        console.log(Cookies.get("dislikedposts"))
        if (curposts[0]){
            console.log("exists")
        }else{
            return
        }
        if (Cookies.get("likedposts") !== undefined) {
            if (flag) {
                return
            } else {
                var newlikes
                var newdislikes
                var newlikedposts
                if (curposts[0][parseInt(x.split("/")[2])].likes) {
                    newlikes = curposts[0][parseInt(x.split("/")[2])].likes + 1
                } else { newlikes = 1 }
                if (flagd === false) {
                    console.log(2)
                    axios.put(`http://localhost:5000/posts/${id}`, { likes: newlikes })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
                    if (Cookies.get("likedposts") === undefined) {
                        newlikedposts = id
                        console.log(newlikedposts)
                    } else {
                        newlikedposts = `${Cookies.get("likedposts")}/${id}`
                        console.log(newlikedposts)
                    }
                    Cookies.set("likedposts", newlikedposts)
                    axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { likedposts: newlikedposts })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                } else {
                    console.log(3)
                    if (curposts[0][parseInt(x.split("/")[2])].dislikes) {
                        newdislikes = curposts[0][parseInt(x.split("/")[2])].dislikes - 1
                    } else { newdislikes = 1 }
                    axios.put(`http://localhost:5000/posts/${id}`, { likes: newlikes, dislikes: newdislikes })
                    var newlikedposts
                    if (Cookies.get("likedposts") === undefined) {
                        newlikedposts = id
                        console.log(newlikedposts)
                    } else {
                        newlikedposts = `${Cookies.get("likedposts")}/${id}`
                        console.log(newlikedposts)
                    }
                    Cookies.set("likedposts", newlikedposts)
                    axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { likedposts: newlikedposts, dislikedposts: Cookies.get("dislikedposts") })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                }

            }
        } else {
            var newlikes
            var newdislikes
            var newlikedposts
            console.log(curposts[0][parseInt(x.split("/")[2])])
            if (curposts[0][parseInt(x.split("/")[2])].likes) {
                newlikes = curposts[0][parseInt(x.split("/")[2])].likes + 1
            } else { newlikes = 1 }
            if (flagd === false) {
                axios.put(`http://localhost:5000/posts/${id}`, { likes: newlikes })
                if (Cookies.get("likedposts") === undefined) {
                    newlikedposts = id
                } else {
                    newlikedposts = `${Cookies.get("likedposts")}/${id}`
                }
                axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { likedposts: newlikedposts })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            } else {
                if (curposts[0][parseInt(x.split("/")[2])].dislikes) {
                    newdislikes = curposts[0][parseInt(x.split("/")[2])].dislikes - 1
                } else { newdislikes = 1 }
                axios.put(`http://localhost:5000/posts/${id}`, { likes: newlikes, dislikes: newdislikes })
                var newlikedposts
                if (Cookies.get("likedposts") === undefined) {
                    newlikedposts = id
                } else {
                    newlikedposts = `${Cookies.get("likedposts")}/${id}`
                }
                axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { likedposts: newlikedposts, dislikedposts: Cookies.get("dislikedposts") })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            }
        }
    }
    const dislikepost = (x) => {
        console.log("post is disliked")
        console.log(parseInt(x.split("/")[2]))
        var id = x.split("/")[0]
        console.log(id)
        var flag = false
        var flagd = false
        console.log(Cookies.get("dislikedposts"))
        console.log(Cookies.get("likedposts"))
        for (var y in Cookies.get("dislikedposts").split("/")) {
            if (Cookies.get("dislikedposts").split("/")[y] === id) {
                flag = true
            } else {
                if (Cookies.get("likedposts") !== undefined) {
                    for (var y in Cookies.get("likedposts").split("/")) {
                        console.log(Cookies.get("likedposts").split("/"))
                        var temp = Cookies.get("likedposts").split("/")
                        if (Cookies.get("likedposts").split("/")[y] === id) {
                            console.log(y)
                            temp.splice(y, 1)
                            Cookies.set("likedposts", temp.join("/"))
                            flagd = true
                        }
                    }
                }
            }
        }
        console.log(flag)
        console.log(flagd)
        console.log(Cookies.get("likedposts"))
        if (curposts[0]){
            console.log("exists")
        }else{
            return
        }
        if (Cookies.get("dislikedposts") !== undefined) {
            if (flag) {
                return
            } else {
                var newdislikes
                var newlikes
                var newdislikedposts
                console.log(curposts[0][parseInt(x.split("/")[2])])
                if (curposts[0][parseInt(x.split("/")[2])].dislikes) {
                    newdislikes = curposts[0][parseInt(x.split("/")[2])].dislikes + 1
                } else { newdislikes = 1 }
                if (flagd === false) {
                    console.log(2)
                    axios.put(`http://localhost:5000/posts/${id}`, { dislikes: newdislikes })
                    if (Cookies.get("dislikedposts") === undefined) {
                        newdislikedposts = id
                        console.log(newdislikedposts)
                    } else {
                        newdislikedposts = `${Cookies.get("dislikedposts")}/${id}`
                        console.log(newdislikedposts)
                    }
                    console.log(newdislikedposts)
                    Cookies.set("dislikedposts", newdislikedposts)
                    axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { dislikedposts: newdislikedposts })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                } else {
                    console.log(3)
                    if (curposts[0][parseInt(x.split("/")[2])].likes) {
                        newlikes = curposts[0][parseInt(x.split("/")[2])].likes - 1
                    } else { newlikes = 1 }
                    axios.put(`http://localhost:5000/posts/${id}`, { dislikes: newdislikes, likes: newlikes })
                    var newdislikedposts
                    if (Cookies.get("dislikedposts") === undefined) {
                        newdislikedposts = id
                    } else {
                        newdislikedposts = `${Cookies.get("dislikedposts")}/${id}`
                    }
                    console.log(newdislikedposts)
                    Cookies.set("dislikedposts", newdislikedposts)
                    axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { dislikedposts: newdislikedposts, likedposts: Cookies.get("likedposts") })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                }
            }
        } else {
            var newdislikes
            console.log(curposts[0][parseInt(x.split("/")[2])])
            if (curposts[0][parseInt(x.split("/")[2])].likes) {
                newdislikes = curposts[0][parseInt(x.split("/")[2])].dislikes + 1
            } else { newdislikes = 1 }
            if (flagd === false) {
                axios.put(`http://localhost:5000/posts/${id}`, { dislikes: newdislikes })
                if (Cookies.get("dislikedposts") !== undefined) {
                    newdislikedposts = id
                } else {
                    newdislikedposts = `${Cookies.get("dislikedposts")}/${id}`
                }
                axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { dislikedposts: newdislikedposts })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            } else {
                if (curposts[0][parseInt(x.split("/")[2])].likes) {
                    newlikes = curposts[0][parseInt(x.split("/")[2])].likes - 1
                } else { newlikes = 1 }
                axios.put(`http://localhost:5000/posts/${id}`, { dislikes: newdislikes, likes: newlikes })
                var newdislikedposts
                if (Cookies.get("dislikedposts") !== undefined) {
                    newdislikedposts = id
                } else {
                    newdislikedposts = `${Cookies.get("dislikedposts")}/${id}`
                }
                axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, { dislikedposts: newdislikedposts, likedposts: Cookies.get("likedposts") })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            }
        }
    }
    return (<>
        {/* <h1 className=' text-xl font-bold'>This is a space for timeline to appear and autorefresh itself</h1> */}
        {
            latestposts
        }
    </>
    )
}
