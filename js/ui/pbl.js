define("ui/pbl", ["imagesloaded", "wookmark","iscroll4/main"], function(a, b, c) {
	var isc=a("iscroll4/main").refresh;
	var main=function(){
		var doit=function(){
			// Prepare layout options.

			if(MOBILE){
				var w = ($(window).width() - 19) * 0.5;
				var options = {
					align:"left",
					itemWidth: w, // Optional min width of a grid item
					autoResize: true, // This will auto-update the layout when the browser window is resized.
					container: $('#Gallery'), // Optional, used for some extra CSS styling
					offset: 5, // Optional, the distance between grid items
					outerOffset: 5, // Optional the distance from grid to parent
					flexibleWidth: w, // Optional, the maximum width of a grid item
					onLayoutChanged: function(){},
				};
			}
			else{
				var options = {
					align:"left",
					itemWidth: 300, // Optional min width of a grid item
					autoResize: false, // This will auto-update the layout when the browser window is resized.
					container: $('#Gallery'), // Optional, used for some extra CSS styling
					offset: 8, // Optional, the distance between grid items
					outerOffset: 300, // Optional the distance from grid to parent
//					onLayoutChanged: function(){$('#Gallery').trigger('refreshWookmark');},
				};
			}

			// Get a reference to your grid items.
			var handler = $('#Gallery li');
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
					// Breakpoint
	//				if (windowWidth < 1024) {
	//					newOptions.flexibleWidth = '3%';
	//				}
					handler.wookmark(newOptions);
				});
			}
			
			// Call the layout function.
			handler.wookmark(options);
			
//			console.dir(options);
			var h = $('.prolist._zpx').height();
			$('#Gallery').attr('data-h', h);
			$('#tab').height(h);
			new isc();
		}
		
		$('#Gallery').imagesLoaded().always(function(instance) {
				
			}).progress(function(instance, image) {
				var $li = $(image.img.parentNode.parentNode);
				$li.show();
				doit();
				image.img.parentNode.className = image.isLoaded ? '' : 'broken';
			});
	}
	c.exports=main;
});