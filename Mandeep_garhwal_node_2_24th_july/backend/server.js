const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors");
const user_routes = require("./routes/userRoutes");
const post_routes = require("./routes/postRoutes");
const comment_routes = require("./routes/commentRoutes");
var bodyParser = require('body-parser')
PORT =  process.env.PORT || 5000;
const app = express()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.get("/", (req,res) => {
    res.send("hello to my mini reddit clone")
})
app.use("/users", user_routes)
app.use("/posts", post_routes)
app.use("/comments", comment_routes)
const db = mongoose.connect("mongodb+srv://mandeepgarhwal:DCmoSplDaUugLgiW@cluster0.xcuudsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
            .then(console.log("Database is connected"))
            .catch((error)=> console.log(error))

app.listen(PORT, () => console.log("Server is running on port: "  + PORT));