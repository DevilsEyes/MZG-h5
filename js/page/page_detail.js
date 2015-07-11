define("page/page_detail", ["ui/pbl", "ui/pbl1", "page/page_detail_temp", "ui/footer", "iscroll4/main", "iscroll.pc/main"], function (a, b, c) {

    if (MOBILE) {
        var isc = a("iscroll4/main").create;
        var r_isc = a("iscroll4/main").refresh;
        var toTop = a("iscroll4/main").scrolltoTop;
        var toPre = a("iscroll4/main").scrolltoPre;
        //		console.dir(r_isc);
    } else {
        var isc = a("iscroll.pc/main").create;
        var r_isc = a("iscroll.pc/main").refresh;
        var toTop = a("iscroll.pc/main").scrolltoTop;
        var toPre = a("iscroll.pc/main").scrolltoPre;
    }

    var foot = a("ui/footer");
    // 瀑布流
    var pbl = a("ui/pbl");
    var pbl1 = a("ui/pbl1");
    // 分页每页数量
    var limit = 6;
    // js引擎模板
    var tmpHtml = a("page/page_detail_temp");
    // 点击事件
    var evt = function () {
        // tab
        var t1, t2, t3;
        var isAjax = false;
        var showTab = function (index) {

            if (index == 1) {

                if (!isAjax) {
                    $.ajax({
                        url: _BASEURL + "/Commodity/list/?storeId=" + storeId + "&limit=" + limit,
                        dataType: "jsonp",
                        jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                        jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                        type: "GET",
                        beforeSend: function () {

                        },
                        success: function (data) {


                            if (!$('.prolist._fw ul').hasClass('pro')) {
                                $('.prolist._fw').html('');
                                var data = eval("(" + data + ")");
                                var list = data["data"]["list"];
                                var ul = '<ul class="pro" id="Gallery1"></ul>';
                                var len = list.length;
                                $('.prolist._fw').append(ul);
                                //									console.dir(list);
                                for (var i = 0; i < list.length; i++) {
                                    var _id = list[i]._id,
                                        img = list[i].images[0],
                                        title = list[i].title,
                                        pri = list[i].price;
                                    qua = list[i].quantifier;

                                    var QUA = ['', '/ 套', '/ 天', '/ 次', '/ 张', '/ 小时'];
                                    var li = '<li><div>' + '<a href="#page_fwdetail/' + _id + '">' + '<img src="' + img + '?imageView2/0/h/320" alt=""/>' + '<div class="pro_detail">' + '<p class="pro_name">' + title + '</p>' + '<p class="pro_fwfee">￥ ' + pri + '</p>' + '<p class="pro_qua">' + QUA[qua] + '</p>' + '</div>' + '</a>' + '</div></li>';
                                    $('.prolist._fw ul').append(li);
                                }
                                var more = '<div id="pullUp2" class="ready" data-is="active">' + '<span class="pullUpIcon"></span>' + '<span class="pullUpLabel">上拉加载更多</span>' + '</div>';
                                if (!DEV) {
                                    more += '<a href="http://mzg.so/m_index.html" class="iwShop">我也要发布作品</a>';
                                } else {
                                    more += '<div class="blank"></div>';
                                }

                                $('.prolist._fw').append(more);
                                if (limit <= len) {
                                    var last = '<input type="hidden" id="lastid1" value="' + list[len - 1]._id + '" />';
                                    $('.prolist._fw').append(last);
                                } else {
                                    $('#pullUp2').hide();
                                }
                                new pbl1();
                                r_isc();

                                if (list.length == 0) {
                                    $('#pullUp2').show();
                                    $('#pullUp2').removeClass('ready');
                                    $('#pullUp2').attr('data-is', 'empty');
                                    $('#pullUp2 .pullUpLabel').html('掌柜太忙，还未上传服务报价~');
                                }


                            }
                            isAjax = true;
                        }
                    });
                }
            }
            $('#tab').css({
                "-webkit-transform": "translate(-" + index * WIDTH + "px,0)",
                "-moz-transform": "translate(-" + index * WIDTH + "px,0)"
            });
            var s = index;
            var h = $('#tab > div:nth-child(' + (index + 1) + ')').find('ul').attr('data-h');

            $('#tab > div:nth-child(' + (index + 1) + ')').css({
                "min-height": $(window).height() - 44
            });
            $('#tab').css({
                "height": $('#tab > div:nth-child(' + (index + 1) + ')').height()
            });

            if (index == 1) {
                _ListID = 1;
                r_isc();
                toPre();
                window.clearTimeout(t3);
                window.clearTimeout(t2);
                t1 = setTimeout(function () {
                    $('#tab > div:nth-child(1)').css({
                        "visibility": "hidden"
                    });
                    $('#tab > div:nth-child(3)').css({
                        "visibility": "hidden"
                    });
                    //						r_isc();
                }, 500);
            } else if (index == 0) {
                _ListID = 0;
                r_isc();
                toPre();
                window.clearTimeout(t3);
                window.clearTimeout(t1);
                t2 = setTimeout(function () {
                    $('#tab > div:nth-child(2)').css({
                        "visibility": "hidden"
                    });
                    $('#tab > div:nth-child(3)').css({
                        "visibility": "hidden"
                    });
                    //						r_isc();
                }, 500);
            } else if (index == 2) {
                _ListID = 2;
                r_isc();
                toPre();

                window.clearTimeout(t2);
                window.clearTimeout(t1);
                t3 = setTimeout(function () {
                    $('#tab > div:nth-child(1)').css({
                        "visibility": "hidden"
                    });
                    $('#tab > div:nth-child(2)').css({
                        "visibility": "hidden"
                    });
                    //						r_isc();
                }, 500);

            }
            console.dir(location);
            var str = location.origin + location.pathname + location.search +'#page_detail/' + _ListID;
            console.log(str);
            history.pushState(null, document.title, str);
            $('#tab > div:nth-child(' + (index + 1) + ')').css({
                "visibility": "visible"
            });

        }
        $('.s-nav > div').unbind('click');
        $('.dhead div').click(function () {
            toTop();
        });

        $('.s-nav > div').each(function (index) {

            $(this).on('click', function () {
                $('.s-nav > div a').removeClass('active');
                $('.s-nav > div:eq(' + (index % 3) + ')').children('a').addClass('active');
                $('.s-nav > div:eq(' + (index % 3 + 3) + ')').children('a').addClass('active');
                index = index % 3;
                showTab(index);
            });

        });


    }
    // css样式
    var css = function () {
        $('#tab').css({
            "width": WIDTH * 3
        });
        $('.prolist').css({
            "width": WIDTH
        });
        $('#aboutMe').css({
            "width": WIDTH
        });

        if (MOBILE) {
            $(window).resize(function () {
                WIDTH = $(window).width();
                $('.prolist').css({
                    "width": WIDTH
                });
                $('#tab').css({
                    "width": WIDTH * 3
                });
                $('#aboutMe').css({
                    "width": WIDTH * 3
                });
                $('#tab').css({
                    "-webkit-transform": "translate(-" + _ListID * WIDTH + "px,0)",
                    "-moz-transform": "translate(-" + _ListID * WIDTH + "px,0)"
                });
            });
        }
    }
    // 页面渲染
    var main = function () {
        getData();
    }

    // 填充模板

    var putTemp = function (data) {
        //		console.dir(data);
        var html = template('tmp_detail', data);
        $('#main_container').append(html);
    }
    // 获取数据
    var getData = function () {
        var getProlist = function () {
            $.ajax({
                url: _BASEURL + "/Product/list/?storeId=" + storeId + "&limit=" + limit,
                dataType: "jsonp",
                jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                type: "GET",
                beforeSend: function () {
                    $('#loading').show();
                    $('#main_container').hide();
                },
                success: function (data) {
                    $('#loading').hide();
                    $('#main_container').show();

                    var data = eval("(" + data + ")"),
                        list = data.data.list;

                    var len = list.length;
                    var sdetail = {
                        "storeInfo": STOREINFO,
                        "list": list
                    };


                    $('title').html(STOREINFO.storeName);


                    $('body').append(tmpHtml);


                    putTemp(sdetail);

                    // 微信分享
                    var wx_data = {
                        title: $('#page_detail').find("input[id^='wx_title']").val(),
                        imgUrl: $('#page_detail').find("input[id^='wx_imgUrl']").val(),
                        desc: $('#page_detail').find("input[id^='wx_desc']").val()
                    }
                    wx.ready(function () {
                        wx.onMenuShareAppMessage(wx_data);
                        wx.onMenuShareTimeline(wx_data);
                        wx.onMenuShareQQ(wx_data);
                        wx.onMenuShareWeibo(wx_data);
                    });


                    css();
                    evt();

                    if (limit <= len) {
                        // lm.on('click', function() {
                        // 	if ($(this).hasClass('ready')) {
                        // 		var lastid = $('#lastid').val();
                        // 		pageLoad_zpx(lastid);
                        // 	}
                        // });
                    }

                    foot();
                    pbl();
                    isc(pbl, pbl1);
                    $('.s-logo>img').error(function () {
                        $(this).attr('src', "images/banner.png");
                    });
                    var prodesc = $('#faith').html();
                    if (typeof(prodesc) != "undefined") {
                        prodesc = prodesc.replace(/\n/g, "<br/>").replace(' ', "&nbsp;");
                    }

                    $('#faith').html(prodesc);


                    $('.s-nav > div:eq(' + _ListID + ')').click();


                    if (PROH[_ListID]) {
                        toPre();
                    }
                    if (list.length == 0) {
                        $('#pullUp1').removeClass('ready');
                        $('#pullUp1').attr('data-is', 'empty');
                        $('#pullUp1 .pullUpLabel').html('掌柜太忙，还未上传作品~');
                    }

                }
            });
        }

        getProlist();
    }


    c.exports = {
        main: main
    };
});