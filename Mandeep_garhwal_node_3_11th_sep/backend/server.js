const express = require("express")
const Mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const multer = require("multer");
const { s3uploadv2, s3uploadv3, s3deletev3 } = require("./s3service");

const user_routes = require("./routes/userRoutes");
const movie_routes = require("./routes/movieRoutes");

PORT =  process.env.PORT || 3001;
const storage = multer.memoryStorage()
function fileFilter (req, file, cb){
    // console.log(file)
    // console.log(req.files)
    if (file.mimetype.split("/")[0] === "image"){
        cb(null, true)
    }else (
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"))
    )
}

const uploads = multer( {storage, fileFilter, limits: {fileSize: 10000000, files: 22}})
const app = express()
app.use(express.json())
app.use(express.urlencoded( { extended: true }))
app.use(cors())
app.get("/", (req,res) => {

    res.send("hello to my node project after a long time")
})

app.use("/users", user_routes)
app.use("/movies", movie_routes)
app.post("/uploads", uploads.array("files"), async (req, res) => {
    // console.log(req)
    // console.log(req.body.files)
    // console.log(typeof(req.body.files))
    console.log(req.files)
    console.log(typeof(req.files))
    // console.log(req.body.files[0])
    // console.log(req.body.files[0].name)
    // console.log(typeof(req.body.files[0]))
    const resp = await s3uploadv3(req.files)
    res.json({status : "success", response: resp})
    // res.json({status : "success", response: "Data is received"})
})
app.delete("/delete/:ID", async (req, res) => {
    const filename = `uploads/${req.params.ID}`
    const resp = await s3deletev3(filename)
    if (resp === "Error deleting fle in AWS"){
        res.json({status : "failure", repoonse: resp})
    }else {
        res.json({status : "success", repoonse: resp})
    }
    
})

app.use((error, req, res, next)=>{
    console.log("errror handling is used")
    console.log(error)
    if (error instanceof multer.MulterError){
        console.log("Multer errror is detected")
        console.log(error.code)
        if (error.code === "LIMIT_FILE_SIZE"){
            res.status(400).json({
                    "message" : "File is too large"
        })}
        else if (error.code === "LIMIT_FILE_COUNT"){
                res.status(400).json({
                        "message" : "File number limit is reached"
        })}
        else if (error.code === "LIMIT_UNEXPECTED_FILE"){
            console.log(3)
                res.status(400).json({
                        "message" : "Only image files are allowed"
            })
        }
    }else{
        console.log("New changes are working")
        console.log(error)
        res.json({status : "failure", repoonse: "Error deleting fle in AWS" })
    }
})


const db = Mongoose.connect("mongodb+srv://mandeepgarhwal:QKfeJWnCMCufdRNE@testcluster.rseylbp.mongodb.net/?retryWrites=true&w=majority")
            .then(console.log("Database is connected"))
            .catch((error)=> console.log(error))

app.listen(PORT, () => console.log("Server is running on port: "  + PORT));
