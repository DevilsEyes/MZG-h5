define("page/page_invite", ["icheck", "page/page_invite_temp","layer", "pingpp"], function (a, b, c) {

    var layer = a("layer");

    // js引擎模板
    var tmpHtml = a("page/page_invite_temp").tmpHtml;
    var data_invite = {
        haveCommodity: false,
        isExist:false,
        oldPhone: 0,
        havePay: false,
        storeInfo: STOREINFO
    };

    //弹出层提示信息
    var showMsg = function (msg, t) {
        layer.open({
            content: msg,
            style: 'background-color:white; color:#333; border:none;text-align:center;',
            time: t
        });
    };

    //ajax超时或者发生错误
    var toError = function (str) {
        alert(str);
        location.hash = "#page_detail/0";
    };

    //入口
    var main = function () {
        document.title = '服务预约';
        getInviteInfo();
    };

    //获取邀约信息
    var getInviteInfo = function () {
        $.jsonp({
            url: _BASEURL + "/Order/info?_method=GET",
            callbackParameter: "callback",
            data: {
                _id: _proID
            },
            success: function (obj) {
                obj = $.parseJSON(obj);
                console.log('getInviteInfo:');
                console.dir(obj);
                if (obj.code == 0) {
                    data_invite.inviteInfo = obj.data.orderInfo;

                    if (data_invite.inviteInfo.commodityInfo != undefined) {
                        var id = data_invite.inviteInfo.commodityInfo._id;
                    }
                    if (typeof(id) != "undefined" && id > 0) {

                        data_invite.haveCommodity = true;
                        if (typeof(billId) != "undefined" && billId > 0) {
                            data_invite.isExist = true;
                        }
                        getCommodityInfo(id, init); // ==>拉取服务信息后初始化
                    }
                    else {
                        data_invite.haveCommodity = false;
                        init(); // ==>直接初始化
                    }

                }
                else {
                    toError(obj.msg);
                }
            },
            error: function () {
                toError("网络连接不太顺畅哦~");
            }
        });
    };

    //获取服务信息
    var getCommodityInfo = function (id, next) {

        $.jsonp({
            url: _BASEURL + "/Commodity/info/?_method=GET",
            data: {
                _id: id
            },
            callbackParameter: "callback",
            beforeSend: function () {
                $('#loading').show();
                $('#main_container').hide();
            },
            success: function (obj) {
                $('#loading').hide();
                $('#main_container').show();
                obj = $.parseJSON(obj);
                if (obj.code == 0) {
                    data_invite.commodityInfo = obj.data.commodityInfo;
                    next();
                }
                else {
                    toError(obj.msg);
                }
            },
            error: function () {
                toError("网络连接不太顺畅哦~");
            }
        });
    };

    //填充模版,初始化表单控件
    var init = function () {

        //填充模版
        var putTemp = function () {

            $('title').html('预约');

            //数据补全
            if(typeof(data_invite.inviteInfo.remark)=='undefiend'){
                data_invite.inviteInfo.remark='';
            }
            if(data_invite.inviteInfo.customerInfo==null){
                data_invite.inviteInfo.customerInfo={
                    name:'',
                    phonenum:''
                }
            }

            if (data_invite.inviteInfo.deposit > 0) {
                data_invite.deposit = parseInt(data_invite.inviteInfo.deposit);
                data_invite.havePay = true;
            }

            if (data_invite.haveCommodity) {
                var QUA = [' 元', ' 元/套', ' 元/天', ' 元/次', ' 元/张', ' 元/小时'];
                data_invite.commodityInfo.qua = QUA[data_invite.commodityInfo.quantifier];
            }
            //选择模版
            $('body').append(tmpHtml);

            console.dir(data_invite);

            var html = template('tmp_invite', data_invite);
            $('#main_container').append(html);

        };
        putTemp();

        //CheckBox初始化
        var initCheckBox = function () {
            $('.icheck').iCheck({
                checkboxClass: 'icheckbox_square-red',
                radioClass: 'iradio_square-red',
                increaseArea: '20%' // optional
            });

            if (data_invite.inviteInfo.servicePlace > 0) {
                switch (data_invite.inviteInfo.servicePlace) {
                    case 10:
                        $('#icheck1').iCheck('check');
                        break;
                    case 20:
                        $('#icheck2').iCheck('check');
                        break;
                    default :
                        console.log('CheckRadio Error! Number:' + data_invite.inviteInfo.servicePlace);
                }
            } else {
                $('#icheck1').iCheck('check');
            }
            $('.icheck').on('ifChecked', function (event) {
                var value = $(this).val();
                $('.addr0,.addr1').hide();
                $('.addr' + value).show();
            });
        };
        initCheckBox();

        //时间选择控件
        var initTime = function () {
            var GetDateStr = function (AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount);
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

            };

            //如果订单中有时间的话，设置页面中的时间项与订单相同
            if (data_invite.inviteInfo.orderTime > 0) {
                var t = new Date(data_invite.inviteInfo.orderTime);
                var today = new Date();
                var date = t.getFullYear() + '年' + t.getMonth() + '月' + t.getDate() + '日' + (today.getDate() == t.getDate() ? '（今天）' : '');
                var time = t.getHours() + ':' + t.getMinutes();

                $("#apDate option").each(function (index) {
                    if ($(this).text = date) {
                        $(this).attr("selected", true);
                    }
                });
                $("#apTime option").each(function (index) {
                    if ($(this).text = time) {
                        $(this).attr("selected", true);
                    }
                });
            }

            //如果订单已经生成，就禁用所有表单元素
            if(data_invite.isExist==true){
                $('#page_invite input').prop('disabled','ture');
                $('#page_invite .icheck').iCheck('disable');
            }

        };
        initTime();

        // 微信分享
        var initWx = function () {
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
        };
        initWx();

        //初始化手机验证码控件
        var initCheckVec = function () {
            //console.log("data_invite:")
            //console.dir(data_invite);
            var pn = data_invite.inviteInfo.customerInfo.phonenum;
            if (typeof(pn) && pn > 0) {
                data_invite.oldPhone = pn;
                $('#btn_getvec').parents('div').first().hide();
            }
        };
        initCheckVec();

        //绑定事件
        var initEvent = function () {

            //console.dir(data_invite);
            $('#btn_getvec').click(e$.getVec);
            if (data_invite.oldPhone > 0) {
                $('#tel').keydown(e$.checkPho);
            }
            if (!data_invite.haveCommodity&&!data_invite.havePay) {
                data_invite.mode = 'simple';
            } else if (!data_invite.havePay) {
                data_invite.mode = 'normal';
            } else {
                data_invite.mode = 'pay';
                $('#CheckVec').click(e$.gotoP2);
                $('#part2 > .pTop > .back').click(e$.backtoP1);
            }
            $('#postForm').click(e$.postOrder);

        };
        initEvent();

        $('#loading').hide();
        window.scrollTo(0, 0);
    };

    //检查表单数据
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
        } else if (captcha.length < 6 && tel != data_invite.oldPhone) {
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

    var e$ = {

        //获取手机验证码
        getVec: function () {
            var pn = $('#tel').val();
            if (pn.length == 0) {
                showMsg("请填写手机号", 1);
            }
            else {
                $('#btn_getvec').addClass('btn_getvec_ed');
                $('#btn_getvec').removeClass('btn_getvec');
                $.jsonp({
                    url: _BASEURL + "/Order/phonenumCaptcha?_method=GET",
                    callbackParameter: "callback",
                    data: {
                        phonenum: pn
                    },
                    success: function () {
                        $('#btn_getvec').text("验证码已发送");
                        showMsg("验证码已发送", 1);
                    }
                });
            }
        },

        //检查是否需要手机验证码
        checkPho: function () {
            setTimeout(function () {
                var pn = $('#tel').val();
                if (pn != data_invite.oldPhone) {
                    $('#btn_getvec').parents('div').first().show();
                }
                else {
                    $('#btn_getvec').parents('div').first().hide();
                }
            }, 0);
        },

        backtoP1: function () {
            $("#part2").hide();
            $("#part1").show();
        },

        gotoP2: function () {
            //如果charge已存在，直接进入支付
            if(data_invite.isExist){
                //获取Charge
                $.jsonp({
                    url: _BASEURL + "/Order/info/?_method=POST",//路径未知
                    data: {
                        billId: data_invite.billId
                    },
                    callbackParameter: "callback",
                    beforeSend: showMsg('提交中', 2000),
                    success: function (obj) {
                        obj = $.parseJSON(obj);
                        //console.dir(obj);
                        var code = obj.code;
                        if (code == 0) {
                            var charge = obj.data.charge; //暂时假设是这个结构
                            pingpp.createPayment(charge, function (result, error) {
                                if (result == "success") {
                                    showMsg("支付成功", 99999);
                                    setTimeout(function () {
                                        location.href = 'paySuccess.html';
                                        //history.go(-1);
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
                            showMsg(obj.msg, 2);
                        }
                    },
                    error: function () {
                        showMsg("您的网络不太给力哦~");
                    }
                })


            }
            else if (checkValue()) {
                $("#part1").hide();
                $('#channal_wx_pub').iCheck('check');
                $("#part2").show();
            }
        },

        postOrder: function () {
            //mode为提交类型,
            //  'pay':进入支付流程
            //  'normal':无支付有服务
            //  'simple':无服务无定金

            //构建postData
            var chagTime = function () {
                var d = $('#apDate option:checked').text().replace('年', "/").replace("月", "/").replace("日", "").replace("（今天）", "");
                var t = $('#apTime option:checked').text();
                var date = d + ' ' + t;
                return Date.parse(new Date(date))
            };
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

            var postData = {
                _id:_proID,
                storeId: storeId,
                orderTime: chagTime(),
                servicePlace: servicePlace,
                orderFrom: orderFrom,
                orderAddress: orderAddress,
                customerInfo: customerInfo,
                remark: remark
            };

            if ($('#tel').val() != data_invite.oldPhone) {
                postData.captcha = captcha
            }
            if (data_invite.mode == 'pay') {
                postData.pingChannel = channel;
                postData.pingExtra = {
                    open_id: OPENID
                    //open_id:'oNyPMs7crBm9X-IINzAWJeSiUjM'
                };
            }
            if (data_invite.haveCommodity) {
                postData.commodityInfo = {
                    _id: data_invite.inviteInfo.commodityInfo._id
                }
            }

            var f = function (data) {
                switch (data_invite.mode) {
                    case 'pay':
                        var charge = data.charge;

                        if (data_invite.havePay) {

                            pingpp.createPayment(charge, function (result, error) {
                                if (result == "success") {
                                    showMsg("支付成功", 99999);
                                    setTimeout(function () {
                                        location.href = 'paySuccess.html';
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
                        break;
                    case 'normal':
                        setTimeout(function () {
                            location.hash = '#page_detail/0';
                        }, 1500);
                        break;
                    case 'simple':
                        setTimeout(function () {
                            location.hash = '#page_detail/0';
                        }, 1500);
                        break;
                }
            };

            if (checkValue()) {
                console.dir(postData);
                $.jsonp({
                    url: _BASEURL + "/Order/info/?_method=POST",
                    data: postData,
                    callbackParameter: "callback",
                    beforeSend: showMsg('提交中', 2000),
                    success: function (obj) {
                        obj = $.parseJSON(obj);

                        console.log('result:');
                        console.dir(obj);

                        var code = obj.code;
                        if (code == 0) {
                            showMsg('提交成功', 2);
                            f(obj.data);
                        }
                        else {
                            showMsg(obj.msg, 2);
                        }
                    },
                    error: function () {
                        showMsg("您的网络不太给力哦~");
                    }
                })
            }
        }
    };

    c.exports = {
        main: main
    };
})
;