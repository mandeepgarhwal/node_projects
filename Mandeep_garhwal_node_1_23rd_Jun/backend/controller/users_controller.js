const users = require("../models/usermodel")
const registerauser = async (req,res) =>{
        // res.send({
        //     "message": "A single new note added",
        //     "ID" : req.params.ID
        // })
        const newuser = {
            "name" : req.body.name,
            "password" : req.body.password,
            "userId" : req.body.userId,
            "role" :  "admin"
        }
        await users.create(newuser)
        res.status(200).json({
            "message": "A single new note added",
            "note" : newuser
        })
    }
const fetchallusers = async (req,res) =>{
        // res.send({
        //     "message": "All notes fetched"
        // })
        const data = await users.find()
        res.status(200).json(data)
    }

    module.exports = {registerauser, fetchallusers}