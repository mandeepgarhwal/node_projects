const express = require("express")
const post_routes = express.Router();
const { addpost, fetchOnepost, fetchallposts, updatepost, deletepost, deleteAllposts}= require("../controllers/postController")


post_routes.post("/", addpost)
post_routes.get("/", fetchallposts)
post_routes.delete("/", deleteAllposts)
post_routes.get("/:ID", fetchOnepost)

post_routes.put("/:ID", updatepost)

post_routes.delete("/:ID", deletepost)



module.exports = post_routes