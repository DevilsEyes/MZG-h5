define("ui/footer",["layer"],function(a, b, c) {
	var layer=a("layer");
	
	var main=function(){
		$('.wxzx').on('click',function(){
			layer.open({
				content: '<p>店主微信号</p><h2>'+STOREINFO.userInfo.wxNum+'</h2><p>长按上面文字复制</p>',
				style: 'background:white;color:#333;border:none;text-align:center;'
			});
		});
	}
	c.exports=main;
});