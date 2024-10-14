const mongoose = require("mongoose")

require("dotenv").config()
MONGODB_URL = process.env.MONGODB_URL

function DBcollection () {
mongoose.connect(MONGODB_URL)
.then(() => console.log("Database is connected !!!!!!"))
.catch(() => console.log("Database is not connected !!!!!!"))
}

module.exports = DBcollection