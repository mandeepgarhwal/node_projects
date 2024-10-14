const express = require("express")
const usersrouter = express.Router()
const {registerauser, fetchallusers} = require("../controller/users_controller")

usersrouter.get("/", fetchallusers)

usersrouter.post("/", registerauser)

module.exports =  usersrouter