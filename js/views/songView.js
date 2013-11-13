APP.SongView = Backbone.View.extend({
	tagName: "li",

	template: _.template("<h3> <%= id %> </h3> <p> <%= song %> </p>"),

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
                return this;
	}
})