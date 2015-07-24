define("main/init", ["ui/jsonp", "wx/weixinApi", "common/main", "page/page_detail", "page/page_pdetail", "page/page_invite", "page/page_fwdetail", "page/page_appoint", "template"], function (a, b, c) {
    var page_detail = a("page/page_detail"),
        page_pdetail = a("page/page_pdetail"),
        page_appoint = a("page/page_appoint"),
        page_fwdetail = a("page/page_fwdetail"),
        page_invite = a("page/page_invite");
    a("ui/jsonp");
    template = a("template");

    var weixin = a("wx/weixinApi");

    window.CACHE = {};
    window.openid = null;
    window._proID = undefined;
    window._ListID = undefined;


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
                console.log(data);
                if(data.code==0){
                    if (data.data.storeInfo.Banner == 0) {
                        data.data.storeInfo.Banner = "";
                    }
                    var _storeInfo = data.data.storeInfo;

                    if (_storeInfo.userInfo.company == null) {
                        _storeInfo.userInfo.company = {
                            name: '',
                            address: ''
                        }
                    }
                    var aaa = {
                        storeId: "11111"
                    };
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
                    // 初始化
                    init();
                }
                else{
                    alert(data.msg);
                }

            }
        });
    };


    var init = function () {
        var a = location.hash,
            page = a.replace('#', "").split('/');
        if (a.length == 0) {
            location.hash = '#page_detail/0';
        }
        goPage(page);
    };

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
        };
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

        // 无论如何都要隐藏第一个div
        $('#main_container > div:first-child').hide();
        // 默认动画效果是左滑动
        var animationType = 'left';

        var hanlder = function () {
            var cache = $('#main_container > div#' + page[0]);
            $('#main_container > div').hide();
            if (cache.length > 0) {
                //预约和邀约界面不被缓存
                if (page[0] == 'page_appoint' || page[0] == 'page_bill') {
                    $('#main_container > div#' + page[0]).remove();
                    goPage(page);
                }
                else if (CACHE[page[0]] != undefined || page[0] == 'page_detail') {
                    if (CACHE[page[0]] == page[1] || page[0] == 'page_detail') {
                        var wx_title = $(cache).find("input[id^='wx_title']").val(),
                            wx_desc = $(cache).find("input[id^='wx_desc']").val(),
                            wx_imgUrl = $(cache).find("input[id^='wx_imgUrl']").val();
                        var wx_data = {
                            title: wx_title,
                            desc: wx_desc,
                            imgUrl: wx_imgUrl
                        }

                        wx.onMenuShareAppMessage(wx_data);
                        wx.onMenuShareTimeline(wx_data);
                        wx.onMenuShareQQ(wx_data);
                        wx.onMenuShareWeibo(wx_data);

                        $(cache).show();
                        if (page[0] == 'page_detail') {
                            $('.s-nav > div:eq(' + _ListID + ')').click();
                        }
                    }
                    else {
                        $('#main_container > div#' + page[0]).remove();
                        CACHE[page[0]] = page[1];
                        goPage(page);
                    }
                }
                else {
                    CACHE[page[0]] = page[1];
                    goPage(page);
                }
            }
            else {
                CACHE[page[0]] = page[1];
                goPage(page);
            }
        };
        hanlder();


    };

    // 渲染页面
    var goPage = function (page) {
        CACHE[page[0]] = page[1];
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
            case 'page_fwdetail':

                _proID = page[1];
                page_fwdetail.main();
                break;
            case 'page_appoint':

                _proID = page[1];
                page_appoint.main();
                break;
            case 'page_invite':

                _proID = page[1];
                page_invite.main();
                break;
            default:
                _ListID =0;
                page_detail.main();

        }
    };
    $(window).bind('hashchange', function (e) {
        $("div[id^='layermbox']").remove();
        changePage();
    });
    getWxSign();

});