const comment = require("../models/commentmodel")

const fetchallcomments = async (req, res) => {

    try {
        const data = await comment.find()
        res.status(200).json({
            "message": "All comments fetched",
            "comments": data
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "comments can not be fetched",
            "error": err
        })
    }

}

const addcomment = async (req, res) => {
    const newcomment = {
        authorname: req.body.authorname,
        authorID: req.body.authorID,
        commentID: req.body.commentID,
        postID: req.body.postID,
        body: req.body.body,
    }
    if (req.body.likes !== undefined) {
        newcomment["likes"] = req.body.likes
    }
    if (req.body.dislikes !== undefined) {
        newcomment["dislikes"] = req.body.dislikes
    }
    try {
        await comment.create(newcomment)
        res.status(200).json({
            "message": "New comment added in"
        })
    } catch (err) {
        console.log(err)
        if (err["keyPattern"] !== undefined && err["keyPattern"]["commentID"] == 1) {
            res.status(500).json({
                "message": "commentID has to be unique!!!",
                "error": err
            })
        }
        else {
            res.status(500).json({
                "message": "New comment cannot be added",
                "error": err
            })
        }

    }
}
const deletecomment = async (req, res) => {
    const id = req.params.ID
    try {
        await comment.deleteOne({ commentID: id })

        res.status(200).json({
            'message': "comment deleted successfully!",
            "commentID": id
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "comment can not be deleted",
            "error": err
        })
    }
}
const deleteAllcomments = async (req, res) => {

    try {
        await comment.deleteMany({})
        res.status(200).json({
            'message': "All comments deleted successfully!"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "comments can not be deleted",
            "error": err
        })
    }
}

const updatecomment = async (req, res) => {
    if (req.params.ID == "search") {
        const commenttosearch = {}
        if (req.body.authorname !== undefined) {
            // console.log(commenttosearch)
            commenttosearch["authorname"] = req.body.authorname
            // console.log(commenttosearch)
        }
        if (req.body.postID !== undefined) {
            // console.log(commenttosearch)
            commenttosearch["postID"] = req.body.postID
            // console.log(commenttosearch)
        }
        if (req.body.body !== undefined) {
            // console.log(commenttosearch)
            commenttosearch["body"] = req.body.body
            // console.log(commenttosearch)
        }
        if (req.body.commentID !== undefined) {
            // console.log(commenttosearch)
            commenttosearch["commentID"] = req.body.commentID
            // console.log(commenttosearch)
        }
        if (req.body.authorID !== undefined) {
            // console.log(commenttosearch)
            commenttosearch["authorID"] = req.body.authorID
            // console.log(commenttosearch)
        }
        console.log(commenttosearch)
        try {
            const data = await comment.find(commenttosearch)
            // console.log(data.length)
            if (data.length == 0) {
                res.status(200).json({
                    'message': "no such comment exists!!!",
                    "details": data
                })
            } else {
                // console.log(data.length)
                res.status(200).json({
                    'message': `${data.length} comment/s found succesfully!`,
                    "details": data
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "comment can not be found",
                "error": err
            })
        }
    } else {
        const id = req.params.ID
        const newcomment = {}
        if (req.body.body !== undefined) {
            newcomment["body"] = req.body.body
        }
        if (req.body.likes !== undefined) {
            newcomment["likes"] = req.body.likes
        }
        if (req.body.dislikes !== undefined) {
            newcomment["dislikes"] = req.body.dislikes
        }
        try {
            await comment.updateOne({ commentID: id }, { $set: newcomment })
            res.status(200).json({
                'message': "comment updated successfully!",
                "name": id
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "comment can not be updated",
                "error": err
            })
        }
    }
}
const fetchOnecomment = async (req, res) => {

    const id = req.params.ID

    try {
        const data = await comment.find({ commentID: id })
        console.log(data)
        if (data.length == 0) {
            res.status(200).json({
                'message': "no such comment exists!!!",
                "details": data
            })
        } else {
            // console.log(data.length)
            res.status(200).json({
                'message': `${data.length} comment/s found succesfully!`,
                "details": data
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "comment can not be found",
            "error": err
        })
    }
}



module.exports = { addcomment, fetchOnecomment, fetchallcomments, updatecomment, deletecomment, deleteAllcomments }