const bcrypt = require("bcryptjs")
const User = require("../models/User")

module.exports = {
    async store(req, res){
        var user = await User.findOne({ email: req.body.email })
        if(user){
            return res.send({ error: "Usuário ja cadastrado" })
        }
        var password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
        user = User.create({
            email: req.body.email,
            password
        })
        if(req.body.device_id){
            if(user.devices.includes(req.body.device_id)){
                return
            }
            user.devices.push(req.body.device_id)
            user.save()
        }
        return res.json(user)
    },
    async index(req, res){
        var user = await User.findOne({ email: req.headers.email })
        if(!user){
            return res.send({ error: "Usuário não encontrado" })
        }
        var pC = await bcrypt.compare(req.headers.password, user.password)
        if(!pC) return res.send({ error: "Senha incorreta" })
        if(req.headers.device_id){
            if(user.devices.includes(req.headers.device_id)){
                return
            }
            user.devices.push(req.headers.device_id)
            user.save()
        }
        return res.json(user)
    }
}