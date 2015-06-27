define("ui/pbl1", ["imagesloaded", "wookmark","iscroll4/main"], function(a, b, c) {
	var isc=a("iscroll4/main").refresh;
	var main=function(){
		var doit=function(){
			// Prepare layout options.

			if(MOBILE){
				var options = {
					align:"left",
					itemWidth: '49%', // Optional min width of a grid item
					autoResize: true, // This will auto-update the layout when the browser window is resized.
					container: $('#Gallery1'), // Optional, used for some extra CSS styling
					offset: 5, // Optional, the distance between grid items
					outerOffset: 5, // Optional the distance from grid to parent
					flexibleWidth: '49%', // Optional, the maximum width of a grid item
//					onLayoutChanged: function(){$('#Gallery1').trigger('refreshWookmark');},
				};
			}
			else{
				var options = {
					align:"left",
					itemWidth: 300, // Optional min width of a grid item
					autoResize: false, // This will auto-update the layout when the browser window is resized.
					container: $('#Gallery1'), // Optional, used for some extra CSS styling
					offset: 8, // Optional, the distance between grid items
					flexibleWidth: 300, // Optional, the maximum width of a grid item
//					onLayoutChanged: function(){$('#Gallery1').trigger('refreshWookmark');},
				};
			}

			// Get a reference to your grid items.
			var handler = $('#Gallery1 li');
			var $window = $(window);

			if(MOBILE){
				$window.resize(function() {
					WIDTH = $(window).width();
					var w = (WIDTH - 19) * 0.5;
					
					var	newOptions = {
							itemWidth:w,
							flexibleWidth:w,
						};
					$('.prolist').css({"width": WIDTH});
	
					handler.wookmark(newOptions);
				});
			};

			// Call the layout function.
			handler.wookmark(options);
			var h = $('.prolist._fw').height();
			$('#Gallery1').attr('data-h', h);
			$('#tab').height(h);
			new isc();
		}
		$('#Gallery1').imagesLoaded().always(function(instance) {
				
			}).progress(function(instance, image) {
				var $li = $(image.img.parentNode.parentNode);
				$li.show();
				doit();
				image.img.parentNode.className = image.isLoaded ? '' : 'broken';
			});
	}
	c.exports=main;
});