const mongoose = require("mongoose") 

const notesschema = mongoose.Schema({
  
    title: {type: String, required: true},
    body: {type: String, required: true},
    oldest: {type: Boolean},
    newest: {type: Boolean},
    liked: {type: Boolean},
    disliked: {type: Boolean},

})

const notesmodel = new mongoose.model("notes", notesschema)

module.exports = notesmodel