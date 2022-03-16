var mapTimer;

var AREA_NAME = ""; // 区域名称
var tMonth = new Date().getMonth()+1;//当前月份
var industry = ['NK01', 'NK02', 'NK03', 'NK04'];
var industry_name = ['计算机、通信和其他电子设备制造业', '电信、广播电视和卫星传输服务业', '互联网和相关服务业', '软件和信息技术服务业'];
var INDUSTRY_NAME = '';
var CONDITION = '1';
var PARENT_DL = "";
var title = "家"; //单位
var timer1, timer2, timer3, timer4;
var CODE_NAME = ["1","2","3","4","5"];
var CLSJ_NAME="";
$(function() {
	$(".calendar .ctitle").text(YEAR);

	// 企业分析跳转
	$('#qycz').click(function() {
		window.location.href = 'cyfx_new.html?menuType=1'
	})
	// 企业成立跳转
	$('#qycl').click(function() {
		window.location.href = 'qycl.html?menuType=1'
	})
	//企业注销刷新当前页
	$('#qyzx').click(function(){
		location.reload()
	})
	

	$('.cleft').click(function() {
		var year = $(".ctitle").text();
		//只能看近三年的数据
		if ('2017' != year) {
			back1();
			year--;
			$(".ctitle").text(year);
			YEAR = year + "";
			getXzEntChainZb(); //产业总览与占比
			getZxInvestmentZb();
			getZxEstdateZb();
			renderFZQK(); //各县区新增排名
			getYearXzEnt();
		}
	})
	$('.cright').click(function() {
		var year = $(".ctitle").text();
		//只能看近三年的数据
		if (nowdate != year) {
			back1();
			year++;
			$(".ctitle").text(year);
			YEAR = year + "";
			getXzEntChainZb(); //产业总览与占比
			getZxInvestmentZb();
			getZxEstdateZb();
			renderFZQK(); //各县区新增排名
			getYearXzEnt();
		}
	})

	getXzEntChainZb(); //产业总览与占比
	getZxInvestmentZb();
	getZxEstdateZb(); //企业类型占比
	renderFZQK(); //各县区新增排名
	getNanchangChainMonthXz();
	getYearXzEnt();
})
//产业切换事件
function changeParentdl(index){
	if(index!=4){
		PARENT_DL=industry[index];
		INDUSTRY_NAME=industry_name[index];
		$(".ztk").text(INDUSTRY_NAME);
		$(".box-map1-1").addClass("box-map1-2");
	}else{
		PARENT_DL='';
		INDUSTRY_NAME='';
		$(".ztk").text('');
		$(".box-map1-1").removeClass("box-map1-2");
	}
	back1();
	getZxInvestmentZb();
	getZxEstdateZb(); //企业类型占比
	renderFZQK(); //各县区新增排名
	getNanchangChainMonthXz();
	getYearXzEnt();
}
//投资来源与年龄结构切换事件
function selectTzly(ths){
	$(".line3 .cityM").removeClass("xz1");
	$(ths).addClass("xz1");
	$(".line3 .pieDom").removeClass("pieDoms");
	$("#chartsSJQK").addClass("pieDoms");
	getZxInvestmentZb();
	$(".chartTitle").text("新注消企业投资来源占比");
}
function selectAge(ths){
	$(".line3 .cityM").removeClass("xz1");
	$(ths).addClass("xz1");
	$(".line3 .pieDom").removeClass("pieDoms");
	$("#chartsNLJG").addClass("pieDoms");
	getZxFrAgeZb();
	$(".chartTitle").text("新注消企业老板年龄占比");
}
//成立时间与注册资金切换事件
function selectClsj(ths){
	$(".line4 .cityM").removeClass("xz1");
	$(ths).addClass("xz1");
	$(".line4 .pieDom").removeClass("pieDoms");
	$("#chartsCLSJ").addClass("pieDoms");
	getZxEstdateZb();
	$(".chart2Title").text("成立时间");
}
function selectZczj(ths){
	$(".line4 .cityM").removeClass("xz1");
	$(ths).addClass("xz1");
	$(".line4 .pieDom").removeClass("pieDoms");
	$("#chartsZCZJ").addClass("pieDoms");
	getZxRegcapZb();
	$(".chart2Title").text("注册资金");
}

function back1(){
	$(".cityM").removeClass("xz1");
	$(".city").addClass("xz1");
	$(".pieDom").removeClass("pieDoms");
	$("#chartsSJQK").addClass("pieDoms");
	$("#chartsCLSJ").addClass("pieDoms");
	$(".chartTitle").text("新注消企业投资来源占比");
	$(".chart2Title").text("成立时间");
}
//数据总览、占比
var dataIndex;
function getXzEntChainZb() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR
	}
	doData(BASE_URL + '/industryDistributionController/getZxEntChainZb', params, function(result) {
		if (result.status == 10001) {
			var option1 = {
				startVal: 0,
				decimalPlaces: 2,
				duration: 1.9,
			};
			result.data.forEach(function(item, index) {
				if (item.PARENT_DL == 'NK01') {
					new CountUp('YJ', item.SUMS).start();
					new CountUp('YJZS', item.RATE, option1).start();
				} else if (item.PARENT_DL == 'NK02') {
					new CountUp('CS', item.SUMS).start();
					new CountUp('CSZS', item.RATE, option1).start();
				} else if (item.PARENT_DL == 'NK03') {
					new CountUp('HLW', item.SUMS).start();
					new CountUp('HLWZS', item.RATE, option1).start();
				} else if (item.PARENT_DL == 'NK04') {
					new CountUp('RJ', item.SUMS).start();
					new CountUp('RJZS', item.RATE, option1).start();
				}else{
					new CountUp('qyzs', item.SUMS).start();
					new CountUp('zs', item.RATE,option1).start();
				}
			})
		}
	})
}
//投资来源占比
function getZxInvestmentZb() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR,
		PARENT_DL: PARENT_DL
	}
	doData(BASE_URL + '/industryDistributionController/getZxInvestmentZb',params,function (result) {
		if (result.status == 10001) {

			var names=[];
			var datas=[];
			result.data.forEach(function(item, index) {
				names.push(item.CODE_VALUE);
				datas.push(item.SUMS);
			})
			option = {
				"tooltip": {
					"trigger": "axis",
					"axisPointer": {
						"type": "shadow",
						textStyle: {
							color: "#fff"
						}

					},
				},
				"grid": {
					top:'10%',
					right:'5%',
					left:'15%',
					bottom:'15%',
					textStyle: {
						color: "#fff"
					}
				},
				"calculable": true,
				"xAxis": [{
					"triggerEvent":true,//控制X轴可以点击
					"type": "category",
					"axisLine": {
						lineStyle: {
							color: 'rgba(255,255,255,.5)'
						}
					},
					"splitLine": {
						"show": false
					},
					"axisTick": {
						"show": false
					},
					"splitArea": {
						"show": false
					},
					"axisLabel": {
						interval: 0,
						color:'#fff',
						fontSize:12,
						formatter: function(value) {
							var ret = ""; //拼接加\n返回的类目项
							var maxLength = 6; //每项显示文字个数
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

					"data": names
				}],
				"yAxis": [{
					"type": "value",
					"axisLine": {
						lineStyle: {
							color: 'rgba(255,255,255,.5)'
						}
					},
					"axisTick": {
						"show": false
					},
					"axisLabel": {
						formatter: '{value} 家',
						interval: 0,
						color:'rgba(255,255,255,0.5)',
						fontSize:13

					},
					"splitArea": {
						"show": false
					},

				}],
				"series": [{
					name:'企业数量',
					type: 'bar',
					barWidth: '50%',
					data: datas,
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
										color: '#055CC4' // 0% 处的颜色
									}, {
										offset: 1,
										color: '#2b89f8' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								}
						}
					},
					label: {
						show: true,
						position: 'top',
						formatter: '{c} 家',
						textStyle: {
							color: '#ffffff'
						}
					}
				}]
			};
			var qyfbDom = echarts.init(document.getElementById("chartsSJQK"));
			qyfbDom.setOption(option, true);
			qyfbDom.off('click');
			qyfbDom.on('click', function (param) {
				var tt = "";
				if (names.indexOf(param.value) > -1) {
					var tzlycode =  CODE_NAME[names.indexOf(param.value)];
					if (AREA_NAME == '') {
						tt = '南昌市' + YEAR + '年' + INDUSTRY_NAME + '注销企业' + param.value + "来源情况";
					} else {
						tt = AREA_NAME + YEAR + '年' + INDUSTRY_NAME + '注销企业' + param.value + "来源情况";
					}
					if(tzlycode=='4'){//4为本地投资直接查看企业列表
						openEntList(tt,AREA_NAME);
					}else{
						queryEntInvestment('ZXTZLY',tzlycode,tt,AREA_NAME);
					}

				} else {
					var tzlycode =  CODE_NAME[param.dataIndex];
					if (AREA_NAME == '') {
						tt = '南昌市' + YEAR + '年' + INDUSTRY_NAME + '注销企业' + param.name + "来源情况";
					} else {
						tt = AREA_NAME + YEAR + '年' + INDUSTRY_NAME + '注销企业' + param.name + "来源情况";
					}
					if(tzlycode=='4'){//4为本地投资直接查看企业列表
						openEntList(tt,AREA_NAME);
					}else{
						queryEntInvestment('ZXTZLY',tzlycode,tt,AREA_NAME);
					}
				}
			});
			var canPlayAction = true;
			qyfbDom.on("mouseover", function() {
				canPlayAction = false;
			})
			qyfbDom.on("mouseout", function() {
				canPlayAction = true;
			})
			let seed = 0;
			if (!!timer1) {
				clearInterval(timer1);
			}
			timer1 = setInterval(function() {
				if (!canPlayAction) {
					return;
				}
				var index = seed % datas.length;
				datas.map(function(item, i) {
					qyfbDom.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: i
					});
				})

				qyfbDom.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: index
				});
				qyfbDom.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: index
				});
				seed++;
			}, 10000)
		}

	})
}
//法人年龄结构占比
function getZxFrAgeZb() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR,
		PARENT_DL: PARENT_DL
	}
	doData(BASE_URL + '/industryDistributionController/getZxFrAgeZb',params,function (result) {
		if (result.status == 10001) {

			var names=[];
			var datas=[];
			result.data.forEach(function(item, index) {
				names.push(item.CODE_VALUE);
				datas.push(item.SUMS);
			})
			option = {
				"tooltip": {
					"trigger": "axis",
					"axisPointer": {
						"type": "shadow",
						textStyle: {
							color: "#fff"
						}

					},
				},
				"grid": {
					top:'10%',
					right:'5%',
					left:'15%',
					bottom:'15%',
					textStyle: {
						color: "#fff"
					}
				},
				"calculable": true,
				"xAxis": [{
					"triggerEvent":true,//控制X轴可以点击
					"type": "category",
					"axisLine": {
						lineStyle: {
							color: 'rgba(255,255,255,.5)'
						}
					},
					"splitLine": {
						"show": false
					},
					"axisTick": {
						"show": false
					},
					"splitArea": {
						"show": false
					},
					"axisLabel": {
						interval: 0,
						color:'#fff',
						fontSize:12,
						formatter: function(value) {
							var ret = ""; //拼接加\n返回的类目项
							var maxLength = 6; //每项显示文字个数
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

					"data": names
				}],
				"yAxis": [{
					"type": "value",
					"axisLine": {
						lineStyle: {
							color: 'rgba(255,255,255,.5)'
						}
					},
					"axisTick": {
						"show": false
					},
					"axisLabel": {
						formatter: '{value} 家',
						interval: 0,
						color:'rgba(255,255,255,0.5)',
						fontSize:13

					},
					"splitArea": {
						"show": false
					},

				}],
				"series": [{
					name:'企业数量',
					type: 'bar',
					barWidth: '50%',
					data: datas,
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
										color: '#055CC4' // 0% 处的颜色
									}, {
										offset: 1,
										color: '#2b89f8' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								}
						}
					},
					label: {
						show: true,
						position: 'top',
						formatter: '{c} 家',
						textStyle: {
							color: '#ffffff'
						}
					}
				}]
			};
			var qyfbDom = echarts.init(document.getElementById("chartsNLJG"));
			qyfbDom.setOption(option, true);
			qyfbDom.off('click');
			qyfbDom.on('click', function (param) {
				if(names.indexOf(param.value)>-1){
					if (AREA_NAME == '') {
						qytitle = '南昌市' + YEAR + '年' + INDUSTRY_NAME + '法人年龄' + param.value + "注销企业";
					} else {
						qytitle = AREA_NAME + YEAR + '年' + INDUSTRY_NAME + '法人年龄' + param.value + "注销企业";
					}
					queryEntList(AREA_NAME, '', YEAR, '', '', CODE_NAME[names.indexOf(param.value)],'');
				}else {
					if (AREA_NAME == '') {
						qytitle = '南昌市' + YEAR + '年' + INDUSTRY_NAME + '法人年龄' + param.name + "注销企业";
					} else {
						qytitle = AREA_NAME + YEAR + '年' + INDUSTRY_NAME + '法人年龄' + param.name + "注销企业";
					}
					queryEntList(AREA_NAME, '', YEAR, '', '', CODE_NAME[param.dataIndex],'');
				}
			});
			var canPlayAction = true;
			qyfbDom.on("mouseover", function() {
				canPlayAction = false;
			})
			qyfbDom.on("mouseout", function() {
				canPlayAction = true;
			})
			let seed = 0;
			if (!!timer1) {
				clearInterval(timer1);
			}
			timer1 = setInterval(function() {
				if (!canPlayAction) {
					return;
				}
				var index = seed % datas.length;
				datas.map(function(item, i) {
					qyfbDom.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: i
					});
				})

				qyfbDom.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: index
				});
				qyfbDom.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: index
				});
				seed++;
			}, 10000)
		}

	})
}
//企业成立时间占比
function getZxEstdateZb() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR,
		PARENT_DL: PARENT_DL
	}
	doData(BASE_URL + '/industryDistributionController/getZxEstdateZb', params, function(result) {
		if (result.status == 10001) {

			var names = [];
			var datas = [];
			result.data.forEach(function(item, index) {
				names.push(item.CODE_VALUE);
				datas.push(item.SUMS);
			})
			option = {
				"tooltip": {
					"trigger": "axis",
					"axisPointer": {
						"type": "shadow",
						textStyle: {
							color: "#fff"
						}

					},
				},
				"grid": {
					top: '10%',
					right: '5%',
					left: '15%',
					bottom: '15%',
					textStyle: {
						color: "#fff"
					}
				},
				"calculable": true,
				"xAxis": [{
					"triggerEvent":true,//控制X轴可以点击
					"type": "category",
					"axisLine": {
						lineStyle: {
							color: 'rgba(255,255,255,.5)'
						}
					},
					"splitLine": {
						"show": false
					},
					"axisTick": {
						"show": false
					},
					"splitArea": {
						"show": false
					},
					"axisLabel": {
						interval: 0,
						color: '#fff',
						fontSize: 12,
						formatter: function(value) {
							var ret = ""; //拼接加\n返回的类目项
							var maxLength = 6; //每项显示文字个数
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

					"data": names
				}],
				"yAxis": [{
					"type": "value",
					"axisLine": {
						lineStyle: {
							color: 'rgba(255,255,255,.5)'
						}
					},
					"axisTick": {
						"show": false
					},
					"axisLabel": {
						formatter: '{value} 家',
						interval: 0,
						color: 'rgba(255,255,255,0.5)',
						fontSize: 13

					},
					"splitArea": {
						"show": false
					},

				}],
				"series": [{
					name: '企业数量',
					type: 'bar',
					barWidth: '50%',
					data: datas,
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
									color: '#19CD97' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#78C7B0' // 100% 处的颜色
								}],
								global: false // 缺省为 false
							}
						}
					},
					label: {
						show: true,
						position: 'top',
						formatter: '{c} 家',
						textStyle: {
							color: '#ffffff'
						}
					}
				}]
			};
			var qyfbDom = echarts.init(document.getElementById("chartsCLSJ"));
			qyfbDom.setOption(option, true);
			qyfbDom.off('click');
			qyfbDom.on('click', function (param) {
				if(names.indexOf(param.value)>-1){
					if(AREA_NAME==''){
						qytitle = '南昌市' + YEAR + '年' + INDUSTRY_NAME + '成立' +param.value + "注销企业";
					}else {
						qytitle = AREA_NAME + YEAR + '年' + INDUSTRY_NAME + '成立' +param.value + "注销企业";
					}
					queryEntList(AREA_NAME,'',YEAR,CODE_NAME[names.indexOf(param.value)],'','','');
				}else {
					if (AREA_NAME == '') {
						qytitle = '南昌市' + YEAR + '年' + INDUSTRY_NAME + '成立' + param.name + "注销企业";
					} else {
						qytitle = AREA_NAME + YEAR + '年' + INDUSTRY_NAME + '成立' + param.name + "注销企业";
					}
					queryEntList(AREA_NAME, '', YEAR, CODE_NAME[param.dataIndex], '', '','');
				}
			});
			var canPlayAction = true;
			qyfbDom.on("mouseover", function() {
				canPlayAction = false;
			})
			qyfbDom.on("mouseout", function() {
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
					qyfbDom.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: i
					});
				})

				qyfbDom.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: index
				});
				qyfbDom.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: index
				});
				seed++;
			}, 10000)
		}

	})
}
//企业注册资金占比
function getZxRegcapZb() {
	var params = {
		AREA_NAME: AREA_NAME,
		YEAR: YEAR,
		PARENT_DL: PARENT_DL
	}
	doData(BASE_URL + '/industryDistributionController/getZxRegcapZb', params, function(result) {
		if (result.status == 10001) {

			var names = [];
			var datas = [];
			result.data.forEach(function(item, index) {
				names.push(item.CODE_VALUE);
				datas.push(item.SUMS);
			})
			option = {
				"tooltip": {
					"trigger": "axis",
					"axisPointer": {
						"type": "shadow",
						textStyle: {
							color: "#fff"
						}

					},
				},
				"grid": {
					top: '10%',
					right: '5%',
					left: '15%',
					bottom: '15%',
					textStyle: {
						color: "#fff"
					}
				},
				"calculable": true,
				"xAxis": [{
					"triggerEvent":true,//控制X轴可以点击
					"type": "category",
					"axisLine": {
						lineStyle: {
							color: 'rgba(255,255,255,.5)'
						}
					},
					"splitLine": {
						"show": false
					},
					"axisTick": {
						"show": false
					},
					"splitArea": {
						"show": false
					},
					"axisLabel": {
						interval: 0,
						color: '#fff',
						fontSize: 12,
						formatter: function(value) {
							var ret = ""; //拼接加\n返回的类目项
							var maxLength = 6; //每项显示文字个数
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

					"data": names
				}],
				"yAxis": [{
					"type": "value",
					"axisLine": {
						lineStyle: {
							color: 'rgba(255,255,255,.5)'
						}
					},
					"axisTick": {
						"show": false
					},
					"axisLabel": {
						formatter: '{value} 家',
						interval: 0,
						color: 'rgba(255,255,255,0.5)',
						fontSize: 13

					},
					"splitArea": {
						"show": false
					},

				}],
				"series": [{
					name: '企业数量',
					type: 'bar',
					barWidth: '50%',
					data: datas,
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
									color: '#19CD97' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#78C7B0' // 100% 处的颜色
								}],
								global: false // 缺省为 false
							}
						}
					},
					label: {
						show: true,
						position: 'top',
						formatter: '{c} 家',
						textStyle: {
							color: '#ffffff'
						}
					}
				}]
			};
			var qyfbDom = echarts.init(document.getElementById("chartsZCZJ"));
			qyfbDom.setOption(option, true);
			qyfbDom.off('click');
			qyfbDom.on('click', function (param) {
				if(names.indexOf(param.value)>-1){
					if(AREA_NAME==''){
						qytitle = '南昌市' + YEAR + '年' + INDUSTRY_NAME + '注册资金' +param.value + "注销企业";
					}else {
						qytitle = AREA_NAME + YEAR + '年' + INDUSTRY_NAME + '注册资金' +param.value + "注销企业";
					}
					queryEntList(AREA_NAME,'',YEAR,CODE_NAME[names.indexOf(param.value)],'','');
				}else {
					if (AREA_NAME == '') {
						qytitle = '南昌市' + YEAR + '年' + INDUSTRY_NAME + '注册资金' + param.name + "注销企业";
					} else {
						qytitle = AREA_NAME + YEAR + '年' + INDUSTRY_NAME + '注册资金' + param.name + "注销企业";
					}
					queryEntList(AREA_NAME, '', YEAR, '', '', '', CODE_NAME[param.dataIndex]);
				}
			});
			var canPlayAction = true;
			qyfbDom.on("mouseover", function() {
				canPlayAction = false;
			})
			qyfbDom.on("mouseout", function() {
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
					qyfbDom.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: i
					});
				})

				qyfbDom.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: index
				});
				qyfbDom.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: index
				});
				seed++;
			}, 10000)
		}

	})
}
//月份注销
function getNanchangChainMonthXz() {
	var params = {
		YEAR: YEAR,
		AREA_NAME: AREA_NAME,
		PARENT_DL: PARENT_DL
	};

	doData(BASE_URL + '/industryDistributionController/queryMonthZxEntDatas', params, function(result) {
		var names = [];
		var datas1 = [];
		var datas2 = [];
		var datas3 = [];
		var datas4 = [];
		var datas5 = [];
		var datas = {};
		var year1 = nowdate + "",
			year2 = nowdate - 1 + "",
			year3 = nowdate - 2 + "",
			year4 = nowdate - 3 + "",
			year5 = nowdate - 4 + "";
		var firstYear=year5;
		if (result.status == 10001) {
			//各省份的数据
			result.data.forEach(function(item, index) {
				if (item.YEAR == year1) {
					datas1.push(item.SUMS);
				}else if (item.YEAR == year2) {
					var yy = item.MONTH;
					names.push(yy.substring(yy.indexOf('年') + 1, yy.length));
					datas2.push(item.SUMS);
				}else if (item.YEAR == year3) {
					datas3.push(item.SUMS);
				}else if (item.YEAR == year4) {
					datas4.push(item.SUMS);
				}else if (item.YEAR == year5) {
					datas5.push(item.SUMS);
				}
			})
			for(var i=tMonth+1;i<=12;i++){
				datas1.push(0);
			}
			datas[year1] = datas1;
			datas[year2] = datas2;
			datas[year3] = datas3;
			datas[year4] = datas4;
			datas[year5] = datas5;
			//新条形图
			var dataMap = {};

			function dataFormatter(obj) {
				var temp;
				for (var year = (nowdate - 4); year <= nowdate; year++) {
					var max = 0;
					var sum = 0;
					temp = obj[year];
					for (var i = 0, l = temp.length; i < l; i++) {
						max = Math.max(max, temp[i]);
						sum += temp[i];
						obj[year][i] = {
							// name: pList[i],
							value: temp[i]
						};
					}
					obj[year + 'max'] = Math.floor(max / 100) * 100;
					obj[year + 'sum'] = sum;
				}
				return obj;
			}
			dataMap.dataPI = dataFormatter(datas);
			option = {
				baseOption: {
					timeline: {
						axisType: 'category',
						autoPlay: true,
						playInterval: 10000,
						lineStyle: {
							color: '#ffffff'
						},
						controlStyle: {
							normal: {
								color: '#ffffff',
								borderColor: '#ffffff'
							},
							emphasis: {
								color: '#ffffff',
								borderColor: '#ffffff'
							}
						},
						data: [year5,year4,year3,year2,year1],
						label: {
							formatter: function(s) {
								return (new Date(s)).getFullYear();
							},
							normal: {
								textStyle: {
									color: '#ffffff'
								},
							},
						}
					},
					calculable: true,
					grid: {
						top: '7%',
						right: '3%',
						left: '10%',
						bottom: '25%',
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow',
								label: {
									show: true,
									formatter: function(params) {
										return params.value.replace('\n', '');
									}
								}
							}
						}
					},
					xAxis: [{
						"triggerEvent":true,//控制X轴可以点击
						'type': 'category',
						'axisLabel': {
							'interval': 0
						},
						axisLine: {
							lineStyle: {
								color: '#ffffff',
								// width:8,//这里是为了突出显示加上的
							},
						},
						'data': names,
						splitLine: {
							show: false
						}
					}],
					yAxis: [{
						axisLine: {
							lineStyle: {
								color: '#ffffff',
								// width:8,//这里是为了突出显示加上的
							},
						},
						type: 'value',
						"axisLabel": {
							formatter: '{value} 家',
							interval: 0,
							color: 'rgba(255,255,255,0.5)',
							fontSize: 13

						},
					}],
					series: [{
						name: '企业数量',
						type: 'bar',
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
								}
							}
						},
						label: {
							show: true,
							position: 'top',
							formatter: '{c} 家',
							textStyle: {
								color: '#ffffff'
							}
						}
					}, ]
				},
				options: [
					{
						series: [{
							barWidth: '50%',
							data: dataMap.dataPI[year5]
						}, ]
					},
					{
						series: [{
							data: dataMap.dataPI[year4]
						}, ]
					},
					{
						series: [{
							data: dataMap.dataPI[year3]
						}, ]
					},
					{
						series: [{
							data: dataMap.dataPI[year2]
						}, ]
					},
					{
						series: [{
							data: dataMap.dataPI[year1]
						}, ]
					}
				]
			};
			var qyfbDom = echarts.init(document.getElementById("barBox"));
			qyfbDom.setOption(option, true);
			qyfbDom.off("click");
			qyfbDom.on('click', function(params) {
				if(names.indexOf(params.value)>-1){
					if (AREA_NAME == '') {
						qytitle = '南昌市' + firstYear + "年" + params.value + INDUSTRY_NAME + "注销企业";
					} else {
						qytitle = AREA_NAME + firstYear + "年" + params.value + INDUSTRY_NAME + "注销企业";
					}
					queryEntList(AREA_NAME, firstYear + "年" + params.value, '', '', '', '','');
				}else {
					var name = params.name;
					//时间轴不能点击查看列表
					if (name.indexOf("月") != -1) {
						if (AREA_NAME == '') {
							qytitle = '南昌市' + firstYear + "年" + name + INDUSTRY_NAME + "注销企业";
						} else {
							qytitle = AREA_NAME + firstYear + "年" + name + INDUSTRY_NAME + "注销企业";
						}
						queryEntList(AREA_NAME, firstYear + "年" + name, '', '', '', '','');
					}
				}
			});
			qyfbDom.on('timelinechanged', function(timelineIndex){
				var arrIndex = timelineIndex.currentIndex;
				firstYear=option.baseOption.timeline.data[arrIndex];
			})
		}
	})
}
//各县区注销排名
function renderFZQK() {
	var params = {
		YEAR: YEAR,
		PARENT_DL: PARENT_DL
	}
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/industryDistributionController/queryChainAreaZxPm',
		data: {
			param: JSON.stringify(params) //参数
		},
		cache: false,
		success: function(res) {
			$("#areaTable tbody tr").remove();
			var result = JSON.parse(res);
			var qysl = 0,wssl = 0,fgssl=0;
			if (result.status == 10001) {
				result.data.forEach(function(item, index) {
					geoCoordMap.push({
						name: item.AREA_NAME,
						value: item.SUMS
					});
					qysl=qysl+item.SUMS;
					wssl=wssl+item.WSSL;
					fgssl=fgssl+item.FGSSL;
					if (item.SUMS > max) {
						max = item.SUMS;
					}
					if (item.SUMS < min) {
						min = item.SUMS;
					}
					var numi = (index + 1);

					$("#areaTable tbody").append('<tr><td  class="i' + numi + '">' + numi + '</td>' +
						'<td onclick="queryAreaXz(\'' + item.AREA_NAME + '\',\'\')" style="cursor: pointer">' + item.AREA_NAME + '</td>'+
						'<td onclick="queryAreaXz(\'' + item.AREA_NAME + '\',\'\')" style="cursor: pointer">' + item.SUMS +'</td>' +
						/*'<td onclick="queryAreaXz(\'' + item.AREA_NAME + '\',\'1\')" style="cursor: pointer">' + item.WSSL + '</td>'+*/
						'<td onclick="queryAreaXz(\'' + item.AREA_NAME + '\',\'2\')" style="cursor: pointer">' + item.FGSSL +'</td>' +
						'</tr>')
				})
				$("#areaTable tbody").append('<tr><td  class="i14">-</td>' +
					'<td onclick="queryAreaXz(\'\',\'\')" style="cursor: pointer">南昌市</td><td onclick="queryAreaXz(\'\',\'\')" style="cursor: pointer">' + qysl +'</td>' +
					/*'<td onclick="queryAreaXz(\'\',\'1\')" style="cursor: pointer">' + wssl + '</td>'+*/
					'<td onclick="queryAreaXz(\'\',\'2\')" style="cursor: pointer">' + fgssl +'</td>'+
					'</tr>');
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
			var pointTitleList = geoCoordPoints.map(item => {
				var position = [center[item.name][0] - 0.003, center[item.name][1] + 0.06].concat(item.name).concat(item.value);
				return position;
			})
			if (data) {
				echarts.registerMap(name, data);

				var option = {
					tooltip : {
					   trigger: 'item',
					   formatter:function(param){
						   return geoCoordMap[param.dataIndex].name + ":" + geoCoordMap[param.dataIndex].value + title;;
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
							data: pointTitleList
						},
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
					if(getCookie("area_value")==360100||getCookie("area_name")==AREA_NAME) {
						back1();
						getXzEntChainZb(); //产业总览与占比
						getZxInvestmentZb();
						getZxEstdateZb(); //企业类型占比
						getNanchangChainMonthXz(); //企业
						getYearXzEnt(); //近三年情况
						$(".areaTitle").text(AREA_NAME);
					}
				});

				console.log(areaTitleList);
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
//近三年情况
function getYearXzEnt() {
	var params = {
		AREA_NAME: AREA_NAME,
		PARENT_DL: PARENT_DL
	}
	doData(BASE_URL + '/industryDistributionController/getYearZxEnt', params, function(result) {
		if (result.status == 10001) {

			var names = [];
			var datas = [];
			result.data.forEach(function(item, index) {
				if(item.YEAR==nowdate){
					names.push(item.YEAR+'年('+tMonth+"月)");
				}else{
					names.push(item.YEAR+'年');
				}
				datas.push(item.SUMS);
			})
			var option = {
				"tooltip": {
					"trigger": "axis",
					"axisPointer": {
						"type": "shadow",
						textStyle: {
							color: "#fff"
						}

					},
				},
				"grid": {
					top: '3%',
					right: '8%',
					left: '15%',
					bottom: '10%',
					textStyle: {
						color: "#fff"
					}
				},
				"calculable": true,
				"xAxis": [{
					"triggerEvent":true,//控制X轴可以点击
					"type": "category",
					boundaryGap: false,
					"axisLine": {
						lineStyle: {
							color: '#fff'
						}
					},
					"splitLine": {
						"show": false
					},
					"axisTick": {
						"show": false
					},
					"splitArea": {
						"show": false
					},
					"axisLabel": {
						interval: 0,
						color: '#fff',
						fontSize: 14
					},

					"data": names
				}],
				"yAxis": [{
					"type": "value",
					"splitLine": {
						"show": false
					},
					"axisLine": {
						lineStyle: {
							color: '#fff'
						}
					},
					"axisTick": {
						"show": false
					},
					"axisLabel": {
						formatter: '{value} 家',
						interval: 0,
						color: 'rgba(255,255,255,0.5)',
						fontSize: 13

					},
					"splitArea": {
						"show": false
					},

				}],
				"series": [{
					type: 'line',
					name: '企业数量',
					boundaryGap: false,
					smooth: true,
					data: datas,
					lineStyle: {
						normal: {
							width: 3,
							color: '#307BF7'
						}
					},
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#307BF7'
								},
								{
									offset: 1,
									color: 'rgba(81,150,164,0)'
								}
							], false),
						}
					},
					label: {
						show: true,
						position: 'top',
						formatter: '{c} 家',
						textStyle: {
							color: '#ffffff'
						}
					}
				}]
			};
			var qyfbDom = echarts.init(document.getElementById("pieBox"));
			qyfbDom.setOption(option, true);
			qyfbDom.off("click");
			qyfbDom.on('click', function(params) {
				if(getCookie("area_value")==360100||getCookie("area_name")==AREA_NAME) {
					if(names.indexOf(params.value)>-1){
						var yearparam = (params.value);
						yearparam = yearparam.substring(0,yearparam.indexOf('年'));
						if (AREA_NAME == '') {
							qytitle = '南昌市' + yearparam + "年" + INDUSTRY_NAME + "注销企业";
						} else {
							qytitle = AREA_NAME + yearparam + "年" + INDUSTRY_NAME + "注销企业";
						}
						queryEntList(AREA_NAME, '', yearparam, '', '', '','');
					}else {
						var name = params.name;
						name = name.substring(0,name.indexOf('年'));
						if (AREA_NAME == '') {
							qytitle = '南昌市' + name + "年" + INDUSTRY_NAME + "注销企业";
						} else {
							qytitle = AREA_NAME + name + "年" + INDUSTRY_NAME + "注销企业";
						}
						queryEntList(AREA_NAME, '', name, '', '', '','');
					}
				}
			});
			var canPlayAction = true;
			qyfbDom.on("mouseover", function() {
				canPlayAction = false;
			})
			qyfbDom.on("mouseout", function() {
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
				var index = seed % datas.length;
				datas.map(function(item, i) {
					qyfbDom.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: i
					});
				})

				qyfbDom.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: index
				});
				qyfbDom.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: index
				});
				seed++;
			}, 10000)

		}

	})
}

//注销列表（总览点击）
function queryXz(i) {
	if(getCookie("area_value")==360100||getCookie("area_name")==AREA_NAME) {
		if (i != 4) {
			if (AREA_NAME == '') {
				qytitle = '南昌市' + YEAR + "年" + industry_name[i] + "注销企业";
			} else {
				qytitle = AREA_NAME + YEAR + "年" + industry_name[i] + "注销企业";
			}
			layer.open({
				type: 2,
				shade: 0.1,
				title: false, //不显示标题
				area: ['100%', '100%'], //宽高
				content: realPath + "view/cyfx/qyZxlist.html?AREA_NAME=" + AREA_NAME + "&INDUSTRY=" + industry[i] + "&ESTDATEMONTH=" +
					'' + "&qytitle=" + qytitle + "&CLSJ=" + '' + "&YEAR=" + YEAR + "&TZLY=" + '' + "&AGE=" + '' + "&ZCZJ=" + ''
			})
		} else {
			if (AREA_NAME == '') {
				qytitle = '南昌市' + YEAR + "年" + "注销企业";
			} else {
				qytitle = AREA_NAME + YEAR + "年" + "注销企业";
			}
			layer.open({
				type: 2,
				shade: 0.1,
				title: false, //不显示标题
				area: ['100%', '100%'], //宽高
				content: realPath + "view/cyfx/qyZxlist.html?AREA_NAME=" + AREA_NAME + "&INDUSTRY=" + '' + "&ESTDATEMONTH=" +
					'' + "&qytitle=" + qytitle + "&CLSJ=" + '' + "&YEAR=" + YEAR + "&TZLY=" + '' + "&AGE=" + ''
			})
		}
	}
}
//注销列表（区域排名点击）
function queryAreaXz(area_name,type) {
	if(getCookie("area_value")==360100||getCookie("area_name")==area_name) {
			qytitle = area_name + YEAR + "年" + INDUSTRY_NAME + "注销企业";
			if(type=='1'){
				qytitle = area_name + YEAR + "年" + INDUSTRY_NAME + "注销外商投资企业";
			}else if(type=='2'){
				qytitle = area_name + YEAR + "年" + INDUSTRY_NAME + "注销分公司";
			}
			layer.open({
				type: 2,
				shade: 0.1,
				title: false, //不显示标题
				area: ['100%', '100%'], //宽高
				content: realPath + "view/cyfx/qyZxlist.html?AREA_NAME=" + area_name + "&INDUSTRY=" + PARENT_DL + "&ESTDATEMONTH=" +
					'' + "&qytitle=" + qytitle + "&CLSJ=" + '' + "&YEAR=" + YEAR + "&TZLY=" + '' + "&AGE=" + '' + "&ZCZJ=" + ''+"&TYPE="+type
			})

	}
}
//查看注销企业列表(图表点击)
function queryEntList(area_name,estdate,year,CLSJ,TZLY,AGE,ZCZJ) {
	if (getCookie("area_value")==360100|| area_name == getCookie("area_name")) {
		layer.open({
			type: 2,
			shade: 0.1,
			title: false, //不显示标题
			area: ['100%', '100%'], //宽高
			content: realPath + "view/cyfx/qyZxlist.html?AREA_NAME=" + area_name + "&INDUSTRY=" + PARENT_DL + "&ESTDATEMONTH=" +
				estdate + "&qytitle=" + qytitle + "&CLSJ=" + CLSJ + "&YEAR=" + year + "&TZLY=" + TZLY + "&AGE=" + AGE + "&ZCZJ=" + ZCZJ
		})
	}
}
//查看投资来源列表
function queryEntInvestment(type,tzly,title,area_name) {
	if (getCookie("area_value")==360100|| area_name == getCookie("area_name")){
		layer.open({
			type: 2,
			shade: 0.1,
			title: false, //不显示标题
			area: ['40%', '60%'], //宽高
			content: realPath + "view/cyfx/tzlyList.html?AREA_NAME=" + AREA_NAME + "&PARENT_DL=" + PARENT_DL + "&YEAR=" +
				YEAR + "&TYPE=" + type + "&TZLY=" + tzly + "&qytitle=" + title
		})
	}
}

//查看投资企业列表
function openEntList(qytitle,area_name) {
	if (getCookie("area_value")==360100||area_name == getCookie("area_name")) {
		title = qytitle.substring(0,qytitle.indexOf('年')+1)+'来自南昌市投资的注销企业';
		parent.layer.open({
			type: 2,
			shade: 0.1,
			title: false, //不显示标题
			area: ['100%', '100%'], //宽高
			content: realPath + "view/cyfx/zxqyTzlyList.html?AREA_NAME=" + AREA_NAME + "&PARENT_DL=" + PARENT_DL + "&YEAR=" +
				YEAR +"&TZLY=3&qytitle=" + title +"&TZLY_CODENAME=南昌市"
		})
	}
}