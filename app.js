var express = require("express");
var path = require("path");

var app = express()
			.use(express.static(__dirname,
								path.join(__dirname, "bower_components"),
								path.join(__dirname, "js")));

var db = {};

app.get("/hello", function(req, res) {
	res.send("Hello, World!");
});

app.post("/users", function(req, res) {
	console.log('worked');
	console.log(req);
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);