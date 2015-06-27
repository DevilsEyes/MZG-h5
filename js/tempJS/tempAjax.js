/**
 * JS模板引擎 通过ajax获取data，然后返回填充页面
 */

define("tempJS/tempAjax", ["jquery", "template"], function(a, b, c) {
	var template = a("template");
	$.ajax({
		url: "http://123.57.42.13/V1.0.0/Product/list/?storeId=100000001",
	    dataType : "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		type: "GET",
		success: function(data) {
			var data=eval("("+data+")");
			console.log(data);
			var html = template('test', data);
			document.getElementById('content').innerHTML = html;

		}
	});
});