define("page/page_bill", ["page/page_bill_temp","pingpp","layer"], function (a, b, c) {

    var tmpHtml = a("page/page_bill_temp");
    var layer = a("layer");
    var pingpp = a("pingpp");

    var showMsg = function (msg, t) {
        layer.open({
            content: msg,
            style: 'background-color:white; color:#333; border:none;text-align:center;',
            time: t
        });
    };


    function pay(){
        pingpp.createPayment(window.charge, function(result, error){
            if (result == "success") {
                layer.msg("成功",{time:99999});
                // 微信公众账号支付的结果会在这里返回
            } else if (result == "fail") {
                layer.msg("失败",{time:99999});
                // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result == "cancel") {
                layer.msg("取消",{time:99999});
                // 微信公众账号支付取消支付
            }
        });
    }

    function main(){

        $.jsonp({
            url: _BASEURL + "/Order/info/?_method=GET",
            callbackParameter: "callback",
            data: {
                "_id": _proID
            },
            success: function(data) {
                var data = $.parseJSON(data);
                var code = data.code;
                if (code == 0) {

                    window.charge = data.charge;

                    //填充模版
                    $('body').append(tmpHtml);
                    var html = template('tmp_bill', data);
                    $('#main_container').append(html);
                    //---------------------------
                    //绑定事件
                    $('#pingPay').click(pay);

                } else {
                    showMsg(data.msg,2);
                }
            }
        });




    }

    c.exports = {
        main: main
    };
});