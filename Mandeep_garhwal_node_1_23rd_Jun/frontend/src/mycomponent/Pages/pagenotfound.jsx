import React from "react";
import errorimage from './404.jpeg'

export default function Pagenotfound() {
    return (
        <>
        <h1 className="text-center text-primary">Page you are searching for does not exist</h1>
        <img src= {errorimage}  style={{width : "700px"}}/>
        
        </>
    )
}