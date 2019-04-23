var express = require('express');
var mongoose = require('mongoose');
var charley = require('./models/charley.js');
var mongoURL = process.env.MONGO_URL;

var app = express();

mongoose.connect('mongodb://' + mongoURL + ':27017/missing_persons');

app.use(express.static('src'));

app.get("*", function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/src/html/index.html');
});

app.get("/cityStateInfo", function (req, res) {
	res.sendFile(__dirname + '/src/assets/cityStateInfo.json');
});

app.get("/months", function (req, res) {
    res.sendFile(__dirname +'/src/assets/months.json');
});

app.get("/data", function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    charley.find(function (err, data) {
        res.send(data);
    });
});

app.use("/getdata", function (req, res, next) {
    req_queries = {"State" : req.query['state'], "City" : req.query['city'], "Gender" : req.query['gender']};
    
    req_date = [req.query["year"], req.query["month"], req.query["day"]];
    
    if (req_date[1] != undefined && req_date[1].length == 1) {
        req_date[1] = "0" + req_date[1];
    }
    if (req_date[2] != undefined && req_date[2].length == 1) {
        req_date[2] = "0" + req_date[2];
    }

    res.resultLimit = parseInt(req.query["resultLimit"]);
    res.skipAmount = parseInt(req.query["skipAmount"]);
    
    var search_params = {};
    for (var k in req_queries) {
        if (req_queries[k] != "") {
            search_params[k] = req_queries[k];
        }
    }

    date_string = "";
    if (req_date[0] != '') {
        date_string+= req_date[0];
    }
    if (req_date[1] != '') {
        date_string+= "-" + req_date[1] + "-";
    }
    if (req_date[2] != '') {
        date_string+= req_date[2];
    }
    
    search_params["Missing_Since"] = {$regex : date_string};
    res.search_params = search_params;
    next();
});

app.get("/getdata", function (req, res) {
    var search = charley.find(res.search_params).skip(res.skipAmount).limit(res.resultLimit);
    search.exec(function (err, data) {
        res.send(data);
    });
});

app.listen('3000', '0.0.0.0');
