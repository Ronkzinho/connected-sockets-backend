require("dotenv/config")
require("./firebase").firebase
const express = require("express")
const http = require("http")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const socketio = require("socket.io")
const ip = require("ip")
const routes = require("./routes")
const app = express()
const server = http.Server(app)
const io = socketio(server)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

var connectedUsers = {}

io.on("connection", socket => {
    var { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})
app.use(cors())
app.use((req, res, next) => {
    req.connectedUsers = connectedUsers
    return next()
})
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(routes)

server.listen(process.env.PORT || 3333, function(){
    console.log("Server logado em http://" + ip.address() + ':' + this.address().port)
})