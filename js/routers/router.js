APP.Router = Backbone.Router.extend({
	routes: {
		"": "songs",
	},


	songs: function() {
		APP.songsCollection = new APP.Songs();
		var newView = new APP.SearchResultsView({
			
		});
		newView.render();
		$(document.body).append(newView.$el);
	}
});

APP.router = new APP.Router();
Backbone.history.start({
	root: "/"
});