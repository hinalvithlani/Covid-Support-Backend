var firebase = require('firebase')
var dotenv = require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

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
app.use(cors())

app.post("/Add", function(req, res){
    if(!validate(req.body)){
        res.json({
            status: "unsuccessful"
        })
        console.log("validation failed")
        return
    }
    var data = {name, email,phone_number, state, city, location, beds, oxygen, others} = req.body
    firebase.database().ref(req.body.state + "/"+req.body.city+"/"+req.body.location).set({name, email, phone_number, state, city, location, beds, oxygen, others});
    console.log(req.body)
    res.json({
        status: "successful"
    })
})

app.post("/state", function(req,res){
    firebase.database().ref(req.body.state).once('value')
    .then(function(snapshot) {
        var queryResponse = snapshot.val()
        var ans = []
        for(x in queryResponse){
            ans.push(x)
        }
        console.log(ans)
        res.json(ans)
    })
})

app.post("/city", function(req,res){
    firebase.database().ref(req.body.state+"/"+req.body.city).once('value')
    .then(function(snapshot) {
        var queryResponse = snapshot.val()
        console.log(queryResponse)
        res.json(queryResponse)
    })
})

app.listen(3000)

function validate(data){
    var nameRegex = /^[a-z ,.'-]+$/i
    var locationRegex = /^[0-9a-zA-Z ,]+$/i
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!data.name.match(nameRegex) || !data.city.match(nameRegex) || !data.state.match(nameRegex)){
        return false
    }
    else if(!data.location.match(locationRegex) || !data.others.match(locationRegex))
        return false
    else if(!data.email.match(emailRegex))
        return false
    else if(typeof(data.phone_number)!='number' || typeof(data.beds)!='number' || typeof(data.oxygen)!='number')
        return false
    else
        return true
}