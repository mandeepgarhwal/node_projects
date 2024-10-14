import homepagebg from "./assets/homepagebg.jpg"
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [currentmovies, setcurrentmovies] = useState([])
  const [displaymovies, setdisplaymovies] = useState([])
  const [userprefrences, setuserprefrences] = useState([])
  const [moviedata, setmoviedata] = useState([])
  const [relatedusers, setrelatedusers] = useState([])
  const [userdata, setuserdata] = useState([])
  // const relateduser = async (g, f) => {
  //   console.log(g)
  //   await axios.get("http://localhost:3000/userpreference")
  //   .then(res => {
  //     for (var z in res.data){
  //       console.log(z)
  //       console.log(res.data[z])
  //       if(res.data[z][res.data[0][g]] === f){
  //         console.log(res.data[z]["preference"])
  //         break
  //       }
  //     }
  //   })
  // }
  useEffect(() => {
    axios.get("http://localhost:3000/userpreference")
      .then(res => { console.log(res.data); setuserprefrences(res.data); window["userpreference"] = res.data })
      .catch(err => console.log(err))
    axios.get("http://localhost:3000/relateduser")
      .then(res => { console.log(res.data[0]); setrelatedusers(res.data[0]); window["relatedusers"] = res.data[0] })
      .catch(err => console.log(err))
    axios.get("http://localhost:3000/moviedata")
      .then(res => { console.log(res.data); setmoviedata(res.data); window["moviedata"] = res.data })
      .catch(err => console.log(err))
    axios.get("http://localhost:3000/userdata")
      .then(res => { console.log(res.data); setuserdata(res.data); window["userdata"] = res.data })
      .catch(err => console.log(err))
  }, [])

  const showresults = async () => {
    window["currmovies"] = []
    console.log(document.getElementById("userid").value)
    var flag = 1
    var currentpreference
    var currentnumber
    for (var x in userprefrences) {
      if (userprefrences[x]["user_id"] === parseInt(document.getElementById("userid").value)) {
        console.log(userprefrences[x]["preference"])
        currentpreference = userprefrences[x]["preference"]
        window["currentpreference"] = currentpreference
        flag = 0
        break
      }
    }
    if (flag === 1) (
      alert("No Such user exist")
    )
    if (flag === 0) {
      console.log(Math.ceil(10 / currentpreference.length))
      currentnumber = Math.ceil(10 / currentpreference.length)
    }

    for (var r in currentpreference) {
      console.log(currentpreference[r].genre)
      window[`list${r}`] = []
      for (var m in moviedata) {
        // console.log(res.data[m].genres)
        for (var s in moviedata[m].genres) {
          if (moviedata[m]["genres"][parseInt(s)] === currentpreference[r].genre) {
            window[`list${r}`].push(moviedata[m])
          }
        }
      }
      console.log(window[`list${r}`])
      var randno
      for (var n = 0; n < currentnumber; n++) {
        randno = Math.trunc(Math.random() * window[`list${r}`].length)
        var randmovie = window[`list${r}`][randno]
        console.log(randmovie)
        // var flagm = 0
        // for (var d in currentmovies){
        //   if (randmovie !== currentmovies[d]){
        //     flagm = 1
        //   }
        // }
        // console.log(flagm)
        // if (flagm === 1){ n = n - 1}
        // else{currentmovies.push(randmovie); window["currmovies"].push(randmovie)}
        currentmovies.push(randmovie); window["currmovies"].push(randmovie)
        console.log(n)
      }
      // currentmovies.push(window[`list${r}`][Math.trunc(Math.random()*window[`list${r}`].length)])
      console.log(window["currmovies"])
    }
    console.log(window["currmovies"])

    setcurrentmovies([...currentmovies])
    console.log(currentmovies)
    console.log(relatedusers);
    console.log(relatedusers[document.getElementById("userid").value].length);
    console.log(relatedusers[document.getElementById("userid").value])
    window["relatedusers"] = relatedusers[document.getElementById("userid").value]
    // for (var o in res.data[0][document.getElementById("userid").value]){
    //   console.log(res.data[0][document.getElementById("userid").value][o]["user_id"])
    //   relateduser(res.data[0][document.getElementById("userid").value][o]["user_id"], document.getElementById("userid").value)
    // }
    window["relateduserpreferences"] = []
    console.log(window["relatedusers"])
    for (var b in window["relatedusers"]) {
      console.log(window["relatedusers"][b]["user_id"])
      for (var f in userprefrences) {
        if (userprefrences[f]["user_id"] === window["relatedusers"][b]["user_id"]) {
          console.log("match")
          window["relateduserpreferences"].push(userprefrences[f])
          break
        }
      }
    }
    console.log(window["relateduserpreferences"])
    window["currpreferencesrelatedusers"] = []
    for (var y in window["relateduserpreferences"]) {
      for (var v in window["relateduserpreferences"][y]["preference"]) {
        var flagp = 0
        for (var c in window["currpreferencesrelatedusers"]) {
          if (window["currpreferencesrelatedusers"][c]["genre"] === window["relateduserpreferences"][y]["preference"][v]["genre"]) {
            flagp = 1
            window["currpreferencesrelatedusers"][c]["p_marks"] += window["relateduserpreferences"][y]["preference"][v]["preference_score"]
          }
        }
        if (flagp === 0) {
          window["currpreferencesrelatedusers"].push({ "genre": window["relateduserpreferences"][y]["preference"][v]["genre"], "p_marks": window["relateduserpreferences"][y]["preference"][v]["preference_score"] })
        } else {

        }
      }
    }
    console.log(window["currpreferencesrelatedusers"])
    console.log(window["currentpreference"])
    const currdate = new Date()
    for (var y in currentmovies) {
      var dt = new Date(parseInt(currentmovies[y]["release_date"].split("/")[2]), parseInt(currentmovies[y]["release_date"].split("/")[1]), parseInt(currentmovies[y]["release_date"].split("/")[0]))
      var diff = (currdate.getTime() - dt.getTime()) / 86400000;
      var l = -diff * diff / 10000000
      window["currmovies"][y].timedeltas = parseFloat((Math.pow(2.7, l) * 100).toFixed(3))
      var relatedp = 0
      var userp = 0
      for (var h in currentmovies[y]["genres"]) {
        for (var v in window["currpreferencesrelatedusers"]) {
          if (window["currpreferencesrelatedusers"][v]["genre"] === currentmovies[y]["genres"][h]) {
            relatedp += window["currpreferencesrelatedusers"][v]["p_marks"]
            break
          }
        }
        for (var u in window["currentpreference"]) {
          // console.log(currentpreference[u])
          if (window["currentpreference"][u]["genre"] === currentmovies[y]["genres"][h]) {
            userp += window["currentpreference"][u]["preference_score"]
            break
          }
        }
      }
      console.log(relatedp)
      window["currmovies"][y].relatedp = relatedp
      window["currmovies"][y].userp = userp
      window["currmovies"][y].totalr = relatedp + userp + window["currmovies"][y].timedeltas
      // console.log((Math.pow(2.7, l)*100).toFixed(3))
    }
    console.log(window["currmovies"])
    window["currmovies"].sort(function (a, b) { return b["totalr"] - a["totalr"] })
    console.log(window["currmovies"])
    setdisplaymovies(window["currmovies"])

  }
  return (
    <>
      <div style={{ backgroundImage: `url(${homepagebg})` }} className='flex justify-center min-h-screen align-items-center text-center flex-col'>
        <h1 className=' text-4xl text-white font-bold'>Movie recommendation Portal</h1>
        <div className='flex flex-col justify-center text-center w-full'>
          <h1 className=' text-2xl text-white'> Fill in the user id for which you wanna see the recommendation </h1>
          <div className="flex flex-row justify-center">
            <input type="text" id='userid' autoComplete='off' placeholder='Please Enter the user ID.' className=' w-3/12 h-6 rounded-2xl pl-3 m-2 ' />
          </div>
          <div className="flex flex-row justify-center">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-2/12 rounded-3xl' onClick={() => showresults()}>Show Recommendation</button>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col">
          <>
                  <div className="flex flex-row">
                    <span className="mx-3"><h1 className=" font-extrabold text-white text-lg">Sr. No.</h1></span>
                    <span className="mx-3"><h1 className=" font-extrabold text-white text-lg">Movie ID</h1></span>
                    <span className="ml-[60px] mr-[250px]"><h1 className=" font-extrabold text-white text-lg">Movie Name</h1></span>
                    <span className="mx-3"><h1 className=" font-extrabold text-white text-lg">Release Date</h1></span>
                  </div>
                </>
            {
              displaymovies.length > 0 &&
              displaymovies.map((element, index) => {
                return <>
                  <div className="flex flex-row">
                    <span className="mx-10"><h1 className=" font-bold text-white text-lg">{index + 1}</h1></span>
                    <span className="mx-10"><h1 className=" font-bold text-white text-lg">{element["movie_id"]}</h1></span>
                    <span className="ml-10 mr-[250px]"><h1 className=" font-bold text-white text-lg">{element["movie_name"]}</h1></span>
                    <span className="mx-10"><h1 className=" font-bold text-white text-lg">{element["release_date"]}</h1></span>
                  </div>
                </>
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
