SC.initialize({
  client_id: 'ade20f5a5c1192b296a1eee39293292e'
});

$(document).ready(function() {
	SC.get('/tracks', { q: 'karma police' }, function(tracks) {
		$(tracks).each(function(index, track) {
			$('#results').append($('<li></li>').html(track.title + ' - ' + track.favoritings_count));
		});
	});
SC.get('/tracks/293', function(track) {
  SC.oEmbed(track.permalink_url, document.getElementById('player'));
    });

});