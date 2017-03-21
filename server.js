var express = require('express');
var mongoose = require('mongoose');
var charley = require('./models/charley.js')

var app = express();

mongoose.connect('mongodb://localhost:27017/missing_persons');
mongoose.connection.on("open", function () {
		console.log("mongodb is connected!!");
        });

app.use(express.static('src'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/src/html/index.html');
});

app.get("/cityStateInfo", function (req, res) {
	res.sendFile(__dirname + '/src/assets/cityStateInfo.json');
});

app.get("/data", function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    charley.find(function (err, data) {
        res.send(data);
    });
});

app.get("/data/:state", function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    var state = req.params.state;
    charley.find({"State" : state}, function (err, data) {
        res.send(data);
    });
});

app.get("/data/:state/:city", function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    var state = req.params.state;
    var city = req.params.city;
    charley.find({"State" : state, "City" : city}, function (err, data) {
        res.send(data);
    });
    
});
app.listen('3000');
