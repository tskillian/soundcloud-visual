var express = require("express");
var path = require("path");
var _ = require("underscore");
var flareData = require("./flareData.js");

var app = express()
			.use(express.static(__dirname,
								path.join(__dirname, "bower_components"),
								path.join(__dirname, "js")))
			.use(express.bodyParser());




app.get("/flaredata", function(req, res) {
	res.json(flareData.data);
});


app.get("/songs", function(req, res) {
	res.json(data);
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);