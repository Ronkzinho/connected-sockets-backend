require("dotenv/config")
const firebase = require("firebase")
const admin = require("firebase-admin")
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)

firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseConfig)

module.exports.firebase = firebase
module.exports.admin = admin