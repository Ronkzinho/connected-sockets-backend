require("dotenv/config")
const express = require("express")
const SessionController = require("./controllers/SessionController")
const EmitController = require("./controllers/EmitController")
const routes = express.Router()

routes.get("/", (req, res) => res.redirect(process.env.APP_URL))
routes.get("/users", SessionController.index)
routes.get("/teste", (req, res) => console.log("teste"))
routes.post("/users", SessionController.store)
routes.post("/emit", EmitController.store)
module.exports = routes