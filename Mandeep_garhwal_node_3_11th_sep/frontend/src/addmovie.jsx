import React from 'react'
import homepagebg from "../src/assets/netflix-bg.jpg"
import axios from "axios"
const uuid = require("uuid").v4
export default function Addmovie() {
    var Filee = []
    const handlepost = (e, x, y) => {
        console.log(e.clipboardData.items[0].getAsFile('image/'));
        if (e.clipboardData.items[0].getAsFile('image/') === null) {
            alert("pasted content is not an image.")
        } else {
            for (var p in Filee) {
                if (Filee[p].picid === y) {
                    console.log("pic for this field already exists")
                    Filee.splice(p, 1)
                    console.log(Filee)
                    break
                }
            }
            Filee.push({ pic: e.clipboardData.items[0].getAsFile('image/'), picid: y })
            console.log(Filee)
            console.log(x)
            console.log(document.getElementById(x))
            var reader = new FileReader()
            reader.onload = function (e) {
                let dataURL = e.target.result;
                document.getElementById(x).src = dataURL
            }
            reader.readAsDataURL(e.clipboardData.items[0].getAsFile('image/'));
        }
    }
    const moviestore = async () => {
        var newmoviedata = {}
        console.log("Upload function is called")
        console.log(Filee)
        const formdata = new FormData()
        var picurls
        for (var x in Filee) {
            console.log(x)
            console.log(Filee[x])
            formdata.append("files", Filee[x].pic, `${Filee[x].picid}.jpg`)
            console.log(Filee[x].pic)
        }
        console.log(formdata)
        await axios.post("http://localhost:5000/uploads", formdata)
            .then(res => {
                console.log("1");
                console.log(res);
                console.log(res.data);
                console.log(res.data.response);
                console.log(res.data.response.urls)
                picurls = res.data.response.urls[0]
                newmoviedata.pictureurl = picurls
                newmoviedata.movieID = uuid()
                if(document.getElementById("name").value.trim() === "" || document.getElementById("name").value === undefined){
                    alert("Please enter a name")
                }else{
                    newmoviedata.name = document.getElementById("name").value.trim()
                }
                if(document.getElementById("year").value.trim() === "" || document.getElementById("year").value === undefined){
                    alert("Please enter a year")
                }else{
                    newmoviedata.year = document.getElementById("year").value.trim()
                }
                if(document.getElementById("genre").value.trim() === "" || document.getElementById("genre").value === undefined){
                    alert("Please enter a genre")
                }else{
                    newmoviedata.genre = document.getElementById("genre").value.trim()
                }
                if(document.getElementById("description").value.trim() === "" || document.getElementById("description").value === undefined){
                    alert("Please enter a description")
                }else{
                    newmoviedata.description = document.getElementById("description").value.trim()
                }
                console.log(newmoviedata)
                axios.post("http://localhost:5000/movies", newmoviedata)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            })
            .catch((err) => { console.log("2"); console.log(err); alert(`Q. can not be Uploaded to database`) })
    }
    return (<>
        <div style={{ backgroundImage: `url(${homepagebg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className='flex justify-center min-h-screen align-items-center text-center flex-col'>
            <h1 className=' text-4xl text-white font-bold'>Movie Entry Portal</h1>
            <div className='flex flex-column justify-center text-center w-9/12'>
                <h1 className=' text-2xl text-white'> Fill in the Movie upload form </h1>
                <h1 className='text-xl text-white text-decoration-underline '> Part 1 </h1>
                <div className='flex flex-row justify-around'>
                    <input type="text" autoComplete='off' placeholder='Please Enter name of the movie.' id='name' className=' w-full h-8 rounded-2xl pl-3 m-2' />
                    <input type="text" autoComplete='off' placeholder='Please Enter year of the release' id='year' className=' w-full h-8 rounded-2xl pl-3 m-2' />
                </div>
                <div  >
                    <textarea name="" id="description" cols="30" rows="4" autoComplete='off' placeholder='Please Enter the description' className=' w-full rounded-2xl pl-3' onChange={(e) => { console.log(e.target.value) }}></textarea>
                </div>
                <div className='flex flex-row justify-around'>
                    <select id="genre" className=' w-full h-8 rounded-2xl pl-3 m-2'>
                        <optgroup label="Please select the suitable option">
                            <option value="" className='text-white'>Please select genre of the movie</option>
                            <option value="action">Action</option>
                            <option value="comedy">comedy</option>
                            <option value="drama">Drama</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <h1 className='text-xl text-white text-decoration-underline '> Part 2 </h1>
            <div><span className='text-lg text-white'>Question:</span><span><input disabled type="text" src="" name="moviepic" placeholder="Paste your image here" alt="moviepicdisplay" className=' bg-white w-5/12 rounded-2xl pl-3' onPaste={(e) => handlepost(e, e.target.alt, e.target.name)} /></span></div>
            <div className='flex justify-center'><img src="" alt="" id= "moviepicdisplay" /></div>
            <br />
                <div className='flex flex-row justify-center'>
                    <button className='btn btn-info ' onClick={() => { console.log("button 1 is clicked"); moviestore() }}> Movie upload</button>
                </div>
        </div>
    </>
    )
}
