const express = require("express")
const notesrouter = express.Router()
const {postnewnote, deleteanote, fetchallnotes, fetchsinglenote, editanote, deleteallnotes} = require("../controller/notes_controller")

// app.get("/app/notes", (req,res) =>{
//     const data = {
//         "name" : req.body.name,
//         "class" : req.body.class
//     }
//     res.send(data)
// })

notesrouter.get("/", fetchallnotes)

notesrouter.get("/:ID", fetchsinglenote)

notesrouter.post("/", postnewnote)

notesrouter.put("/:ID", editanote)

notesrouter.delete("/:ID", deleteanote)

notesrouter.delete("/", deleteallnotes)


module.exports =  notesrouter