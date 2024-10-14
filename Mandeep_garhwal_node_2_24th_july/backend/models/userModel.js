const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true],
        unique: true
    }, 
    userID: {
        type: String,
        required: [true],
        unique: true
    }, 
    password: {
        type: String,
        required: [true]
    },
    authoredposts: {
        type: String,
        default: ""
    },
    authoredcomments: {
        type: String,
        default: ""
    },
    likedposts: {
        type: String,
        default: ""
    },
    dislikedposts: {
        type: String,
        default: ""
    },
    likedcomments: {
        type: String,
        default: ""
    },
    dislikedcomments: {
        type: String,
        default: ""
    },
},
{
    timestamp: true
}
)

const User = mongoose.model("redditUser", userSchema)

module.exports = User;
