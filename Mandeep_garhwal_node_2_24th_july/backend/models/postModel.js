const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
    postID: {
        type: String,
        required: [true],
        unique: true
    }, 
    authorID : {
        type: String,
        required: [true]
    },
    authorname : {
        type: String,
        required: [true]
    },
    title: {
        type: String,
        required: [true]
    },
    body: {
        type: String,
        required: [true]
    },
    comments: {
        type: String,
        default: ""
    },
    likes: {
        type: Number,
        default: 0
    },
    noofcomments: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number, 
        default: 0
    }
},
{
    timestamp: true
}
)

const post = mongoose.model("redditPost", postSchema)

module.exports = post;
