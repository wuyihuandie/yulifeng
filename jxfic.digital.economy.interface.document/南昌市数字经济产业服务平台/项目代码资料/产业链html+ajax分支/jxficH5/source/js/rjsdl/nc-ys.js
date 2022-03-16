var PARENT_DL='NK05';
var AREA_NAME='';
var CONDITION='2';
var arrRank='';
var title='亿元';
var canPlayMapTips = true;
var timer,timer1, timer2, timer3, timer4;
var industry=['NK02','NK03','NK04'];
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
	$('#fourimg').click(function() {
		window.location.href= realPath+'view/rjsdl/nc-sl.html?menuType=3';
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
})
function submitForm() {
	getNanchangEntOverAll();//数据总览
	getNanchangChainYearAnalysis();
	getNanchangChainAreaXzPm();
	getNanchangEntByDatas('NK02','1')
	getNanchangEntByDatas('NK03','1')
	getNanchangEntByDatas('NK04','1')
	renderFZQK();
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
						new CountUp('VENDINC', item.VENDINC, option1).start();
						new CountUp('XZVENDINC', item.XZVENDINC, option1).start();
						new CountUp('VENDINCZS', item.VENDINCZS, option1).start();
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
								new CountUp('VENDINC1', item.VENDINC,option1).start();
								new CountUp('XZVENDINC1', item.XZVENDINC,option1).start();
								new CountUp('VENDINCZS1', item.VENDINCZS, option1).start();
							}else if(parentdl=='NK03'){
								new CountUp('VENDINC2', item.VENDINC,option1).start();
								new CountUp('XZVENDINC2', item.XZVENDINC,option1).start();
								new CountUp('VENDINCZS2', item.VENDINCZS, option1).start();
							}else{
								new CountUp('VENDINC3', item.VENDINC,option1).start();
								new CountUp('XZVENDINC3', item.XZVENDINC,option1).start();
								new CountUp('VENDINCZS3', item.VENDINCZS, option1).start();
							}
						}else{
							if(parentdl=='NK02'){
								new CountUp('VENDINC1', item.GSQYENTSUMS).start();
								new CountUp('XZVENDINC1', item.XZGSQYENTSUMS).start();
								new CountUp('VENDINCZS1', item.GSQYENTSUMSZS, option1).start();
							}else if(parentdl=='NK03'){
								new CountUp('VENDINC2', item.GSQYENTSUMS).start();
								new CountUp('XZVENDINC2', item.XZGSQYENTSUMS).start();
								new CountUp('VENDINCZS2', item.GSQYENTSUMSZS, option1).start();
							}else{
								new CountUp('VENDINC3', item.GSQYENTSUMS).start();
								new CountUp('XZVENDINC3', item.XZGSQYENTSUMS).start();
								new CountUp('VENDINCZS3', item.GSQYENTSUMSZS, option1).start();
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
								years.push(item.YEAR + '年(11月)');
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
								years.push(item.YEAR + '年(11月)');
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
						data: ['营收', '增速'],
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
							name: '营收',
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
							name: '营收',
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
//各县区新增排名
function getNanchangChainAreaXzPm() {
	var params = {
		YEAR: YEAR,
		CONDITION: CONDITION,
		PARENT_DL: PARENT_DL
	};

	doData(BASE_URL + '/entHomePage/getNanchangChainAreaXzPm', params, function(result) {
		var names = [];
		var datas=[];
		if (result.status == 10001) {
			//各省份的数据
			result.data.forEach(function(item, index) {
				names.push(item.AREA_NAME);
				if(CONDITION==1){
					datas.push(item.XZSUMS);
				}else{
					if(YEAR==nowdate){
						datas.push(item.TQXZSUMS);
					}else{
						datas.push(item.XZSUMS);
					}
				}
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
					top:'5%',
					left: '3%',
					right: '3%',
					bottom: '3%',
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
					axisLabel: {
						interval: 0,
						textStyle: {
							color: "#ffffff"
						},
						rotate:30
						/*formatter: function(value) {
							var ret = ""; //拼接加\n返回的类目项
							var maxLength = 3; //每项显示文字个数
							var valLength = value.length; //X轴类目项的文字个数
							var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
							if (rowN > 1) //如果类目项的文字大于3,
							{
								for (var i = 0; i < rowN; i++) {
									var temp = ""; //每次截取的字符串
									var start = i * maxLength; //开始截取的位置
									var end = start + maxLength; //结束截取的位置
									//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
									temp = value.substring(start, end) + "\n";
									ret += temp; //凭借最终的字符串
								}
								return ret;
							} else {
								return value;
							}
						}*/
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
						formatter: '{value} '+title,
						interval: 0,
						color:'#fff'
					}
				}],
				series: [{
					name: '营收',
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
						formatter: '{c}',
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
							shadowColor: '#FCB683', //阴影颜色
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
		CONDITION: '8',
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
			$("#areaTable tbody tr").remove();
			var result = JSON.parse(res);
			if (result.status == 10001) {
				arrRank = result.data;	// 获取到的数据给到全局
				arrRank.sort(compareDown('SUMS'));
				renderRankData();
				arrRank.forEach(function(item, index) {
					geoCoordMap.push({
						name: item.AREA_NAME,
						value: item.SUMS
					});
					if (item.SUMS > max) {
						max = item.SUMS;
					}
					if (item.SUMS < min) {
						min = item.SUMS;
					}
				})
				qujian = Math.floor((max + min) / 4) - 1;
				loadMap("../../source/js/echartsModel/map/360100.json", "nanchang");
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
		"红谷滩区": [115.763, 28.50],
		"高新开发区": [116.100, 28.680],
		"经济开发区": [115.878, 28.793],
		"西湖区": [115.873, 28.590],
		"临空经济区": [115.886, 28.917],
		"南昌县": [116.128, 28.540],
		"青山湖区": [115.930, 28.682],
		"东湖区": [115.829, 28.698],
		"新建区": [115.711, 28.596],
		"青云谱区": [115.916, 28.560],
		"湾里局": [115.707, 28.701],
		"进贤县": [116.258, 28.371],
		"安义县": [115.551, 28.846]
	};

	function loadMap(mapCode, name) {
		$.get(mapCode, function(data) {


			var areaTitleList = geoCoordMap.map(item => {
				var position = [center[item.name][0] - 0.003, center[item.name][1] + 0.06].concat(item.name);
				return position;
			})
			// console.log(areaTitleList);

			if (data) {
				echarts.registerMap(name, data);

				var option = {
					tooltip: {
						formatter: function(param) {
							return geoCoordMap[param.dataIndex].name + ":" + geoCoordMap[param.dataIndex].value + title;
						}
					},
					visualMap: { //左边的图标
						min: 0,
						max: (max + min) + 10,
						left: 26,
						bottom: 30,
						showLabel: !0,
						textStyle: {
							color: '#ffffff',
						},
						text: ["高", "低"],
						pieces: [{
							gte: qujian * 4,
							label: "> " + qujian * 4,
							color: "#0f74aa"
						}, {
							gte: qujian * 3,
							lt: qujian * 4,
							label: qujian * 3 + " - " + qujian * 4,
							color: "#0b8bd1"
						}, {
							gte: qujian * 2,
							lt: qujian * 3,
							label: qujian * 2 + " - " + qujian * 3,
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
						aspectScale: 1, //长宽比
						zoom: 1.15,
						roam: false,
						top: 50,
						left: "17%",
						itemStyle: {
							normal: {
								areaColor: '#25709C',
								shadowColor: '#25709C',
								shadowOffsetX: 0,
								shadowOffsetY: 15
							}
						},

					},
					series: [
						{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							geoIndex: 0,
							symbol: 'circle',
							symbolSize:6,
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
							aspectScale: 1, //长宽比
							zoom: 1.15,
							top: 50,
							left: "17%",
							type: 'map',
							mapType: name,
							showLegendSymbol: true, //去除地图指示点
							symbolSize: 15, //圆点大小
							data: geoCoordMap,
							tooltip: {
								show: false
							},
							label: {
								normal: {
									show: false,
									textStyle: {
										color: 'white',
										fontSize: 15,
									}
								},
								emphasis: {
									show: false,
									textStyle: {
										color: '#ffffff',
										fontSize: 15,
									}
								}
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
								},
							},
						}
					],

				};
				var mapData = document.getElementById('mapData');
				myChart = echarts.init(mapData);
				myChart.setOption(option);
				/*myChart.off("click");
				myChart.on('click', function(params) {
					console.log(params);
					//选中区域高亮展示
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(mIndex) {
						//地图区域取消选中
						myChart.dispatchAction({
							type: 'mapUnSelect',
							seriesIndex: 1,
							dataIndex: mIndex
						});
					})

					myChart.dispatchAction({
						type: 'mapSelect',
						seriesIndex: 1,
						dataIndex: params.dataIndex
					});
					AREA_NAME = geoCoordMap[params.dataIndex].name;
					if(getCookie("area_value")==360100||getCookie("area_name")==AREA_NAME){
						submitForm();
						$(".areaTitle").text(AREA_NAME);
						if(AREA_NAME.indexOf('县')!=-1){
							$("#qsspan").text("全县");
						}else{
							$("#qsspan").text("全区");
						}
					}
				});*/
				var canPlayAction = true;
				myChart.on("mouseover", function() {
					canPlayAction = false;
				})
				myChart.on("mouseout", function() {
					canPlayAction = true;
				})

				let seed = 0;
				if (!!timer) {
					clearInterval(timer);
				}
				timer = setInterval(function() {
					if (!canPlayAction) {return;}

					var index = seed % areaTitleList.length;
					areaTitleList.map(function(item, i) {
						myChart.dispatchAction({
							type: 'mapUnSelect',
							seriesIndex: 2,
							dataIndex: i
						});
					})

					myChart.dispatchAction({
						type: 'mapSelect',
						seriesIndex: 2,
						dataIndex: index
					});
					myChart.dispatchAction({
						type: 'showTip',
						seriesIndex: 2,
						dataIndex: index
					});

					seed++;
				}, 10000)



			}
		});
	}
}

//数据
function renderRankData(){
	$("#rjhy").html('');
	arrRank.forEach(function(item,index){
		var numi = (index + 1);
		$("#rjhy").append('<tr><td   class="i' + numi + '">' + numi + '</td>' +
			'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS + '</td>' +
			'<td>' + item.RATE + '%</td><td>' + item.GSSUMS + '</td>' +
			'<td>' + item.GSRATE + '%</td>'+
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
	getNanchangChainYearAnalysis();
	getNanchangChainAreaXzPm();
	renderFZQK();
}

function changeQyType(params){
	if(params=='1'){
		$(".qytitle").text("营收(亿元)");
		$(".dwtitle").text("亿元");
	}else{
		$(".qytitle").text("规上企业数量(家)");
		$(".dwtitle").text("家");
	}
	getNanchangEntByDatas('NK02',params);
	getNanchangEntByDatas('NK03',params);
	getNanchangEntByDatas('NK04',params);
}