APP.SearchResultsView = Backbone.View.extend({
		template: _.template('<div class="text-center"><input id="searchField" autofocus="true" type="text" placeholder="Search for music"><button id="searchButton" type="button" class="btn btn-primary">Submit</button></div><div class="text-center" id="chart"></div>'),
		render: function() {
			this.$el.html(this.template({}));

		},
		events: {
			"click #searchButton": "search",
			"keypress #searchField": "searchOnEnter"
		},
		search: function() {

			// Remove bubble chart/D3 tooltip/Soundcloud player if there already is one

			if ($('.bubble')) {
				$('.bubble').remove();
			}
			if ($('#player')) {
				$('#player').remove();
			}
			if ($('.d3-tip')) {
				$('.d3-tip').remove();
			}
			// Spinner settings & initiation
			var opts = {
			lines: 13, // The number of lines to draw
			length: 20, // The length of each line
			width: 10, // The line thickness
			radius: 30, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 0, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#000', // #rgb or #rrggbb or array of colors
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: 'auto', // Top position relative to parent in px
			left: 'auto' // Left position relative to parent in px
			};

			var target = document.getElementById('chart');
			var spinner = new Spinner(opts).spin(target);
			
			// Soundcloud API call based on search input
			SC.initialize({
				client_id: 'ade20f5a5c1192b296a1eee39293292e'
			});
			var $search = $('#searchField').val();
			$('#searchField').val("");
			var totalLikes = 0;
			var genres = {};
			var ranColors = ['CC3220' ,'25CC7C', 'Bisque', 'FF7B4E', '466999', '0EF2FF',
							'2068CC','4A9973','F855FF','9725CC','AECC2B','91996D','FFE54F','8FA2FF','2B71CC'];

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

						// Assign genres a color
						if (!(track.genre in genres)) {
							console.log(ranColors);
							if (ranColors.length > 0) {
								genres[track.genre] = ranColors.pop();
							} else {
								console.log('reach else');
								genres[track.genre] = '7EA2CC'
							}
						}
					}
				});

				// Create D3 bubble chart
				var r = 500,
					format = d3.format(",d"),
					fill = 'd3.scale.category20c()';

				var bubble = d3.layout.pack()
					.sort(null)
					.size([r, r])
					.padding(1.5);

				var vis = d3.select("#chart").append("svg")
					.attr("width", r)
					.attr("height", r)
					.attr("class", "bubble");

				spinner.stop();

				// create tooltip for nodes
				var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
					return "<div class='toolTipName'>" + d.className + "</div><div class='toolTipGenre'>" + d.genre + "</div><div class='toolTipViews'" + d.views + "</div><div class='likes'><i class='fa fa-heart'></i>" + d.value + "</div>";});
				vis.call(tip);

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
					})
					.on('mouseover', tip.show)
					.on('mouseout', tip.hide);

				node.append("title")
					.text(function(d) {
						return d.className + ": " + format(d.value);
					});
					

				node.append("circle")
					.attr("r", function(d) {
						return d.r;
					})
					.attr("class", "circle")
					.style("fill", function(d) {
						return genres[d.genre];
					});

				node.append("text")
					.attr("text-anchor", "middle")
					.attr("dy", ".3em")
					.text(function(d) {
						return d.className.substring(0, d.r / 3);
					})
					.style("pointer-events", "none");

				

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
							id: node.id,
							genre: node.genre,
							views: node.views,
							proportion: node.size/totalLikes
						});
					}

					recurse(null, root);
					return {
						children: classes
					};
				}


				// Add Soundcloud player on circle click
				d3.selectAll('.node').on('click', function(context) {

					$(document.body).append("<div id='player'></div>");
					SC.initialize({
						client_id: 'ade20f5a5c1192b296a1eee39293292e'
					});
					SC.get('/tracks/' + context.id, function(track) {
						SC.oEmbed(track.permalink_url, document.getElementById('player'));
					});

				});

			});
		},

		searchOnEnter: function(e) {
			if (e.which !== 13) {
				return;
			}
			this.search();

		}
	}


);