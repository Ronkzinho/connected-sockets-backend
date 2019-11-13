const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    devices: Array
})

module.exports = mongoose.model("User", UserSchema)