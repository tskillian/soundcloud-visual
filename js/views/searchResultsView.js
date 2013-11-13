APP.SearchResultsView = Backbone.View.extend({
	tagName: "ul",
	className: "song",
	render: function() {
		this.collection.each(function(model){
			APP.songView = new APP.SongView({
				model: model
			});
			this.$el.append(APP.songView.render().el);
		}, this);
		return this;
		}

	
	});