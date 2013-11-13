var express = require("express");
var path = require("path");
var _ = require("underscore");
var flareData = require("./flareData.js");

var app = express()
			.use(express.static(__dirname,
								path.join(__dirname, "bower_components"),
								path.join(__dirname, "js")))
			.use(express.bodyParser());

var db = [
	{id: 1, name: "john"}
];

var data = [
	{
		song: 'test1',
		id: 1	
	},
	{
		song: 'test2',
		id: 2
	}
]
var testData = [
{title: 'Karma Police', likes: 100},
{title: 'not karma polic', likes: 0}
]


app.get("/hello", function(req, res) {
	res.send("Hello, World!");
});

app.get("/flaredata", function(req, res) {
	console.log(flareData);
	res.json(flareData.data);
});

app.get("/testdata", function(req, res) {
	res.json(testData);
})

app.get("/songs", function(req, res) {
	console.log(data);
	res.json(data);
});

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