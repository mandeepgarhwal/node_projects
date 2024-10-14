const post = require("../models/postModel")

const fetchallposts = async (req, res) => {

    try {
        const data = await post.find()
        res.status(200).json({
            "message": "All posts fetched",
            "posts": data
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "posts can not be fetched",
            "error": err
        })
    }

}

const addpost = async (req, res) => {
    console.log("addpost is called")
    const newpost = {
        authorname: req.body.authorname,
        authorID: req.body.authorID,
        postID: req.body.postID,
        title: req.body.title,
        body: req.body.body,
    }
    if (req.body.comments !== undefined) {
        newpost["comments"] = req.body.comments
    }
    if (req.body.noofcomments !== undefined) {
        newpost["noofcomments"] = req.body.noofcomments
    }
    if (req.body.likes !== undefined) {
        newpost["likes"] = req.body.likes
    }
    if (req.body.dislikes !== undefined) {
        newpost["dislikes"] = req.body.dislikes
    }
    try {
        await post.create(newpost)
        res.status(200).json({
            "message": "New post added in"
        })
    } catch (err) {
        console.log(err)
        if (err["keyPattern"] !== undefined && err["keyPattern"]["postID"] == 1) {
            res.status(500).json({
                "message": "postID has to be unique!!!",
                "error": err
            })
        }
        else {
            res.status(500).json({
                "message": "New post cannot be added",
                "error": err
            })
        }
    }


}
const deletepost = async (req, res) => {
    const id = req.params.ID
    try {
        await post.deleteOne({ postID: id })

        res.status(200).json({
            'message': "post deleted successfully!",
            "postID": id
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "post can not be deleted",
            "error": err
        })
    }
}
const deleteAllposts = async (req, res) => {

    try {
        await post.deleteMany({})
        res.status(200).json({
            'message': "All posts deleted successfully!"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "post can not be deleted",
            "error": err
        })
    }
}

const updatepost = async (req, res) => {
    if (req.params.ID == "search") {
        const posttosearch = {}
        if (req.body.authorname !== undefined) {
            // console.log(posttosearch)
            posttosearch["authorname"] = req.body.authorname
            // console.log(posttosearch)
        }
        if (req.body.noofcomments !== undefined) {
            posttosearch["noofcomments"] = req.body.noofcomments
        }
        if (req.body.title !== undefined) {
            // console.log(posttosearch)
            posttosearch["title"] = req.body.title
            // console.log(posttosearch)
        }
        if (req.body.body !== undefined) {
            // console.log(posttosearch)
            posttosearch["body"] = req.body.body
            // console.log(posttosearch)
        }
        if (req.body.postID !== undefined) {
            // console.log(posttosearch)
            posttosearch["postID"] = req.body.postID
            // console.log(posttosearch)
        }
        if (req.body.authorID !== undefined) {
            // console.log(posttosearch)
            posttosearch["authorID"] = req.body.authorID
            // console.log(posttosearch)
        }
        console.log(posttosearch)
        try {
            const data = await post.find(posttosearch)
            // console.log(data.length)
            if (data.length == 0) {
                res.status(200).json({
                    'message': "no such post exists!!!",
                    "details": data
                })
            } else {
                // console.log(data.length)
                res.status(200).json({
                    'message': `${data.length} post/s found succesfully!`,
                    "details": data
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "post can not be found",
                "error": err
            })
        }
    } else {
        const id = req.params.ID
        const newpost = {}
        if (req.body.title !== undefined) {
            newpost["title"] = req.body.title
        }
        if (req.body.body !== undefined) {
            newpost["body"] = req.body.body
        }
        if (req.body.likes !== undefined) {
            newpost["likes"] = req.body.likes
        }
        if (req.body.dislikes !== undefined) {
            newpost["dislikes"] = req.body.dislikes
        }
        if (req.body.noofcomments !== undefined) {
            newpost["noofcomments"] = req.body.noofcomments
        }        
        if (req.body.comments !== undefined) {
            newpost["comments"] = req.body.comments
        }
        try {
            await post.updateOne({ postID: id }, { $set: newpost })
            res.status(200).json({
                'message': "post updated successfully!",
                "name": id
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "post can not be updated",
                "error": err
            })
        }
    }
}
const fetchOnepost = async (req, res) => {

    const id = req.params.ID

    try {
        const data = await post.find({ postID: id })
        console.log(data)
        if (data.length == 0) {
            res.status(200).json({
                'message': "no such post exists!!!",
                "details": data
            })
        } else {
            // console.log(data.length)
            res.status(200).json({
                'message': `${data.length} post/s found succesfully!`,
                "details": data
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            "message": "post can not be found",
            "error": err
        })
    }
}



module.exports = { addpost, fetchOnepost, fetchallposts, updatepost, deletepost, deleteAllposts }