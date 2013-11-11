/*
Each search the user makes will return a list of songs through the Soundcloud API.
The data of each song will be captured in this model and ultimately passed into D3
to be visualized.
*/

APP.song = Backbone.Model.extend({
	defaults: {
		title: '',
		id: '',
		likes: 0,
		views: 0,
		comments: 0
	}
})