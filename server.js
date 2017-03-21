var express = require('express');
var mongoose = require('mongoose');
var charley = require('./models/charley.js')

var app = express();

app.use(express.static('src'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/src/html/index.html');
});

app.get("/cityStateInfo", function (req, res) {
	res.sendFile(__dirname + '/src/assets/cityStateInfo.json');
});

app.use("/data", function (req, res, next) {
	mongoose.connect('mongodb://localhost:27017/missing_persons');
	mongoose.connection.on("open", function () {
		console.log("mongodb is connected!!");
	next();
	});
});

app.get("/data", function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	charley.find(function (err, data) {
		res.send(data);
        mongoose.connection.close()
	});
});


app.listen('3000');
