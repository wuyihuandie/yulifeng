$(".ctitle").text(YEAR);
var AREA_NAME = ""; // 区域名称
var CONDITION = getUrlValue("CONDITION");
var PARENT_DL = 'NK05';
var title = "亿元";
var chartTitle = "营业收入";
var timer,timer1, timer2, timer3, timer4;
var canPlayMapTips = true;
var arrRank = [];	// 要排名的数据
var arrRank1 = [];	// 要排名的数据
var arrRank2 = [];	// 要排名的数据
var arrRank3 = [];	// 要排名的数据
var enterpriseNumberClickTimes = 0,growthRateClickTimes = 0;	// 用户第几次点击增速
var enterpriseNumberClickTimes1 = 0,growthRateClickTimes1 = 0;	// 用户第几次点击增速
var enterpriseNumberClickTimes2 = 0,growthRateClickTimes2 = 0;	// 用户第几次点击增速
var enterpriseNumberClickTimes3 = 0,growthRateClickTimes3 = 0;	// 用户第几次点击增速
$(function(){
	if(CONDITION=='2'){
		$(".titnames").text("营收(亿元)");
		$(".chartTitle").text("营收");
		title = "亿元";
		chartTitle = "营收";
		$(".classification").removeClass("xzlabel");
		$(".classification:eq(1)").addClass("xzlabel");
		$(".image1").html('<img src="../../source/img/rjsdl/组9-2.png" >');
		$(".image2").html('<img src="../../source/img/rjsdl/组 9(2).png" >');
	}else{
		$(".titnames").text("企业数量(家)");
		$(".chartTitle").text("数量");
		title = "家";
		chartTitle = "企业数量";
		$(".classification").removeClass("xzlabel");
		$(".classification:eq(2)").addClass("xzlabel");
		$(".image1").html('<img src="../../source/img/rjsdl/组 9(1).png" >');
		$(".image2").html('<img src="../../source/img/rjsdl/组 9(1)-2.png" >');
	}

	submitForm();

	$(".classification:eq(0)").click(function(){
		window.location.href=realPath+'view/rjsdl/rjsdl.html?menuType=3';
	})

	$(".classification:eq(1)").click(function(){
		CONDITION='2';
		$(".titnames").text("营收(亿元)");
		$(".chartTitle").text("营收");
		title = "亿元";
		chartTitle = "营收";
		getChainAnalysisZb();// 行业分类占比
		getChainAnalysis();//发展趋势
		renderFZQK();//地图
		queryAreaByParentdl('NK02');
		queryAreaByParentdl('NK03')
		queryAreaByParentdl('NK04')
		$(".classification").removeClass("xzlabel");
		$(this).addClass("xzlabel");
		$(".image1").html('<img src="../../source/img/rjsdl/组9-2.png" >');
		$(".image2").html('<img src="../../source/img/rjsdl/组 9(2).png" >');
	})

	$(".classification:eq(2)").click(function(){
		CONDITION='6';
		$(".titnames").text("企业数量(家)");
		$(".chartTitle").text("数量");
		title = "家";
		chartTitle = "企业数量";
		getChainAnalysisZb();// 行业分类占比
		getChainAnalysis();//发展趋势
		renderFZQK();//地图
		queryAreaByParentdl('NK02');
		queryAreaByParentdl('NK03')
		queryAreaByParentdl('NK04')
		$(".classification").removeClass("xzlabel");
		$(this).addClass("xzlabel");
		$(".image1").html('<img src="../../source/img/rjsdl/组 9(1).png" >');
		$(".image2").html('<img src="../../source/img/rjsdl/组 9(1)-2.png" >');
	})
	$('.cleft').click(function() {
		var year = $(".ctitle").text();
		if ('2017' != year) {
			year--;
			$(".ctitle").text(year);
			YEAR = year + "";
			submitForm();
		}
	})
	$('.cright').click(function() {
		var year = $(".ctitle").text();
		if (nowdate != year) {
			year++;
			$(".ctitle").text(year);
			YEAR = year + "";
			submitForm();
		}
	})

	// 点击企业数量排序
	$('.sequence').click(function(){
		if(enterpriseNumberClickTimes == 0) {
			arrRank.sort(compareUp('SUMS'));
			renderRankData();
			enterpriseNumberClickTimes = 1;
		} else if(enterpriseNumberClickTimes == 1) {
			arrRank.sort(compareDown('SUMS'));
			renderRankData();
			enterpriseNumberClickTimes = 0;
		}

	})

	$('.sequenced').click(function(){
		if(growthRateClickTimes == 0) {
			arrRank.sort(compareUp('RATE'));
			renderRankData();
			growthRateClickTimes = 1;
		} else if(growthRateClickTimes == 1) {
			arrRank.sort(compareDown('RATE'));
			renderRankData();
			growthRateClickTimes = 0;
		}

	})

	// 点击企业数量排序
	$('.sequence1').click(function(){
		if(enterpriseNumberClickTimes1 == 0) {
			arrRank1.sort(compareUp('SUMS'));
			renderRankData1();
			enterpriseNumberClickTimes1 = 1;
		} else if(enterpriseNumberClickTimes1 == 1) {
			arrRank1.sort(compareDown('SUMS'));
			renderRankData1();
			enterpriseNumberClickTimes1 = 0;
		}

	})

	$('.sequenced1').click(function(){
		if(growthRateClickTimes1 == 0) {
			arrRank1.sort(compareUp('RATE'));
			renderRankData1();
			growthRateClickTimes1 = 1;
		} else if(growthRateClickTimes1 == 1) {
			arrRank1.sort(compareDown('RATE'));
			renderRankData1();
			growthRateClickTimes1 = 0;
		}

	})

	// 点击企业数量排序
	$('.sequence2').click(function(){
		if(enterpriseNumberClickTimes2 == 0) {
			arrRank2.sort(compareUp('SUMS'));
			renderRankData2();
			enterpriseNumberClickTimes2 = 1;
		} else if(enterpriseNumberClickTimes2 == 1) {
			arrRank2.sort(compareDown('SUMS'));
			renderRankData2();
			enterpriseNumberClickTimes2 = 0;
		}

	})

	$('.sequenced2').click(function(){
		if(growthRateClickTimes2 == 0) {
			arrRank2.sort(compareUp('RATE'));
			renderRankData2();
			growthRateClickTimes2 = 1;
		} else if(growthRateClickTimes2 == 1) {
			arrRank2.sort(compareDown('RATE'));
			renderRankData2();
			growthRateClickTimes2 = 0;
		}

	})

	// 点击企业数量排序
	$('.sequence3').click(function(){
		if(enterpriseNumberClickTimes3 == 0) {
			arrRank3.sort(compareUp('SUMS'));
			renderRankData3();
			enterpriseNumberClickTimes3 = 1;
		} else if(enterpriseNumberClickTimes3 == 1) {
			arrRank3.sort(compareDown('SUMS'));
			renderRankData3();
			enterpriseNumberClickTimes3 = 0;
		}

	})

	$('.sequenced3').click(function(){
		if(growthRateClickTimes3 == 0) {
			arrRank3.sort(compareUp('RATE'));
			renderRankData3();
			growthRateClickTimes3 = 1;
		} else if(growthRateClickTimes3 == 1) {
			arrRank3.sort(compareDown('RATE'));
			renderRankData3();
			growthRateClickTimes3 = 0;
		}

	})
})
function submitForm(){
	getAnalysisOverAll();
	getChainAnalysisZb();// 行业分类占比
	getChainAnalysis();//发展趋势
	renderFZQK();//地图
	queryAreaByParentdl('NK02');
	queryAreaByParentdl('NK03');
	queryAreaByParentdl('NK04');
}
//左上角 各市区数据的 总览
function getAnalysisOverAll() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR,
		PARENT_DL: PARENT_DL
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/getJXSENTSUMSAndVENDINC',
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
				result.data.forEach(function(item, index) {
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
						new CountUp('VENDINC', item.VENDINC, option1).start();
						new CountUp('XZVENDINC', item.XZVENDINC, option1).start();
						new CountUp('VENDINCZS', item.VENDINCZS, option1).start();
					}
				})
			} else {
				this.$message.error(result.data.msg);
			}
		}
	})
}
//左下角各个产业占比情况
var dataIndex;
function getChainAnalysisZb() {
	var params = {
		YEAR: YEAR,
		CONDITION: CONDITION,
		AREA_NAME: AREA_NAME
	};
	doData(BASE_URL + '/entHomePage/getChainAnalysisZb', params, function(result) {
		var names = [];
		var datas = [];
		if (result.status == 10001) {
			//各省份的数据
			var rj = 0;
			result.data.forEach(function(item, index) {
				if(item.PARENT_DL!='NK01'){
					names.push(item.CHAIN_NAME);
					datas.push({
						name: item.CHAIN_NAME,
						value: item.SUMS
					});
				}
			})
			var colorList = [{
				type: 'linear',
				x: 0,
				y: 0,
				x2: 1,
				y2: 1,
				colorStops: [{
					offset: 0,
					color: '#77EBFF' // 0% 处的颜色
				},
					{
						offset: 1,
						color: '#768CFA' // 100% 处的颜色
					}
				],
				globalCoord: false // 缺省为 false
			},
				{
					type: 'linear',
					x: 1,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
						offset: 0,
						color: '#F2936E' // 0% 处的颜色
					},
						{
							offset: 1,
							color: '#FFBC87' // 100% 处的颜色
						}
					],
					globalCoord: false // 缺省为 false
				},
				{
					type: 'linear',
					x: 1,
					y: 0,
					x2: 0,
					y2: 0,
					colorStops: [{
						offset: 0,
						color: '#77FFCA' // 0% 处的颜色
					},
						{
							offset: 1,
							color: '#29A2E7' // 100% 处的颜色
						}
					],
					globalCoord: false // 缺省为 false
				},
			
			]
			var colorLine = ['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43']
			console.log(CONDITION)
			
			var tooltips = {}

			if(CONDITION == 6){
				tooltips={
					trigger: 'item',
					formatter: "{b} ({d}%) : {c}家",
					position: ['50%', '50%']
				}
			}
			else if(CONDITION == 2){
				tooltips={
					trigger: 'item',
					formatter: "{b} ({d}%) : {c} 亿元 ",
					position: ['50%', '50%']
				}
			}
				

			//各行业饼图
			option = {
				tooltip:tooltips ,
				legend: {
					icon: 'circle',
					orient: "horizontal",
					// data: legendData,
					textStyle: { color: '#fff', fontSize: 14 },
					left: '0%',
					// top: '0',
				},
				series: [{
					type: 'pie',
					radius: '60%',
					center: ['40%', '60%'],
					radius: ['40%', '70%'],
					
					clockwise: true,
					avoidLabelOverlap: true,
					label: {
						color: '#ffffff'
					},
					labelLine: {
						normal: {
							length:1,
							// length2: 30,
							lineStyle: {
								width: 1,
							}
						}
					},
					itemStyle: {
						normal: {
							color: function(params) {
								return colorList[params.dataIndex]
							}
						}
					},
					data:datas,
					roseType: 'radius'
				}]
			}
			var mapData = document.getElementById('bing');
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
	})
}
//右下角 近五年发展趋势
function getChainAnalysis() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR,
		CONDITION: CONDITION,
		PARENT_DL: PARENT_DL
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/getChainYearAnalysis',
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
					if (item.PARENT_DL == 'NK02') {
						datas2.push(item.SUMS);
					} else if (item.PARENT_DL == 'NK03') {
						datas3.push(item.SUMS);
					} else if (item.PARENT_DL == 'NK04') {
						datas4.push(item.SUMS);
					} else {
						if(item.YEAR == nowdate){
							years.push(item.YEAR + '年('+tMonth+'月)');
						}else{
							years.push(item.YEAR + '年');
						}
						datas5.push(item.RATE);
					}
				})

				for (var i = 0; i < datas5.length; i++) {
					if(CONDITION!=2){
						datas1.push(Number(datas2[i]) + Number(datas3[i]) + Number(datas4[i]));
					}else{
						datas1.push(parseFloat(Number(datas2[i]) + Number(datas3[i]) + Number(datas4[i])).toFixed(2));
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
						data: [chartTitle, '增速'],
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
							name: chartTitle,
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
							name: "营收",
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
//中间地图
function renderFZQK() {
	var params = {
		YEAR: YEAR,
		CONDITION: CONDITION,
		PARENT_DL: PARENT_DL
	};

	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/queryDigitalEconomyLJZAndZS',
		data: {
			param: JSON.stringify(params) //参数
		},
		cache: false,
		success: function(res) {
			var result = JSON.parse(res);
			if (result.status == 10001) {
				arrRank = result.data;
				arrRank.sort(compareDown('SUMS'));
				renderRankData();
				//各省份的数据
				result.data.forEach(function(item, index) {
					geoCoordMap.push({
						name: item.AREA_NAME,
						value: item.SUMS
					});
					var ss = Number(item.SUMS);
					if (ss > max) {
						max = ss;
					}
					if (ss < min) {
						min = ss;
					}

				})
				qujian = Math.floor((max + min) / 6) - 1;
				loadMap("../../source/js/echartsModel/map/360000.json", "nanchang");
			}
		}
	})

	/**
	 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
	 @params {String} mapCode:json数据的地址
	 @params {String} name: 地图名称
	 */
	var myChart;
	var max = 0;
	var min = 0;
	var qujian = 0;
	var geoCoordMap = [];
	var center = {
		"南昌市": [116.09, 28.28],
		"九江市": [115.30, 29.01],
		"景德镇市": [117.72, 29.3],
		"上饶市": [117.97, 28.47],
		"鹰潭市": [117.42, 28.03],
		"抚州市": [116.8, 27.3],
		"宜春市": [115.20, 28.11],
		"新余市": [115.22, 27.61],
		"萍乡市": [114.3, 27.3],
		"吉安市": [114.97, 27.02],
		"赣州市": [115.52, 25.45]
	};

	function loadMap(mapCode, name) {

		let seed = 0;
		if (!!timer) {
			clearInterval(timer);
		}
		timer = setInterval(function() {
			if (!canPlayMapTips) {
				return;
			}

			var index = seed % 12;
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function(mIndex) {
				//toolTip隐藏
				myChart.dispatchAction({
					type: 'hideTip',
					seriesIndex: 0,
					dataIndex: mIndex
				});
				//地图区域取消选中
				myChart.dispatchAction({
					type: 'mapUnSelect',
					seriesIndex: 1,
					dataIndex: mIndex
				});
			})
			myChart.dispatchAction({
				type: 'showTip',
				seriesIndex: 0,
				dataIndex: index
			});
			myChart.dispatchAction({
				type: 'mapSelect',
				seriesIndex: 1,
				dataIndex: index
			});

			seed++;
			return;
		}, 10000);


		var areaTitleList = geoCoordMap.map(item => {

			var position = [center[item.name][0] - 0.3, center[item.name][1] + 0.3].concat(item.name).concat(item.value);
			return position;
		})
		$.get(mapCode, function(data) {
			if (data) {
				echarts.registerMap(name, data);
				var option = {
					tooltip: {
						formatter: function(param) {
							if (param.seriesIndex == 0) {
								return param.data[2] + ":" + param.data[3] + title;
							} else if (param.seriesIndex == 1) {
								return param.data.name + ":" + param.data.value + title;
							}
						}
					},
					visualMap: { //左边的图标
						min: 0,
						max: 100000,
						x: 'right',
						bottom: 30,
						showLabel: !0,
						textStyle: {
							color: '#ffffff',
						},
						text: ["高", "低"],
						pieces: [{
							gte: qujian * 6,
							label: "> " + qujian * 5,
							color: "#0f74aa"
						}, {
							gte: qujian * 4,
							lt: qujian * 5,
							label: qujian * 4 + " - " + qujian * 5,
							color: "#0b8bd1"
						}, {
							gte: qujian * 2,
							lt: qujian * 4,
							label: qujian * 2 + " - " + qujian * 4,
							color: "#40abe5"
						}, {
							gte: qujian,
							lt: qujian * 2,
							label: qujian + " - " + qujian * 2,
							color: "#6bdaff"
						}, {
							lt: qujian,
							label: "0 - " + qujian + "",
							color: "#98daf0"
						}],
						show: !0
					},
					geo: {
						map: 'nanchang',
						aspectScale: 0.8, //长宽比
						zoom: 1.2,
						roam: false,
						// top:50,
						left: "center",
						itemStyle: {
							label: {
								show: false
							},
							normal: {
								areaColor: '#25709C',
								shadowColor: '#25709C',
								shadowOffsetX: 0,
								shadowOffsetY: 15
							}
						}
					},
					series: [{
						type: 'effectScatter',
						coordinateSystem: 'geo',
						geoIndex: 0,
						symbol: 'circle',
						symbolSize: 4,
						showEffectOn: 'render',
						rippleEffect: {
							brushType: 'fill',
							scale: 10
						},
						hoverAnimation: true,
						label: {
							formatter: p => p.data[2],
							position: 'right',
							color: '#fff',
							fontSize: 14,
							distance: 10,
							show: !0,
						},
						itemStyle: {
							color: '#FEF134',
						},
						zlevel: 6,
						data: areaTitleList
					},
						{
							name: 'MAP',
							aspectScale: 0.8, //长宽比
							zoom: 1.2,
							left: "center",
							type: 'map',
							mapType: name,
							data: geoCoordMap,
							showLegendSymbol: false, //去除地图指示点
							label: {
								show: false
							},
							itemStyle: {
								normal: {
									areaColor: "#3a7fd5",
									borderColor: "#0a53e9", //线
									shadowColor: "#092f8f", //外发光
									shadowBlur: 20,
								},
								emphasis: {
									areaColor: "#C7453E", // 鼠标移上去的颜色
									label: {
										show: false
									}
								}
							}
						}
					]
				};
				var mapData = document.getElementById('mapData');
				myChart = echarts.init(mapData);
				myChart.setOption(option);
				/*myChart.off("click");
				myChart.on('click', function(params) {
					AREA_NAME = params.name;
					$(".areaTitle").text(AREA_NAME);
					$("#qsspan").text("全市");
					submitForm();
				});*/
				myChart.on("mouseover", function() {
					canPlayMapTips = false;
				})

				myChart.on("mouseout", function() {
					canPlayMapTips = true;
				})

			}
		});
	}
}
//下方各区域列表
function queryAreaByParentdl(parentdl) {
	var params = {
		YEAR: YEAR,
		CONDITION: CONDITION,
		PARENT_DL: parentdl
	};
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/queryDigitalEconomyLJZAndZS',
		data: {
			param: JSON.stringify(params) //参数
		},
		cache: false,
		success: function(res) {
			$("#areaTable tbody tr").remove();
			var result = JSON.parse(res);
			if (result.status == 10001) {
				if(parentdl=='NK02'){
					arrRank1 = result.data;
					arrRank1.sort(compareDown('SUMS'));
					renderRankData1();
				}else if(parentdl=='NK03'){
					arrRank2 = result.data;
					arrRank2.sort(compareDown('SUMS'));
					renderRankData2();
				}else{
					arrRank3 = result.data;
					arrRank3.sort(compareDown('SUMS'));
					renderRankData3();
				}

			}
		}
	})
}

//数据
function renderRankData(){
	$("#rjhy").html('');
	arrRank.forEach(function(item,index){
		var numi = (index + 1);
		$("#rjhy").append('<tr><td   class="i' + numi + '">' + numi + '</td>' +
			'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS + '</td>' +
			'<td>' + item.RATE + '%</td>' +
			'</tr>');
	})
}
function renderRankData1(){
	$("#dx").html('');
	arrRank1.forEach(function(item,index){
		var numi = (index + 1);
		$("#dx").append('<tr><td   class="i' + numi + '">' + numi + '</td>' +
			'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS + '</td>' +
			'<td>' + item.RATE + '%</td>' +
			'</tr>')
	})
}
function renderRankData2(){
	$("#hlw").html('');
	arrRank2.forEach(function(item,index){
		var numi = (index + 1);
		$("#hlw").append('<tr><td   class="i' + numi + '">' + numi + '</td>' +
			'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS + '</td>' +
			'<td>' + item.RATE + '%</td>' +
			'</tr>')
	})
}
function renderRankData3(){
	$("#rj").html('');
	arrRank3.forEach(function(item,index){
		var numi = (index + 1);
		$("#rj").append('<tr><td   class="i' + numi + '">' + numi + '</td>' +
			'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS + '</td>' +
			'<td>' + item.RATE + '%</td>' +
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