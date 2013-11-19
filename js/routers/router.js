APP.Router = Backbone.Router.extend({
	routes: {
		"first": "firstRoute",
		"second": "secondRoute",
		"play": "play",
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
		APP.songsCollection = new APP.Songs();
		var newView = new APP.SearchResultsView({
			collection: APP.songsCollection
		});
		newView.render();
		$(document.body).append(newView.$el);
	},

	play: function() {
		console.log('play route hit');
		APP.song = new APP.Song();
		var playView = new APP.PlayView({
			model: APP.song
		});
		playView.render();
		$(document.body).append(playView.$el);
	}
});

APP.router = new APP.Router();
Backbone.history.start({
	root: "/"
});