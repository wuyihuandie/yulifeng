$(function() {
	// 云计算
	$('#yjs').click(function(){
		window.location.href = '../yjs-cyl/yjs-qyfb.html?menuType=5';
	})

	$('#technology').click(function() {
		window.location.href = 'cyl-jslx.html?menuType=5';
	})

	$('#use').click(function() {
		window.location.href = 'cyl-yyly.html?menuType=5';
	})

	$('#industry').click(function() {
		window.location.href = 'cyl-3double.html?menuType=5';
	})

	/*$('.option').click(function() {
		var index = $(this).index();
		$('.option').removeClass('options');
		$(this).addClass("options");
		renderFZQK();
	})*/

	var myCharts;
	//RightList();
	renderFZQK();
	

})
var PARENT_DL = "ZK06";
var mapTimer;
var LEVEL_NAME = '';
YEAR = "2020";
//各县区总量排名
function renderFZQK() {
	var params = {
		YEAR: YEAR,
		PARENT_DL: PARENT_DL,
		LEVEL_NAME:LEVEL_NAME
	}
	var htmlData = '';
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/industrialChainController/getNCEntByArea',
		data: {
			param: JSON.stringify(params) //参数
		},
		cache: false,
		success: function(res) {
			$("#title-d tbody tr").remove();
			var result = JSON.parse(res);
			if (result.status == 10001) {
				result.data.forEach(function(item, index) {
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
					var numi = (index + 1);
					htmlData +=  '<tr onclick="queryEntList(\'' + item.AREA_NAME + '\')"><td  class="i' + numi + '">' + numi + '</td>' +
						'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS +
						'</td>' +
						'</tr>'
				})
				qujian = Math.floor((max + min) / 4) - 1;
				loadMap("../../source/js/echartsModel/map/360100.json", "nanchang");

			}
			$("#areaTable tbody").html(htmlData);
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
	var geoCoordPoints = [];
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
			
			if (data) {
				echarts.registerMap(name, data);

				var option = {
					tooltip: {
						formatter: function(param) {
								return geoCoordMap[param.dataIndex].name + ":" + geoCoordMap[param.dataIndex].value+"家";
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
						}
					},
					series: [
						{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							geoIndex: 0,
							symbol: 'circle',
							symbolSize: 6,
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

					AREA_NAME = params.name;
					$(".areaTitle").text(AREA_NAME);
					$(".selectAreaTitle").text(AREA_NAME);
				});

				// console.log(areaTitleList);
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
					if (!canPlayAction) {
						return;
					}
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

//查看企业列表
function queryEntList(area_name) {
	if(getCookie("area_value")==360100||getCookie("area_name")==area_name) {
		if (LEVEL_NAME != null && LEVEL_NAME != '') {
			qytitle = area_name + YEAR + "年" + LEVEL_NAME + "企业";
		} else {
			qytitle = area_name + YEAR + "年" + "所有层企业";

		}

		layer.open({
			type: 2,
			shade: 0.1,
			title: false, //不显示标题
			area: ['100%', '100%'], //宽高
			content: realPath + "view/cyl-3/cyl-qyfbEntList.html?YEAR=" + YEAR
				+ "&PARENT_DL=" + PARENT_DL + "&LEVEL_NAME=" + LEVEL_NAME + "&AREA_NAME=" + area_name + "&qytitle=" + qytitle
		})
	}
}
function queryList(param,ths) {
	$('.option').removeClass('options');
	$(ths).addClass("options");
	LEVEL_NAME=param;
	renderFZQK();
}
