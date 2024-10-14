const notes = require("../models/notesmodel")


const postnewnote = 
    (req,res) =>{
        // res.send({
        //     "message": "A single new note added",
        //     "ID" : req.params.ID
        // })
        const newnote = {
            "title" : req.body.title,
            "body" : req.body.body,
            "oldest": false,
            "newest" : true,
            "liked"  : false,
            "disliked" : false
        }
        notes.create(newnote)
        res.status(200).json({
            "message": "A single new note added",
            "note" : newnote
        })
    }
    const deleteanote = async (req,res) =>{
        // res.send({
        //     "message": "A single new note deleted",
        //     "ID" : req.params.ID
        // })
        const ID = req.params.ID
        await notes.findByIdAndDelete(ID)
        res.status(200).json({
            "message": "A single new note deleted",
            "ID" : req.params.ID
        })
    }
    const fetchallnotes = async (req,res) =>{
        // res.send({
        //     "message": "All notes fetched"
        // })
        const data = await notes.find()
        res.status(200).json({
                "message": "All notes fetched",
                "notes"  : data
            })
    }

    const fetchsinglenote = async (req,res) =>{
        // res.send({
        //     "message": "A single note fetched",
        //     "ID" : req.params.ID
        // })
        const ID = req.params.ID
        const currentnotes = await notes.findOne({"_id": ID})
        res.status(200).json({
            "message": "A single note fetched",
            "note" : currentnotes
        })
    }
    const editanote = async (req,res) =>{
        // res.send({
        //     "message": "A single new note updated",
        //     "ID" : req.params.ID
        // }
        data = {
            "title": req.body.title,
            "body" : req.body.body,
            "oldest" : req.body.oldest,
            "newest": req.body.newest,
            "liked" : req.body.liked,
            "disliked" : req.body.disliked

        }
        const ID = req.params.ID
        await notes.findByIdAndUpdate(ID, data)
        res.status(200).json({
            "message": "A single new note updated",
            "updatednote" : data,
            "ID" : ID
        })
    }
    const deleteallnotes = async (req,res) =>{
        // res.send({
        //     "message": "All notes deleted",
        //     "ID" : "All of them"
        // })
        await notes.deleteMany({})
        res.status(200).json({
            "message": "All notes deleted",
            "ID" : "All of them"
        })
    }


    module.exports = {postnewnote, deleteanote, fetchallnotes, fetchsinglenote, editanote, deleteallnotes}
