APP.PlayView = Backbone.View.extend({
	template: _.template("<div id='player'></div>"),


	render: function() {
		console.log('hit render function on playView');
		this.$el.html(this.template({}));
		SC.initialize({
			client_id: 'ade20f5a5c1192b296a1eee39293292e'
		});
		SC.get('/tracks/119856595', function(track) {
			SC.oEmbed(track.permalink_url, document.getElementById('player'));
		});
	}
});