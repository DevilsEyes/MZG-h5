define("page/page_fwdetail",["ui/pbl","page/page_fwdetail_temp","tags","ui/footer","tags","iscroll_new"], function(a, b, c) {
	//获得Tags
	var GetTags=a("tags");

	var foot=a("ui/footer");
	
	var GetTags=a("tags");
	// js引擎模板
	var tmpHtml=a("page/page_fwdetail_temp");
	// 点击事件
	var evt=function(){
	}
	// css样式
	var css=function(){
	}
	// 页面渲染
	var main=function(){
		getData();
	}

	// 判断页面个数
	// 
	var checkPage=function(html){
		if (isFirst && $('#main_container > div').length <= 1) {
			$('#main_container').append(html);
		} else {
			$('#main_container > div:last-child').remove();
			$('#main_container').append(html);
		}

	}

	// 填充模板
	var putTemp=function(data){
		var html = template('tmp_fwdetail', data);
		checkPage(html);
		if(data.tags.length!=0)
		{
			setTimeout(function(){
				var tag_is = new IScroll('#tagscroller', {
					scrollX: true
				});
			},100);
		}
		$("#tagscroller").css("width",(WIDTH-70)+'px');
	}
	// 获取数据
	var getData=function(){
		console.log(_proID);
		var getProlist=function(){
			$.ajax({
				url: _BASEURL + "/Commodity/info/?_id="+_proID,
				dataType: "jsonp",
				jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
				jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				type: "GET",
				beforeSend:function(){
					$('#loading').show();
					$('#main_container').hide();
				},
				success: function(data) {
					$('#loading').hide();
					$('#main_container').show();
					
					var data = eval("(" + data + ")"),
						productInfo = data.data.commodityInfo;
						
					var tags = GetTags(productInfo.tag);
					
					var QUA = ['','/ 套','/ 天','/ 次','/ 张'];
					var dataInfo={
						"productInfo":productInfo,
						"storeInfo":STOREINFO,
						"tags":tags,
						"qua":QUA[productInfo.quantifier],
					}
					console.log(dataInfo);

					$('title').html('服务详情 - '+productInfo.title);

					$('body').append(tmpHtml);
					
					putTemp(dataInfo);

					// 微信分享
					var wx_data={
						title:$('#page_fwdetail').find("input[id^='wx_title']").val(),
						imgUrl:$('#page_fwdetail').find("input[id^='wx_imgUrl']").val(),
						desc:$('#page_fwdetail').find("input[id^='wx_desc']").val()
					}
					wx.ready(function() {
						wx.onMenuShareAppMessage(wx_data);
						wx.onMenuShareTimeline(wx_data);
						wx.onMenuShareQQ(wx_data);
						wx.onMenuShareWeibo(wx_data);
					});

					
				    css();
				    evt();
				    new foot();
					
				    if($('#prodesc').length){
				    	var prodesc=$('#prodesc').html();
					    prodesc=prodesc.replace(/\n/g,"<br/>").replace(' ',"&nbsp;");
					    $('#prodesc').html(prodesc);
				    }
				}
			});
		}
		
		getProlist();
	}
	c.exports={
		main:main,
	};
});