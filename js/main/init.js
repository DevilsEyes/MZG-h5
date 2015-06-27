define("main/init", ["ui/jsonp", "wx/weixinApi", "common/main", "page/page_detail", "page/page_pdetail", "page/page_fwdetail", "page/page_appoint", "template"], function (a, b, c) {
    var page_detail = a("page/page_detail"),
        page_pdetail = a("page/page_pdetail"),
        page_appoint = a("page/page_appoint"),
        page_fwdetail = a("page/page_fwdetail");
    a("ui/jsonp");
    template = a("template");
    var c = a("common/main"),
        hrefParamsArray = c.hrefParamsArray;
    var weixin = a("wx/weixinApi");
    storeId = hrefParamsArray["storeId"];
    if (hrefParamsArray["dev"]) DEV = hrefParamsArray["dev"];
    if (hrefParamsArray["dev2"]) DEV2 = hrefParamsArray["dev2"];
    console.log('店铺id' + storeId + '\nDEV:' + DEV);

    // 总入口
    // 获取店铺基本信息
    var getBaseInfo = function () {
        $.ajax({
            url: _BASEURL + "/Store/info/?storeId=" + storeId + '&full=true',
            dataType: "jsonp",
            jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            type: "GET",
            beforeSend: function () {

            },
            success: function (data) {
                var data = eval("(" + data + ")");
                if (data.data.storeInfo.Banner == 0) {
                    data.data.storeInfo.Banner = "";
                }
                console.dir(data);
                var _storeInfo = data.data.storeInfo;

                if (_storeInfo.userInfo.company == null) {
                    _storeInfo.userInfo.company = {
                        name: '',
                        address: ''
                    }
                }
                var aaa = {
                    storeId: "11111"
                }
                var ddd = {
                    dev: DEV,
                    dev2: DEV2,
                    storeId: "",
                    storeName: "",
                    topBanner: "",
                    createdTime: 0,
                    storeType: 0,
                    banned: 0,
                    storeNum: "",
                    description: "",
                    serviceArea: "",
                    sector: 10,
                    logo: "",
                    serviceToHome: true,
                    serviceInStore: true,
                    userInfo: {
                        userId: "",
                        secPhonenum: "",
                        name: "",
                        nickname: "",
                        avatar: "",
                        birthYear: "",
                        birthMonth: "",
                        birthDay: "",
                        gender: "",
                        wxNum: "",
                        banned: "",
                        storeId: "",
                        storeName: "",
                        storeNum: "",
                        sector: "",
                        company: {
                            name: "",
                            address: ""
                        }
                    }
                };
                $.extend(true, STOREINFO, ddd, _storeInfo);
//				console.log(STOREINFO);
                // 初始化
                init();
            }
        });
    }


    var init = function () {
        var a = window.location.hash,
            page = a.replace('#', "").split('/');
        goPage(page);
    }

    // 获取微信sign
    var getWxSign = function () {
        var wxUrl = encodeURIComponent(location.href.split('#')[0]);
        var config = function (appId, timestamp, nonceStr, signature) {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });
        }
        $.ajax({
            url: _BASEURL + "/Weixin/Public/token/?url=" + wxUrl,
            dataType: "jsonp",
            jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            type: "GET",
            async: false,
            beforeSend: function () {

            },
            success: function (data) {
                var data = eval("(" + data + ")");
//				console.log(data);
                var appId = data.data.app_id,
                    timestamp = data.data.timestamp,
                    nonceStr = data.data.noncestr,
                    signature = data.data.signature;
                config(appId, timestamp, nonceStr, signature);
                new weixin();
                getBaseInfo();
            }
        });
    }
    // 跳转页面
    var changePage = function () {

        var a = window.location.hash,
            page = a.replace('#', "").split('/');
//			console.dir(window.location.hash);
//			if(MOBILE){alert(window.location.hash+'!');}
//			console.dir(page);
        // 无论如何都要隐藏第一个div
        $('#main_container > div:first-child').hide();
        // 默认动画效果是左滑动
        var animationType = 'left';

//			=================自己写的===================
//			var page_cache =function(hash){
//				var key = hash;
//				var page = hash.replace('#', "").split('/');
//				if(CACHELIST.length==0){
//					CACHELIST[0]={"key":key,"inner":""};
//					goPage(page);
//				}
//				else{
//					for(var i=0;i<CACHELIST.length;i++){
//						if(key==CACHELIST[i].key){
//							//匹配到该页面的缓存，做一些事情
//							//加载页面。
//							$('#main_container').html(CACHELIST[i].inner);
//							//绑定事件							
//							
//							// 获取页面中的分享参数
//							var wx_title=$(this).find("input[id^='wx_title']").val(),
//								wx_desc=$(this).find("input[id^='wx_desc']").val(),
//								wx_imgUrl=$(this).find("input[id^='wx_imgUrl']").val();
//							var wx_data = {
//								title: wx_title,
//								desc: wx_desc,
//								imgUrl: wx_imgUrl
//							}
//							
//							wx.onMenuShareAppMessage(wx_data);
//							wx.onMenuShareTimeline(wx_data);
//							wx.onMenuShareQQ(wx_data);
//							wx.onMenuShareWeibo(wx_data);
//						}
//					}
//					if(i==CACHELIST.length){
//						//没有匹配到该页面的缓存，做一些事情
//					}
//				}
//				
//			}
//			page_cache(a);
//          ================================================================


        // 获取main_container里的子元素的个数，若为1个，则append，若2个则删除最后一个再append
        var hanlder = function () {
            var isHasPg = false;
            var len = $('#main_container > div').length;
            $('#main_container > div').each(function (index) {
//					console.log(index);
                if (index == 0) {
                    var id = $(this).attr('id');
                    if (id == page[0]) {

                        // 获取页面中的分享参数
                        var wx_title = $(this).find("input[id^='wx_title']").val(),
                            wx_desc = $(this).find("input[id^='wx_desc']").val(),
                            wx_imgUrl = $(this).find("input[id^='wx_imgUrl']").val();
                        var wx_data = {
                            title: wx_title,
                            desc: wx_desc,
                            imgUrl: wx_imgUrl
                        }

                        wx.onMenuShareAppMessage(wx_data);
                        wx.onMenuShareTimeline(wx_data);
                        wx.onMenuShareQQ(wx_data);
                        wx.onMenuShareWeibo(wx_data);

                    }

//						console.log(
//							"|--"+"id:"+id
//						   +"\n   page:"+page[0]
//						   +"\n   bool:"+(id==page[0]&&page[0]!="page_appoint"));
                    if (id == page[0] && page[0] != "page_appoint") {


//							console.log("  |--"+(page[0]=="page_detail"));
                        if (page[0] == "page_detail") {
                            isHasPg = true;
                            if (page[1] == undefined) {
                                _ListID = 0
                            }
                            else {
                                _ListID = page[1];
                            }
                            $('#main_container > div').hide();
                            $('#main_container > div#' + page[0]).show();
                            $('.s-nav > div:eq('+_ListID+')').click();
                            if (PROH) {
                                if (MOBILE) {
                                }
                                else {
                                    window.scrollTo(0, PROH[PAGETAB]);
                                }
                            }
                        }
                        else {
                            $('#main_container > div#' + page[0]).remove();
                            $('#main_container > div#page_detail').hide();
                            goPage(page);
                        }

                        // 获取页面中的title
                        var t = $(this).find("input[id^='title']").val();
                        $('title').html(t);


                        return false;
                    }

                    // else if(id==page[0]&&page[0]=="page_appoint")
                    // {
                    // 	$('#main_container > div#page_appoint').remove();
                    // 	return false;
                    // }

                }
            });
            if (!isHasPg) {
                goPage(page);
            }
        }
        hanlder();


    }

    // 渲染页面
    var goPage = function (page) {
//		console.log(page);
        $("script[id^='tmp']").remove();
        switch (page[0]) {
            case 'page_detail':
                if (page[1] == undefined) {
                    _ListID = 0
                }
                else {
                    _ListID = page[1];
                }
                page_detail.main();
                break;
            case 'page_pdetail':
                _proID = page[1];
                page_pdetail.main();
                break;
            case 'page_appoint':

                _proID = page[1];
                page_appoint.main();
                break;
            case 'page_fwdetail':

                _proID = page[1];
                page_fwdetail.main();
                break;
        }
    }
    $(window).bind('hashchange', function (e) {

        $("div[id^='layermbox']").remove();

        changePage();
    });
    getWxSign();

});