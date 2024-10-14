const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema(
    {
        name : {
            type: String, 
            required: [true],
            unique : [true]
        },
        movieID : { 
            type: String, 
            required: [true],
            unique: [true]
        },
        pictureurl : {
            type: String,
            required : [true]
        },
        genre : {
            type : String,
            required : [true]
        }, 
        description : {
            type : String,
            required : [true]
        }, 
        year : {
            type : String,
            required : [true]
        }
    },
    {
        timestamp: true
    }
)
const movie = mongoose.model( 'movies', movieSchema )

module.exports = movie;