//This collection will represent all songs returned by the search

APP.Users = Backbone.Collection.extend({
	model: APP.song,
	url: "/songs"
})