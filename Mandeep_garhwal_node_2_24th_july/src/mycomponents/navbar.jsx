import React from 'react'
import thumbnail from "../assets/logo.png"
import { Navbar } from 'flowbite-react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();
    var curruser = Cookies.get("name")
    const logout = () => {
        Cookies.remove('name');
        Cookies.remove("userID")
        Cookies.remove("authoredposts")
        Cookies.remove("authoredcomments")
        Cookies.remove("likedposts")
        Cookies.remove("dislikedposts")
        Cookies.remove("likedcomments")
        Cookies.remove("dislikedcomments")
        navigate('/');
    }
    return (
        <Navbar fluid rounded className='align-top rounded-none bg-[#2a589b]' >
            <div className=" mt-2 self-start">
                <Navbar.Brand href="/home" >
                    <img src={thumbnail} className="mr-3  rounded-full  w-6 h-6 sm:h-9 sm:w-9 " alt="Flowbite React Logo" />
                    <span className=" self-start whitespace-nowrap text-base sm:text-xl font-semibold dark:text-white"> Mini Reddit
                        {
                            curruser != undefined &&
                            <span className='ml-5'>Welcome, {curruser.toLocaleUpperCase()}!!!!</span>
                        }
                    </span>

                </Navbar.Brand>
            </div >
            <div className="flex flex-row justify-between w-fit">
                <div className="flex flex-row justify-end">
                    <Navbar.Toggle className='focus:w-1/5 mr-3 focus:ring-red-200 hover:bg-red-200' />
                </div>
                {/* <div className="flex flex-col justify-start pb-6"> */}
                <Navbar.Collapse className=''>
                    {curruser !== undefined ? (<>

                        <Navbar.Link href="#" className='text-base sm:text-xl md:-mt-5  text-white' onClick={logout}>Log Out</Navbar.Link>


                    </>) : (null)}
                </Navbar.Collapse>
                {/* </div> */}
            </div>
        </Navbar>
    )
}
