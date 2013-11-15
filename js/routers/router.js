APP.Router = Backbone.Router.extend({
	routes: {
		"first": "firstRoute",
		"second": "secondRoute",
		"songs": "songs",
		"": "songs"
	},

	firstRoute: function() {
		console.log("firstRoute() was hit.");
		APP.usersCollection = new APP.Users();
		APP.usersCollection.create({
			name: "colin",
			phone: "234-234-2342"
		});
		APP.usersCollection.create({
			name: "dan",
			address: "Seattle"
		});
	},

	secondRoute: function() {

		APP.usersCollection = new APP.Users();
		APP.usersCollection.fetch();
		console.dir(APP.usersCollection);
		console.log("secondRoute() was hit");
	},

	songs: function() {
		console.log('songs route was hit');
		APP.songsCollection = new APP.Songs();
		var newView = new APP.SearchResultsView({
			collection: APP.songsCollection
		});
		console.log(newView);
		newView.render();
		$(document.body).append(newView.$el);
		console.log(newView);
	}
});

APP.router = new APP.Router();
Backbone.history.start({
	root: "/"
});