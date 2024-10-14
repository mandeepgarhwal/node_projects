const mongoose = require("mongoose") 

const usersschema = mongoose.Schema({
  
    name: {type: String, required: true},
    userId: {type: String, required: true},
    password: {type: String, required: true},
    role : {type: String, required: true}
   

})

const usersmodel = new mongoose.model("users", usersschema)

module.exports =  usersmodel