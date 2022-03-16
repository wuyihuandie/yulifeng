var tMonth;//当前季度
var YEAR = new Date().getFullYear();
if((new Date().getMonth()+1)<4){
	tMonth = 4;
	YEAR = new Date().getFullYear() - 1;
}else if((new Date().getMonth()+1)<7){
	tMonth = 1;
}else if((new Date().getMonth()+1)<11){
	tMonth = 2;
}else{
	tMonth = 3;
}
var MONTH = tMonth;
var time_date = YEAR + '-' + MONTH;
var mapTimer,timer2, timer3, timer4;
var arrRank = [];	// 要排名的数据

var areaValue = "";
var areaName = "";
$(function() {
	$(".years .ctitle").text(YEAR);
	$(".month .ctitle").text(tMonth);
	$("#YEAR").val(time_date);

	if(getCookie("area_value")!='360100'){
		areaValue = getCookie("area_value");
	}

	submitForm();
	$('.years .cleft').click(function() {
		var year = $(".years .ctitle").text();
		//只能看近三年的数据
		if ('2020' != year) {
			year--;
			$(".years .ctitle").text(year);
			YEAR = year + "";
			if(year<nowdate){
				MONTH = 4
				$(".month .ctitle").text(MONTH);
			}
			time_date = YEAR + '-' + MONTH;
			$("#YEAR").val(time_date);
			submitForm();
		}
	})
	$('.years .cright').click(function() {
		var year = $(".years .ctitle").text();
		//只能看近三年的数据
		if (nowdate != year) {
			year++;
			$(".years .ctitle").text(year);
			YEAR = year + "";
			if(year<nowdate){
				MONTH = 4
			}else{
				MONTH = tMonth
			}
			time_date = YEAR + '-' + MONTH;
			$("#YEAR").val(time_date);
			$(".month .ctitle").text(MONTH);
			submitForm();
		}
	})

	$('.month .mleft').click(function() {
		var month = $(".month .ctitle").text();
		//只能看近三年的数据
		if (month>1) {
			month--;
			$(".month .ctitle").text(month);
			MONTH = month;
			time_date = YEAR + '-' + MONTH;
			$("#YEAR").val(time_date);
			submitForm();
		}
	})
	$('.month .mright').click(function() {
		var month = $(".month .ctitle").text();

		if((YEAR == nowdate && month < tMonth)||(YEAR < nowdate && month < 4)){
			month++;
			$(".month .ctitle").text(month);
			MONTH = month;
			time_date = YEAR + '-' + MONTH;
			$("#YEAR").val(time_date);
			submitForm();
		}

	})

	var enterpriseNumberClickTimes = 0;	// 用户第几次点击企业数量
	var growthRateClickTimes = 0;	// 用户第几次点击营收
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
			arrRank.sort(compareUp('VENDINC'));
			renderRankData();
			growthRateClickTimes = 1;
		} else if(growthRateClickTimes == 1) {
			arrRank.sort(compareDown('VENDINC'));
			renderRankData();
			growthRateClickTimes = 0;
		}

	})

})
function renderRankData() {
	$("#areaTable tbody").html('');
	var index1 = 0;
	arrRank.forEach(function(item, index) {
		index1 = index1 + 1;
		if(item.SUMS!=0){
			if(getCookie("area_value")==360100||getCookie("area_value")==item.AREA_VALUE){
				$("#areaTable tbody").append('<tr><td  class="i' + index1 + '">' + index1 + '</td>' +
					'<td >' + item.AREA_NAME + '</td><td onclick="queryEntList(\''+item.AREA_NAME+'\',\''+item.AREA_VALUE+'\')">' + item.SUMS +
					'</td>' +
					'<td>' + item.VENDINC + '</td>' +
					'</tr>')
			}else{
				$("#areaTable tbody").append('<tr><td  class="i' + index1 + '">' + index1 + '</td>' +
					'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS +
					'</td>' +
					'<td>' + item.VENDINC + '</td>' +
					'</tr>')
			}

		}

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

function submitForm() {
	getInternetCountsByType(); //数据总览
	getInternetCountByArea();//区域
	getInternetCountByYear();//趋势
}
//数据总览
function getInternetCountsByType() {
	doData(BASE_URL + '/ztfxController/getInternetCountsByType',{area_value : areaValue},function(result){
		if (result.status == 10001) {
			var option1 = {
				startVal: 0,
				decimalPlaces: 2,
				duration: 1.9,
			};
			var datas = result.data;
			var arr=[];
			var ENTSUMS = 0;
			for(var i = 0;i<datas.length;i++){
				arr.push({value: datas[i].SUMS, name: datas[i].TYPE})
				ENTSUMS+=datas[i].SUMS;
			}
			new CountUp('ENTNUMS', ENTSUMS).start();
			//new CountUp('VENDINCZS', item.VENDINCZS, option1).start();
			var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']
			option = {
				color:colorList,
				title: {
					text: '企业数量分类占比',
					x: 'center',
					y: 'center',
					textStyle: {
						color:"#fff",
						fontSize: 15
					},
				},
				tooltip: {
					trigger: 'item'
				},
				series: [{
					type: 'pie',
					center: ['50%', '50%'],
					radius: ['40%', '55%'],
					clockwise: true,
					avoidLabelOverlap: true,
					itemStyle: {
						normal: {
							color: function(params) {
								return colorList[params.dataIndex]
							}
						}
					},
					label: {
						show: true,
						position: 'outside',
						formatter: '{a|{b}：{d}%}\n{hr|}',
						rich: {
							hr: {
								backgroundColor: 't',
								borderRadius: 3,
								width: 3,
								height: 3,
								padding: [3, 3, 0, -12]
							},
							a: {
								padding: [-30, 15, -20, 15]
							}
						}
					},
					labelLine: {
						normal: {
							length: 10,
							length2: 10,
							lineStyle: {
								width: 1
							}
						}
					},
					data: arr,
				}]
			};
			qyzbDom = document.getElementById('qyzbDom');
			myChart = echarts.init(qyzbDom);
			myChart.setOption(option);
		}
	})
}
//区域营收与增速
function getInternetCountByArea() {
	doData(BASE_URL + '/ztfxController/getInternetCountByArea',{YEAR : time_date},function(result){
		if (result.status == 10001) {
			var datas = result.data;

			var names=[],datas1=[],datas2=[];

			var pies = [];
			for(var i = 0;i<datas.length;i++){
				if(datas[i].SUMS != 0){
					names.push(datas[i].AREA_NAME);
					datas1.push(datas[i].VENDINC);
					datas2.push(datas[i].VENDINC_ZS);
					pies.push({value: datas[i].VENDINC, name: datas[i].AREA_NAME})
				}
			}
			//区域排名
			renderFZQK(datas);

			//区域营收占比
			getAreaYszb(pies);

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
									data[i].seriesName + "：" + data[i].value + '万元' +"<br/>";
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
					data: ['营收','营收增速'],
					x:'center',
					textStyle: {
						color: "#fff",
						fontSize: 14
					}
				},
				grid: {
					top: '15%',
					left: '12%',
					right: '10%',
					bottom: '12%',
				},
				xAxis: [{
					type: 'category',
					axisLine: {
						show: false,
						color: '#fff'
					},
					axisLabel: {
						interval:0,//横轴信息全部显示
						color: '#fff',
						width: 100,
						formatter:function(value)
						{
							var ret = "";//拼接加\n返回的类目项
							var maxLength = 3;//每项显示文字个数
							var valLength = value.length;//X轴类目项的文字个数
							var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
							if (rowN > 1)//如果类目项的文字大于3,
							{
								for (var i = 0; i < rowN; i++) {
									var temp = "";//每次截取的字符串
									var start = i * maxLength;//开始截取的位置
									var end = start + maxLength;//结束截取的位置
									//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
									temp = value.substring(start, end) + "\n";
									ret += temp; //凭借最终的字符串
								}
								return ret;
							}
							else {
								return value;
							}
						}
					},
					splitLine: {
						show: false
					},
					boundaryGap: true,
					data: names //this.$moment(data.times).format("HH-mm") ,

				}],
				yAxis:[
					{
						name:'万元',
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
						name: '营收',
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
						data: datas1//data.values
					},
					{
						name: '营收增速',
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
						data: datas2 //data.values
					}
				]};

			//右侧各市区新增排名列表
			var gdsxzpmDom = echarts.init(document.getElementById('gdsxzpmDom'));
			gdsxzpmDom.setOption(option);

			var canPlayAction = true;
			gdsxzpmDom.on("mouseover", function() {
				canPlayAction = false;
			})
			gdsxzpmDom.on("mouseout", function() {
				canPlayAction = true;
			})

			let seed = 0;
			if (!!timer2) {
				clearInterval(timer2);
			}
			timer2 = setInterval(function() {
				if (!canPlayAction) {
					return;
				}
				var index = seed % datas1.length;
				datas1.map(function(item, i) {
					gdsxzpmDom.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: i
					});
				})

				gdsxzpmDom.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: index
				});
				gdsxzpmDom.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: index
				});
				seed++;
			}, 10000)

			//生成报告图1
			echarts.init(document.getElementById('list1')).setOption({
				backgroundColor:'#ffffff',
				legend: {
					data: ['营收','营收增速'],
					x:'center',
					textStyle: {
						color: "#000",
						fontSize: 14
					}
				},
				grid: {
					top: '15%',
					left: '12%',
					right: '8%',
					bottom: '10%',
				},
				xAxis: [{
					type: 'category',
					axisLine: {
						lineStyle: {
							color: '#000',
							width: 1, //这里是为了突出显示加上的
						}
					},
					axisLabel: {
						interval:0,//横轴信息全部显示
						color: '#000',
						rotate: 30
					},
					splitLine: {
						show: false
					},
					boundaryGap: true,
					data: names //this.$moment(data.times).format("HH-mm") ,

				}],
				yAxis:[
					{
						name:'万元',
						axisLine: {
							lineStyle: {
								color: '#000',
								width: 1, //这里是为了突出显示加上的
							}
						},
						splitLine: {
							show: false
						},
						textStyle: {
							color: '#000'
						},
						type: 'value'
					},
					{
						name:'%',
						axisLine: {
							lineStyle: {
								color: '#000',
								width: 1, //这里是为了突出显示加上的
							}
						},
						splitLine: {
							show: false
						},
						textStyle: {
							color: '#000'
						},
						type: 'value'
					}
				],
				series: [
					{
						name: '营收',
						type: 'bar',
						barWidth:'25',
						itemStyle: {
							color: "#307BF7"
						},
						label: {
							show: true,
							position: 'top',
							textStyle: {
								color: '#333',
							}
						},
						data: datas1//data.values
					},
					{
						name: '营收增速',
						type: 'line',
						yAxisIndex: 1,
						label: {
							show: true,
							position: 'top',
							formatter: '{c}%',
							textStyle: {
								color: '#000',
							}
						},
						lineStyle: {
							normal: {
								width: 2,
								color: 'rgba(255, 67, 2, 1)'
							}
						},
						data: datas2 //data.values
					}
				]});
		}
	})
}
//区域占比
function getAreaYszb(datas) {
	var colorList = ['#ADD304','#58B353','#74C0A2','#51B6E5',
		'#198CEA','#1570E6','#8FECBD','#FEC660',
		'#EB8344','#EA9969','#F3B91A','#F40000'];
	option = {
		color:colorList,
		tooltip: {
			trigger: 'item'
		},
		series: [{
			type: 'pie',
			center: ['50%', '50%'],
			radius: '65%',
			clockwise: true,
			avoidLabelOverlap: true,
			itemStyle: {
				normal: {
					color: function(params) {
						return colorList[params.dataIndex]
					}
				}
			},
			label: {
				show: true,
				position: 'outside',
				formatter: '{b}：{d}%'
			},
			labelLine: {
				normal: {
					length: 10,
					length2: 10,
					lineStyle: {
						width: 1
					}
				}
			},
			data: datas,
		}]
	};
	cyfxDom = document.getElementById('cyfxDom');
	myChart = echarts.init(cyfxDom);
	myChart.setOption(option);

	//生成报告图2
	var myoption = {
		color:colorList,
		backgroundColor:'#fff',
		legend: {
			orient: 'vertical',
			left:'70%',
			align:'left',
			top:'middle',
			itemWidth: 5,
			itemHeight: 10,
			textStyle: {
				fontSize: 13,
				color: '#333'
			},
			formatter: function(name) {
				var data = myoption.series[0].data;
				var total = 0;
				var tarValue;
				for (var i = 0; i < data.length; i++) {
					total += data[i].value;
					if (data[i].name == name) {
						tarValue = data[i].value;
					}
				}
				var p = Math.round(((tarValue / total) * 100));
				return `${name}(${p}%)`;
			}
		},
		series: [{
			type: 'pie',
			center: ['35%', '50%'],
			radius: '80%',
			clockwise: true,
			avoidLabelOverlap: true,
			label:{
				formatter:function(data){ return data.percent.toFixed(0)+"%";},
				position:'inside',
				color:'#000'
			},
			data: datas,
		}]
	}
	echarts.init(document.getElementById('list2')).setOption(myoption);
}
//各县区总量排名
function renderFZQK(datas) {
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
	var areaValues = [];
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


	arrRank = datas;	// 获取到的数据给到全局
	// ---------
	arrRank.sort(compareDown('SUMS'));
	renderRankData();

	var pies = [];
	arrRank.forEach(function(item, index) {
		areaValues.push(item.AREA_VALUE);
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
		if(item.SUMS != 0){
			pies.push({value:item.SUMS,name:item.AREA_NAME})
		}
	})
	qujian = Math.floor((max + min) / 4) - 1;
	loadMap("../../source/js/echartsModel/map/360100.json", "nanchang");

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
							return geoCoordMap[param.dataIndex].name + ":" + geoCoordMap[param.dataIndex].value + '家';
						}
					},
					visualMap: { //左边的图标
						min: 0,
						max: (max + min) + 10,
						left: 0,
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
						left: "20%",
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
							left: "20%",
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
				myChart.off("click");
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

					if(getCookie("area_value")==360100||getCookie("area_value")==areaValue){
						if(geoCoordMap[params.dataIndex].value==null||geoCoordMap[params.dataIndex].value==0){
							layer.msg("该区域暂无数据！");
						}else{
							areaValue = areaValues[params.dataIndex];
							areaName = geoCoordMap[params.dataIndex].name;
							getInternetCountsByType(); //数据总览
							getInternetCountByYear();//趋势
							$(".areaTitle").text(areaName);
						}


					}
				});
				var canPlayAction = true;
				myChart.on("mouseover", function() {
					canPlayAction = false;
				})
				myChart.on("mouseout", function() {
					canPlayAction = true;
				})

				let seed = 0;
				if (!!mapTimer) {
					clearInterval(mapTimer);
				}
				mapTimer = setInterval(function() {
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

	//生成报告图3
	var myoption = {
		color : ['#ADD304','#58B353','#74C0A2','#51B6E5',
			'#198CEA','#1570E6','#8FECBD','#FEC660',
			'#EB8344','#EA9969','#F3B91A','#F40000'],
		backgroundColor:'#fff',
		legend: {
			orient: 'vertical',
			left:'70%',
			align:'left',
			top:'middle',
			itemWidth: 5,
			itemHeight: 10,
			textStyle: {
				fontSize: 13,
				color: '#333'
			},
			formatter: function(name) {
				var data = myoption.series[0].data;
				var total = 0;
				var tarValue;
				for (var i = 0; i < data.length; i++) {
					total += data[i].value;
					if (data[i].name == name) {
						tarValue = data[i].value;
					}
				}
				var p = Math.round(((tarValue / total) * 100));
				return `${name}(${p}%)`;
			}
		},
		series: [{
			type: 'pie',
			center: ['35%', '50%'],
			radius: '80%',
			clockwise: true,
			avoidLabelOverlap: true,
			label:{
				formatter:function(data){ return data.percent.toFixed(0)+"%";},
				position:'inside',
				color:'#000'
			},
			data: pies,
		}]
	}
	echarts.init(document.getElementById('list3')).setOption(myoption);
}
//右下角 趋势
function getInternetCountByYear() {
	doData(BASE_URL + '/ztfxController/getInternetCountByYear',{area_value : areaValue},function(result){
		if (result.status == 10001) {
			var option1 = {
				startVal: 0,
				decimalPlaces: 2,
				duration: 1.9,
			};
			var datas = result.data;
			var names=[],datas1=[],datas2=[];

			for(var i = 0;i<datas.length;i++){
				if(time_date == datas[i].YEAR){
					new CountUp('VENDINC', datas[i].VENDINC).start();
					new CountUp('VENDINCZS', datas[i].VENDINC_ZS, option1).start();
				}
				if(i>=datas.length-6){
					names.push(datas[i].YEAR_NAME);
					datas1.push(datas[i].VENDINC);
					datas2.push(datas[i].VENDINC_ZS);
				}
			}
			option2 = {
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
									'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
									data[i].color + ';"></span>' +
									data[i].seriesName + "：" + data[i].value + "万元<br/>";
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
				legend: {
					textStyle: {
						color: '#ffffff',
						fontWeight: 'bold'
					},
					data: ['营收','营收增速']
				},

				grid: {
					left: '2%',
					right: '3%',
					bottom: '5%',
					containLabel: true
				},
				xAxis: [{
					axisLine: {
						lineStyle: {
							color: '#ffffff',
							width: 1, //这里是为了突出显示加上的
						}
					},
					textStyle: {
						color: '#ffffff'
					},
					type: 'category',
					boundaryGap: true,
					data: names,
					axisLabel:{
						interval:0,//横轴信息全部显示
						formatter:function(value)
						{
							var ret = "";//拼接加\n返回的类目项
							var maxLength = 5;//每项显示文字个数
							var valLength = value.length;//X轴类目项的文字个数
							var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
							if (rowN > 1)//如果类目项的文字大于3,
							{
								for (var i = 0; i < rowN; i++) {
									var temp = "";//每次截取的字符串
									var start = i * maxLength;//开始截取的位置
									var end = start + maxLength;//结束截取的位置
									//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
									temp = value.substring(start, end) + "\n";
									ret += temp; //凭借最终的字符串
								}
								return ret;
							}
							else {
								return value;
							}
						}
					}
				}],
				yAxis: [{
					axisLine: {
						lineStyle: {
							color: '#ffffff',
							width: 1, //这里是为了突出显示加上的
						}
					},
					textStyle: {
						color: '#ffffff'
					},
					axisLabel: {
						formatter: '{value}'
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
				series: [{
					name: '营收',
					type: 'bar',
					symbolSize: 8,
					barWidth: 30, //柱图宽度
					itemStyle: {
						color: '#63FF9A',
					},
					data: datas1
				},
					{
						name: '营收增速',
						type: "line",
						yAxisIndex: 1,
						symbol: 'circle',
						"itemStyle": {
							"normal": {
								"color": 'rgba(255, 196, 53, 1)',
								"barBorderRadius": 0,
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
						data: datas2
					}
				]
			};
			gsxFZQK = document.getElementById('gsxFZQK');
			myChart = echarts.init(gsxFZQK);
			myChart.setOption(option2);

			var canPlayAction = true;
			myChart.on("mouseover", function() {
				canPlayAction = false;
			})
			myChart.on("mouseout", function() {
				canPlayAction = true;
			})

			let seed = 0;
			if (!!timer4) {
				clearInterval(timer4);
			}
			timer4 = setInterval(function() {
				if (!canPlayAction) {
					return;
				}
				var index = seed % datas2.length;
				datas2.map(function(item, i) {
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

function queryZsList(){
	queryEntList(areaName,areaValue);
}
//查看企业列表
function queryEntList(area_name,area_value) {
	if (area_name == '') {
		qytitle = '南昌市物联网规上企业';
	} else {
		qytitle = area_name + '物联网规上企业';
	}
	layer.open({
		type: 2,
		shade: 0.1,
		title: false, //不显示标题
		area: ['100%', '100%'], //宽高
		content: realPath + "view/ztfx/internetqylist.html?area_value=" + area_value + "&qytitle=" + qytitle
	})
}


