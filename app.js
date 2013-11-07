var express = require("express");
var app = express();

app.get("/hello", function(req, res) {
	res.send("Hello, World!");
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);