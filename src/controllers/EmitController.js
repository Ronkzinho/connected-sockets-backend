const User = require("../models/User")
const { admin } = require("../firebase")
module.exports = {
    async store(req, res){
        var user = await User.findOne({ email: req.body.email })
        if(!user){
            return res.send({ error: "Usuário não encontrado" })
        }
        if(!req.connectedUsers[user._id]){
            user.devices.map(c => {
                admin.messaging().sendToDevice(c, { 
                notification: {
                    title: "Connected Sockets",
                    body: req.body.msg,
                }
            })
            })
        }
        else{
            req.io.to(req.connectedUsers[user._id]).emit("teste", { msg: req.body.msg })
        }
        return res.send({ sucess: true })
    }
}