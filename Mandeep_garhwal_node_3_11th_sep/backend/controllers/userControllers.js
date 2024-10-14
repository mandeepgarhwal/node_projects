const express = require("express");
const user = require("../Models/usermodel")


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
        const data = await user.find()
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
        usertype: req.body.usertype,
        password: req.body.password,
        mobile: req.body.mobile,
        userID: req.body.userID,
        email: req.body.email
    }
    if (req.body.likedmovies !== undefined) {
        newuser["likedmovies"] = req.body.likedmovies
    }
    
    try {
        await user.create(newuser)
        res.status(200).json({
            "message": "New user added in 1st try"
        })
    } catch (err) {
        console.log(err)
        if (err["keyPattern"] !== undefined && err["keyPattern"]["userID"] == 1) {
            res.status(500).json({
                "message": "userID is already registered",
                "error": err
            })
        } else if ((err["keyPattern"] !== undefined &&  err["keyPattern"]["mobile"] == 1)) {
            res.status(500).json({
                "message": "phone number is already registered",
                "error": err
            })
        }else if ((err["keyPattern"] !== undefined &&  err["keyPattern"]["email"] == 1)) {
            res.status(500).json({
                "message": "Email is already registered",
                "error": err
            })
        }
        else{
            res.status(500).json({
            "message": "New user cannot be added",
            "error": err
        })}
    }


}
const deleteUser = async (req, res) => {
    const id = req.params.ID
    try {
        await user.deleteOne({ userID: id })

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
        await user.deleteMany({})
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
        if (req.body.usertype !== undefined) {
            // console.log(usertosearch)
            usertosearch["usertype"] = req.body.usertype
            // console.log(usertosearch)
        }
        if (req.body.email !== undefined) {
            usertosearch["email"] = req.body.email
        }
        if (req.body.mobile !== undefined) {
            usertosearch["mobile"] = req.body.mobile    
        }
        if (req.body.likedmovies !== undefined) {
            usertosearch["likedmovies"] = req.body.likedmovies    
        }
        if (req.body.likedgenre !== undefined) {
            usertosearch["likedgenre"] = req.body.likedgenre    
        }
        if (req.body.password !== undefined) {
            usertosearch["password"] = req.body.password
        }
        if (req.body.name !== undefined) {
            usertosearch["name"] = req.body.name
        }
        if (req.body.userID !== undefined) {
            usertosearch["userID"] = req.body.userID
        }
        console.log(usertosearch)
        try {
            const data = await user.find(usertosearch)
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
    const newuser = {}
    if (req.body.usertype !== undefined) {
        // console.log(usertosearch)
        newuser["usertype"] = req.body.usertype
        // console.log(usertosearch)
    }
    if (req.body.email !== undefined) {
        newuser["email"] = req.body.email
    }
    if (req.body.mobile !== undefined) {
        newuser["mobile"] = req.body.mobile    
    }
    if (req.body.likedmovies !== undefined) {
        newuser["likedmovies"] = req.body.likedmovies    
    }
    if (req.body.likedgenre !== undefined) {
        newuser["likedgenre"] = req.body.likedgenre    
    }
    if (req.body.password !== undefined) {
        newuser["password"] = req.body.password
    }
    if (req.body.name !== undefined) {
        newuser["name"] = req.body.name
    }
    try {
        await user.updateOne({ userID: id }, { $set: newuser })
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
        const data = await user.find({ userID: id })
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