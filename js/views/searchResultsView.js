APP.SearchResultsView = Backbone.View.extend({
	tagName: "ul",
	className: "song",
	template: _.template('<form class="text-center"><input id="searchField" autofocus="true" type="text" placeholder="Search for music"><button id="searchButton" type="button" class="btn btn-primary">Submit</button></form><ul id="results"></ul>'),
	render: function() {
		this.$el.html(this.template({}));
		// this.collection.each(function(model) {
		// 	APP.songView = new APP.SongView({
		// 		model: model
		// 	});
		// 	this.$el.append(APP.songView.render().el);
		// }, this);
		// return this;
	},
	events: {
		"click #searchButton": "search"
	},
	search: function() {
		console.log('worked');
		SC.initialize({
			client_id: 'ade20f5a5c1192b296a1eee39293292e'
		});
		var search = $('#searchField').val();
		//console.log(search);
		SC.get('/tracks', { q: search }, function(tracks) {
			var result = [];

			$(tracks).each(function(index, track) {
				if (track.favoritings_count > 10) {
					result.push({title: track.title, id: track.id, likes: track.favoritings_count,
								views: track.playback_count, comments: track.comment_count,
								genre: track.genre});
				}
			});
			// Create songs collection and populate with API call results
			APP.songsCollection = new APP.Songs();
			APP.songsCollection.add(result);

			console.dir(APP.songsCollection);

		});
	}
	}


);