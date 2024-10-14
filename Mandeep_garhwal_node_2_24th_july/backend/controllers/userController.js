const user = require("../models/userModel")

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
        password: req.body.password,
        userID: req.body.userID,
    }
    if (req.body.likedposts !== undefined) {
        newuser["likedposts"] = req.body.likedposts
    }
    if (req.body.dislikedposts !== undefined) {
        newuser["dislikedposts"] = req.body.dislikedposts
    }
    if (req.body.authoredposts !== undefined) {
        newuser["authoredposts"] = req.body.authoredposts
    }
    if (req.body.likedcomments !== undefined) {
        newuser["likedcomments"] = req.body.likedcomments
    }
    if (req.body.dislikedcomments !== undefined) {
        newuser["dislikedcomments"] = req.body.dislikedcomments
    }
    try {
        await user.create(newuser)
        res.status(200).json({
            "message": "New user added in"
        })
    } catch (err) {
        console.log(err)
        if (err["keyPattern"] !== undefined && err["keyPattern"]["name"] == 1) {
            res.status(500).json({
                "message": "Name has to be unique!!!",
                "error": err
            })
        } if (err["keyPattern"] !== undefined && err["keyPattern"]["userID"] == 1) {
            res.status(500).json({
                "message": "UserID has to be unique!!!",
                "error": err
            })
        }
        else {
            res.status(500).json({
                "message": "New user cannot be added",
                "error": err
            })
        }
    }


}
const deleteUser = async (req, res) => {
    const id = req.params.ID
    try {
        await user.deleteOne({ userID: id })

        res.status(200).json({
            'message': "user deleted successfully!",
            "userID": id
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
    if (req.params.ID == "search") {
        const usertosearch = {}
        if (req.body.name !== undefined) {
            // console.log(usertosearch)
            usertosearch["name"] = req.body.name
            // console.log(usertosearch)
        }
        if (req.body.userID !== undefined) {
            // console.log(usertosearch)
            usertosearch["userID"] = req.body.userID
            // console.log(usertosearch)
        }
        console.log(usertosearch)
        try {
            const data = await user.find(usertosearch)
            // console.log(data.length)
            if (data.length == 0) {
                res.status(200).json({
                    'message': "no such user exists!!!",
                    "details": data
                })
            } else {
                // console.log(data.length)
                res.status(200).json({
                    'message': `${data.length} User/s found succesfully!`,
                    "details": data
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "User can not be found",
                "error": err
            })
        }
    } else {
        const id = req.params.ID
        const newuser = {}
        if (req.body.password !== undefined) {
            newuser["password"] = req.body.password
        }
        if (req.body.name !== undefined) {
            newuser["name"] = req.body.name
        }
        if (req.body.likedposts !== undefined) {
            newuser["likedposts"] = req.body.likedposts
        }
        if (req.body.authoredposts !== undefined) {
            newuser["authoredposts"] = req.body.authoredposts
        }
        if (req.body.authoredcomments !== undefined) {
            newuser["authoredcomments"] = req.body.authoredcomments
        }
        if (req.body.dislikedposts !== undefined) {
            newuser["dislikedposts"] = req.body.dislikedposts
        }
        if (req.body.likedcomments !== undefined) {
            newuser["likedcomments"] = req.body.likedcomments
        }
        if (req.body.dislikedcomments !== undefined) {
            newuser["dislikedcomments"] = req.body.dislikedcomments
        }
        try {
            await user.updateOne({ userID: id }, { $set: newuser })
            res.status(200).json({
                'message': "user updated successfully!",
                "name": id
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "User can not be updated",
                "error": err
            })
        }
    }
}
const fetchOneUser = async (req, res) => {

    const id = req.params.ID

    try {
        const data = await user.find({ userID: id })
        console.log(data)
        if (data.length == 0) {
            res.status(200).json({
                'message': "no such user exists!!!",
                "details": data
            })
        } else {
            // console.log(data.length)
            res.status(200).json({
                'message': `${data.length} User/s found succesfully!`,
                "details": data
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "User can not be found",
            "error": err
        })
    }
}



module.exports = { addUser, fetchOneUser, fetchallusers, updateUser, deleteUser, deleteAllUsers }