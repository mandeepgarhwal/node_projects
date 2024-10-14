const express = require("express")
const movie_routes = express.Router();
const { addUser, fetchOneUser, fetchallusers, updateUser, deleteUser, deleteAllUsers}= require("../controllers/movieControllers")


movie_routes.post("/", addUser)
movie_routes.get("/", fetchallusers)
movie_routes.delete("/", deleteAllUsers)
movie_routes.get("/:ID", fetchOneUser)

movie_routes.put("/:ID", updateUser)

movie_routes.delete("/:ID", deleteUser)



module.exports = movie_routes