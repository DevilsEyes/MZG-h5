define("iscroll4/main", ["iscroll", "jquery", "ui/loadmore"], function(require, exports, module) {
	var wrapper0;
	var pageLoad_zpx = require("ui/loadmore").pageLoad_zpx,
		pageLoad_fw = require("ui/loadmore").pageLoad_fw;

	var pullUpEl = "";
	var isScroll = false;

	function a(pbl, pbl1) {
		var pullUpAction = function() {
			$('.s-nav > div a').each(function(index) {
				if ($(this).hasClass('active')) {
					// 加载作品秀
					if (index == 0) {
						var lastid = $('#lastid').val();
						new pageLoad_zpx(lastid, pbl);


					}
					// 加载服务
					else if (index == 1) {

						var latestIndex = $('#Gallery1 li').length;
						new pageLoad_fw(latestIndex, pbl1);
					}
				}
			});

		}

		var args = {
			disableMouse: true,
			disablePointer: true,
			hScrollbar: false,
			vScrollbar: true,
			hideScrollbar: false,
			//						momentum:false,
			onRefresh: function() {

				$('.s-nav > div a').each(function(index) {
					if ($(this).hasClass('active')) {
						if (index == 0) {
							pullUpEl = document.getElementById('pullUp1');
						} else if (index == 1) {
							pullUpEl = document.getElementById('pullUp2');
						}
					}
				});
				if (pullUpEl != null) {
					if (pullUpEl.className.match('ready')) {

						pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多';
					}
				}

			},
			onScrollMove: function() {
				// if (this.y < 0 && this.y < (this.maxScrollY + 5) && !pullUpEl.className.match('flip')) {
				// 	pullUpEl.className = 'flip';
				// 	pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开刷新';
				// 	this.maxScrollY = this.maxScrollY;
				// } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				// 	pullUpEl.className = '';
				// 	pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
				// 	this.maxScrollY = this.maxScrollY;
				// }
				isScroll = true;
				PROH[PAGETAB] = this.y;
				if (pullUpEl) {
					if (this.y < 0 && this.y < (this.maxScrollY + 360) && pullUpEl.className.match('ready')) {

						if (pullUpEl.getAttribute('data-is') == "active") {

							pullUpAction(); // Execute custom function (ajax call?)
						}
					}
				}


			},
			onScrollStart: function() {
				setTimeout(function() {
					if (isScroll) {
						$('#COVER').css('display', 'block');
						console.log('show');
					}
				}, 100);

			},
			onScrollEnd: function() {
				isScroll = false;
				PROH[PAGETAB] = this.y;
				if (this.y < -192 && NAVFIXED == false) {
					NAVFIXED = true;
					$("#d2nav").show();
				}
				if (this.y > -192 && NAVFIXED == true) {
					NAVFIXED = false;
					$("#d2nav").hide();
				}

				if (this.y < 0 && this.y < (this.maxScrollY + 360) && pullUpEl.className.match('ready')) {
					if (pullUpEl.getAttribute('data-is') == "active") {

						pullUpAction(); // Execute custom function (ajax call?)
					}
				}
				$('#COVER').css('display', 'none');
				//							setTimeout(function(){$('#COVER').hide;},100);
			}
		};

		var init = function() {
			if (typeof(wrapper0) != "undefined") {
				wrapper0.destroy();
			}

		}();

		wrapper0 = new iScroll('wd0', args);

		setInterval(function() {

			if (wrapper0.y < -192 && NAVFIXED == false) {
				NAVFIXED = true;
				$("#d2nav").show();
			}
			if (wrapper0.y > -192 && NAVFIXED == true) {
				NAVFIXED = false;
				$("#d2nav").hide();
			}
		}, 20);


	}


	var tranNav = function() {
		if (wrapper0.y < -192) {
			wrapper0.scrollTo(0, -192, 1);
		}

	}

	var tranTop = function() {
		wrapper0.scrollTo(wrapper0.x, 0, 200);
		NAVFIXED = false;
		$("#d2nav").hide();
	}

	var tranPre = function() {
		if (NAVFIXED) {
			if (PROH[PAGETAB] <= -192) {
				wrapper0.scrollTo(0, PROH[PAGETAB], 1);

			} else {
				tranNav();
			}
		}
	}

	function resh() {
		if (typeof(wrapper0) != "undefined") {
			wrapper0.refresh();
		}


	}
	module.exports = {
		create: a,
		refresh: resh,
		scrolltoTop: tranTop,
		scrolltoPre: tranPre,
	};
});