var tday = new Date().getDate();
//当前月份
var tMonth;
//初始化年份
var CYEAR = nowdate+"";
//初始化月份
var CMONTH;
if(tday<19){
	tMonth = new Date().getMonth()-1;
	CMONTH = tMonth+1+"";
}else{
	tMonth = new Date().getMonth();
	CMONTH = tMonth+"";
}
var YEAR = getQueryString("YEAR"); //参数年份
var MONTH = getQueryString("MONTH");//参数月份
if(!YEAR||!MONTH){
	YEAR = nowdate+""; //参数年份
	MONTH = tMonth+"";//参数月份
}else{
	YEAR = decodeStr(getQueryString("YEAR")); //参数年份
	MONTH = decodeStr(getQueryString("MONTH"));//参数月份
}
var CONDITION = "2";
var PRIPID = decodeStr(getQueryString("PRIPID"));//获取url链接里的PRIPID参数
var KEYNO = decodeStr(getQueryString("KEYNO"));//获取url链接里的KEYNO参数

$(function(){
	$(".ctitl .ctitle").text(YEAR);
	$(".mtitl .ctitle").text(MONTH);
	// 左下角切换
	$('#pat').hide();
	$('#cop').show();
	$('#bra').hide();
	$('.option1').hide();
	$('.option2').show();
	$('.option3').hide();
	$(".three-b").click(function(){
		var index=$(this).index();
		$(".three-b").removeClass("bb");
		$(this).addClass("bb");
		// console.log($(this).attr('data-tab'));
		// 著作权
		if($(this).attr('data-tab') == 'copyright' ){
			$('#pat').hide();
			$('#cop').show();
			$('#bra').hide();
			$('.option1').hide();
			$('.option2').show();
			$('.option3').hide();
			getIntellectualList('2');
			// 专利
		}else if($(this).attr('data-tab') == 'patent'){
			$('#pat').show();
			$('#cop').hide();
			$('#bra').hide();
			$('.option1').show();
			$('.option2').hide();
			$('.option3').hide();
			getIntellectualList('3');
		}else{
			$('#pat').hide();
			$('#cop').hide();
			$('#bra').show();
			$('.option1').hide();
			$('.option2').hide();
			$('.option3').show();
			getIntellectualList('1');
		}
	})
	//年份点击
	$('.years .cleft').click(function(){
		var year = $(".ctitl .ctitle").text();
		if(year!=2020){
			year--;
			$(".ctitl .ctitle").text(year);
			YEAR=year+"";
			if(year<CYEAR){
				month=12;
				$(".mtitl .ctitle").text(month);
				MONTH=month+"";
			}
			getNanchangEntOverAll();
			qyjbxx();
			chartsTrend();
		}
	})
	$('.years .cright').click(function(){
		var year = $(".ctitl .ctitle").text();
		if(CYEAR!=year){
			year++;
			$(".ctitl .ctitle").text(year);
			YEAR=year+"";
			if(YEAR==CYEAR){
				MONTH=tMonth+"";
				$(".mtitl .ctitle").text(MONTH);
			}
			getNanchangEntOverAll();
			qyjbxx();
			chartsTrend();
		}
	})
	//月份点击
	$('.month .mleft').click(function(){
		var month = $(".mtitl .ctitle").text();
		if(month!=2){
			month--;
			$(".mtitl .ctitle").text(month);
			MONTH=month+"";
			getNanchangEntOverAll();
			qyjbxx();
			chartsTrend();
		}
	})
	$('.month .mright').click(function(){
		var month = $(".mtitl .ctitle").text();
		var year = $(".ctitl .ctitle").text();
		if(year==CYEAR){
			if(month!=CMONTH){
				month++;
				$(".mtitl .ctitle").text(month);
				MONTH=month+"";
				getNanchangEntOverAll();
				chartsTrend();
				qyjbxx();
			}
		}else{
			if(month!=12){
				month++;
				$(".mtitl .ctitle").text(month);
				MONTH=month+"";
				getNanchangEntOverAll();
				chartsTrend();
				qyjbxx();
			}
		}
	})

	$(".left3 .company").click(function(){
		$(".left3 .company").removeClass("companyExg");
		$(this).addClass("companyExg");
	})
	submitForm();
})
var charttitle="累计营收";
function submitForm(){
	getNanchangEntOverAll();
	getIntellectualNum();
	getIntellectualList('2');
	qyjbxx();
	chartsTrend();
	yfgzsNum();
	getProjectDatas();
	yq();
}

//核心企业数据总览
function getNanchangEntOverAll() {
	var params = {
		PRIPID: PRIPID,
		YEAR: YEAR,
		MONTH: MONTH
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/qyyxjcController/getBaseinfoByYear',
		data: {
			param: JSON.stringify(params) //参数
		},
		cache: false,
		success: function(res) {
			var result = JSON.parse(res);
			if (result.status == 10001) {
				var option1 = {
					startVal: 0,
					decimalPlaces: 2,
					duration: 1.9,
				};
				if (null != result.data && result.data.length>0) {
					$("#VENDINC").text("-");
					$("#VENDINCZS").text("-");
					$("#RATGRO").text("-");
					$("#RATGROZS").text("-");
					$("#EMPNUM").text("-");
					$("#EMPNUMZS").text("-");
					result.data.forEach(function(item, index){
						if(item.TYPE==2){
							new CountUp('VENDINC', item.DATAVALUE,option1).start();
							new CountUp('VENDINCZS', item.DATAGROWTH,option1).start();
						}else if(item.TYPE==3){
							new CountUp('RATGRO', item.DATAVALUE,option1).start();
							new CountUp('RATGROZS', item.DATAGROWTH,option1).start();
						}else if(item.TYPE==5){
							new CountUp('EMPNUM', Number(item.DATAVALUE)).start();
							new CountUp('EMPNUMZS', item.DATAGROWTH,option1).start();
						}
					})
				}
			}
		}
	})
}
//知识产权数据获取
function getIntellectualNum()  {
	var params = {
		PRIPID: PRIPID
	}
	doData(BASE_URL+'/qyyxjcController/getIntellectualNum',params,function(result){
		if(result.status == '10001'){
			result.data.forEach(function(item, index){
				if(item.TYPE=='1'){//商标
					$("#BRAND").text(item.SUMS);
				}else if(item.TYPE=='2'){//著作权
					$("#SOFT_WORK").text(item.SUMS);
				}else if(item.TYPE=='3'){//专利
					$("#PATENT").text(item.SUMS);
				}
			})
		}
	})
}
//知识产权列表
function getIntellectualList(param){
	let data = {
		PRIPID:PRIPID,
		TYPE:param,
		YEAR: YEAR
	};
	doData( BASE_URL+'/qyyxjcController/getIntellectualList',data,function (result) {
		if (result.status==10001){
			var str = "";
			if(param=='1'){//商标
				$("#brandList").empty();
				result.data.forEach(function(item, index){
					var appdate = item.AppDate;
					if(item.AppDate==''||item.AppDate==null){
						appdate='';
					}
					str +='<tr><td width="10%" style="text-align:center">'+(index+1)+'</td>'
						+'<td width="50%" class="compress" style="text-align:center">'+item.Name
						+'</td><td width="20%" style="text-align:center"><span>'+appdate+'</span></td>'
						+'<td width="20%" style="color:yellow;text-align:center;cursor: pointer;" onclick="openBrandDetails(\''+item.ID+'\')">'+'详情'+'</td></tr>';
				})
				$("#brandList").append(str);
			}else if(param=='2'){//著作权
				$("#entList").empty();
				result.data.forEach(function(item, index){
					var appdate = item.AppDate;
					if(item.AppDate==''||item.AppDate==null){
						appdate='';
					}
					str +='<tr><td width="10%" style="text-align:center">'+(index+1)+'</td>'
						+'<td width="50%" class="compress" style="text-align:center">'+item.Name
						+'</td><td width="20%" style="text-align:center"><span>'+appdate+'</span></td>'
						+'<td width="20%" style="color:yellow;text-align:center;cursor: pointer;" onclick="openCopyRightDetails(\''+item.ID+'\')">'+'详情'+'</td></tr>';
				})
				$("#entList").append(str);
			}else if(param=='3'){//专利
				$("#patentList").empty();
				result.data.forEach(function(item, index){
					var appdate = item.AppDate;
					if(item.AppDate==''||item.AppDate==null){
						appdate='';
					}
					str +='<tr><td width="10%" style="text-align:center">'+(index+1)+'</td>'
						+'<td width="50%" class="compress" style="text-align:center">'+item.Name
						+'</td><td width="20%" style="text-align:center"><span>'+appdate+'</span></td>'
						+'<td width="20%" style="color:yellow;text-align:center;cursor: pointer;" onclick="openPatentDetails(\''+item.ID+'\')">'+'详情'+'</td></tr>';
				})
				$("#patentList").append(str);
			}
		}
	});
}
//企业基本信息
var ENTNAMES="";
function qyjbxx()  {
	var datas = {
		YEAR: YEAR
	};
	datas.PRIPID=PRIPID;
	$.ajax({
		type: 'POST',
		url : BASE_URL+'/entPanoramicNewController/getEntMsg',
		data:{
			param:JSON.stringify(datas)//参数
		},
		cache : false,
		success : function(text) {

			$(".rbody").empty();
			let jsonData=eval('('+text+')')
			if(null!=jsonData.data){
				ENTNAMES = jsonData.data.ENTNAME;
				let ENTNAME=jsonData.data.ENTNAME; //企业名称
				let CODE_NAME=jsonData.data.CODE_NAME; //国民经济行业分类
				let UNISCID=jsonData.data.UNISCID;//统一社会信用代码
				let NAME=jsonData.data.NAME;//法人姓名
				let DOM=jsonData.data.DOM;//地址
				let ESTDATE=jsonData.data.ESTDATE;//成立日期
				let CHAIN_NAME = '';
				if(jsonData.data.INDUSTRY_NAME && jsonData.data.INDUSTRY_NAME!='undefined'){
				$(".rbody").append('<span class="lab1">'+jsonData.data.INDUSTRY_NAME+'</span>')
			}
			if(jsonData.data.CHAIN_NAME && jsonData.data.CHAIN_NAME!='undefined'){
				CHAIN_NAME =jsonData.data.CHAIN_NAME.split(',');
				for (let i = 0; i < CHAIN_NAME.length; i++) {
					$(".rbody").append('<span class="lab1">'+CHAIN_NAME[i]+'</span>')
				}
			}
			if(jsonData.data.ZDY_NAME && jsonData.data.ZDY_NAME!='undefined'){
				CHAIN_NAME =jsonData.data.ZDY_NAME.split(',');
				for (let i = 0; i < CHAIN_NAME.length; i++) {
					$(".rbody").append('<span class="lab1">'+CHAIN_NAME[i]+'</span>')
				}
			}
			$("#ENTNAME").html(ENTNAME);
			$("#CODE_NAME").html(CODE_NAME);
			$("#UNISCID").html(UNISCID);
			$("#NAME").html(NAME);
			$("#DOM").html(DOM);
			$("#ESTDATE").html(ESTDATE);
				$("#REGCAP").html(jsonData.data.REGCAP+'万元'+jsonData.data.REGCAPCUR_CN);
			}
		   },
		});

}
//营收趋势
function chartsTrend(){
	var datas = {};
	var monthArr = [];
	var monthZs = [];
	var names = [];
	datas.YEAR = YEAR;
	datas.CONDITION = CONDITION;
	datas.PRIPID = PRIPID;
	datas.MONTH = MONTH;
	doData(BASE_URL+'/qyyxjcController/getEntRevenueTrend',datas,function(result) {
		if (result.status == 10001) {
			result.data.forEach(function(item,idex){
				monthArr.push(item.sums);
				if(!item.DATAGROWTH){
					monthZs.push(0.00);
				}else{
					monthZs.push(item.DATAGROWTH);
				}
				names.push(item.M_NAME);
			});
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						lineStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(0, 255, 233,0)'
								}, {
									offset: 0.5,
									color: 'rgba(255, 255, 255,1)',
								}, {
									offset: 1,
									color: 'rgba(0, 255, 233,0)'
								}],
								global: false
							}
						},
					},
					formatter: function(data) {
						let html = data[0].name + '<br/>';
						for (var i = 0; i < data.length; i++) {
							if (i != data.length - 1) {
								html += '<span style="display:inline-block; border-radius:10px;width:10px;height:10px;background-color:' +
									data[i].color + ';"></span>' +
									data[i].seriesName + "：" + (data[i].value).toFixed(2)  + "万元<br/>";
							} else {
								html += '<span style="display:inline-block; border-radius:10px;width:10px;height:10px;background-color:' +
									data[i].color + ';"></span>' +
									data[i].seriesName + "：" + data[i].value + '%' + "<br/>";
							}
						}
						return html;
					}
				},
				legend: {
					data: [charttitle,'增速'],
					x:'right',
					textStyle: {
						color: "#fff",
						fontSize: 14
					}
				},
				grid: {
					top: '10%',
					left: '10%',
					right: '6%',
					bottom: '15%',
					// containLabel: true
				},
				xAxis: [{
					/*name:'月份',
					nameTextStyle:{
						color:'#fff'
					},*/
					type: 'category',
					axisLine: {
						show: false,
						color: '#fff'
					},
					axisLabel: {
						interval:0,//横轴信息全部显示
						color: '#fff',
						width: 100
					},
					splitLine: {
						show: false
					},
					boundaryGap: true,
					data: names //this.$moment(data.times).format("HH-mm") ,

				}],
				yAxis:[
					{
						name:title,
						axisLine: {
							lineStyle: {
								color: '#ffffff',
								width: 1, //这里是为了突出显示加上的
							}
						},
						textStyle: {
							color: '#ffffff'
						},
						type: 'value'
					},
					{
						axisLine: {
							lineStyle: {
								color: '#ffffff',

							}
						},
						textStyle: {
							color: '#ffffff'
						},
						axisLabel: {
							formatter: '{value} %'
						},
						type: 'value'
					}
				],
				series: [
					{
						name: charttitle,
						type: 'bar',
						barWidth:'30',
						itemStyle: {
							color: "#307BF7"
						},
						label: {
							show: true,
							position: 'top',
							textStyle: {
								color: '#87a9e0',
							}
						},
						data: monthArr//data.values
					},
					{
						name: '增速',
						type: 'line',
						yAxisIndex: 1,
						showAllSymbol: true,
						symbol: 'circle',
						symbolSize: 5,
						label: {
							show: true,
							position: 'top',
							formatter: '{c}%',
							textStyle: {
								color: '#fff',
							}
						},
						itemStyle: {
							normal: {
								color: 'rgba(255, 196, 53, 1)',
								barBorderRadius: 0,
							}
						},
						lineStyle: {
							normal: {
								width: 4,
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: 'rgba(255, 67, 2, 1)' // 0% 处的颜色
									}, {
										offset: 1,
										color: 'rgba(255, 196, 53, 1)' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								}
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(68,193,230,0.6)'
								},
									{
										offset: 1,
										color: 'rgba(81,150,164,0)'
									}
								], false),
							}
						},
						data: monthZs //data.values
					}
				]};
			var chartsTrend = document.getElementById('chartsTrend');
			var myChart = echarts.init(chartsTrend);
			myChart.setOption(option);

		}
	});


}

//项目资质奖励数据
function yfgzsNum()  {
	var datas = {
		PRIPID: PRIPID,
		YEAR: YEAR
	};
	doData(BASE_URL+'/qyyxjcController/getResearchStudio',datas,function(result){
		if(result.status == '10001'){
			result.data.forEach(function(item, index){
				if(item.TYPE=='PROJECT'){
					$("#projectNum").text(item.SUMS);
				}else{
					$("#rewardNum").text(item.SUMS);
				}
			})
		}
	})
}
//项目数据
function getProjectDatas(){
	$("#DataTable tr").remove();
	$(".programa1").html('');
	$(".programa1").append ('<div class="name">项目名称</div><div class="time">发布日期</div>')
	let datas = {
		PRIPID:PRIPID,
		YEAR: YEAR
	};
	doData(BASE_URL+'/qyyxjcController/getProjectDatas',datas,function(result){
		if (result.status == 10001) {
			result.data.forEach(function (item, index) {
				$("#DataTable").append ('<tr><td style="cursor: pointer;" class="compress" onclick="openProjectDetails(\''+item.ID+'\')">'+item.PROJECTNAME+'</td>'
					+'<td style="text-align: center;width: 40%;">'+item.PUBLISHDATE+'</td></tr>');
			})
			if(result.data.length == 0){
				$("#DataTable tr").remove();
				$("#DataTable").append ('<tr>'
					+'<td style="text-align: center">暂无项目数据！</td></tr>')
			}
		}
	})
}
//资质奖励数据
function getRewardDatas(){
	$("#DataTable tr").remove();
	$(".programa1").html('');
	$(".programa1").append ('<div class="name">证书名称</div><div class="time">发布日期</div>')
	let datas = {
		PRIPID:PRIPID,
		YEAR: YEAR
	};
	doData(BASE_URL+'/qyyxjcController/getRewardDatas',datas,function(result){
		if (result.status == 10001) {
			result.data.forEach(function (item, index) {
				var reward = item.REWARD;
				if(item.REWARD==''||item.REWARD==null){
					reward=item.TYPE_NAME;
				}
				$("#DataTable").append ('<tr>'
					+'<td class="compress">'+reward+'</td>'
					+'<td style="text-align: center;width: 40%;">'+item.REWARDGEDATE+'</td></tr>');
			})
			if(result.data.length == 0){
				$("#DataTable tr").remove();
				$("#DataTable").append ('<tr>'
					+'<td style="text-align: center">暂无奖励数据！</td></tr>')
			}
		}
	})
}
//舆情信息
function yq(){
	let url =  BASE_URL + '/entPanoramicNewController/queryNews',
		data = {searchKey:KEYNO};
	doData(url,data, function(result) {
		if (result.status==10001){
			let data = result.data;
			let str="";
			if (data.length >7){
				$(".more").text("更多>>");
			}
			for (let x of data){
				let title = (x.Title).length>18?(x.Title).substring(0,18)+"...":x.Title;
				str+= '<a class="li" onclick="getNewsDetails(\''+x.NewsId+'\');" title="'+x.Title+'">'+
					'<div class="tit">'+title+'</div>'+
					'<div class="date">'+(x.PublishTime).substring(0,10)+'</div>'+
					'</ a>';
			}
			$("#qytable").empty().html(str);
			if(data.length==0){
				$("#qytable").html("暂无舆情新闻");
			}
		}else {
			layer.msg(result.msg,{icon:2,time:5000});
		}
	});
}

//下拉按钮切换事件
var title="累计/万元";
var charttitle="累计营收";
function changeSelect(ths){
	CONDITION=$(ths).val();
	if(CONDITION==2){
		title = "累计/万元";
		charttitle = "累计营收";
	}else if(CONDITION==3){
		title = "累计/万元";
		charttitle = "累计纳税";
	}else if(CONDITION==5){
		title = "累计/人";
		charttitle = "从业人员";
	}else if(CONDITION==4){
		title = "累计/万元";
		charttitle = "利润总额";
	}
	chartsTrend();
}

//跳转企查查 企业详情
function toDetails(){
	var datas = {};
	datas.REGNO=ENTNAMES;
	doData(BASE_URL+'/entPanoramicNewController/getEntCreditxq',datas,function(jsonData){
		var url = jsonData.data.httpUrl;
		url = decodeURI(url);//unicode解码
		layer.open({
			type: 2
			,title:'企业信用详情'
			,area: ['95%', '95%']
			,content: url
			,btn: '关闭'
			,btnAlign: 'c' //按钮居中
			,shade: 0 //不显示遮罩
			,yes: function(){
				layer.closeAll();
			}
		});
	})
}
//商标详情
function openBrandDetails(id){
	var datas = {};
	datas.ID=id;
	doData(BASE_URL+'/qyyxjcController/getBrandDetails',datas,function(jsonData){
		var url = jsonData.data.httpUrl;
		url = decodeURI(url);//unicode解码
		layer.open({
			type: 2
			,title:'商标信息'
			,area: ['70%', '85%']
			,content: url
			,btn: '关闭'
			,btnAlign: 'c' //按钮居中
			,shade: 0 //不显示遮罩
			,yes: function(){
				layer.closeAll();
			}
		});
	})
}
//专利详情
function openPatentDetails(id){
	var datas = {};
	datas.ID=id;
	doData(BASE_URL+'/qyyxjcController/getPatentDetails',datas,function(jsonData){
		var url = jsonData.data.httpUrl;
		url = decodeURI(url);//unicode解码
		layer.open({
			type: 2
			,title:'专利信息'
			,area: ['70%', '85%']
			,content: url
			,btn: '关闭'
			,btnAlign: 'c' //按钮居中
			,shade: 0 //不显示遮罩
			,yes: function(){
				layer.closeAll();
			}
		});
	})
}
//项目信息
function openProjectDetails(id){
	var datas = {};
	datas.ID=id;
	doData(BASE_URL+'/qyyxjcController/getProjectDetails',datas,function(jsonData){
		var url = jsonData.data.httpUrl;
		url = decodeURI(url);//unicode解码
		layer.open({
			type: 2
			,title:'项目信息'
			,area: ['70%', '85%']
			,content: url
			,btn: '关闭'
			,btnAlign: 'c' //按钮居中
			,shade: 0 //不显示遮罩
			,yes: function(){
				layer.closeAll();
			}
		});
	})
}
//著作权详情
function openCopyRightDetails(id){
	layer.open({
		type: 2
		,title:'著作权信息'
		,area: ['40%', '40%']
		,content: 'yxjc_copyright_detail.html?ID='+id
		,btn: '关闭'
		,btnAlign: 'c' //按钮居中
		,shade: 0 //不显示遮罩
		,yes: function(){
			layer.closeAll();
		}
	});
}
//新闻详情
function getNewsDetails(id){
	var datas = {};
	datas.ID=id;
	doData(BASE_URL+'/qyyxjcController/getNewsDetails',datas,function(jsonData){
		var url = jsonData.data.httpUrl;
		url = decodeURI(url);//unicode解码
		layer.open({
			type: 2
			,title:'新闻信息'
			,area: ['70%', '85%']
			,content: url
			,btn: '关闭'
			,btnAlign: 'c' //按钮居中
			,shade: 0 //不显示遮罩
			,yes: function(){
				layer.closeAll();
			}
		});
	})
}
