const express = require("express")
const user_routes = express.Router();
const { addUser, fetchOneUser, fetchallusers, updateUser, deleteUser, deleteAllUsers}= require("../controllers/userControllers")


user_routes.post("/", addUser)
user_routes.get("/", fetchallusers)
user_routes.delete("/", deleteAllUsers)
user_routes.get("/:ID", fetchOneUser)

user_routes.put("/:ID", updateUser)

user_routes.delete("/:ID", deleteUser)



module.exports = user_routes