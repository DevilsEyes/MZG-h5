define("ui/loadmore", [], function(a, b, c) {
	// 瀑布流
	// var pbl = a("ui/pbl");
	// var pbl1 = a("ui/pbl1");
	// 分页加载
	// lastid 已经加载的最后一个产品的id
	var pageLoad_zpx = function(lastid,fn) {
		var limit = 6;
		// var pbl = require("ui/pbl");
		$.ajax({
			url: _BASEURL + "/Product/list/?storeId=" + storeId + "&limit=" + limit + "&latest_id=" + lastid,
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			type: "GET",
			beforeSend: function() {
				$('#pullUp1').addClass('loading');
				$('#pullUp1').removeClass('ready');
				$('#pullUp1').find('.pullUpLabel').html('努力为您加载中，不要心急哦~');
			},
			success: function(data) {
				var data = eval("(" + data + ")"),
					list = data.data.list;
				var len = list.length;
				for (var i = 0; i < list.length; i++) {
					var _id = list[i]._id,
						img = list[i].images[0],
						title = list[i].title,
						num = list[i].images.length;
					var li = '<li><div>'
								+ '<a href="#page_pdetail/' + _id + '">' 
								+ '<img src="' + img + '?imageView2/0/h/320" alt=""/>'
								+ '<div class="pro_detail">'
									+ '<p class="pro_name">' + title + '</p>'
									+ '<p class="pro_fee">' + num + '张</p>'
								+ '</div>'+ '</a>'
							+ '</div></li>';
					$('.prolist._zpx ul').append(li);
					if (i == (list.length - 1)) {
						$('#lastid').val(_id);
					}
				}
				if (len < limit) {
					$('#pullUp1').hide();
					$('#pullUp1').attr('data-is','over');
				} else {
					$('#pullUp1').removeClass('loading');
					$('#pullUp1').addClass('ready');
					$('#pullUp1').find('.pullUpLabel').html('加载更多');
				}
				fn();

			}
		});
	}

		// latestIndex 已经加载的数量
	var pageLoad_fw = function(latestIndex,fn) {
		// console.log(fn);
		var limit=2;
//		console.log(_BASEURL + "/Commodity/list/?storeId=" + storeId + "&limit=" + limit + "&latestIndex=" + latestIndex);
		$.ajax({
			url: _BASEURL + "/Commodity/list/?storeId=" + storeId + "&limit=" + limit + "&latestIndex=" + latestIndex,
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			type: "GET",
			beforeSend: function() {
				$('#pullUp2').addClass('loading');
				$('#pullUp2').removeClass('ready');
				$('#pullUp2').find('.pullUpLabel').html('努力为您加载中，不要心急哦~');
			},
			success: function(data) {
				var data = eval("(" + data + ")"),
					list = data.data.list;
//				console.log(list);
				var len = list.length;
				for (var i = 0; i < list.length; i++) {
					var _id = list[i]._id,
						img = list[i].images[0],
						title = list[i].title,
						pri = list[i].price,
						qua = list[i].quantifier;
					var QUA = ['', '/ 套', '/ 天', '/ 次', '/ 张','/ 小时'];
					var li =  '<li><div>' 
								+ '<a href="#page_fwdetail/' + _id + '">' 
									+ '<img src="' + img + '?imageView2/0/h/320" alt=""/>' 
									+ '<div class="pro_detail">' 
									+ '<p class="pro_name">' + title + '</p>' 
									+ '<p class="pro_fwfee">￥ ' + pri + '</p>'
									+ '<p class="pro_qua">' + QUA[qua] + '</p>'
									+ '</div>' 
								+ '</a>' 
							+ '</div></li>';
					$('.prolist._fw ul').append(li);
				}
				if (len < limit) {
					$('#pullUp2').hide();
					$('#pullUp2').attr('data-is','over');
				} else {
					$('#pullUp2').removeClass('loading');
					$('#pullUp2').addClass('ready');
					$('#pullUp2').find('.pullUpLabel').html('加载更多');
				}
				fn();


			}
		});
	}
	c.exports={
		pageLoad_zpx:pageLoad_zpx,
		pageLoad_fw:pageLoad_fw
	};
});