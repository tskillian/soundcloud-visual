//This collection will represent all songs returned by the search

APP.Songs = Backbone.Collection.extend({
	model: APP.Song,
	url: "/songs"
})