APP.Router = Backbone.Router.extend({
	routes: {
		"first": "firstRoute",
		"second": "secondRoute"
	},

	firstRoute: function() {
		console.log("firstRoute() was hit.");
		APP.usersCollection = new APP.Users();
		APP.usersCollection.create({name:"colin", phone: "234-234-2342"});
		APP.usersCollection.create({name:"dan", address: "Seattle"});
	},

	secondRoute: function() {
		console.log("secondRoute() was hit");
	}
});

APP.router = new APP.Router();
Backbone.history.start({root: "/"});
