APP.Router = Backbone.Router.extend({
	routes: {
		"first": "firstRoute",
		"second": "secondRoute"
	},

	firstRoute: function() {
		console.log("firstRoute() was hit.");
	},

	secondRoute: function() {
		console.log("secondRoute() was hit");
	}
});

APP.router = new APP.Router();
Backbone.history.start({root: "/"});
