var firebase = require('firebase')
var dotenv = require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')

var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.measurementId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
    databaseURL: process.env.databaseURL
};

firebase.initializeApp(firebaseConfig);
var app = express();
app.use(bodyParser.json())

app.post("/Add", function(req, res){
    var data = {name, email,phone_number, state, city, location, beds, oxygen, others} = req.body
    firebase.database().ref(req.body.state + "/"+req.body.city).set({name, email, phone_number, state, city, location, beds, oxygen, others});
    console.log(req.body)
    res.json({
        status: "success",
    })
})
app.listen(3000)