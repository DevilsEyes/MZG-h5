define("page/page_pdetail",["ui/pbl","page/page_pdetail_temp","ui/footer","tags","iscroll_new"], function(a, b, c) {

	var foot=a("ui/footer");
	// js引擎模板
	var tmpHtml=a("page/page_pdetail_temp");
	//获得Tags
	var GetTags=a("tags");
	
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
		var html = template('tmp_pdetail', data);
		checkPage(html);
//		console.dir(data);
		if(data.tags.length!=0)
		{
			setTimeout(function(){
				var tag_is = new IScroll('#tagscroller', {
					scrollX: true
				});
			},500);
		}
		
		$("#tagscroller").css("width",(WIDTH-70)+'px');
		$("#jptfw").click(function(){
			_ListID = 1;
			window.location.href="#page_detail/1";
		})
	}
	
	// 获取数据
	var getData=function(){
//		console.log(_proID);
		var getProlist=function(){
			$.ajax({
				url: _BASEURL + "/Product/info/?_id="+_proID,
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
					
					var data = eval("(" + data + ")");
					
//					console.dir(data);
					var	productInfo = data.data.productInfo;
					var tags = GetTags(productInfo.tag);
					var dataInfo={
						"productInfo":productInfo,
						"storeInfo":STOREINFO,
						"tags":tags
					}
//					console.log(dataInfo);

					$('title').html('作品详情 - '+productInfo.title);

					$('body').append(tmpHtml);
					
					putTemp(dataInfo);


					// 微信分享
					var wx_data={
						title:$('#page_pdetail').find("input[id^='wx_title']").val(),
						imgUrl:$('#page_pdetail').find("input[id^='wx_imgUrl']").val(),
						desc:$('#page_pdetail').find("input[id^='wx_desc']").val()
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