APP.SearchResultsView = Backbone.View.extend({
		tagName: "div",
		className: "results",
		template: _.template('<form class="text-center"><input id="searchField" autofocus="true" type="text" placeholder="Search for music"><button id="searchButton" type="button" class="btn btn-primary">Submit</button></form><div class="text-center" id="chart"></div>'),
		render: function() {
			this.$el.html(this.template({}));
			// this.collection.each(function(model) {
			//	APP.songView = new APP.SongView({
			//		model: model
			//	});
			//	this.$el.append(APP.songView.render().el);
			// }, this);
			// return this;
		},
		events: {
			"click #searchButton": "search",
			"click .node": "playSong"
		},
		search: function() {
			SC.initialize({
				client_id: 'ade20f5a5c1192b296a1eee39293292e'
			});
			var $search = $('#searchField').val();
			SC.get('/tracks', {
				q: $search
			}, function(tracks) {
				var result = {"children": []};

				$(tracks).each(function(index, track) {
					if (track.favoritings_count > 10) {
						result.children.push({
							name: track.title,
							id: track.id,
							size: track.favoritings_count,
							views: track.playback_count,
							comments: track.comment_count,
							genre: track.genre
						});
					}
				});


				// Create D3 bubble chart
				var r = 500,
					format = d3.format(",d"),
					fill = d3.scale.category20c();

				var bubble = d3.layout.pack()
					.sort(null)
					.size([r, r])
					.padding(1.5);

				var vis = d3.select("#chart").append("svg")
					.attr("width", r)
					.attr("height", r)
					.attr("class", "bubble");


				var node = vis.selectAll("g.node")
					.data(bubble.nodes(classes(result))
						.filter(function(d) {
							return !d.children;
						}))
					.enter().append("g")
					.attr("class", "node")
					.attr("transform", function(d) {
						return "translate(" + d.x + "," + d.y + ")";
					})
					.attr("data-id", function(d) {
						return d.id;
					});

				node.append("title")
					.text(function(d) {
						return d.className + ": " + format(d.value);
					});

				node.append("circle")
					.attr("r", function(d) {
						return d.r;
					})
					.style("fill", function(d) {
						return fill(d.packageName);
					});

				node.append("text")
					.attr("text-anchor", "middle")
					.attr("dy", ".3em")
					.text(function(d) {
						return d.className.substring(0, d.r / 3);
					});

				// Returns a flattened hierarchy containing all leaf nodes under the root.
				function classes(root) {
					var classes = [];

					function recurse(name, node) {
						if (node.children) node.children.forEach(function(child) {
							recurse(node.name, child);
						});
						else classes.push({
							packageName: name,
							className: node.name,
							value: node.size,
							id: node.id
						});
					}

					recurse(null, root);
					return {
						children: classes
					};
				}




				// Create songs collection and populate with API call results
				APP.songsCollection = new APP.Songs();
				APP.songsCollection.add(result);
				//console.log(result);

				//console.dir(APP.songsCollection);
				d3.selectAll('.node').on('click', function(context) {
					var songID = context.id;
					console.log('hit render function on playView');

					$(document.body).append("<div id='player'></div>");
					SC.initialize({
						client_id: 'ade20f5a5c1192b296a1eee39293292e'
					});
					SC.get('/tracks/'+songID, function(track) {
						SC.oEmbed(track.permalink_url, document.getElementById('player'));
					});
					
				});

			});
		},
		playSong: function() {
			//console.log(this);
			//console.log($(this).id);
			//router.navigate("#play", true);

		}
	}


);