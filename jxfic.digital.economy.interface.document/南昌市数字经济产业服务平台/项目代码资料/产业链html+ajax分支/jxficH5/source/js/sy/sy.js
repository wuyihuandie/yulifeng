var AREA_NAME = ""; // 区域名称
var tMonth = new Date().getMonth()+1;//当前月份
var MONTH = tMonth;
var time_date = "";
var CONDITION = "1";
var CONDITIONAREA = "1";
var industry = ['NK01','NK02','NK03','NK04','NK05','NK06'];
var industry_name = ['计算机、通信和其他电子设备制造业', '电信、广播电视和卫星传输服务业', '互联网和相关服务业', '软件和信息技术服务业','信息传输、软件和信息技术服务业','互联网和相关服务业、软件和信息技术服务业'];
var industry_inner = ['NK01','NK05'];
var PARENT_DL = "";
var title = "家";
var timer;
var timer1, timer2, timer3, timer4;
var arrRank = [];	// 要排名的数据


var canPlayMapTips = true;
$(function() {
	$(".years .ctitle").text(YEAR);
	$(".month .ctitle").text(tMonth);
	if(MONTH<10){
		time_date = YEAR + '-0' + MONTH;
	}else{
		time_date = YEAR + '-' + MONTH;
	}
	submitForm();
	//年份点击
	$('.years .cleft').click(function() {
		var year = $(".years .ctitle").text();
		//只能看近三年的数据
		if ('2017' != year) {
			year--;
			$(".years .ctitle").text(year);
			YEAR = year + "";
			if(year<nowdate){
				MONTH = 12
				$(".month .ctitle").text(MONTH);
			}
			if(MONTH<10){
				time_date = YEAR + '-0' + MONTH;
			}else{
				time_date = YEAR + '-' + MONTH;
			}
			getRegionAnalysisOverAll(); //数据总览
			getJxSczt();
			getChainAnalysisZb(); //各个产业占比情况
			getChainAreaXzPm(); //各地区新增排名
			renderFZQK(); //各市区总量排名
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
				MONTH = 12
				$(".month .ctitle").text(MONTH);
			}else{
				MONTH = tMonth
			}
			if(MONTH<10){
				time_date = YEAR + '-0' + MONTH;
			}else{
				time_date = YEAR + '-' + MONTH;
			}
			$(".month .ctitle").text(MONTH);
			getRegionAnalysisOverAll(); //数据总览
			getJxSczt();
			getChainAnalysisZb(); //各个产业占比情况
			getChainAreaXzPm(); //各地区新增排名
			renderFZQK(); //各市区总量排名
		}
	})
	//月份点击
	$('.month .mleft').click(function() {
		var month = $(".month .ctitle").text();
		//只能看近三年的数据
		if (YEAR == nowdate && month>1) {
			month--;
			$(".month .ctitle").text(month);
			MONTH = month;

			if(MONTH<10){
				time_date = YEAR + '-0' + MONTH;
			}else{
				time_date = YEAR + '-' + MONTH;
			}

			getRegionAnalysisOverAll(); //数据总览
			getJxSczt();
			getChainAnalysisZb(); //各个产业占比情况
			getChainAreaXzPm(); //各地区新增排名
			renderFZQK(); //各市区总量排名
		}
	})
	$('.month .mright').click(function() {
		var month = $(".month .ctitle").text();
		//只能看近三年的数据
		if (month < 12) {
			month++;
			$(".month .ctitle").text(month);
			MONTH = month;

			if(MONTH<10){
				time_date = YEAR + '-0' + MONTH;
			}else{
				time_date = YEAR + '-' + MONTH;
			}

			getRegionAnalysisOverAll(); //数据总览
			getJxSczt();
			getChainAnalysisZb(); //各个产业占比情况
			getChainAreaXzPm(); //各地区新增排名
			renderFZQK(); //各市区总量排名
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
	var enterpriseNumberClickTimes = 0;	// 用户第几次点击企业数量
	var growthRateClickTimes = 0;	// 用户第几次点击增速
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
})


function renderRankData(){
	$("#areaTable tbody").html('');
	arrRank.forEach(function(item,index){
		var numi = (index + 1);
		$("#areaTable tbody").append('<tr><td   class="i' + numi + '">' + numi + '</td>' +
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

//营业收入、企业数量切换事件
function changeButton(params, ths) {
	CONDITIONAREA=params;
	if(params==6||ths==''){
		if(params==6){
			$("#areaTable .th_title").text("规上企业数量(家)")
			$(".areaTableTitle").text("核心规上企业数量");
		}else{
			$("#areaTable .th_title").text("营收（亿元）")
			$(".areaTableTitle").text("核心规上企业营收");
		}
		renderFZQK(); //各市区总量排名
	}else{
		dataIndex=0;
		PARENT_DL="";
		AREA_NAME="";
		$(".areaTitle").text('江西省');
		$("#qsspan").text("全省");
		$(".ztk").text("");
		$(".tkuang").removeClass('tkuang-1');
		$(".dyfxbox .button1").removeClass("exchange");
		$(ths).addClass("exchange");
		CONDITION = params;
		if (CONDITION == 1) {
			$("select[name='zl']").hide();
			title = "家";
			$(".th_title").text("企业数量（家）");
			$(".chartTitle").text("核心产业企业数量");
			$(".areaTableTitle").text("核心产业企业数量");
			$(".areaChartTitle").text("核心产业新增企业数量");
			$(".hcqy_box").show();
			$(".hcgsqy_box").hide();
			YEAR=nowdate+"";
			$(".years .ctitle").text(YEAR);
			$(".month .ctitle").text(tMonth);
			if(tMonth<10){
				time_date = YEAR + '-0' + tMonth;
			}else{
				time_date = YEAR + '-' + tMonth;
			}
		} else if (CONDITION == 2) {
			$("select[name='zl']").show();
			$("select[name='zl']").val('2');
			title = "亿元";
			$(".th_title").text("营收（亿元）");
			$(".chartTitle").text("核心规上企业营收");
			$(".areaTableTitle").text("核心规上企业营收");
			$(".areaChartTitle").text("核心规上企业同比新增营收");
			$(".hcqy_box").hide();
			$(".hcgsqy_box").show();
			YEAR = '2020';
			$(".years .ctitle").text(YEAR);
			$(".month .ctitle").text("12");
			time_date = YEAR  + '-12';
		}
		getRegionAnalysisOverAll();
		getJxSczt();
		getChainAnalysisZb(); //各个产业占比情况
		getChainAreaXzPm(); //各地区新增排名
		renderFZQK(); //各市区总量排名
		getChainAnalysis(); //近三年发展趋势
	}
}

function submitForm() {
	getRegionAnalysisOverAll(); //数据总览
	getJxSczt();
	getChainAnalysisZb(); //各个产业占比情况
	getChainAreaXzPm(); //各地区新增排名
	renderFZQK(); //各市区总量排名
	getChainAnalysis(); //近三年发展趋势
}
//左上角 各市区数据的 总览
function getRegionAnalysisOverAll() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: time_date,
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
						if (time_date != nowmonth) {
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
//全市场主体统计
function getJxSczt() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: time_date,
		TYPE: 'JXSCZT1'
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entHomePage/getJxSczt',
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
						new CountUp('QSSCZT', item.ENTNUMS).start();
						if (time_date != nowmonth) {
							new CountUp('QSSCZTXZ', item.XZENTNUMS).start();
						}else{
							new CountUp('QSSCZTXZ', item.XZENTNUMS1).start();
						}
						new CountUp('QSSCZTZS', item.ENTZS, option1).start();
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
		YEAR: time_date,
		CONDITION: CONDITION,
		AREA_NAME: AREA_NAME
	};
	doData(BASE_URL + '/entHomePage/getChainAnalysisZb', params, function(result) {
		var names = [];
		var datas = [];
		var datas1 = [];
		if (result.status == 10001) {
			//各省份的数据
			var rj = 0;
			var zb2 = 0;
			result.data.forEach(function(item, index) {
				/*datas.push({
						name: item.CHAIN_NAME,
						value: item.SUMS
					});*/
				if (item.PARENT_DL == 'NK01') {
					$("#nk01_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}else if (item.PARENT_DL == 'NK02') {
					$("#nk02_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
					rj += item.SUMS;
				}else if (item.PARENT_DL == 'NK03') {
					$("#nk03_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
					rj += item.SUMS;
					zb2 += item.SUMS;
				}else{
					$("#nk04_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
					rj += item.SUMS;
					zb2 += item.SUMS;
				}
				if(CONDITION=='2'){
					$("#nk_value").html(rj.toFixed(2) + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
					$("#nk05_value").html(zb2.toFixed(2) + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}else{
					$("#nk_value").html(rj + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
					$("#nk05_value").html(zb2 + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}

				/*names.push(item.CHAIN_NAME);*/
			})
			/*datas.push({
				name: '信息传输、软件和信息技术服务业',
				value: rj,
				selected: true
			});*/
			//各行业饼图
			// var cyfx = echarts.init(document.getElementById('cyfxDom'));
			//
			// cyfx.setOption({
			// 	color : ['#9FE080', '#5C7BD9', '#FFDC60', '#FF7070', '#7ED3F4'],
			// 	tooltip: {
			// 		trigger: 'item',
			// 		formatter: '{b}: {c} ({d}%)'
			// 	},
			// 	series: [
			// 		{
			// 			type: 'pie',
			// 			selectedMode: 'single',
			// 			radius: [0, '45%'],
			// 			label: {
			// 				position: 'inner',
			// 				fontSize: 14,
			// 			},
			// 			labelLine: {
			// 				show: false
			// 			},
			// 			data: datas
			// 		},
			// 		{
			// 			type: 'pie',
			// 			radius: ['60%', '75%'],
			// 			labelLine: {
			// 				length: 10,
			// 			},
			// 			label: {
			//
			// 				normal: {
			// 					textStyle: {
			// 						color: '#fff', // 改变标示文字的颜色
			// 						fontSize: 13
			// 					},
			// 					formatter(v) {
			// 						let text = v.name
			// 						let count = text.indexOf('￥')
			// 						console.log()
			// 						return text.length < 7 ?
			// 							text :
			// 							`${text.slice(0,5)}\n${text.slice(5,10)}\n${text.slice(10)}`
			// 					}
			// 				},
			// 				show: true,
			// 				position: 'outside'
			// 			},
			// 			data: datas1
			// 		}
			// 	]
			// });
			// cyfx.off('click');
			// cyfx.on('click', function(params) {
			// 	dataIndex = params.dataIndex;
			// 	if(params.seriesName.indexOf('0')!=-1){ //点击内饼图的时候
			// 		PARENT_DL = industry_inner[params.dataIndex];
			// 	}else{
			// 		PARENT_DL = industry[params.dataIndex];
			// 	}
			// 	$(".tkuang").addClass('tkuang-1');
			// 	$(".ztk").text(params.name);
			// 	submitForm();
			// });
		}
	})
}
function changeIndustry(index,ths){
	PARENT_DL = industry[index];
	$(".tkuang").addClass('tkuang-1');
	$(".ztk").text(industry_name[index]);
	submitForm();
}
//各地区新增排名
function getChainAreaXzPm() {
	var params = {
		YEAR: time_date,
		CONDITION: CONDITION,
		PARENT_DL: PARENT_DL
	};
	doData(BASE_URL + '/entHomePage/queryChainAreaXzPm', params, function(result) {
		var names = [];
		var datas = [];
		var datas1 = [];
		if (result.status == 10001) {
			//各省份的数据
			result.data.forEach(function(item, index) {
				names.push(item.AREA_NAME);
				if(CONDITION==1){
					datas.push(item.XZSUMS);
				}else{
					if(time_date == nowmonth){
						datas.push(item.TQXZSUMS);
					}else{
						datas.push(item.XZSUMS);
					}
				}
			})
			//右侧各市区新增排名列表
			var gdsxzpmDom = echarts.init(document.getElementById('gdsxzpmDom'));
			gdsxzpmDom.setOption({
				color: ['#3398DB', '#FF9A5E'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter: function(data) {
						let html = data[0].name+'：';
						html +=
							'<span style="display:inline-block;border-radius:10px;width:10px;height:10px;background-color:' +
							data[0].color + ';"></span>' + data[0].value + title + "<br/>"
							/*'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
							data[1].color + ';"></span>' +
							data[1].seriesName + "：" + data[1].value + '%' + "<br/>"*/;

						return html;
					}
				},
				/*legend: {
					textStyle: {
						color: '#ffffff',
						fontWeight: 'bold'
					},
					right: '8%',
					data: ['增量', '同比增速']
				},*/
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '8%',
					containLabel: true
				},
				xAxis: [{
					axisLine: {
						lineStyle: {
							color: '#ffffff'
						}
					},
					axisLabel: {
						interval: 0,

						textStyle: {
							color: "#ffffff"
						},
						formatter: function(value) {
							var ret = ""; //拼接加\n返回的类目项
							var maxLength = 4; //每项显示文字个数
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
						}
					},
					textStyle: {
						color: '#ffffff'
					},
					type: 'category',
					data: names,
					axisTick: {
						alignWithLabel: true
					}
				}],
				yAxis: [{
					type: 'value',
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
						formatter: '{value} ' + title
					}
				}, {
					type: 'value',
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
						formatter: '{value} %'
					}
				}],
				series: [{
					name: '',
					type: 'bar',
					barWidth: '50%',
					"itemStyle": {
						"normal": {
							"color": {
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
							},
							"barBorderRadius": 0
						}
					},
					data: datas,
					symbolSize: 8,
					label: {
						show: true,
						position: 'top',
						formatter: '{c} '+title,
						textStyle: {
							color: '#ffffff'
						}
					},

				}]
			});



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
				var index = seed % datas.length;
				datas.map(function(item, i) {
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




		}
	})
}
//右侧各市区列表
function renderFZQK() {
	var params = {
		YEAR: time_date,
		CONDITION: CONDITIONAREA,
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
			$("#areaTable tbody tr").remove();
			var result = JSON.parse(res);
			if (result.status == 10001) {
				arrRank = result.data;
				arrRank.sort(compareDown('SUMS'));
				renderRankData();
				//各省份的数据
				arrRank.forEach(function(item, index) {
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
				myChart.off("click");
				myChart.on('click', function(params) {
					AREA_NAME = params.name;
					$(".areaTitle").text(AREA_NAME);
					$("#qsspan").text("全市");
					submitForm();
				});
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
//右下角 近三年发展趋势
function getChainAnalysis() {
	var params = {
		AREA_NAME: AREA_NAME,
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
			var names = [];
			var years = [];
			var cateNames = [];
			var datas1 = [];
			var datas2 = [];
			var datas3 = [];
			var datas4 = [];
			var datas5 = [];
			var datas6 = [];
			var result = JSON.parse(res);
			if (result.status == 10001) {
				var option2;
				result.data.forEach(function(item, index) {
					var zsyear = (item.YEAR).substring(0,4);
					if ((result.data).length == 10) {
						if ((index + 1) % 5 == 0) {
							names.push(item.CHAIN_NAME);
						}
						if (item.PARENT_DL != undefined && item.PARENT_DL != 'undefined' && item.PARENT_DL != '') {
							if(zsyear == nowdate){
								years.push(zsyear + '年('+tMonth+'月)');
							}else{
								years.push(zsyear + '年');
							}
							datas1.push(item.SUMS);
						} else {
							datas2.push(item.RATE);
						}
					}else if ((result.data).length == 15) {
						if (item.PARENT_DL != undefined && item.PARENT_DL != 'undefined' && item.PARENT_DL != '') {
							if (item.PARENT_DL == 'NK03') {
								datas4.push(item.SUMS);
							} else if (item.PARENT_DL == 'NK04') {
								datas5.push(item.SUMS);
							}
						} else {
							if(zsyear == nowdate){
								years.push(zsyear + '年('+tMonth+'月)');
							}else{
								years.push(zsyear + '年');
							}
							datas2.push(item.RATE);
						}
					}else if ((result.data).length == 20) {
						if (item.PARENT_DL != undefined && item.PARENT_DL != 'undefined' && item.PARENT_DL != '') {
							if (item.PARENT_DL == 'NK02') {
								datas3.push(item.SUMS);
							} else if (item.PARENT_DL == 'NK03') {
								datas4.push(item.SUMS);
							} else if (item.PARENT_DL == 'NK04') {
								datas5.push(item.SUMS);
							}
						} else {
							if(zsyear == nowdate){
								years.push(zsyear + '年('+tMonth+'月)');
							}else{
								years.push(zsyear + '年');
							}
							datas2.push(item.RATE);
						}
					}else {
						if ((index + 1) % 5 == 0) {
							names.push(item.CHAIN_NAME);
						}
						if (item.PARENT_DL == 'NK01') {
							datas1.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK02') {
							datas2.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK03') {
							datas3.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK04') {
							datas4.push(item.SUMS);
						} else {
							if(zsyear == nowdate){
								years.push(zsyear + '年('+tMonth+'月)');
							}else{
								years.push(zsyear + '年');
							}
							datas5.push(item.RATE);
						}
					}
				})
				if ((result.data).length == 25) {
					for (var i = 0; i < datas1.length; i++) {
						if(CONDITION==1){
							datas6.push(Number(datas1[i]) + Number(datas2[i]) + Number(datas3[i]) + Number(datas4[i]));
						}else{
							datas6.push(parseFloat(Number(datas1[i]) + Number(datas2[i]) + Number(datas3[i]) + Number(datas4[i])).toFixed(2));
						}
					}
				}else if ((result.data).length == 20){
					names.push('信息传输、软件和信息技术服务业');
					names.push('同比增速');
					for (var i = 0; i < datas2.length; i++) {
						if(CONDITION==1){
							datas1.push(Number(datas3[i]) + Number(datas4[i]) + Number(datas5[i]));
						}else{
							datas1.push(parseFloat(Number(datas3[i]) + Number(datas4[i]) + Number(datas5[i])).toFixed(2));
						}
					}
				}else if ((result.data).length == 15){
					names.push('互联网和相关服务业、软件和信息技术服务业');
					names.push('同比增速');
					for (var i = 0; i < datas2.length; i++) {
						if(CONDITION==1){
							datas1.push(Number(datas4[i]) + Number(datas5[i]));
						}else{
							datas1.push(parseFloat(Number(datas4[i]) + Number(datas5[i])).toFixed(2));
						}
					}
				}
				var gsxFZQK = document.getElementById('gsxFZQK1');
				var color = ['#FF9A5E', '#63FF9A', '#D97FF9', '#50FDFD', '#54A2D5'];
				if ((result.data).length != 25) {
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
						legend: {
							textStyle: {
								color: '#ffffff',
								fontWeight: 'bold'
							},
							data: names
						},

						grid: {
							left: '0%',
							right: '0%',
							bottom: '5%',
							containLabel: true
						},
						xAxis: [{
							// name:'年份',
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
							axisLabel:{
								interval:0,//横轴信息全部显示
							},
							data: years
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
									formatter: '{value} ' + title
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
									formatter: '{value}% '
								},
								type: 'value'
							}
						],
						series: [{
								name: names[0],
								type: 'bar',
								stack: '发展趋势',
								symbolSize: 8,
								barWidth: 30, //柱图宽度
								itemStyle: {
									color: '#58FFFF',
								},
								data: datas1
							},
							{
								name: names[1],
								type: "line",
								yAxisIndex: 1,
								symbolSize: 10,
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
					$("#gsxFZQK1").hide();
					$("#gsxFZQK2").show();
					gsxFZQK = document.getElementById('gsxFZQK2');
				} else {

					var contWidth = $("#gsxFZQK1").width();
					var contHeight = $("#gsxFZQK1").height();

					option2 = {
						tooltip: {
							position: function(a, b, c) {
								var boxWidth = c.offsetWidth;
								var boxHeight = c.offsetHeight;
								var mLeft = a[0] - 30;
								var mTop = a[1] - 20;
								var x = mLeft,
									y = mTop;
								if (mLeft + boxWidth > contWidth) {
									x = 50;
								}
								if (mTop + boxHeight > contHeight) {
									y = 30;
								}
								return [x, y]
							},
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
									if (i != data.length - 2) {
										html += '<span style="display:inline-block; border-radius:10px;width:10px;height:10px;background-color:' +
											data[i].color + ';"></span>' +
											data[i].seriesName + "：" + data[i].value + title + "<br/>";
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
							textStyle: {
								color: '#ffffff',
								fontWeight: 'bold'
							},
							data: names
						},

						grid: {
							left: '0%',
							right: '0%',
							bottom: '5%',
							containLabel: true
						},
						xAxis: [{
							// name:'年份',
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
							data: years,
							axisLabel:{
								interval:0,//横轴信息全部显示
								//rotate:-30,//-30度角倾斜显示
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
									formatter: '{value} ' + title
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
									formatter: '{value}% '
								},
								type: 'value'
							}
						],
						series: [{
								name: names[0],
								type: 'bar',
								stack: '发展趋势',
								symbolSize: 8,
								barWidth: 30, //柱图宽度
								itemStyle: {
									color: color[0],
								},
								data: datas1
							},
							{
								name: names[1],
								type: 'bar',
								stack: '发展趋势',
								symbolSize: 8,
								barWidth: 30, //柱图宽度
								itemStyle: {
									color: color[1],
								},
								data: datas2
							},
							{
								name: names[2],
								type: 'bar',
								stack: '发展趋势',
								symbolSize: 8,
								barWidth: 30, //柱图宽度
								itemStyle: {
									color: color[2],
								},
								data: datas3
							},

							{
								name: names[3],
								type: 'bar',
								stack: '发展趋势',
								symbolSize: 8,
								barWidth: 30, //柱图宽度
								itemStyle: {
									color: color[3],
								},
								data: datas4
							},
							{
								name: names[4],
								type: "line",
								yAxisIndex: 1,
								symbolSize: 10,
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
								data: datas5
							},
							{
								name: '总数',
								type: 'bar',
								stack: '发展',
								symbolSize: 8,
								barWidth: 1, //柱图宽度
								itemStyle: {
									color: 'rgba(0, 0, 0, 0)',
								},
								data: datas6
							},
						]
					};
					$("#gsxFZQK1").show();
					$("#gsxFZQK2").hide();
					gsxFZQK = document.getElementById('gsxFZQK1');
				}
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

//县区排名切换
function changeType(ths){
	changeButton($(ths).val(),'');
}