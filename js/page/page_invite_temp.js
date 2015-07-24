define("page/page_invite_temp", function(a, b, c) {
	// js引擎模板
	var tmpHtml = '<script id="tmp_invite" type="text/html">'
					+'<div id="page_invite" class="page_invite">'
						+'<input type="hidden" value="在线预约" id="wx_title_invite" />'
						+'<input type="hidden" value="{{storeInfo.logo}}?imageView2/0/w/320" id="wx_imgUrl_invite" />'
						+'<input type="hidden" value="{{storeInfo.userInfo.nickname}}的微官网" id="wx_desc_invite" />'
						+'<div id="part1">'
							+'<div class="pTop">'
								+'<div>服务预约</div>'
							+'</div>'
							+'<input type="hidden" value="预约" id="title_invite" />'
							+'<div class="main">'
								+'<div class="blank"></div>'
								+'<div class="dabbox ap_storeInfo">'
									+'<div class="storeInfoImg">'
										+'{{if haveCommodity}}'
										+'<img src="{{commodityInfo.images[0]}}?imageView2/1/w/80/h/80" alt="" />'
										+'{{/if}}'

										+'{{if !haveCommodity}}'
											+'{{if storeInfo.logo!="" }}'
											+'<img src="{{storeInfo.logo}}?imageView2/1/w/80/h/80" alt="" class="s-head"/>'
											+'{{/if}}'
										+'{{/if}}'

									+'</div>'
									+'<div class="storeInfoMsg">'
										+'{{if haveCommodity}}'
										+'<h2>{{commodityInfo.title}}</h2>'
										+'{{/if}}'
										+'{{if !haveCommodity}}'
										+'<h2>{{storeInfo.userInfo.nickname}}</h2>'
										+'{{/if}}'
										+'{{if havePay}}'
										+'<p id="deposit">定金：￥{{deposit}}</p>'
										+'{{/if}}'
										+'{{if !havePay}}'
											+'{{if haveCommodity}}'
											+'<p id="desc">{{commodityInfo.description}}</p>'
											+'{{/if}}'
											+'{{if !haveCommodity}}'
											+'<p id="desc">{{storeInfo.userInfo.faith}}</p>'
											+'{{/if}}'
										+'{{/if}}'
									+'</div>'
								+'</div>'
								+'<div class="aptip">'
									+'{{if havePay&&haveCommodity}}'
									+'<p>预约必读</p>'
									+'<p>本服务价格为 {{commodityInfo.price}}{{commodityInfo.qua}}</p><p>本店采用预支付模式，请先支付定金。在您提交预约单之后，我们会马上与您联系。</p>'
									+'{{/if}}'
									+'{{if !havePay&&haveCommodity}}'
									+'<p>本服务价格为 {{commodityInfo.price}}{{commodityInfo.qua}}</p>'
									+'{{/if}}'
									+'{{if havePay&&!haveCommodity}}'
									+'<p>预约必读</p>'
									+'<p>本店采用预支付模式，请先支付定金。在您提交预约单之后，我们会马上与您联系。</p>'
									+'{{/if}}'
								+'</div>'
								+'<div class="dbox" style="padding-top:0px;">'
									+'<div class="form">'
										+'<div>'
											+'<span>姓名：</span>'
											+'<input id="name" type="text" placeholder="请输入姓名" maxlength="10" value="{{inviteInfo.customerInfo.name}}"/>'
										+'</div>'
										+'<div>'
											+'<span>手机号：</span>'
											+'<input id="tel" type="tel" placeholder="请输入手机号" maxlength="11" value="{{inviteInfo.customerInfo.phonenum}}"/>'
										+'</div>'
										+'<div>'
											+'<div class="btn_getvec" id="btn_getvec">发送验证码</div>'
											+'<span>验证码：</span>'
											+'<input id="vec" type="tel" placeholder="请输入验证码" maxlength="6"/>'
										+'</div>'
									+'</div>'
								+'</div>'
								+'<div class="dbox" style="padding-top:0px;">'
									+'<div class="form">'
										+'<div class="in_input">'
											+'<span>服务时间：</span>'
											+'<div>'
												+'<select name="" id="apDate">'
													+'<option value=0 disabled="true">预约日期</option>'
												+'</select>'
											+'</div>'
											+'<div>'
												+'<select name="" id="apTime">'
													+'<option value=0 disabled="true">期望时间</option>'
												+'</select>'
											+'</div>'
										+'</div>'
										+'<div id="type">'
											+'<span>服务方式：</span>'
											+'<label for="icheck1">'
												+'<input id="icheck1" class="icheck" type="radio" value="0" name="iCheck" checked="checked">'
												+'<span>到店</span>'
											+'</label>'
											+'{{if storeInfo.serviceToHome}}'
											+'<label for="icheck2">'
												+'<input id="icheck2" class="icheck" type="radio" value="1" name="iCheck">'
												+'<span>上门</span>'
											+'</label>'
											+'{{/if}}'
										+'</div>'

										+'<div class="addr1 textarea" style="display:none;">'
											+'<span>服务地址：</span>'
											+'<textarea id="address" type="text" placeholder="请输入详细地址,方便找到你" >{{inviteInfo.customerInfo.orderAddress}}</textarea>'
										+'</div>'

										+'<div class="in_input_addr0 addr0">'
											+'<span>门店地址：</span>'
											+'<div>'
												+'{{if storeInfo.userInfo.company.address!=""}}'
													+'<p>{{storeInfo.userInfo.company.address}}</p>'
												+'{{/if}}'
												+'{{if storeInfo.userInfo.company.address==""}}'
													+'{{if storeInfo.userInfo.wxNum!=""}}'
													+'<p style="">未设置店铺地址，可添加微信{{storeInfo.userInfo.wxNum}}与掌柜确认</p>'
													+'{{/if}}'
													+'{{if storeInfo.userInfo.wxNum==""}}'
													+'<p style="line-height:45px;">未设置店铺地址</p>'
													+'{{/if}}'
												+'{{/if}}'
											+'</div>'
										+'</div>'

										+'<div class="textarea">'
											+'<span>预约内容：</span>'
											+'<textarea id="msg" type="text" placeholder="请填写预约内容">{{inviteInfo.remark}}</textarea>'
										+'</div>'
									+'</div>'
								+'</div>'
								+'{{if havePay}}'
								+'<a id="CheckVec" href="javascript:;" class="iwShop">支付定金</a>'
								+'{{/if}}'
								+'{{if havePay==false}}'
								+'<a id="postForm" href="javascript:;" class="iwShop">确认预约</a>'
								+'{{/if}}'
							+'</div>'
						+'</div>'
						+'<div id="part2" style="display: none;">'
							+'<div class="pTop">'
								+'<a href="javascript:;" class="back"></a>'
								+'<div>支付定金</div>'
							+'</div>'
							+'<div class="main">'
								+'<div class="blank"></div>'
									+'<div class="dabbox ap_storeInfo">'
										+'<div class="storeInfoImg">'
											+'{{if haveCommodity}}'
											+'<img src="{{commodityInfo.images[0]}}?imageView2/1/w/80/h/80" alt="" />'
											+'{{/if}}'

											+'{{if !haveCommodity}}'
												+'{{if storeInfo.logo!="" }}'
												+'<img src="{{storeInfo.logo}}?imageView2/1/w/80/h/80" alt="" class="s-head"/>'
												+'{{/if}}'
											+'{{/if}}'
										+'</div>'
										+'<div class="storeInfoMsg">'
											+'{{if haveCommodity}}'
											+'<h2>{{commodityInfo.title}}</h2>'
											+'<p>价格：<span style="color:#1a1a1a">{{commodityInfo.price}}</span></p>'
											+'{{/if}}'
											+'{{if !haveCommodity}}'
											+'<h2>{{storeInfo.userInfo.nickname}}</h2>'
											+'{{/if}}'
											+'<p>预付定金：<span style="color:#1a1a1a">{{deposit}}</span></p>'
										+'</div>'
								+'</div>'
								+'<div class="dbox" style="padding-top:0px;">'
									+'<div class="form">'
										+'<div class="paytype">'
											+'<img src="images/wxpay.png"/>'
											+'<span>微信支付(推荐)</span>'
											+'<label for="icheck1">'
												+'<input id="channal_wx_pub" class="icheck" type="radio" value="0" name="iCheck" checked="true">'
											+'</label>'
										+'</div>'
									+'</div>'
								+'</div>'
								+'<a id="postForm" href="javascript:;" class="iwShop">去支付</a>'
							+'</div>'
						+'</div>'
					+'</div>'
				  +'</script>';

	c.exports={
		tmpHtml:tmpHtml
	};
});