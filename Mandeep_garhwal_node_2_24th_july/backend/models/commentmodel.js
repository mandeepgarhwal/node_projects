const mongoose = require("mongoose")


const commentSchema = mongoose.Schema({
    commentID: {
        type: String,
        required: [true],
        unique: true
    }, 
    postID: {
        type: String,
        required: [true]
    },
    authorID: {
        type: String,
        required: [true]
    },
    authorname: {
        type: String,
        required: [true]
    },
    body: {
        type: String,
        required: [true]
    },
    likes: {
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

const comment = mongoose.model("redditcomment", commentSchema)

module.exports = comment;
