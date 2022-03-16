var PARENT_DL = 'ZK01';
var CONDITION = 'YJSVENDINC';//企业排序条件
var CHAIN_LINKID = '';//产业环节id
var LAYER = '';//层级
var title="家";
YEAR = "2020";
$(function(){
	// 物联网跳转
	$('#twobutton').click(function(){
		window.location.href = '../cyl-3/cyl-3double.html?menuType=5';
	})
	
	$('#technology').click(function(){
		window.location.href = 'yjs-jslx.html?menuType=5';
	})
	
	$('#use').click(function(){
		window.location.href = 'yjs-yyly.html?menuType=5';
	})
	
	$('#district').click(function(){
		window.location.href = 'yjs-qyfb.html?menuType=5';
	})

	// 硬件层
	$('.size2b').click(function() {
		queryRightByType("硬件层");
		sbtn();
		$(".size2b").addClass('size2b-1');
	})
	// 硬件层细分
	$('.tbtn').click(function(){
		var index=$(this).index();
		sbtn();
		$(this).addClass('tbtn-1');
	})
	// 平台服务层
	$('.size2d').click(function() {
		queryRightByType("平台服务层");
		sbtn();
		$(".size2d").addClass('size2d-1');
	})
	// 平台服务层细分
	$('.fbtn').click(function(){
		var index=$(this).index();
		sbtn();
		$(this).addClass('fbtn-1');
	})
	// 应用层
	$('.size2f').click(function() {
		queryRightByType("应用层");
		sbtn();
		$(".size2f").addClass('size2f-1');
	})
	// 应用层细分
	$('.obtn').click(function(){
		var index=$(this).index();
		sbtn();
		$(this).addClass('obtn-1');
	})

	getIndustryChainDatas();
	getIndustrySecondChainDatas();
	queryLeft();
	queryRight();
})
function changeType(param,ths) {
	$(".threeButtons").removeClass("threeButton");
	$(ths).addClass("threeButton");
	type = param;
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
//切换事件
function changeButton(ths) {
	var param = $(ths).val();
	if (param == 2) {
		CONDITION = 'YJSVENDINC';
	} else if (param == 3) {
		CONDITION = 'YSJRATGRO';
	}
	queryRight();
}
//查询产业链上的数量
//查询类型1企业数量、2营业收入、3利税总额
var type = '1';
//产业链数据第一层获取
function getIndustryChainDatas() {
	var datas = {};
	datas.YEAR = YEAR;
	datas.PARENT_DL = PARENT_DL;
	datas.TYPE = type;
	doData(BASE_URL + '/industrialChainController/getIndustryChainDatas', datas, function(result) {
		if (result.status == '10001') { //接口调用成功
			result.data.forEach(function(item, index) {
				if (item.LEVEL_NAME == '硬件层') {
					$("#hardware").text(item.SUMS+title);
				}else if(item.LEVEL_NAME == '平台服务层') {
					$("#platform").text(item.SUMS+title);
				}else if(item.LEVEL_NAME == '应用层') {
					$("#application").text(item.SUMS+title);
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
					'<p class="p-zcdate"><img src="../../source/img/cyl/ffffk.png" >注册资金  '+'<span>'+listData[i].REGCAP+' 万</span>'+'</p>'+
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
				var VENDINC = listData[i].YJS_VENDINC;
				if (VENDINC == undefined || VENDINC == 'undefined') {
					VENDINC = '-';
				}else{
					VENDINC = listData[i].YJS_VENDINC+listThousand;
				}
				var RATGRO = listData[i].YJS_RATGRO;
				if (RATGRO == undefined || RATGRO == 'undefined') {
					RATGRO = '-';
				}else{
					RATGRO = listData[i].YJS_RATGRO+listThousand;
				}
				var AREA_NAME = listData[i].AREA_NAME
				if (AREA_NAME == undefined || AREA_NAME == 'undefined') {
					AREA_NAME = '';
				}
				htmlData +=  '<div class="ent-list-info-zg-div" onclick="tzQyhx(\''+listData[i].PRIPID+'\',\''+listData[i].REGNO+'\',\''+listData[i].ENTNAME+'\')">'+
					'<p class="p-enttname"><span>'+AREA_NAME+'</span>'+listData[i].ENTNAME+'</p>'+
					'<p class="p-zzcdate">注册日期：'+listData[i].ESTDATE+'<b>注册资金：'+listData[i].REGCAP+'万元</b></p>'+
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




function sbtn(){
	$(".fbtn").removeClass('fbtn-1');
	$(".tbtn").removeClass('tbtn-1');
	$(".obtn").removeClass('obtn-1');
	$(".size2b").removeClass('size2b-1');
	$(".size2d").removeClass('size2d-1');
	$(".size2f").removeClass('size2f-1');
}