
function Z_DROPUI(tag, click) {
	/*tag.show();*/

	var initC = {
		"height": tag.height()
	}
	var init = function() {
		/*tag.hide();
		tag.css({
			"height":"0px"
		});*/
		click.on('click', function() {
			var bool = tag.css("display");

			if (bool == "block") {

				/*tag.css({
					"height":"0px"
				});*/
				/*setTimeout(function(){
					
					
				},510);*/
				tag.hide();
			} else {
				tag.show();
				/*setTimeout(function(){
					tag.css({
						"height":initC.height
					});

				},20);*/

			}
			var args = argsinit();
			$("#wrapper").Swipe(args);

		});
	}()
}

var checkImgDom = function() {
	var imgList = $('#scroller').find('img');
	var l = imgList.length;
	var args = argsinit();
	this.imgLen = l;
	//alert(imgList.length);
	var callback = function() {

		$("#wrapper").Swipe(args);



	};

	var check = (function(count, fn) {
		return function() {
			var c = count;

			count--;

			if (count == c - 1) {
				fn();
			}
		};
	})(imgList.length, callback);

	imgList.each(function() {
		var len = imgList.length;
		/*判断图片是否为一个*/
		if (len == 1) {

		} else {
			/*利用img的load事件，加载完后触发check方法*/
			$(this).bind('load', check)
				.attr('src', $(this).attr('src'));
		}

	});
}

function transformBox(obj, value, time) {
		var time = time ? time : 0;
		obj.css({
			'-webkit-transform': "translate3d(" + value + "px,0px,0px)",
			'-webkit-transition': time + 'ms linear'
		});
	}
	/*--add 监听手机触摸事件--*/
var jinzhi = 1;
document.addEventListener("touchstart", function(event) {
	var t = event.target.className;
	//alert(t);
	if (t != 'swipeimg') {
		jinzhi = 1;

	}
	if (jinzhi == 0) {
		e.preventDefault();
		e.stopPropagation();
	}
}, false);

function argsinit() {
	args = {
		iniT: 100,
		iniAngle: 60,
		speed: 200,
		sCallback: function(tPoint) {
			jinzhi = 0;
			tPoint.total = imgLen;
			//alert(tPoint.total);
			//$("#showT").html("touchStart"+"box宽度"+tPoint.bW+"box高度"+tPoint.bH);
		},
		mCallback: function(tPoint) {
			var t = getScrollTop();
			var _this = tPoint.self,
				_inner = _this.find("#scroller"),
				innerW = _inner.width();
			var offset = tPoint.mX + tPoint.count * innerW;


			if (Math.abs(tPoint.angle) < 70) { //单点滑动角度小于15度

				transformBox(_inner, offset, 0);
			}
			//$("#showT").html(tPoint.gStartDis+"  "+tPoint.gEndDis);
			//$("#showT").html(tPoint.rotation+"  "+tPoint.gStartAngle+"  "+tPoint.gEndAngle);
			//$("#showT").html("角度:"+tPoint.angle+"  时间:"+tPoint.duration+"<br>X轴移动距离"+tPoint.mX+"  Y轴移动距离："+tPoint.mY+"滚动条:"+t);
		},
		eCallback: function(tPoint) {

			var _this = tPoint.self,
				_inner = _this.find("#scroller"),
				innerW = _inner.width(),
				count = tPoint.count;

			function slide(d) {
				switch (d) {
					case "left":
						--count;
						break;
					case "right":
						++count;
				}
				count = (count == 1 || count == -tPoint.total) ? tPoint.count : count;
				var offset = count * innerW;
				transformBox(_inner, offset, tPoint.speed);
			}
			slide(tPoint.direction);
			//$("#showT").html("X-Y轴移动:"+tPoint.mX+"px | "+tPoint.mY+"px<br>X-Y轴限定:"+tPoint.iniL+" | "+tPoint.iniL+"<br>手势滑动方向："+tPoint.direction+"<br>total:"+2);
			tPoint.setAttr("count", count);
		}
	}
	return args;

}

function weixin(imgUrl, link, desc, title) {
	WeixinApi.ready(function(Api) {


		// 微信分享的数据
		var wxData = {
			"imgUrl": imgUrl, //放置旅游社logo或者风景图
			"link": link,
			"desc": desc,
			"title": title
		};
		/*var wxData = {
	        "imgUrl":'http://a.hiphotos.baidu.com/image/w%3D2048/sign=01cb4f819e82d158bb825eb1b43218d8/c2fdfc039245d68804fd7bcba6c27d1ed31b24e6.jpg',//放置旅游社logo或者风景图
	        "link":window.location.href,
	        "desc":'整天呆在家里不闲闷？快来旅个游吧！',
	        "title":"整天呆在家里不闲闷？快来旅个游吧"
	    };*/
		// 分享的回调
		var wxCallbacks = {
			// 分享操作开始之前
			ready: function() {
				// 你可以在这里对分享的数据进行重组
			},
			// 分享被用户自动取消
			cancel: function(resp) {
				// 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
			},
			// 分享失败了
			fail: function(resp) {
				// 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
			},
			// 分享成功
			confirm: function(resp) {
				// 分享成功了，我们是不是可以做一些分享统计呢？
			},
			// 整个分享过程结束
			all: function(resp) {
				// 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
			}
		};

		// 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
		Api.shareToFriend(wxData, wxCallbacks);

		// 点击分享到朋友圈，会执行下面这个代码
		Api.shareToTimeline(wxData, wxCallbacks);

		// 点击分享到腾讯微博，会执行下面这个代码
		Api.shareToWeibo(wxData, wxCallbacks);
	});
}

function showSearchPage(key) {
		var obj = $('.p-detail-page');
		obj.find('input').val("");
		var header = $('.nList-box');
		// var t=$('.header ').offset().top;
		// $('.p-detail-page.show').css({
		// 	"-webkit-transform":"translate3d(0,"+(50+t)+"px,0) !important"
		// });
		var pageBox = $('.main');
		if (key) {
			window.scrollTo(0, 0);
			var h = $(window).height();
			obj.show();
			header.hide();
			$('.header.busi').css({
				"min-height": "0px"
			});
			setTimeout(function() {
				obj.addClass("show");

			}, 0);
			setTimeout(function() {
				obj.find('input').trigger('focus');
			}, 300);



		} else {
			$('.header.busi').css({
				"min-height": "768px"
			});
			obj.removeClass("show");
			setTimeout(function() {
				obj.hide();
				header.show();
			}, 200);
		}
	}
	//自适应页面的高度
function initHeightMain() {

		var search = $('.p-detail-page');

		var wh = $(window).height();
		search.css({
			'-webkit-transform': 'translate3d(0,' + wh + 'px,0)'
		});

	}
	// 外卖公共组插件
	// huyingjun create by 2014-11-22
function WM_comUi() {
	// 基本变量
	var wrapper1,wrapper2,wrapper3;


	// 基于zepto 下拉菜单
	// huyingjun create by 2014-11-22
	// @params Tposition,需要放置的目标元素位置，基于顶部
	// 		   obj，下拉菜单主体
	//         clickTag，触发元素
	// 		   event,触发方式
	this.DropUi = function(Tposition, obj, clickTag, _event) {
			// 初始化位置以及样式
			console.log(Tposition + "," + obj + "," + clickTag + "," + _event);
			var init = function(Tposition, _event, obj) {
				var h = $(window).height() - 154;
				var _h=$('.pro-list-ul').height();
				console.log(_h);
				if(h<_h)
				{
					h=_h;
				}
				var t = Tposition;
				var id;
				// obj.css({
				// 	"top":t
				// });
				
				// mask点击事件
				$('.drop-mask').on(_event, function() {
					$('.drop-mask').hide();
					obj.hide();
				});

				// mask自适应
				$('.drop-mask').css({
					"height": h,
					"top": Tposition
				});
				// 添加
				
				$('.pro-list').css({
					"height": h,
				});
			}(Tposition, _event, obj)
			var fn = function() {
				clickTag.removeClass('active');
				$(this).addClass('active');
				id = $(this).attr("id");
				console.log(id);
				dropHide();
				setTimeout(function() {
					dropShow(id);
					ctrlScroll(0);
					scroll();
				}, 0);
			}
			var handler = function(_event, clickTag) {
				clickTag.on(_event, fn);
			}(_event, clickTag)

			// 下拉出现
			var dropShow = function(id) {
					obj.each(function() {
						if ($(this).hasClass(id)) {
							$(this).show();
						}
					});

					$('.drop-mask').show();
				}
				//下拉消失
			var dropHide = function() {
				obj.hide();
				$('.drop-mask').hide();
			}


		}
		var scroll=function(){

                 wrapper1 = new iScroll('wrapper1', { disableMouse: true,
                 disablePointer: true,vScrollbar:false});
                 wrapper2 = new iScroll('wrapper2', { disableMouse: true,
                 disablePointer: true,vScrollbar:false});
                 wrapper3 = new iScroll('wrapper3', { disableMouse: true,
                 disablePointer: true,vScrollbar:false});
		}
		// 菜单点击事件
		this.WraperClick=function(obj,_event){
			// 插入勾选标签
			var refesh=function(){
				
			}
			var inputSpan=function(){
				ctrlScroll(1);
				var span='<span><img src="images/c3.png"></span>';
				refesh();
				$(this).parents('.nav-list').find('p').children('span').remove();
				$(this).parents('.nav-list').find('li').removeClass('active');
				$(this).children('p').append(span);
				$(this).addClass('active');
				$(this).parents('.nav-list').hide();
				$('.drop-mask').hide();
			}
			obj.parent().each(function(){
				
				$(this).find('.on').on(_event,inputSpan);
			});
			
		}
		// 滑动控制机制
		// huyingjun create by 2014-11-22
		// @params bool,开关,1为关，0为开
	var bool;
	var ctrlScroll = function(_bool) {
		bool = _bool;

	}
	// document.addEventListener("touchstart", function(event) {
	// 	//var t=event.target.className;

	// 	if (bool == 0) {

	// 		event.preventDefault();
	// 		event.stopPropagation();
	// 	}
	// }, false);
}