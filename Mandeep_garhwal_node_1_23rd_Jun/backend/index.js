const express = require("express")
require("dotenv").config()
const notesrouter = require("./Routes/notesroute")
const DBcollection = require("./DBconnection")
const cors = require("cors")
const usersrouter = require("./Routes/userroutes")

PORT = process.env.PORT

const app = express()

DBcollection()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/app/notes", notesrouter)

app.use("/app/users", usersrouter)



// app.get("/", (req, res) =>{
//     res.send("<h1>This is home route of my new express app")
// })





app.listen(PORT, () => {
    console.log(`Server is now online at port : ${PORT} `)
})





