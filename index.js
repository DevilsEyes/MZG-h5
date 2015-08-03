window.getParam = function () {

    var args = location.search.substring(1);
    var retval = {};
    args = args.split("&");

    for (var i = 0; i < args.length; i++) {
        str = args[i];
        var arg = str.split("=");
        if (arg.length <= 0) continue;
        if (arg.length == 1) retval[arg[0]] = true;
        else retval[arg[0]] = arg[1];
    }
    return retval;
};

MOBILE = navigator.userAgent.match(/mobile/i) != null;
isWX = navigator.userAgent.match(/MicroMessenger/i) != null;

var hrefParamsArray = getParam();

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

//URL编码解码算法
var enCodeUni = function (str) {
    return str.replace(/#/g, '*0').replace(/!/g, '*1').replace(/\?/g, '*2').replace(/=/g, '*3').replace(/&/g, '*4').replace(/\//g, '*5');
};
var deCodeUni = function (nstr) {
    return nstr.replace(/\*0/g, '#').replace(/\*1/g, '!').replace(/\*2/g, '?').replace(/\*3/g, '=').replace(/\*4/g, '&').replace(/\*5/g, '/');
};

//微信中获取openid  (#page_invite页面必须获取openid)
//if (isWX || location.href.match(/page_invite/i)) {
if (isWX) {

    if (typeof(STATE) == 'undefined' && typeof(CODE) == 'undefined') {

        var appId = 'wx57c7040dfd0ba925';
        var REURI = encodeURI(location.origin + location.pathname);
        var state = enCodeUni(location.search + location.hash);
        self.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
            + 'appid=' + appId + '&redirect_uri=' + REURI + '&response_type=code&scope=snsapi_base&state=' + state + '#wechat_redirect';
    }
    else if (STATE) {
        var newurl = deCodeUni(STATE).split('#');
        var str = location.origin + location.pathname + newurl[0] + '&code=' + CODE + '#' + newurl[1];
        history.pushState(null, document.title, str);

        var params = getParam();
        //获取url上的参数
        window.storeId = params["storeId"];
        if (params["dev"]) {
            window.DEV = params["dev"];
        }
        if (params["dev2"]) {
            window.DEV2 = params["dev2"];
        }
        if (params["code"]) {
            window.CODE = params["code"];
        }

    }
}
