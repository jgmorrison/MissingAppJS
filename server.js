var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(express.static('src'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/src/html/index.html');
});

app.get("/cities", function (req, res) {
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

var Schema = mongoose.Schema;
    
    var charleySchema = new Schema({
        _id: 0,
        City: String,
        Name: String,
        DOB: String,
        Gender: String,
        Missing_Since: String,
        State: String,
        Height_Weight: String,
        Classification: String,
        Characteristics: String,
        Link_URL: String,
        Items: String,
        Medical_Conditions: String,
        Age: String
    });

var charley = mongoose.model("Charley", charleySchema, 'charley');

app.listen('3000');
