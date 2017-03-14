var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/missing_persons');
mongoose.connection.on("open", function () {
	console.log("mongodb is connected!!");
});

var app = express();

app.use(express.static(__dirname + '/src/'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/src/html/index.html');
});

app.get("/state", function (req, res) {

    charley.find(function (err, data) {
	    res.send(data);
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
