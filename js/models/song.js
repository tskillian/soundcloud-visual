/*
Each search the user makes will return a list of songs through the Soundcloud API.
The data of each song will be captured in this model and ultimately passed into D3
to be visualized.
*/

APP.Song = Backbone.Model.extend({
	defaults: 
		{
			title: '',
			id: '',
			likes: 0,
			views: 0,
			comments: 0,
			genre: ''
		}

})

$(document).ready(function() {
	SC.initialize({
  		client_id: 'ade20f5a5c1192b296a1eee39293292e'
	});

	$('#searchButton').click(function () {
		var search = this.val()
		SC.get('/tracks', { q: search }, function(tracks) {
			var result = [];

			$(tracks).each(function(index, track) {
				if (track.favoritings_count > 10) {
					result.push({title: track.title, id: track.id, likes: track.favoritings_count,
								views: track.playback_count, comments: track.comment_count,
								genre: track.genre});
				}
			});
			console.dir(result);

		/* $(tracks).each(function(index, track) {
			$('#results').append($('<li></li>').html(track.title + ' - ' + track.favoritings_count));
		}); */
		});
	})
});