var PARENT_DL = 'ZK06';
var CONDITION = 'VENDINC';
var CHAIN_LINKID = '';
var LAYER = '';
YEAR = '2020';
$(function() {
	
	//云计算产业链
	$('#computing').click(function() {
		window.location.href = '../yjs-cyl/yjs-cyl.html?menuType=5';
	})
	//产业链图
	$('#twobutton').click(function() {
		window.location.href = 'cyl-3.html?menuType=5';
	})
	//产业链图
	$('.collect').click(function() {
		window.location.href = 'cyl-3double.html?menuType=5';
	})
	//技术路线图
	$('#technology').click(function() {
		window.location.href = 'cyl-jslx.html?menuType=5';
	})
	//应用领域图
	$('#use').click(function() {
		window.location.href = 'cyl-yyly.html?menuType=5';
	})
	//区域分布图
	$('#district').click(function() {
		window.location.href = 'cyl-qyfb.html?menuType=5';
	})
	getIndustryChainDatas();
	getIndustrySecondChainDatas();
	//左列表
	queryLeft();
	//右列表
	queryRight();

	//感知层
	$('.box3').click(function() {
		queryRightByType("感知层");
		$('.Perception').addClass('bolck');
		fourbtn();
		$(".box3").addClass('box3-1');
	})
	// 感知层细分
	$('.box1-top').click(function(){
		var index=$(this).index();
		fourbtn();
		$(this).addClass('box1-top-1');
	})
	//网络层
	$('.box5').click(function() {
		queryRightByType("网络层");
		$('.network').addClass('bolck');
		fourbtn();
		$(".box5").addClass('box5-1')
	})
	// 平台层细分
	$('.fivebutton').click(function(){
		var index=$(this).index();
		fourbtn();
		$(this).addClass('fivebutton-1');
	})
	//平台层
	$('.box7').click(function() {
		queryRightByType("平台层");
		$('.podium').addClass('bolck');
		fourbtn();
		$(".box7").addClass('box7-1')
	})
	// 网络层细分
	$('.twobox-l').click(function(){
		var index=$(this).index();
		fourbtn();
		$(this).addClass('twobox-l-1');
	})
	//应用层
	$('.box9').click(function() {
		queryRightByType("应用层");
		$('.application').addClass('bolck');
		fourbtn();
		$(".box9").addClass('box9-1')
	})
	// 应用层细分
	$('.box11-top').click(function(){
		var index=$(this).index();
		fourbtn();
		$(this).addClass('box11-top-1');
	})
	$('.cleft').click(function() {
		var year = $(".ctitle").text() - 1;
		$(".ctitle").text(year);
		YEAR = year + "";
	})
	$('.cright').click(function() {
		var year = $(".ctitle").text();
		year++;
		$(".ctitle").text(year);
		YEAR = year + "";

	})
	

})
//切换事件
function changeButton(ths) {
	var param = $(ths).val();
	if (param == 2) {
		CONDITION = 'VENDINC';
	} else if (param == 3) {
		CONDITION = 'RATGRO';
	}
	queryRight();
}
var title = '家';

function changeType(param,ths) {
	$(".threeButtons").removeClass("threeButton");
	$(ths).addClass("threeButton");
	type = param;title
	if (type == 1) {
		$('.line2').text("企业数量");
		title = '家';
	} else if (type == 2) {
		$('.line2').text("营业收入");
		title = '亿元';
	} else {
		$('.line2').text("利税总额");
		title = '亿元';
	}
	getIndustryChainDatas();
	getIndustrySecondChainDatas();
}
//查询产业链上的数量
var type = '1';//查询类型企业数量、营业收入、利税总额
//产业链数据第一层获取
function getIndustryChainDatas() {
	var datas = {};
	datas.YEAR = YEAR;
	datas.PARENT_DL = PARENT_DL;
	datas.TYPE = type;
	doData(BASE_URL + '/industrialChainController/getIndustryChainDatas', datas, function(result) {
		if (result.status == '10001') { //接口调用成功
			result.data.forEach(function(item, index) {
				if (item.LEVEL_NAME == '感知层') {
					$("#feellayer").text(item.SUMS + title);
					$(".box3 svg g").css("transform", "translateY(" + (100 - item.RATE) + "%)");
				} else if (item.LEVEL_NAME == '网络层') {
					$("#netlayer").text(item.SUMS + title);
					$(".box5 svg g").css("transform", "translateY(" + (100 - item.RATE) + "%)");
				} else if (item.LEVEL_NAME == '平台层') {
					$("#platformlayer").text(item.SUMS + title);
					$(".box7 svg g").css("transform", "translateY(" + (100 - item.RATE) + "%)");
				} else if (item.LEVEL_NAME == '应用层') {
					$("#applicationlayer").text(item.SUMS + title);
					$(".box9 svg g").css("transform", "translateY(" + (100 - item.RATE) + "%)");
				}
			})
		}
	})

}
//产业链数据第二层获取
function getIndustrySecondChainDatas() {
	var datas = {};
	datas.YEAR = YEAR;
	datas.PARENT_DL = PARENT_DL;
	datas.TYPE = type;
	doData(BASE_URL + '/industrialChainController/getIndustrySecondChainDatas', datas, function(result) {
		if (result.status == '10001') { //接口调用成功
			result.data.forEach(function(item, index) {
				$("#"+item.CHAIN_LINK_ID+"").text(item.SUMS+title);
			})
		}
	})

}

//精准招商企业
function queryLeft() {
	var datas = {};
	datas.YEAR = YEAR;
	datas.PARENT_DL = PARENT_DL;
	datas.CHAIN_LINK_ID = CHAIN_LINKID;
	doData(BASE_URL + '/industrialChainController/getAtInvestmentEnt', datas, function(paramData) {
		var htmlData = '';
		if (paramData.status == '10001') { //接口调用成功
			var listData = paramData.data;
			for (var i = 0; i < listData.length; i++) { //循环拼接排名列表内容
				var DOM = listData[i].ADDRESS
				if (DOM == undefined || DOM == 'undefined') {
					DOM = '';
				}
				htmlData +=  '<div class="ent-list-info-zg-div">'+
								'<p class="p-entname">'+listData[i].ENTNAME+'</p>'+
								'<p class="p-zcdate"><img src="../../source/img/cyl/ffffk.png" > 企业法人 '+ '<span>'+ listData[i].CONTACH+'</span>'+'</p>'+
								'<p class="p-zcdate"><img src="../../source/img/cyl/ffffk.png" >注册资金  '+'<span>'+listData[i].REGCAP+'</span>'+'</p>'+
								'<p class="p-zcdate"><img src="../../source/img/cyl/ffffk.png" >注册日期  '+'<span>'+listData[i].ESTDATE+'</span>'+'</p>'+
								'<p class="p-dom">'+DOM+'</p>'+
							'</div>';
			}
		}
		$("#ranklist").html(htmlData);
	})

}
//产业链上企业
function queryRight() {
	var datas = {};
	datas.YEAR = YEAR;
	datas.PARENT_DL = PARENT_DL;
	datas.CONDITION = CONDITION;
	datas.CHAIN_LINK_ID = CHAIN_LINKID;
	datas.FourLayer = LAYER;
	doData(BASE_URL + '/industrialChainController/FroerchLinkList', datas, function(paramData) {
		var htmlData = '';
		if (paramData.status == '10001') { //接口调用成功
			var listData = paramData.data.EntMsg;
			var listThousand = paramData.data.RATGROAndVENDINCOfUNIT;
			for (var i = 0; i < listData.length; i++) { //循环拼接排名列表内容
				var VENDINC = listData[i].VENDINC;
				if (VENDINC == undefined || VENDINC == 'undefined') {
					VENDINC = '-';
				}else{
					VENDINC = listData[i].VENDINC+listThousand;
				}
				var RATGRO = listData[i].RATGRO;
				if (RATGRO == undefined || RATGRO == 'undefined') {
					RATGRO = '-';
				}else{
					RATGRO = listData[i].RATGRO+listThousand;
				}
				var AREA_NAME = listData[i].AREA_NAME
				if (AREA_NAME == undefined || AREA_NAME == 'undefined') {
					AREA_NAME = '';
				}
				htmlData +=  '<div class="ent-list-info-zg-div" onclick="tzQyhx(\''+listData[i].PRIPID+'\',\''+listData[i].REGNO+'\',\''+listData[i].ENTNAME+'\')">'+
				                '<p class="p-enttname"><span>'+AREA_NAME+'</span>'+listData[i].ENTNAME+'</p>'+
				                '<p class="p-zzcdate">成立日期：'+listData[i].ESTDATE+'<b>注册资金：'+listData[i].REGCAP+'万元</b></p>'+
								'<p class="p-zzcdate">营业收入：'+VENDINC+'</p>'+
								'<p class="p-zzcdate">利税总额：'+RATGRO+'</p>'+
				            '</div>';
			}
		}
		$("#ranklast").html(htmlData);
	})
}

function queryRightByType(FourLayer) {
	LAYER = FourLayer;
	CHAIN_LINKID="";
	queryRight();
}

function XP(CHAIN_LINK_ID) {
	LAYER = "";
	CHAIN_LINKID = CHAIN_LINK_ID
	queryRight();
}

//调转企业画像
/*function tzQyhx(PRIPID, REGNO, ENTNAME, KEYNO) {
	if (!REGNO || REGNO == 'undefined') { //如果REGNO为空则传ENTNAME
		window.location.href = realPath + "view/qyhx/qyhx.html?menuType=3&PRIPID=" + PRIPID + "&REGNO=" + ENTNAME + "&KEYNO=" +
			KEYNO + "&ENTNAME=" + ENTNAME;
	} else {
		window.location.href = realPath + "view/qyhx/qyhx.html?menuType=3&PRIPID=" + PRIPID + "&REGNO=" + REGNO + "&KEYNO=" +
			KEYNO + "&ENTNAME=" + ENTNAME;
	}
}*/



function fourbtn(){
	$(".box3").removeClass('box3-1');
	$(".box5").removeClass('box5-1');
	$(".box7").removeClass('box7-1');
	$(".box9").removeClass('box9-1');
	$('.box1-top').removeClass('box1-top-1');
	$('.fivebutton').removeClass('fivebutton-1');
	$('.twobox-l').removeClass('twobox-l-1');
	$('.box11-top').removeClass('box11-top-1');
}

