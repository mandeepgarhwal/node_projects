import React from 'react'
import netflixbg from "../src/assets/netflix-bg.jpg"
import { CCarousel, CCarouselItem, CImage, CCarouselCaption } from '@coreui/react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from "axios"
import like from "./assets/like.webp"
import "./home.css"
export default function Home() {
    const [mymovies, setmymovies] = useState([])
    const [allmovies, setallmovies] = useState([])
    const [allmoviesnav, setallmoviesnav] = useState([])
    const [curruser, setcurrruser] = useState()
    useEffect(() => {
        if (Cookies.get("user") !== undefined) {
            setcurrruser(Cookies.get("user"))
        }
        var currgenre = Cookies.get("likedgenre").split("/")
        console.log(currgenre)
        const getmovies = async () => {
            await axios.get("http://localhost:5000/movies")
                .then(
                    (res) => {
                        console.log(res.data.users)
                        console.log(res.data.users.length)
                        allmovies.splice(0, allmovies.length)
                        mymovies.splice(0, mymovies.length)
                        var noofmm = 0
                        for (var x in res.data.users) {
                            console.log(res.data.users[parseInt(x)].pictureurl)
                            console.log(res.data.users[parseInt(x)].genre)
                            var flag = 0
                            for (var d in currgenre) {
                                if (res.data.users[parseInt(x)].genre === currgenre[parseInt(d)]) {
                                    flag = 1
                                    console.log(flag)
                                }
                            }

                            if (flag === 1) {
                                noofmm += 1
                                if (noofmm + 1 > res.data.users.length) {
                                    var nextm = 1
                                } else {
                                    var nextm = noofmm + 1
                                }
                                if (noofmm <= 1) {
                                    var previousm = res.data.users.length
                                } else {
                                    var previousm = noofmm - 1
                                }
                                mymovies.push(<>
                                    <li id={`carousel__slide${noofmm}`}
                                        tabIndex="0"
                                        className="carousel__slide flex flex-col justify-end rounded-3xl"
                                        style={{ backgroundImage: `url(${res.data.users[parseInt(x)].pictureurl})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
                                    >
                                        <div className='flex flex-col justify-end text-white'>
                                            <div className='flex flex-row justify-between'>
                                                <span><h1>{res.data.users[parseInt(x)].name}</h1></span>
                                            </div>
                                            <h3>{res.data.users[parseInt(x)].description}</h3>
                                        </div>
                                        <div className="carousel__snapper">
                                            <a href={`#carousel__slide${previousm}`}
                                                className="carousel__prev">Go to last slide</a>
                                            <a href={`#carousel__slide${nextm}`}
                                                className="carousel__next">Go to next slide</a>
                                        </div>
                                    </li>
                                </>)
                            }
                            if (parseInt(x) + 2 > res.data.users.length) {
                                var next = 1
                            } else {
                                var next = parseInt(x) + 2
                            }
                            if (parseInt(x) <= 0) {
                                var previous = res.data.users.length
                            } else {
                                var previous = parseInt(x)
                            }
                            var likeid = `${res.data.users[parseInt(x)].movieID}/${res.data.users[parseInt(x)].genre}`
                            allmovies.push(<>
                                <li id={`carousel__slide${parseInt(x) + 1}`}
                                    tabIndex="0"
                                    className="carousel__slide flex flex-col justify-end rounded-3xl"
                                    style={{ backgroundImage: `url(${res.data.users[parseInt(x)].pictureurl})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
                                >
                                    <div className='flex flex-col justify-end text-white'>
                                        <div className='flex flex-row justify-between'>
                                            <span><h1>{res.data.users[parseInt(x)].name}</h1></span><span style={{ zIndex: 22 }}><img src={like} alt="" id={likeid} onClick={(e) => likefunc(e.target.id)} className='h-10 w-10 rounded-full mr-4 ' /></span>
                                        </div>
                                        <h3>{res.data.users[parseInt(x)].description}</h3>
                                    </div>
                                    <div className="carousel__snapper">
                                        <a href={`#carousel__slide${previous}`}
                                            className="carousel__prev">Go to last slide</a>
                                        <a href={`#carousel__slide${next}`}
                                            className="carousel__next">Go to next slide</a>
                                    </div>
                                </li>
                            </>)
                        }
                    })
                .catch((err) => console.log(err))
            setallmovies([...allmovies])
        }
        getmovies()
    }, [])
    const likefunc = (x) => {
        var userdata = {}
        var id = x.split("/")[0]
        var gen = x.split("/")[1]
        var currliked = Cookies.get("likedmovies")
        var currgenre = Cookies.get("likedgenre")
        console.log(currliked)
        console.log(currgenre)
        console.log(id)
        console.log(gen)
        console.log(currliked === "undefined")
        if (currliked === "undefined" || currliked === null) {
            userdata.likedmovies = id
        } else {
            userdata.likedmovies = `${currliked}/${id}`
        }
        if (currgenre === "undefined" || currgenre === null) {
            userdata.likedgenre = gen
        } else {
            userdata.likedgenre = `${currliked}/${gen}`
        }
        console.log(userdata)
        console.log(Cookies.get("userID"))
        axios.put(`http://localhost:5000/users/${Cookies.get("userID")}`, userdata)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    console.log(allmovies.length)
    return (
        <>
            <div className="min-h-[1200px]" style={{ backgroundImage: `url(${netflixbg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <h1 style={{ display: curruser ? "" : "none" }} className='flex flex-row justify-center text-white'>Welcome {curruser}!!!!!!</h1>
                <h1 className='flex flex-row justify-center text-white' style={{ display: curruser ? "" : "none" }}>Suggestions for you</h1>
                <div className='flex flex-row justify-center ' style={{ display: curruser ? "" : "none" }}>
                    <div id='mymovies' className='h-[200px] w-[600px]'>
                    <section className="carousel" aria-label="Gallery">
                            <ol className="carousel__viewport">
                                {
                                    mymovies.length > 0 &&
                                    mymovies
                                }
                            </ol>
                            {/* <aside className="carousel__navigation">
                            <ol className="carousel__navigation-list">
                                <li className="carousel__navigation-item">
                                    <a href="#carousel__slide1"
                                        className="carousel__navigation-button">Go to slide 1</a>
                                </li>
                                <li className="carousel__navigation-item">
                                    <a href="#carousel__slide2"
                                        className="carousel__navigation-button">Go to slide 2</a>
                                </li>
                                <li className="carousel__navigation-item">
                                    <a href="#carousel__slide3"
                                        className="carousel__navigation-button">Go to slide 3</a>
                                </li>
                                <li className="carousel__navigation-item">
                                    <a href="#carousel__slide4"
                                        className="carousel__navigation-button">Go to slide 4</a>
                                </li>
                            </ol>
                        </aside> */}
                        </section>
                    </div>
                </div>
                <div className='min-h-[100px]'></div>
                <h1 className='flex flex-row justify-center text-white mt-[150px]'>Explore Our Collection</h1>
                <div className='flex flex-row justify-center '>
                    <div id='allmovies' className='h-[200px] w-[600px]'>
                        <section className="carousel" aria-label="Gallery">
                            <ol className="carousel__viewport">
                                {
                                    allmovies.length > 0 &&
                                    allmovies
                                }
                            </ol>
                            {/* <aside className="carousel__navigation">
                            <ol className="carousel__navigation-list">
                                <li className="carousel__navigation-item">
                                    <a href="#carousel__slide1"
                                        className="carousel__navigation-button">Go to slide 1</a>
                                </li>
                                <li className="carousel__navigation-item">
                                    <a href="#carousel__slide2"
                                        className="carousel__navigation-button">Go to slide 2</a>
                                </li>
                                <li className="carousel__navigation-item">
                                    <a href="#carousel__slide3"
                                        className="carousel__navigation-button">Go to slide 3</a>
                                </li>
                                <li className="carousel__navigation-item">
                                    <a href="#carousel__slide4"
                                        className="carousel__navigation-button">Go to slide 4</a>
                                </li>
                            </ol>
                        </aside> */}
                        </section>
                    </div>
                </div>

            </div>
        </>
    )
}
