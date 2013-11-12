APP.Router = Backbone.Router.extend({
	routes: {
		"first": "firstRoute",
		"second": "secondRoute",
		"users": "users"
	},

	firstRoute: function() {
		console.log("firstRoute() was hit.");
		APP.usersCollection = new APP.Users();
		APP.usersCollection.create({name:"colin", phone: "234-234-2342"});
		APP.usersCollection.create({name:"dan", address: "Seattle"});
	},

	secondRoute: function() {

		APP.usersCollection = new APP.Users();
		APP.usersCollection.fetch()
		console.dir(APP.usersCollection);
		console.log("secondRoute() was hit");
	},

	users: function() {
		APP.usersCollection = new APP.Users();
		APP.usersCollection.create({name:"colin", phone: "234-234-2342"});
		APP.usersCollection.create({name:"dan", address: "Seattle"});
		console.log('test');
	}
});

APP.router = new APP.Router();
Backbone.history.start({root: "/"});
