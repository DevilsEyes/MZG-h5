define("iscroll.pc/main", ["jquery", "ui/loadmore"], function(require, exports, module) {
	var wrapper0;
	var pageLoad_zpx = require("ui/loadmore").pageLoad_zpx,
		pageLoad_fw = require("ui/loadmore").pageLoad_fw;
	var pullUpEl = "";

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
		resh();

		setInterval(function() {
			if($('#main_container > div#page_detail').css('display')=='none'){return;}
			var Y = window.pageYOffset;
			PROH[PAGETAB] = Y;

			var H = $(window).height();

			
			if (Y > (window.maxHeight - H + 400) && pullUpEl.className.match('ready')) {
				if (pullUpEl.getAttribute('data-is') == "active") {
					pullUpAction(); // Execute custom function (ajax call?)
				}
			}

			if (Y > (window.maxHeight - H + 400) && pullUpEl.className.match('ready')) {
				if (pullUpEl.getAttribute('data-is') == "active") {

					pullUpAction(); // Execute custom function (ajax call?)
				}
			}

			if(Y > 304 && NAVFIXED == false){
				NAVFIXED = true;
				$("#d2nav").show();
			}
			if(Y < 304 && NAVFIXED == true){
				NAVFIXED = false;
				$("#d2nav").hide();
			}
		}, 20);

	}




	var tranPre = function(){
		var Y = window.pageYOffset;
		if(NAVFIXED){
			if(PROH[PAGETAB]>304){window.scrollTo(0,PROH[PAGETAB]);}
			else{tranNav();}
		}
		
	}

	var tranNav = function() {
		var Y = window.pageYOffset;
		if(Y>304){window.scrollTo(0,304);}
	}

	var tranTop = function() {
		window.scrollTo(0,0);
		NAVFIXED = false;
		$("#d2nav").hide();
	}

	function resh() {
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
	}

	module.exports = {
		create: a,
		refresh: resh,
		scrolltoTop: tranTop,
		scrolltoPre: tranPre,
	};
});