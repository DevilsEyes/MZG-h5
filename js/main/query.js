define("main/query", ["ui/jsonp","common/main"], function (a, b, c) {

    var c = a("common/main"),
        hrefParamsArray = c.hrefParamsArray;

    //获取url上的参数
    window.storeId = hrefParamsArray["storeId"];
    if (hrefParamsArray["dev"]) {
        window.DEV = hrefParamsArray["dev"];
    }
    if (hrefParamsArray["dev2"]) {
        window.DEV2 = hrefParamsArray["dev2"];
    }
    if (hrefParamsArray["code"]) {
        window.CODE = hrefParamsArray["code"];
    }
    if (hrefParamsArray["state"]) {
        window.STATE = hrefParamsArray["state"];
    }

    var enCodeUni = function(str){
        var nstr =[];
        for(var i=0;i<str.length;i++){
            nstr.push(str.charCodeAt(i));
        }
        return nstr.join('o');
    };

    var deCodeUni = function(nstr){
        var ar = nstr.split('o');
        var str = '';
        for(var i=0;i<ar.length;i++){
            str += String.fromCharCode(ar[i]);
        }
        return str;
    };


    //微信中获取openid  (#page_invite页面必须获取openid)
    //if(isWX||location.href.match(/page_invite/i)){
        alert('当前url:' + location.href);

    //    if (typeof(STATE)=='undefined'&&typeof(CODE)=='undefined'){
    //
    //        var appId = 'wx57c7040dfd0ba925';
    //        var REURI = encodeURI(location.origin + location.pathname);
    //        var state = enCodeUni( location.search + location.hash );
    //        self.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
    //            + 'appid=' + appId + '&redirect_uri=' + REURI + '&response_type=code&scope=snsapi_base&state='+ state +'#wechat_redirect';
    //    }
    //    else if (CODE&&typeof(STATE)=='undefined') {
    //        //alert('尝试获取openid');
    //        $.jsonp({
    //            url: _BASEURL + "/Weixin/Public/accessToken",
    //            callbackParameter: "callback",
    //            async: false,
    //            data: {
    //                code: CODE
    //            },
    //            success: function (obj) {
    //                var obj = $.parseJSON(obj);
    //                if (obj.code == 0) {
    //                    window.OPENID = obj.data.openid;
    //
    //                    seajs.use("main/init");
    //                }
    //            }
    //        });
    //    }
    //    else if (STATE){
    //        var newurl = deCodeUni(STATE).split('#');
    //        //alert(newurl[0]);
    //        //alert(newurl[1]);
    //        //alert(location.origin + location.pathname + newurl[0] + '&code=' + CODE + '#' + newurl[1]);
    //        self.location.href = location.origin + location.pathname + newurl[0] + '&code=' + CODE + '#' + newurl[1];
    //    }
    //}
    //else{
        seajs.use("main/init");
    //}



});