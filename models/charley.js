var mongoose = require('mongoose');

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

module.exports = mongoose.model("Charley", charleySchema, 'charley');