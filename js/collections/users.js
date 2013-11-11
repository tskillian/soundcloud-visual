APP.Users = Backbone.Collection.extend({
	model: APP.user,
	url: "/users"
})