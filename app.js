var express = require("express");
var path = require("path");
var _ = require("underscore");

var app = express()
			.use(express.static(__dirname,
								path.join(__dirname, "bower_components"),
								path.join(__dirname, "js")))
			.use(express.bodyParser());

var db = [
	{id: 1, name: "john"}
];



app.get("/hello", function(req, res) {
	res.send("Hello, World!");
});

app.get("/users", function(req, res) {
	res.json(db);
})

app.post("/users", function(req, res) {
	var id = _.reduce(db, function(memo, num) {
		{ if (num>memo) {return num}}}, 0);
	req.body.id = id;
	db.push(req.body);
	console.log(req.body);
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);