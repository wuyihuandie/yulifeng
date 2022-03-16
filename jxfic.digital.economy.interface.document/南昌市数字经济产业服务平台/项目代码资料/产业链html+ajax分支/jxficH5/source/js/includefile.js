var LOGIN_URL = realPath+"havefun.html";//登录页
var BASE_URL= localhostPaht+"/jxfic.digital.economy-1.0.0-SNAPSHOT";//接口地址
var LOGIN_ADMIN_URL = localhostPaht+ "/ncdata-1.0.0-SNAPSHOT";//登录后台
fullType="1";//1 代表目前没全屏 2代表全屏
var expireTime = 360;
var flag="";
var userToken = '';
var nowdate = new Date().getFullYear();
var nowmonth = "";
if((new Date().getMonth()+1)<10){
	nowmonth = nowdate + '-0' + (new Date().getMonth()+1);
}else{
	nowmonth = nowdate + '-' + (new Date().getMonth()+1);
}
var YEAR = nowdate+""; //年份
$(function(){
	userToken = getUrlValue("token");
	if(userToken){//如果token存在参数里，则放入cookie
		setCookie("token",userToken,1440);//token存入cookie 24小时
	}
	//定义通用的头部样式
	var head = '<div class="logoText">南昌市数字经济产业服务平台</div>'+
		'<div class="qpbtn" onclick="qp()"><img src="'+realPath+'source/img/qpbtn.png"></div>'+
		'<table>'+
		'<tr>'+
		'<td><ul class="layui-nav" style="background: transparent">'+
		'<li class="layui-nav-item" onclick="showSyChild()" onmouseout="hideSyChild()" onmouseover="showSyChild()">'+
		'    <a  style="color: #07afc1">产业分析<span class="layui-nav-more" id="syxl"></span></a>' +
		'    <dl class="layui-nav-child" id="syChild" style="top:50px"> <!-- 二级菜单 -->' +
		'      <dd><a onclick="javascript:window.location.href=\''+realPath+'view/sy/sy-nc2.html?menuType=0\';">南昌市</a></dd>' +
		'      <dd><a onclick="javascript:window.location.href=\''+realPath+'view/sy/sy-2.html?menuType=0\';">江西省</a></dd>' +
		'    </dl>' +
		'  </li>' +
		'</ul></td>'+

		'<td onclick="javascript:window.location.href=\''+realPath+'view/cyfx/qycl.html?menuType=1\';">企业分析</td>'+

		'<td onclick="javascript:window.location.href=\''+realPath+'view/qyyxjc/yxjc-1.html?menuType=2\';">运行监测</td>'+

		'<td onclick="javascript:window.location.href=\''+realPath+'view/qycx/qycx.html?menuType=3\';">企业查询</td>'+

		'<td onclick="loginAdmin()">系统管理</td>'+

		'<td><ul class="layui-nav" style="background: transparent">'+
		'<li class="layui-nav-item" onclick="showMoreChild()" onmouseout="hideMoreChild()" onmouseover="showMoreChild()">'+
		'    <a  style="color: #07afc1">更多功能<span class="layui-nav-more" id="morexl"></span></a>' +
		'    <dl class="layui-nav-child" id="moreChild" style="top:50px"> <!-- 二级菜单 -->' +
		'      <dd><a onclick="javascript:window.location.href=\''+realPath+'view/ztfx/wlwzt.html?menuType=5\';">物联网专区</a></dd>' +
		'      <dd><a onclick="jumpBaogao()">报告生成</a></dd>' +
		'      <dd><a onclick="javascript:window.location.href=\''+realPath+'view/cyl-3/cyl-3double.html?menuType=5\';">产业链-四图</a></dd>' +
		'      <dd><a onclick="javascript:window.location.href=\''+realPath+'view/cyl-3/cyl-qyqd-2.html?menuType=5\';">产业链-五清单</a></dd>' +
		'    </dl>' +
		'  </li>' +
		'</ul></td>'+
		'<td onclick="outLogin();">退出 </td>'+
		'</tr>'+
		'</table>';


	$("#headDiv").html(head);

	//设置菜单td宽度
	var tdNum = $(".all-head table td").length;
	tdNum=100/tdNum;
	$(".all-head table td").css("width",tdNum+"%");
	//设置选中样式
	var menuType = getUrlValue("menuType");
	// alert(menuType);
	$(".all-head table td").removeClass("cyl-menu");
	$(".all-head table td").eq(menuType).addClass("cyl-menu");

	if(flag!="login"){
		doData(BASE_URL+'/querySystemName', {},function (result) {
			if(result.status==10001){
				var item = result.data;
				var userid=getCookie("userid");
				if(userid!=null&&userid!=''&&userid!=undefined){
					$(".logoText").text(item.SYSTEMNAME);
				}else{
					if(getCookie("area_value")!=360100) {
						$(".logoText").text(item.SYSTEMNAME+"（"+getCookie("realname")+"）");
					}else{
						$(".logoText").text(item.SYSTEMNAME);
					}
				}
				$("#dataSource").text(item.DATASOURCE);
				$("#dataCollectionTime").text(item.COLLECTIONDATE);
				$("#gsdataCollectionTime").text(item.GSCOLLECTIONDATE);
				$("#systemDepart").text(item.SYSTEMDEPARTMENT)
			}

		})
	}

})
var indexs = 0;//ajax计数器
var load;
//全局的ajax访问，处理ajax清求时异常和带上接口必要参数
$.ajaxSetup({
	crossDomain: true,
	contentType:"application/x-www-form-urlencoded;charset=utf-8",
	beforeSend: function (event,request,ajaxOptions) {
		try{
			//request.url=BASE_URL+request.url;//加入接口地址（这样写会导致跨域）
			var jxficParam = getJxficParam();
			if(request.url.indexOf("login_login")<=0&&request.url.indexOf("checklogin")<=0&&request.url.indexOf("ysnc_login")<=0){//判断不是请求登录
				if(!jxficParam.token){
					console.log("登录信息已失效");
					window.location.href=LOGIN_URL;
					return false;
				}
				request.data += "&token="+jxficParam.token;
				request.data += "&requestTime="+jxficParam.requestTime;
				request.data += "&sign="+jxficParam.sign;
			}
			load = layer.load(2);
			indexs++;//每次请求计数器加1
		}catch(e){
		}
	},
	complete:function(XMLHttpRequest,textStatust){
		try{
			indexs--;//结束请求计数器减一
			if(indexs==0){//当计数器为0时，代表所有ajax请求结束，则关闭加载框
				layer.close(load);
			}
		}catch(e){
		}
	},
	error:function(jqXHR,textStatus,errorThrown){
		try{
			if(jqXHR.status=='401'){//后台返回的自定义错误代码，用于校验错误信息
				var res = jqXHR.responseText;
				var jsonData = JSON.parse(res);
				if(jsonData.status == '10003'){
					//token失效返回首页
					console.log("登录信息已失效");
					window.location.href=LOGIN_URL;
				}else{
					//其他拦截
					console.log(jsonData.msg);
				}
			}
		}catch(e){
		}
	}
});

function getJxficParam(){
	var jxficParam={};
	jxficParam.token = getCookie("token");
	jxficParam.requestTime=new Date().getTime()+"";
	jxficParam.sign=md5(jxficParam.token+jxficParam.requestTime);
	return jxficParam;
}
//获取请求参数
function getUrlValue(name){
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return (r[2]); return null;
}
//获取cookie
function getCookie (name) {
	var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //匹配字段
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
};
/**
 * cookie中存值(存放多长时间)（分钟）
 * */
function setCookie(name, value, expireminuts) {
	if (value) {
		var exp = new Date();
		exp.setTime(exp.getTime() + expireminuts*60*1000);//增加8小时  解决GMT时差问题
		// 写入Cookie, toGMTString将时间转换成字符串
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";Path=/";
	}
};
/**
 * 清除指定cookie值
 * */
function delCookie (name) {
	setCookie(name, "", -1);
};

/**
 * 清除全部cookie值
 * */

function clearCookie() {
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;) {
			document.cookie = keys[i] +'=0;expires=' + new Date( 0).toUTCString() + ";path=/video_learning" + ";domain=localhost";
		}
	}
};
//全屏事件
function qp(){
	if(fullType=="1"){
		fullScreen();//全屏
		fullType='2';
	}else{
		exitFullscreen();//退出全屏
		fullType='1';
	}
}
//fullScreen()和exitScreen()有多种实现方式，此处只使用了其中一种
//全屏
function fullScreen() {
	var element = document.documentElement;
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	}
}

//退出全屏
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

//监听window是否全屏，并进行相应的操作,支持esc键退出
window.onresize = function() {
	var isFull=!!(document.webkitFullscreenElement  || document.ozFullScreenElement ||
		document.msFullscreenElement || document.fullscreenElement
	);//!document.webkitIsFullScreen都为true。因此用!!
	if (isFull==false) {//当时状态为不全屏
		fullType='1';
	}else{//全屏
		fullType='2';
	}
}
//ajax请求封装
function doData(url,params,callback) {
	$.ajax({
		type : 'post',
		url : url,
		dataType: 'json',
		cache:false,
		data:{
			param:JSON.stringify(params)//参数
		},
		success: function (data) {
			if (callback) callback(data);
		},
		error:function () {

		}
	})
}
//退出登录
function outLogin(){
	doData(BASE_URL+"/login_out",{token:getCookie("token")},function(result){
		delCookie("token");
		delCookie("username");
		delCookie("area_value");
		delCookie("area_name");
		delCookie("realname");
		window.location.href=LOGIN_URL;
	})
}
//登录后台
function loginAdmin(){
	$("#layuiChild").hide();
	$("#xl").removeClass("layui-nav-mored");
	console.log(getCookie("token"));
	window.open(LOGIN_ADMIN_URL+"/tzManage?username="+encode64(getCookie("username"))+"&token="+encode64(getCookie("token")));
}
//首页下拉
function showSyChild() {
	$("#syChild").show();
	$("#syxl").addClass("layui-nav-mored");
}
function hideSyChild(){
	$("#syChild").hide();
	$("#syxl").removeClass("layui-nav-mored");
}
//更多功能下拉
function showMoreChild() {
	$("#moreChild").show();
	$("#morexl").addClass("layui-nav-mored");
}
function hideMoreChild(){
	$("#moreChild").hide();
	$("#morexl").removeClass("layui-nav-mored");
}
//产业链下拉
function showChainChild(){
	$("#chainChild").show();
	$("#morexl").removeClass("layui-nav-mored");
}
function hideChainChild(){
	$("#chainChild").hide();
	$("#chainxl").removeClass("layui-nav-mored");
}
//企业分析下拉
function showQyfxChild(){
	$("#qyfxChild").show();
	$("#qyfxxl").removeClass("layui-nav-mored");
}
function hideQyfxChild(){
	$("#qyfxChild").hide();
	$("#qyfxxl").removeClass("layui-nav-mored");
}

function jumpToHong() {
	window.location.href= localhostPaht + '/jxfic/#/home?token='+getCookie("token");
}

function jumpBaogao(){
	layer.open({
		type:2,
		shade: 0.5,
		title: false, //不显示标题
		area: ['25%', '45%'], //宽高
		content: [realPath+"/view/report.html"]
	});
}
//加密
function encodeStr(data){
	var key = "qaz753wsx842"
	var ciphertext = CryptoJS.AES.encrypt(data, key).toString();
	return ciphertext;
}
//解密
function decodeStr(data) {
	var key = "qaz753wsx842"
	var bytes  = CryptoJS.AES.decrypt(data, key);
	var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
	return decryptedData;
}

// base64加密开始
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"+ "wxyz0123456789+/" + "=";
function encode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
			+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return output;
}