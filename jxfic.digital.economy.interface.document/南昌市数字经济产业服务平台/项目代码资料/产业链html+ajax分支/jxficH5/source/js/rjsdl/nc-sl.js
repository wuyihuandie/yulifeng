var PARENT_DL='NK05';
var AREA_NAME='';
var CONDITION='1';
var arrRank='';
var title='家';
var INDUSTRY_NAME='信息传输、软件和信息技术服务业';
var timer,timer1, timer2, timer3, timer4;
var industry=['NK02','NK03','NK04'];
var industry_name = ['电信、广播电视和卫星传输服务业', '互联网和相关服务业', '软件和信息技术服务业','信息传输、软件和信息技术服务业'];
var enterpriseNumberClickTimes1 = 0,growthRateClickTimes1 = 0;	// 用户第几次点击增速
var enterpriseNumberClickTimes2 = 0,growthRateClickTimes2 = 0;	// 用户第几次点击增速
$(function(){
	submitForm();
	$('.cleft').click(function() {
		var year = $(".ctitle").text();
		if ('2017' != year) {
			year--;
			$(".ctitle").text(year);
			YEAR = year + "";
			$(".qytitle").text("企业数量(家)");
			PARENT_DL='NK05';
			INDUSTRY_NAME='信息传输、软件和信息技术服务业';
			submitForm();
		}
	})
	$('.cright').click(function() {
		var year = $(".ctitle").text();
		if (nowdate != year) {
			year++;
			$(".ctitle").text(year);
			YEAR = year + "";
			$(".qytitle").text("企业数量(家)");
			PARENT_DL='NK05';
			INDUSTRY_NAME='信息传输、软件和信息技术服务业';
			submitForm();
		}
	})

	$('#fourimg').click(function() {
		window.location.href= realPath+'view/rjsdl/nc-ys.html?menuType=3';
	})

	// 点击排序
	$('.sequence1').click(function(){
		if(enterpriseNumberClickTimes1 == 0) {
			arrRank.sort(compareUp('SUMS'));
			renderRankData();
			enterpriseNumberClickTimes1 = 1;
		} else if(enterpriseNumberClickTimes1 == 1) {
			arrRank.sort(compareDown('SUMS'));
			renderRankData();
			enterpriseNumberClickTimes1 = 0;
		}

	})
	$('.sequence2').click(function(){
		if(growthRateClickTimes1 == 0) {
			arrRank.sort(compareDown('RATE'));
			renderRankData();
			growthRateClickTimes1 = 1;
		} else if(growthRateClickTimes1 == 1) {
			arrRank.sort(compareUp('RATE'));
			renderRankData();
			growthRateClickTimes1 = 0;
		}

	})
	$('.sequence3').click(function(){
		if(enterpriseNumberClickTimes2 == 0) {
			arrRank.sort(compareDown('GSSUMS'));
			renderRankData();
			enterpriseNumberClickTimes2 = 1;
		} else if(enterpriseNumberClickTimes2 == 1) {
			arrRank.sort(compareUp('GSSUMS'));
			renderRankData();
			enterpriseNumberClickTimes2 = 0;
		}

	})
	$('.sequence4').click(function(){
		if(growthRateClickTimes2 == 0) {
			arrRank.sort(compareDown('GSRATE'));
			renderRankData();
			growthRateClickTimes2 = 1;
		} else if(growthRateClickTimes2 == 1) {
			arrRank.sort(compareUp('GSRATE'));
			renderRankData();
			growthRateClickTimes2 = 0;
		}

	})

	$('.butto:eq(0)').click(function(){
		bindHotMap('HYQY');//地图
		$(".butto").removeClass("buttos");
		$(this).addClass("buttos");
	})

	$('.butto:eq(1)').click(function(){
		bindHotMap('GSQY');//地图
		$(".butto").removeClass("buttos");
		$(this).addClass("buttos");
	})
})
function submitForm() {
	getNanchangEntOverAll();//数据总览
	getNanchangChainYearAnalysis();
	getNanchangChainMonthXz();
	getNanchangEntByDatas('NK02','1');
	getNanchangEntByDatas('NK03','1');
	getNanchangEntByDatas('NK04','1');
	renderFZQK();
	bindHotMap('HYQY');//地图
}
//核心企业数据总览
function getNanchangEntOverAll() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR,
		INDUSTRY: PARENT_DL
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/getNanchangEntOverAll',
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
				if (result.data != null) {
					var item = result.data;
					if(item!=null){
						$(".GSENTNUMS").text(item.GSQYENTSUMS);
						if(item.GSQYENTSUMSZS==undefined||item.GSQYENTSUMSZS=="undefined"){
							$(".GSENTZS").text('0');
							$(".XZGSENTNUMS").text('0');
						}else{
							$(".GSENTZS").text(item.GSQYENTSUMSZS);
							$(".XZGSENTNUMS").text(item.XZGSQYENTSUMS);
						}
						new CountUp('ENTNUMS', item.ENTNUMS).start();
						if (YEAR != nowdate) {
							new CountUp('XZENTNUMS', item.XZENTNUMS).start();
						}else{
							new CountUp('XZENTNUMS', item.XZENTNUMS1).start();
						}
						new CountUp('ENTZS', item.ENTZS, option1).start();
					}
				}
			}
		}
	})
}
function getNanchangEntByDatas(parentdl,qytype) {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR,
		PARENT_DL: parentdl
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/getNanchangEntOverAll',
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
				if (result.data != null) {
					var item = result.data;
					if(item!=null){
						if(qytype=='1'){
							if(parentdl=='NK02'){
								new CountUp('ENTNUMS1', item.ENTNUMS).start();
								$("#ENTNUMS1").attr("onclick","queryZlEntList('0','')");
								$("#XZENTNUMS1").attr("onclick","queryZlEntList('0','"+YEAR+"')");
								if (YEAR != nowdate) {
									new CountUp('XZENTNUMS1', item.XZENTNUMS).start();
								}else{
									new CountUp('XZENTNUMS1', item.XZENTNUMS1).start();
								}
								new CountUp('ENTZS1', item.ENTZS, option1).start();
							}else if(parentdl=='NK03'){
								new CountUp('ENTNUMS2', item.ENTNUMS).start();
								$("#ENTNUMS2").attr("onclick","queryZlEntList('0','')");
								$("#XZENTNUMS2").attr("onclick","queryZlEntList('0','"+YEAR+"')");
								if (YEAR != nowdate) {
									new CountUp('XZENTNUMS2', item.XZENTNUMS).start();
								}else{
									new CountUp('XZENTNUMS2', item.XZENTNUMS1).start();
								}
								new CountUp('ENTZS2', item.ENTZS, option1).start();
							}else{
								new CountUp('ENTNUMS3', item.ENTNUMS).start();
								$("#ENTNUMS3").attr("onclick","queryZlEntList('0','')");
								$("#XZENTNUMS3").attr("onclick","queryZlEntList('0','"+YEAR+"')");
								if (YEAR != nowdate) {
									new CountUp('XZENTNUMS3', item.XZENTNUMS).start();
								}else{
									new CountUp('XZENTNUMS3', item.XZENTNUMS1).start();
								}
								new CountUp('ENTZS3', item.ENTZS, option1).start();
							}
						}else{
							if(parentdl=='NK02'){
								new CountUp('ENTNUMS1', item.GSQYENTSUMS).start();
								new CountUp('XZENTNUMS1', item.XZGSQYENTSUMS).start();
								new CountUp('ENTZS1', item.GSQYENTSUMSZS, option1).start();
								$("#ENTNUMS1").attr("onclick","queryZlGsList('0')");
							}else if(parentdl=='NK03'){
								new CountUp('ENTNUMS2', item.GSQYENTSUMS).start();
								new CountUp('XZENTNUMS2', item.XZGSQYENTSUMS).start();
								new CountUp('ENTZS2', item.GSQYENTSUMSZS, option1).start();
								$("#ENTNUMS2").attr("onclick","queryZlGsList('1')");
							}else{
								new CountUp('ENTNUMS3', item.GSQYENTSUMS).start();
								new CountUp('XZENTNUMS3', item.XZGSQYENTSUMS).start();
								new CountUp('ENTZS3', item.GSQYENTSUMSZS, option1).start();
								$("#ENTNUMS3").attr("onclick","queryZlGsList('2')");
							}
						}


					}
				}
			}
		}
	})
}
//近五年发展趋势
function getNanchangChainYearAnalysis() {
	var params = {
		AREA_NAME: AREA_NAME,
		CONDITION: CONDITION,
		PARENT_DL: PARENT_DL
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/getNanchangChainYearAnalysis',
		data: {
			param: JSON.stringify(params) //参数
		},
		cache: false,
		success: function(res) {
			var years = [];
			var datas1 = [];
			var datas2 = [];
			var datas3 = [];
			var datas4 = [];
			var datas5 = [];
			var result = JSON.parse(res);
			if (result.status == 10001) {
				result.data.forEach(function(item, index) {
					if(PARENT_DL=='NK05'){
						if (item.PARENT_DL == 'NK02') {
							datas2.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK03') {
							datas3.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK04') {
							datas4.push(item.SUMS);
						} else {
							if(item.YEAR == nowdate){
								years.push(item.YEAR + '年('+tMonth+'月)');
							}else if(item.YEAR == (nowdate-1)){
								if(CONDITION == '1'){
									years.push(item.YEAR + '年');
								}else{
									years.push(item.YEAR + '年(9月)');
								}
							}else{
								years.push(item.YEAR + '年');
							}
							datas5.push(item.RATE);
						}
					}else{
						if (item.PARENT_DL != undefined && item.PARENT_DL != 'undefined' && item.PARENT_DL != '') {
							if(item.YEAR == nowdate){
								years.push(item.YEAR + '年('+tMonth+'月)');
							}else if(item.YEAR == (nowdate-1)){
								if(CONDITION == '1'){
									years.push(item.YEAR + '年');
								}else{
									years.push(item.YEAR + '年(9月)');
								}
							}else{
								years.push(item.YEAR + '年');
							}
							datas1.push(item.SUMS);
						} else {
							datas5.push(item.RATE);
						}
					}

				})
				if(PARENT_DL=='NK05') {
					for (var i = 0; i < datas5.length; i++) {
						if (CONDITION != 2) {
							datas1.push(Number(datas2[i]) + Number(datas3[i]) + Number(datas4[i]));
						} else {
							datas1.push(parseFloat(Number(datas2[i]) + Number(datas3[i]) + Number(datas4[i])).toFixed(2));
						}
					}
				}
				option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						},
						formatter: function(data) {
							let html = data[0].name + '<br/>';
							for (var i = 0; i < data.length; i++) {
								if (i != data.length - 1) {
									html +=
										'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0EE3EF;"></span>' +
										data[i].seriesName + "：" + data[i].value + title + "<br/>";
								} else {
									html +=
										'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
										data[i].color + ';"></span>' +
										data[i].seriesName + "：" + data[i].value + '%' + "<br/>";
								}
							}
							return html;
						}
					},
					grid: {
						top:'13%',
						left: '5%',
						right: '5%',
						bottom: '0%',
						containLabel: true
					},
					legend: {
						data: ['企业数量', '增速'],
						textStyle: {
							fontSize: 14,
							color: '#96A4F4',
							padding: [3, 0, 0, 0]
						},
					},
					xAxis: [
						{
							type: 'category',
							data: years,
							axisPointer: {
								type: 'shadow'
							},
							axisLine: {
								lineStyle: {
									color: '#fff'
								}
							},
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '企业数量',
							axisLabel: {
								formatter: '{value} '+title
							},
							axisLine: {
								lineStyle: {
									color: '#fff'
								}
							},
						},
						{
							type: 'value',
							name: '增速',
							axisLabel: {
								formatter: '{value} %'
							},
							axisLine: {
								lineStyle: {
									color: '#fff'
								}
							},
						}
					],
					series: [
						{
							name: '企业数量',
							type: 'bar',
							barWidth: '40%', //柱图宽度
							data: datas1,
							"itemStyle": {
								"normal": {
									"color": 
									{
										type: 'linear',
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [{
											offset: 0,
											color: '#0EE3EF' // 0% 处的颜色
										}, {
											offset: 1,
											color: '#0099FC' // 100% 处的颜色
										}],
										global: false // 缺省为 false
									}
								}
							},
						},

						{
							name: '增速',
							type: 'line',
							yAxisIndex: 1,
							data: datas5,
							itemStyle: {
								color: '#E3D711',
							},
						}
					]
				};
				var mapData = document.getElementById('zhuzhuang');
				myChart = echarts.init(mapData);
				myChart.setOption(option);

				var canPlayAction = true;
				myChart.on("mouseover", function() {
					canPlayAction = false;
				})
				myChart.on("mouseout", function() {
					canPlayAction = true;
				})
				let seed = 0;
				if (!!timer3) {
					clearInterval(timer3);
				}
				timer3 = setInterval(function() {
					if (!canPlayAction) {
						return;
					}
					var index = seed % datas4.length;
					datas4.map(function(item, i) {
						myChart.dispatchAction({
							type: 'downplay',
							seriesIndex: 0,
							dataIndex: i
						});
					})

					myChart.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: index
					});
					myChart.dispatchAction({
						type: 'showTip',
						seriesIndex: 0,
						dataIndex: index
					});
					seed++;
				}, 10000)
			}
		}
	})
}
//月份新增
function getNanchangChainMonthXz() {
	var params = {
		YEAR: YEAR,
		PARENT_DL: PARENT_DL,
		TYPE:'NCMONTH'
	};

	doData(BASE_URL + '/entHomePage/queryMonthXzEntDatas', params, function(result) {
		var names = [];
		var datas=[];
		if (result.status == 10001) {
			//各省份的数据
			result.data.forEach(function(item, index) {
				var yy = item.MONTH;
				names.push(yy.substring(yy.indexOf('年')+1,yy.length));
				datas.push(item.SUMS);
			})

			option = {
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
									color: 'rgba(255,255,255,0)' // 0% 处的颜色
								}, {
									offset: 0.5,
									color: 'rgba(255,255,255,1)' // 100% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(255,255,255,0)' // 100% 处的颜色
								}],
								global: false // 缺省为 false
							}
						},
					},

				},
				grid: {
					top:'8%',
					left: '3%',
					right: '3%',
					bottom: '0%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: true,
					axisLine: { //坐标轴轴线相关设置。数学上的x轴
						show: true,
						lineStyle: {
							color:"#fff"
						},
					},
					axisLabel: { //坐标轴刻度标签的相关设置
						textStyle: {
							color: '#fff',
							margin: 15,
						}
					},
					axisTick: {
						show: false,
					},
					data: names
				}],
				yAxis: [{
					splitLine: {
						show: true,
						lineStyle: {
							color: '#fff'
						},
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "#fff"
						}

					},
					type: 'value',
					axisLabel: {
						formatter: '{value} 家',
						interval: 0,
						color:'#fff'
					}
				}],
				series: [{
					name: '企业数量',
					type: 'line',
					// symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
					showAllSymbol: true,
					symbolSize: 8,
					lineStyle: {
						normal: {
							color: "#FCB683", // 线条颜色
						},
						borderColor: 'rgba(0,0,0,.4)',
					},
					itemStyle: {
						color: "rgba(14,30,73,1)",
						borderColor: "#FCB683",
						borderWidth: 2

					},
					label: {
						show: true,
						position: 'top',
						formatter: '{c} 家',
						textStyle: {
							color: '#ffffff'
						}
					},
					areaStyle: { //区域填充样式
						normal: {
							//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: "#FCB683"


							},
								{
									offset: 1,
									color: "rgba(124, 128, 244, 0)"
								}
							], false),
							shadowColor: 'FCB683', //阴影颜色
							shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
						}
					},
					data: datas
				}]
			};
			var mapData = document.getElementById('zhex');
			myChart = echarts.init(mapData);
			myChart.setOption(option);

		}
	})
}
//各县区总量排名
function renderFZQK() {
	var params = {
		YEAR: YEAR,
		CONDITION: '7',
		PARENT_DL: PARENT_DL
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/getNanchangSzjjEntByArea',
		data: {
			param: JSON.stringify(params) //参数
		},
		cache: false,
		success: function(res) {
			var result = JSON.parse(res);
			if (result.status == 10001) {
				arrRank = result.data;	// 获取到的数据给到全局
				arrRank.sort(compareDown('SUMS'));
				renderRankData();
			}
		}
	})
}
function bindHotMap(param){
	var map = new AMap.Map("allmap", {
		resizeEnable: true,
		zoom: 12, //初始地图级别
		center: [115.857963,28.683016], //初始地图中心点
		showIndoorMap: false //关闭室内地图
	});

	var marker = new AMap.Marker({
		position:[115.857963,28.683016]
	});
	infoWindow = new AMap.InfoWindow({
		autoMove: true
	});

	var markerList=[];
	doData(BASE_URL + '/entHomePage/getLocation',{TYPE:param},function(result){
		if (result.status == 10001) {
			console.log(result);
			result.data.forEach(function (item, index) {
				if(index < 2000){
					marker = new AMap.Marker({
						icon: "../../source/img/rjsdl/map.png",
						position:[item.MAPX,item.MAPY]  // 经纬度对象
					});
					markerList.push(marker);
					marker.on("click",function(e){
						var infoWindow = new AMap.InfoWindow({ anchor: 'bottom-left',autoMove: true});
						var extData = e.target.getExtData();
						console.log(extData);
						console.log(infoWindow);
						infoWindow.setContent('<h5 style="color:#000" onclick="toDetails(\''+item.ENTNAME+'\')">' + item.ENTNAME + "</h5><div style='font-size:0.8rem;color:#000'>" + item.DOM + "</div>");
						infoWindow.open(map, e.lnglat);

					})
				}

			})
			map.add(markerList);
		}
	})

}

//数据
function renderRankData(){
	$("#rjhy").html('');
	arrRank.forEach(function(item,index){
		var numi = (index + 1);
		$("#rjhy").append('<tr><td   class="i' + numi + '">' + numi + '</td>' +
			'<td >' + item.AREA_NAME + '</td><td onclick="queryEntList(\'' + item.AREA_NAME + '\',\'\')">' + item.SUMS + '</td>' +
			'<td>' + item.RATE + '%</td><td onclick="queryGsList(\'' + item.AREA_NAME + '\')">' + item.GSSUMS + '</td>' +
			'<td>' + item.GSRATE + '%</td>' +
			'</tr>')
	})
}
// 点击后对排名数据排序（升序)
function compareUp(property) {
	return function (a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	}
}
// 点击后对排名数据排序（降序)
function compareDown(property) {
	return function (a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value2 - value1;
	}
}

function changeIndustry(param){
	PARENT_DL=industry[param];
	INDUSTRY_NAME=industry_name[param];
	getNanchangChainYearAnalysis();
	getNanchangChainMonthXz();
	renderFZQK();
}

function changeQyType(params){
	if(params=='1'){
		$(".qytitle").text("企业数量(家)");
	}else{
		$(".qytitle").text("规上企业数量(家)");
	}
	INDUSTRY_NAME='信息传输、软件和信息技术服务业';
	PARENT_DL='NK05';
	getNanchangEntByDatas('NK02',params);
	getNanchangEntByDatas('NK03',params);
	getNanchangEntByDatas('NK04',params);
}

function toDetails(entname){
	var datas = {};
	datas.REGNO=entname;
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


//总量
var qytitle = "";

function queryZl() {
	queryEntList(AREA_NAME, '');
}
//新增
function queryXz() {
	queryEntList(AREA_NAME,  YEAR);
}
//查看企业列表
function queryEntList(area_name, estdateyear) {
	if (estdateyear != '') {
		if (area_name == '') {
			qytitle = '南昌市' + estdateyear + "年" + INDUSTRY_NAME + "新增企业";
		} else {
			qytitle = area_name + estdateyear + "年" + INDUSTRY_NAME + "新增企业";
		}
	} else {
		if (area_name == '') {
			qytitle = '南昌市' + YEAR + "年" + INDUSTRY_NAME + "累计企业";
		} else {
			qytitle = area_name + YEAR + "年" + INDUSTRY_NAME + "累计企业";
		}
	}
	layer.open({
		type: 2,
		shade: 0.1,
		title: false, //不显示标题
		area: ['100%', '100%'], //宽高
		content: realPath + "view/sy/qylist.html?AREA_NAME=" + area_name + "&INDUSTRY=" + PARENT_DL + "&ESTDATEMONTH=&YEAR=" + YEAR + "&ESTDATEYEAR=" + estdateyear + "&qytitle=" + qytitle
	})
}

function queryZlEntList(param,estdateyear){
	if (estdateyear != '') {
		qytitle = '南昌市' + YEAR + "年" + industry_name[param] + "累计企业";
	}else{
		qytitle = '南昌市' + YEAR + "年" + industry_name[param] + "新增企业";
	}
	layer.open({
		type: 2,
		shade: 0.1,
		title: false, //不显示标题
		area: ['100%', '100%'], //宽高
		content: realPath + "view/sy/qylist.html?AREA_NAME=&INDUSTRY=" + industry[param] + "&ESTDATEMONTH=&YEAR=" + YEAR + "&ESTDATEYEAR=" + estdateyear + "&qytitle=" + qytitle
	})
}

function queryGs(){
	queryGsList(AREA_NAME);
}

//查看企业列表
function queryGsList(area_name) {
	var jj = '';
	if (area_name == '') {
		jj = '南昌市' + YEAR + "年" + INDUSTRY_NAME + "规上企业";
	} else {
		jj = area_name + YEAR + "年" + INDUSTRY_NAME + "规上企业";
	}
	layer.open({
		type: 2,
		shade: 0.1,
		title: false, //不显示标题
		area: ['100%', '100%'], //宽高
		content: realPath + "view/sy/gsqylist.html?AREA_NAME=" + area_name + "&INDUSTRY=" + PARENT_DL + "&YEAR=" + YEAR + "&qytitle=" + jj
	})
}

function queryZlGsList(param) {
	var jj =  '南昌市' + YEAR + "年" + industry_name[param] + "规上企业";

	layer.open({
		type: 2,
		shade: 0.1,
		title: false, //不显示标题
		area: ['100%', '100%'], //宽高
		content: realPath + "view/sy/gsqylist.html?AREA_NAME=&INDUSTRY=" + industry[param] + "&YEAR=" + YEAR + "&qytitle=" + jj
	})
}