define("page/page_appoint", ["icheck", "page/page_appoint_temp", "layer", "pingpp"], function (a, b, c) {
    var layer = a("layer");
    // js引擎模板
    var tmpHtml = a("page/page_appoint_temp").tmpHtml;
    var normalHtml = a("page/page_appoint_temp").normalHtml;
    var iCheck = a('icheck');

    var phoneCheck = function () {
        var phonenum = $('#tel').val();
        if (phonenum.length == 0) {
            showMsg("请填写手机号", 1);
        }
        else {
            $('#btn_getvec').addClass('btn_getvec_ed');
            $('#btn_getvec').removeClass('btn_getvec');
            $.jsonp({
                url: _BASEURL + "/Order/phonenumCaptcha?_method=GET",
                callbackParameter: "callback",
                data: {
                    phonenum: phonenum
                },
                success: function () {
                    $('#btn_getvec').text("验证码已发送");
                    showMsg("验证码已发送", 1);
                }
            });
        }
    };

    // 点击事件
    var backtoP1 = function () {
        $("#part2").hide();
        $("#part1").show();
    };

    var gotoP2 = function () {
        if (checkValue()) {
            $("#part1").hide();
            $('#channal_wx_pub').iCheck('check');
            $("#part2").show();
        }
    };

    //提示信息
    var showMsg = function (msg, t) {
        layer.open({
            content: msg,
            style: 'background-color:white; color:#333; border:none;text-align:center;',
            time: t
        });
    };

    //检查输入
    var checkValue = function () {
        var sp = $('.icheck:checked').attr('value');
        var name = $('#name').val(),
            tel = $('#tel').val(),
            address = $('#address').val(),
            apDate = $('#apDate option:checked').attr('value'),
            apTime = $('#apTime option:checked').attr('value'),
            captcha = $('#vec').val();
        if (name == "") {
            showMsg('请输入姓名', 2);
            return false;
        } else if (tel == "") {
            showMsg('请输入手机号码', 2);
            return false;
        } else if (tel.length < 7) {
            showMsg('手机号码格式不对', 2);
            return false;
        } else if (captcha.length < 6) {
            showMsg('请输入验证码', 2);
            return false;
        } else if (apDate == 0) {
            showMsg('请选择预约日期', 2);
            return false;

        } else if (apTime == 0) {
            showMsg('请选择期望时间', 2);
            return false;
        } else if (sp == 1) {
            if (address == "") {
                showMsg('请填写上门地址', 2);
                return false;
            }
        }
        return true;
    };

    var evt = function () {

        var t = new Date().getTime();
        var r = Math.random();
        var checkToken = storeId + t + r;

        var hanlder = function () {
            var GetDateStr = function (AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期----》就靠这句话
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1; //获取当前月份的日期
                var d = dd.getDate();
                return y + "年" + m + "月" + d + "日";
            };
            var addDateOption = function () {
                $('#apDate').html();
                for (var i = 0; i <= 10; i++) {
                    var d = '';
                    if (i == 0) {
                        d = '（今天）';
                    }
                    var option = '<option value=' + (i + 1) + '>' + GetDateStr(i) + d + '</option>';
                    $('#apDate').append(option);
                }
            };
            addDateOption();

            var addTimeOption = function () {
                $('#apTime').html();
                for (var i = 0; i <= 14; i++) {
                    var t1 = (8 + i) + ':00',
                        t2 = (8 + i) + ':30';

                    var op1 = '<option  date-h="' + (8 + i) + '">' + t1 + '</option>',
                        op2 = '<option  date-h="' + (8 + i) + '">' + t2 + '</option>';
                    $('#apTime').append(op1);
                    if (i != 14) {
                        $('#apTime').append(op2);
                    }

                }
            };
            addTimeOption();
            // 期望时间,若是当天 则要判断时间前后
            $('#apDate').change(function () {
                addTimeOption();
                var v = $(this).val();
                // 当天
                if (v == 1) {
                    checkTime();
                }
            });

            var checkTime = function () {
                var dd = new Date();
                var h = dd.getHours();

                var m = dd.getMinutes();
                var isHalf = 0;
                $('#apTime option').each(function () {
                    var date_h = $(this).attr('date-h');
                    if (h > date_h) {
                        $(this).remove();
                    } else if (h == date_h) {
                        var _m = $(this).html().split(':')[1];
                        if (parseInt(_m) < m) {
                            $(this).remove();
                        }

                    }
                });

            }

        };
        hanlder();
        // 监听radio
        $('.icheck').on('ifChecked', function (event) {
            var value = $(this).val();
            $('.addr0,.addr1').hide();
            $('.addr' + value).show();
        });
        $('#icheck1').iCheck('check');

        $('#btn_getvec').click(phoneCheck);


        //提交订单
        $('#postForm').unbind('click');
        $('#postForm').on('click', function () {

                var chagTime = function () {
                    var d = $('#apDate option:checked').text().replace('年', "/").replace("月", "/").replace("日", "").replace("（今天）", "");
                    var t = $('#apTime option:checked').text();
                    var date = d + ' ' + t;
                    return Date.parse(new Date(date))
                };

                var post = function () {
                    var orderFrom = isWX ? 21 : 22;
                    var sp = $('.icheck:checked').attr('value');
                    var servicePlace = sp == 0 ? 10 : 20,
                        orderAddress = servicePlace == 20 ? $('#address').val() : "",
                        customerInfo = {
                            phonenum: $('#tel').val(),
                            name: $('#name').val(),
                            gender: "",
                            wxNum: ""
                        },
                        remark = $('#msg').val(),
                        channel = 'wx_pub',
                        captcha = $('#vec').val();


                    showMsg('提交中', 2000);

                    var postdata = {
                        storeId: storeId,
                        orderTime: chagTime(),
                        servicePlace: servicePlace,
                        orderAddress: orderAddress,
                        orderFrom: orderFrom,
                        customerInfo: JSON.stringify({
                            "phonenum": $('#tel').val(),
                            "name": $('#name').val(),
                            "gender": "",
                            "wxNum": ""
                        }),
                        commodityInfo: {
                            "_id": _proID
                        },
                        captcha: captcha,
                        remark: remark
                    };

                    if (PAY) {
                        postdata.pingChannel = channel;
                        postdata.pingExtra = {
                            open_id: OPENID
                        };
                    }
                    //
                    //console.dir(postdata);
                    $.jsonp({
                            url: _BASEURL + "/Order/info/?_method=PUT",
                            callbackParameter: "callback",
                            data: postdata,
                            success: function (obj) {
                                var obj = $.parseJSON(obj);
                                var code = obj.code;

                                if (code == 0) {
                                    showMsg('提交成功', 2);

                                    var charge = obj.data.charge;
                                    var data = obj.data;

                                    if (PAY) {
                                        pingpp.createPayment(charge, function (result, error) {
                                            if (result == "success") {
                                                showMsg("支付成功", 99999);
                                                setTimeout(function () {
                                                    history.go(-1);
                                                }, 1500);
                                            } else if (result == "fail") {
                                                showMsg("失败", 99999);
                                                // charge 不正确或者微信公众账号支付失败时会在此处返回
                                            } else if (result == "cancel") {
                                                showMsg("取消", 99999);
                                                setTimeout(function () {
                                                    history.go(-1);
                                                }, 1500);
                                            }
                                        });
                                    }
                                    else {
                                        setTimeout(function () {
                                            history.go(-1);
                                        }, 1500);
                                    }
                                } else {
                                    showMsg(obj.msg, 2);
                                }

                            },
                            error:function(){
                                showMsg('您的网络不太给力哦！', 2);
                            }
                        }
                    );

                };
                if (checkValue()) {
                    post();
                }

            }
        );
    };

// css样式
    var css = function () {

    };

// 页面渲染
    var main = function () {

        getData();
    };


// 填充模板
    var putTemp = function (data) {
        var QUA = [' 元', ' 元/套', ' 元/天', ' 元/次', ' 元/张', ' 元/小时'];
        data.productInfo.qua = QUA[data.productInfo.quantifier];
        if (!(data.productInfo.deposit > 0)) {
            data.haveDesc = true;
        }
        var html = template('tmp_appoint', data);
        $('#main_container').append(html);
    };

    var putTemp1 = function (data) {
        var html = template('tmp1_appoint', data);
        $('#main_container').append(html);
    };

// 获取数据
    var getData = function () {

        var getProlist = function () {
            window.PAY = false;
            if (typeof(_proID) != "undefined" && _proID != '') {
                $.ajax({
                    url: _BASEURL + "/Commodity/info/?_id=" + _proID,
                    dataType: "jsonp",
                    jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                    jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                    type: "GET",
                    beforeSend: function () {
                        $('#loading').show();
                        $('#main_container').hide();
                    },
                    success: function (data) {

                        $('#main_container').show();

                        var data = eval("(" + data + ")"),
                            productInfo = data.data.commodityInfo;

                        var dataInfo = {
                            "productInfo": productInfo,
                            "storeInfo": STOREINFO
                        };

                        //填充模版
                        $('title').html('预约');
                        $('body').append(tmpHtml);

                        //console.dir(dataInfo);
                        //dataInfo.haveDesc = false;
                        ////dataInfo.deposit = 1;
                        //dataInfo.productInfo.deposit = 1;
                        //OPENID = 'oNyPMs7crBm9X-llnNzAWJeSiUjM';

                        putTemp(dataInfo);

                        //根据是否需要定金绑定不同事件
                        if (dataInfo.productInfo.deposit > 0) {
                            window.PAY = true;
                            $("#part2 > .pTop > a").click(backtoP1);
                            $("#CheckVec").click(gotoP2);
                        }

                        // 微信分享
                        var wx_data = {
                            title: $('#page_appoint').find("input[id^='wx_title']").val(),
                            imgUrl: $('#page_appoint').find("input[id^='wx_imgUrl']").val(),
                            desc: $('#page_appoint').find("input[id^='wx_desc']").val()
                        };
                        wx.ready(function () {
                            wx.onMenuShareAppMessage(wx_data);
                            wx.onMenuShareTimeline(wx_data);
                            wx.onMenuShareQQ(wx_data);
                            wx.onMenuShareWeibo(wx_data);
                        });
                        css();
                        evt();

                        $('.icheck').iCheck({
                            checkboxClass: 'icheckbox_square-red',
                            radioClass: 'iradio_square-red',
                            increaseArea: '20%' // optional
                        });


                    }
                });
            } else {
                $('body').append(normalHtml);
                var dataInfo1 = {
                    "storeInfo": STOREINFO
                }
                putTemp1(dataInfo1);
                // 微信分享
                var wx_data = {
                    title: $('#page_appoint').find("input[id^='wx_title']").val(),
                    imgUrl: $('#page_appoint').find("input[id^='wx_imgUrl']").val(),
                    desc: $('#page_appoint').find("input[id^='wx_desc']").val()
                }
                wx.ready(function () {
                    wx.onMenuShareAppMessage(wx_data);
                    wx.onMenuShareTimeline(wx_data);
                    wx.onMenuShareQQ(wx_data);
                    wx.onMenuShareWeibo(wx_data);
                });
                css();
                evt();
                $('.icheck').iCheck({
                    checkboxClass: 'icheckbox_square-red',
                    radioClass: 'iradio_square-red',
                    increaseArea: '20%' // optional
                });

            }
            window.scrollTo(0, 0);
            $('#loading').hide();

        };

        getProlist();
    };
    c.exports = {
        main: main
    };
})
;