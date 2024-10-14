const express = require("express");
const movie = require("../Models/moviemodel")


// const addUser = async (req, res) => {
//     try {
//         const user1 = await user.create(req.body)
//         res.status(200).json(user1)
//     } catch (err) {
//         res.status(500).json({
//             error: err.message
//         })
//         console.log(err.message)
//     }
// }

const fetchallusers = async (req, res) => {

    try {
        const data = await movie.find()
        res.status(200).json({
            "message": "All users fetched",
            "users": data
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "Users can not be fetched",
            "error": err
        })
    }

}

const addUser = async (req, res) => {
    const newuser = {
        name: req.body.name,
        description: req.body.description,
        pictureurl: req.body.pictureurl,
        genre: req.body.genre,
        movieID: req.body.movieID,
        year: req.body.year
    }
    try {
        await movie.create(newuser)
        res.status(200).json({
            "message": "New user added in 1st try"
        })
    } catch (err) {
        console.log(err)
        if (err["keyPattern"] !== undefined && err["keyPattern"]["movieID"] == 1) {
            res.status(500).json({
                "message": "userID is already registered",
                "error": err
            })
        } else if ((err["keyPattern"] !== undefined &&  err["keyPattern"]["name"] == 1)) {
            res.status(500).json({
                "message": "phone number is already registered",
                "error": err
            })
        } else{
            res.status(500).json({
            "message": "New user cannot be added",
            "error": err
        })}
    }


}
const deleteUser = async (req, res) => {
    const id = req.params.ID
    try {
        await movie.deleteOne({ movieID: id })

        res.status(200).json({
            'message': "user deleted successfully!",
            "emplyeeID": id
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "User can not be deleted",
            "error": err
        })
    }
}
const deleteAllUsers = async (req, res) => {

    try {
        await movie.deleteMany({})
        res.status(200).json({
            'message': "All users deleted successfully!"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "User can not be deleted",
            "error": err
        })
    }
}

const updateUser = async (req, res) => {
    if (req.params.ID == "search"){
        const usertosearch = {}
        if (req.body.description !== undefined) {
            // console.log(usertosearch)
            usertosearch["description"] = req.body.description
            // console.log(usertosearch)
        }
        if (req.body.year !== undefined) {
            usertosearch["year"] = req.body.year
        }
        if (req.body.name !== undefined) {
            usertosearch["name"] = req.body.name    
        }
        if (req.body.pictureurl !== undefined) {
            usertosearch["pictureurl"] = req.body.pictureurl    
        }
        if (req.body.genre !== undefined) {
            usertosearch["genre"] = req.body.genre
        }
        if (req.body.movieID !== undefined) {
            usertosearch["movieID"] = req.body.movieID
        }
        console.log(usertosearch)
        try {
            const data = await movie.find(usertosearch)
            // console.log(data.length)
            if (data.length == 0){
                res.status(200).json({
                    'message': "no such user exists!!!",
                    "details": data
                })
            }else{
                // console.log(data.length)
                res.status(200).json({
                    'message': `${data.length} User/s found succesfully!`,
                    "details": data
            })}
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "User can not be found",
                "error": err
            })
        }
    }else{
    const id = req.params.ID
    const usertosearch = {}
    if (req.body.description !== undefined) {
        // console.log(usertosearch)
        usertosearch["description"] = req.body.description
        // console.log(usertosearch)
    }
    if (req.body.year !== undefined) {
        usertosearch["year"] = req.body.year
    }
    if (req.body.name !== undefined) {
        usertosearch["name"] = req.body.name    
    }
    if (req.body.pictureurl !== undefined) {
        usertosearch["pictureurl"] = req.body.pictureurl    
    }
    if (req.body.genre !== undefined) {
        usertosearch["genre"] = req.body.genre
    }
    try {
        await movie.updateOne({ movieID: id }, { $set: usertosearch })
        res.status(200).json({
            'message': "user updated successfully!",
            "userID": id
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "User can not be updated",
            "error": err
        })
    }
}}
const fetchOneUser = async (req, res) => {
    
    const id = req.params.ID

    try {
        const data = await movie.find({ movieID: id })
        console.log(data)
        if (data.length == 0){
            res.status(200).json({
                'message': "no such user exists!!!",
                "details": data
            })
        }else{
            // console.log(data.length)
            res.status(200).json({
                'message': `${data.length} User/s found succesfully!`,
                "details": data
        })}
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "User can not be found",
            "error": err
        })
    }}



module.exports = { addUser, fetchOneUser, fetchallusers, updateUser, deleteUser, deleteAllUsers}