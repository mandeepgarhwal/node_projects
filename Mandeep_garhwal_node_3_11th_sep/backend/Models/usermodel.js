const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String, 
            required: [true]
        },
        userID : { 
            type: String, 
            required: [true],
            unique: true
        },
        likedmovies : {
            type: String,
            required : [false]
        },
        likedgenre : {
            type: String,
            required : [false]
        },
        password : {
            type : String,
            required : [true]
        }, 
        email : {
            type : String,
            required : [true],
            unique : [true]
        }, 
        mobile : {
            type : String,
            required : [true],
            unique : [true]
        },
        usertype : {
            type : String,
            required : [true]
        }
    },
    {
        timestamp: true
    }
)
const user = mongoose.model( 'netflixuser', userSchema )

module.exports = user;