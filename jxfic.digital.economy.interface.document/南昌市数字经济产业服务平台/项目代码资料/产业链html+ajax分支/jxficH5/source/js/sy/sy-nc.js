var AREA_NAME = ""; // 区域名称
var tMonth = new Date().getMonth()+1;//当前月份
var MONTH = tMonth;
var time_date = "";
var industry = ['NK01','NK02','NK03','NK04','NK05','NK06'];
var industry_name = ['计算机、通信和其他电子设备制造业', '电信、广播电视和卫星传输服务业', '互联网和相关服务业', '软件和信息技术服务业','信息传输、软件和信息技术服务业','互联网和相关服务业、软件和信息技术服务业'];
var INDUSTRY_NAME = '';
var PARENT_DL = "";
var CONDITION = "1";
var CONDITIONAREA = "1";
var title = "家"; //单位
var mapTimer;
var timer1, timer2, timer3, timer4;
var arrRank = [];	// 要排名的数据


$(function() {
	$(".years .ctitle").text(YEAR);
	$(".month .ctitle").text(tMonth);
	if(MONTH<10){
		time_date = YEAR + '-0' + MONTH;
	}else{
		time_date = YEAR + '-' + MONTH;
	}
	var userid=getCookie("userid");
	var enterpriseNumberClickTimes = 0;	// 用户第几次点击企业数量
	var growthRateClickTimes = 0;	// 用户第几次点击增速
	if(userid!=null&&userid!=''&&userid!=undefined){
		var params={};
		params.token=getCookie("token");
		doData(BASE_URL + "/checklogin",params,function(result){
			if(result.status == 1){
				setCookie("token",result.token,expireTime);//token存入cookie 24小时
				setCookie("username",result.user.username,expireTime);//token存入cookie 24小时
				setCookie("area_value",result.user.areacode,expireTime);//token存入cookie 24小时
				setCookie("area_name",result.user.area_name,expireTime);//token存入cookie 24小时
				setCookie("realname",result.user.realname,expireTime);//token存入cookie 24小时
				submitForm();
			}else{
				window.location.href=LOGIN_URL;
			}
		})
	}else{
		submitForm();
	}

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
			getNanchangEntOverAll(); //数据总览
			getJxSczt();
			getNnanchangChainAnalysisZb(); //各个产业占比情况
			getNanchangChainAreaXzPm(); //各县区新增排名
			renderFZQK(); //各县区总量排名
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
			getNanchangEntOverAll(); //数据总览
			getJxSczt();
			getNnanchangChainAnalysisZb(); //各个产业占比情况
			getNanchangChainAreaXzPm(); //各县区新增排名
			renderFZQK(); //各县区总量排名
		}
	})

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

			getNanchangEntOverAll(); //数据总览
			getJxSczt();
			getNnanchangChainAnalysisZb(); //各个产业占比情况
			getNanchangChainAreaXzPm(); //各县区新增排名
			renderFZQK(); //各县区总量排名
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

			getNanchangEntOverAll(); //数据总览
			getJxSczt();
			getNnanchangChainAnalysisZb(); //各个产业占比情况
			getNanchangChainAreaXzPm(); //各县区新增排名
			renderFZQK(); //各县区总量排名
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

})
function renderRankData() {
	$("#areaTable tbody").html('');
	arrRank.forEach(function(item, index) {
		var numi = (index + 1);
		if(CONDITIONAREA==1){
			if(getCookie("area_value")==360100||getCookie("area_name")==item.AREA_NAME){
				$("#areaTable tbody").append('<tr onclick="queryEntList(\'' + item.AREA_NAME + '\',\'\',\'\')" style="cursor: pointer"><td  class="i' + numi + '">' + numi + '</td>' +
					'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS +
					'</td>' +
					'<td>' + item.RATE + '%' + '</td>' +
					'</tr>')
			}else{
				$("#areaTable tbody").append('<tr><td  class="i' + numi + '">' + numi + '</td>' +
					'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS +
					'</td>' +
					'<td>' + item.RATE + '%' + '</td>' +
					'</tr>')
			}
		}else if(CONDITIONAREA==6){
			if(getCookie("area_value")==360100||getCookie("area_name")==item.AREA_NAME){
				$("#areaTable tbody").append('<tr onclick="queryGsList(\'' + item.AREA_NAME + '\')" style="cursor: pointer"><td  class="i' + numi + '">' + numi + '</td>' +
					'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS +
					'</td>' +
					'<td>' + item.RATE + '%' + '</td>' +
					'</tr>')
			}else{
				$("#areaTable tbody").append('<tr><td  class="i' + numi + '">' + numi + '</td>' +
					'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS +
					'</td>' +
					'<td>' + item.RATE + '%' + '</td>' +
					'</tr>')
			}
		}else{
			$("#areaTable tbody").append('<tr><td  class="i' + numi + '">' + numi + '</td>' +
				'<td >' + item.AREA_NAME + '</td><td>' + item.SUMS +
				'</td>' +
				'<td>' + item.RATE + '%' + '</td>' +
				'</tr>')
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
//营业收入、企业数量、纳税、从业人员切换事件
function changeButton(params, ths) {
	CONDITIONAREA=params;
	if(params==6||ths==''){
		if(params==6){
			$(".areaTableTitle").text("核心规上企业数量");
			$("#areaTable .th_title").text("规上企业数量(家)")
		}else{
			$("#areaTable .th_title").text("营收（亿元）")
			$(".areaTableTitle").text("核心规上企业营收");
		}
		renderFZQK(); //各市区总量排名
	}else{
		dataIndex=0;
		AREA_NAME="";
		PARENT_DL="";
		INDUSTRY_NAME="";
		$(".areaTitle").text('南昌市');
		$("#qsspan").text("全市");
		$(".ztk").text("");
		$(".tkuang").removeClass('tkuang-1');
		$(".dyfx_box .button1").removeClass("exchange");
		$(ths).addClass("exchange");
		CONDITION = params;
		if (CONDITION == 1) {
			$("select[name='zl']").hide();
			title = "家";
			$(".th_title").text("企业数量（家）");
			$(".chartTitle").text("核心产业企业数量");
			$(".areaTableTitle").text("核心产业企业数量");
			$(".areaChartTitle").text("核心产业新增企业数");
			$(".hcqy_box").show();
			$(".hcgsqy_box").hide();

			$(".years .ctitle").text(YEAR);
			$(".month .ctitle").text(tMonth);
			YEAR = nowdate+"";
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
			$(".hcgsqy_box").hide();
			$(".hcgsqy_box1").show();
			YEAR = '2021';
			$(".years .ctitle").text(YEAR);
			$(".month .ctitle").text('7');
			time_date = YEAR + '-07';
			MONTH = 7;
		}
		getNanchangEntOverAll();
		getJxSczt();
		getNnanchangChainAnalysisZb(); //各个产业占比情况
		getNanchangChainAreaXzPm(); //各县区新增排名
		renderFZQK(); //各县区总量排名
		getNanchangChainYearAnalysis(); //进三年发展趋势
	}
}

function submitForm() {
	getNanchangEntOverAll(); //数据总览
	getJxSczt();//数据总览
	getNnanchangChainAnalysisZb(); //各个产业占比情况
	getNanchangChainAreaXzPm(); //各县区新增排名
	renderFZQK(); //各县区总量排名
	getNanchangChainYearAnalysis(); //进三年发展趋势
}
//核心企业数据总览
function getNanchangEntOverAll() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: time_date,
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
					$(".GSENTNUMS").text(item.GSQYENTSUMS);
					new CountUp('ENTNUMS', item.ENTNUMS).start();
					if (time_date != nowmonth) {
						new CountUp('XZENTNUMS', item.XZENTNUMS).start();
					}else{
						new CountUp('XZENTNUMS', item.XZENTNUMS1).start();
					}
					new CountUp('VENDINC', item.VENDINC, option1).start();
					$(".GSENTZS").text(item.GSQYENTSUMSZS);
					new CountUp('VENDINCZS', item.VENDINCZS, option1).start();
					new CountUp('XZVENDINC', item.XZVENDINC, option1).start();
					new CountUp('ENTZS', item.ENTZS, option1).start();
					$(".XZGSENTNUMS").text(item.XZGSQYENTSUMS);
				}
			}
		}
	})
}
//全市场主体统计
function getJxSczt() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: time_date,
		TYPE: 'NCSCZT1'
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
function getNnanchangChainAnalysisZb() {
	var params = {
		YEAR: time_date,
		CONDITION: CONDITION,
		AREA_NAME: AREA_NAME
	};
	doData(BASE_URL + '/entHomePage/getNanchangChainAnalysisZb', params, function(result) {
		var names = [];
		var datas = [];
		var datas1 = [];
		if (result.status == 10001) {
			result.data.forEach(function(item, index) {
				if (item.PARENT_DL == 'NK01') {
					$("#nk01_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}else if (item.PARENT_DL == 'NK02') {
					$("#nk02_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}else if (item.PARENT_DL == 'NK03') {
					$("#nk03_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}else if (item.PARENT_DL == 'NK04'){
					$("#nk04_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}else if(item.PARENT_DL == 'NK05'){
					$("#nk_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}else{
					$("#nk05_value").html(item.SUMS + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}
				/*if(CONDITION=='2'){
					$("#nk_value").html(rj.toFixed(2) + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
					$("#nk05_value").html(zb2.toFixed(2) + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}else{
					$("#nk_value").html(rj + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
					$("#nk05_value").html(zb2 + '<label style="font-size: 0.8rem">&nbsp;'+title+'</label>');
				}*/

			})
		}
	})
}
function changeIndustry(index,ths){
	PARENT_DL = industry[index];
	$(".tkuang").addClass('tkuang-1');
	$(".ztk").text(industry_name[index]);
	submitForm();
}
//各县区新增排名
function getNanchangChainAreaXzPm() {
	var params = {
		YEAR: time_date,
		CONDITION: CONDITION,
		PARENT_DL: PARENT_DL
	};
	doData(BASE_URL + '/entHomePage/getNanchangChainAreaXzPm', params, function(result) {
		var names = [];
		var datas = [];
		if (result.status == 10001) {
			//各省份的数据
			result.data.forEach(function(item, index) {
				names.push(item.AREA_NAME);
				if(CONDITION==1){
					datas.push(item.XZSUMS);
				}else{
					if(time_date==nowmonth){
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
						let html = data[0].name + '：';
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
									ret += temp; //拼接最终的字符串
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
					label: {
						show: true,
						position: 'top',
						formatter: '{c} '+title,
						textStyle: {
							color: '#ffffff'
						}
					}
				}]
			});
			gdsxzpmDom.off("click");
			if(CONDITION==1){
				gdsxzpmDom.on('click', function(params) {
					var name = params.name;
					if(getCookie("area_value")==360100||getCookie("area_name")==name){
						queryEntList(name, '', YEAR);
					}
				});
			}else{
				gdsxzpmDom.off("click");
			}
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
//各县区总量排名
function renderFZQK() {
	var params = {
		YEAR: time_date,
		CONDITION: CONDITIONAREA,
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
				// ---------
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
}
//右下角 近三年发展趋势
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
			var names = [];
			var years = [];
			var datas1 = [];
			var datas2 = [];
			var datas3 = [];
			var datas4 = [];
			var datas5 = [];
			var datas6 = [];
			var result = JSON.parse(res);
			if (result.status == 10001) {
				result.data.forEach(function(item, index) {
					var zsyear = (item.YEAR).substring(0,4);

					if ((result.data).length == 5) {
						if ((index + 1) % 5 == 0) {
							names.push(item.CHAIN_NAME);
						}
						if(zsyear == nowdate) {
							years.push(zsyear + '年(' + tMonth + '月)');
						}else{
							years.push(zsyear + '年');
						}
						datas1.push(item.SUMS);
						datas2.push(item.RATE);
					}else {
						if ((index + 1) % 5 == 0) {
							if(item.PARENT_DL != 'NK'){
								names.push(item.CHAIN_NAME);
							}
						}
						if (item.PARENT_DL == 'NK01') {
							datas1.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK02') {
							datas2.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK03') {
							datas3.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK04') {
							datas4.push(item.SUMS);
						} else if (item.PARENT_DL == 'NK'){
							if(zsyear == nowdate){
								years.push(zsyear + '年('+tMonth+'月)');
							}else{
								years.push(zsyear + '年');
							}
							datas5.push(item.RATE);
							datas6.push(item.SUMS);
						}
					}
				})
				names.push('同比增速');
				var option2;
				var color = ['#FF9A5E', '#63FF9A', '#D97FF9', '#50FDFD', '#54A2D5'];
				if ((result.data).length == 5) {
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
							right: '4%',
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
									formatter: '{value} %'
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
							left: '3%',
							right: '4%',
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
									formatter: '{value} %'
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
							}
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
				if (!!timer4) {
					clearInterval(timer4);
				}
				timer4 = setInterval(function() {
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

//总量
var qytitle = "";

function queryZl() {
	if(getCookie("area_value")!='360100'){
		if(AREA_NAME!=""){
			queryEntList(AREA_NAME, '', '');
		}
	}else{
		queryEntList(AREA_NAME, '', '');
	}
}
//新增
function queryXz() {
	if(getCookie("area_value")!='360100'){
		if(AREA_NAME!=""){
			queryEntList(AREA_NAME, '', YEAR);
		}
	}else{
		queryEntList(AREA_NAME, '', YEAR);
	}
}
//查看企业列表
function queryEntList(area_name, estdate, estdateyear) {
	if (estdate != '') {
		qytitle = area_name + estdate + INDUSTRY_NAME + "新增企业";
	} else if (estdateyear != '') {
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
		content: realPath + "view/sy/qylist.html?AREA_NAME=" + area_name + "&INDUSTRY=" + PARENT_DL + "&ESTDATEMONTH=" +
			estdate + "&YEAR=" + YEAR + "&ESTDATEYEAR=" + estdateyear + "&qytitle=" + qytitle+"&time_date="+time_date
	})
}
//县区排名切换
function changeType(ths){
	changeButton($(ths).val(),'');
}

function queryGs(){
	if(getCookie("area_value")!='360100'){
		if(AREA_NAME!=""){
			queryGsList(AREA_NAME, YEAR);
		}
	}else{
		queryGsList(AREA_NAME, YEAR);
	}
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
		content: realPath + "view/sy/gsqylist.html?AREA_NAME=" + area_name + "&INDUSTRY=" + PARENT_DL + "&YEAR=" + YEAR + "&qytitle=" + jj+"&MONTH="+MONTH
	})
}

function openLayer(){
	layer.open({
		type: 2,
		shade: 0.1,
		title: false, //不显示标题
		area: ['100%', '100%'], //宽高
		content: realPath +'view/sy/guobiao_tj.html'
	})
}
