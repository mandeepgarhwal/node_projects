const express = require("express")
const comment_routes = express.Router();
const { addcomment, fetchOnecomment, fetchallcomments, updatecomment, deletecomment, deleteAllcomments}= require("../controllers/commentController")


comment_routes.post("/", addcomment)
comment_routes.get("/", fetchallcomments)
comment_routes.delete("/", deleteAllcomments)
comment_routes.get("/:ID", fetchOnecomment)

comment_routes.put("/:ID", updatecomment)

comment_routes.delete("/:ID", deletecomment)



module.exports = comment_routes