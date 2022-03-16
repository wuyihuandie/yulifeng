var ZCZJ='';
var NLJG='';
var TZLY='';
var TYPE='';
var CODE_NAME = ["1","2","3","4","5"]
$(function() {
	established()
	registered()
	age()
	source()
	taking('')
	getEntlist();
	// 硬件层
	$('#qyzs').click(function() {
		ZCZJ = '', NLJG = '',TZLY='',TYPE='';
		$("#tableTitle").text("");
		getEntlist();
	})
})

//企业类型
function established() {
	var params={TYPE:'ZYYWLX'};
	var names=['A','B','C'];
	var datas=[10,9,18];
	/*doData(BASE_URL+'/ztfxController/getEntTjfx',params,function (result) {
		if(result.status=10001){
			result.data.forEach(function(item,index){
				names.push(item.CODE_VALUE);
				datas.push({value: item.SUMS,name: item.CODE_VALUE})
			})
		}

	})*/
	option = {
		color: ['#ed8d69', '#b58eef', '#e3cc6e', '#54c0de', '#82ddd6'],
		tooltip: {
			trigger: 'item',
			formatter: function(parms) {
				var str = parms.marker + "" + parms.data.name + "</br>" +
					"企业数量：" + parms.data.value + "家</br>" +
					"占比：" + parms.percent + "%";
				return str;
			},
			textStyle: {
				fontSize: 16,
			},
		},
		legend: {
			data: names,
			orient: 'vertical',
			right: '15%',
			bottom: '13%',
			itemWidth: 10,
			itemHeight: 10,
			itemGap: 10,
			textStyle: {
				color: '#',
				fontSize: 10,
			},
		},
		series: [{
			name: 'TITLE',
			type: 'pie',
			clockwise: false,
			startAngle: 90,
			radius: '75%',
			center: ['44%', '50%'],
			hoverAnimation: false,
			roseType: 'radius', //area
			data: datas,
			label: {
				show: true,
				position: 'outside',
				formatter: '{a|{b}：{d}%}\n{hr|}',
				rich: {
					hr: {
						backgroundColor: 't',
						borderRadius: 100,
						width: 0,
						height: 10,
						padding: [3, 3, 0, -16],
						shadowColor: '#1c1b3a',
						shadowBlur: 1,
						shadowOffsetX: '0',
						shadowOffsetY: '2',
					},
					a: {
						padding: [-35, 15, -20, 5],
					}
				}
			},
			labelLine: {
				normal: {
					length: 10,
					length2: 10,
					lineStyle: {
						width: 1,
					}
				}
			},

		}],
	}

	var qyfbDom = echarts.init(document.getElementById("established"));
	qyfbDom.setOption(option, true);
	qyfbDom.off('click');
	qyfbDom.on('click', function (param) {
		ZCZJ = '', NLJG = '',TZLY='',TYPE=CODE_NAME[param.dataIndex];
		$("#tableTitle").text("（主营业务类型为"+param.name+"的企业）");
		getEntlist();
	});
}
// 注册资金
function registered() {
	var params={TYPE:'ZCZJ'};
	var names=[];
	var datas=[];
	doData(BASE_URL+'/ztfxController/getEntTjfx',params,function (result) {
		if(result.status=10001){
			result.data.forEach(function(item,index){
				names.push(item.CODE_VALUE);
				datas.push({value: item.SUMS,name: item.CODE_VALUE})
			})
			option = {
				legend: {
					data: names,
					orient: 'vertical',
					right: '0%',
					bottom: '13%',
					itemWidth: 10,
					itemHeight: 10,
					itemGap: 10,
					textStyle: {
						color: '#',
						fontSize: 10,
					},
				},
				color: ['#7eacea', '#e15777', '#95ea71', '#ea9b4f','#BBB416'],
				tooltip: {
					trigger: 'item',
					formatter: function(parms) {
						var str = parms.marker + "" + parms.data.name + "</br>" +
							"企业数量：" + parms.data.value + "家</br>" +
							"占比：" + parms.percent + "%";
						return str;
					}
				},
				series: [{
					name: '',
					type: 'pie',
					radius: '75%',
					center: ['40%', '50%'],
					/*roseType: 'radius',*/
					label: {
						show: true,
						formatter: '{c}家',
					},
					labelLine: {
						normal: {
							length: 5,
							length2: 30,
							lineStyle: {
								width: 1,
							}
						}
					},
					emphasis: {
						label: {
							show: true
						}
					},
					data: datas
				},
				]
			};

			var qyfbDom = echarts.init(document.getElementById("registered"));
			qyfbDom.setOption(option, true);
			qyfbDom.off('click');
			qyfbDom.on('click', function (param) {
				ZCZJ = CODE_NAME[param.dataIndex], NLJG = '',TZLY='',TYPE='';
				$("#tableTitle").text("（注册资金"+param.name+"的企业）");
				getEntlist();
			});
		}

	})

}
// 老板年龄
function age() {
	var params={TYPE:'NLJG'};
	var legendData=[];
	var seriesData=[];
	doData(BASE_URL+'/ztfxController/getEntTjfx',params,function (result) {
		if(result.status=10001){
			result.data.forEach(function(item,index){
				legendData.push(item.CODE_VALUE);
				seriesData.push({value: item.SUMS,name: item.CODE_VALUE})
			})
		}
		option = {

			tooltip: {
				trigger: 'item',
				borderColor: 'rgba(255,255,255,.3)',
				backgroundColor: 'rgba(13,5,30,.6)',
				borderWidth: 1,
				padding: 5,
				formatter: function(parms) {
					var str = parms.marker + "" + parms.data.name + "</br>" +
						"企业数量：" + parms.data.value + "家</br>" +
						"占比：" + parms.percent + "%";
					return str;
				}
			},
			legend: {
				data: legendData,
				orient: 'vertical',
				right: '0%',
				bottom: '13%',
				itemWidth: 10,
				itemHeight: 10,
				itemGap: 5,
				textStyle: {
					color: '#',
					fontSize: 10,
				},
			},
			series: [{
				type: 'pie',
				center: ['50%', '50%'],
				radius: ['40%', '75%'],
				clockwise: true,
				avoidLabelOverlap: true,
				hoverOffset: 15,
				itemStyle: {
					normal: {
						color: function(params) {
							return colorList[params.dataIndex]
						}
					}
				},
				/*label: {
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
				},*/
				label: {
					show: true,
					formatter: '{c}家',
				},
				/*labelLine: {
					normal: {
						show: false
					}
				},*/
				data: seriesData
			}]
		};
		var chart2 = document.getElementById('age');
		var myChart = echarts.init(chart2);
		myChart.setOption(option);
		myChart.off('click');
		myChart.on('click', function (param) {
			ZCZJ = '', NLJG = CODE_NAME[param.dataIndex],TZLY='',TYPE='';
			$("#tableTitle").text("（老板年龄"+param.name+"的企业）");
			getEntlist();
		});
	})

	var colorList = ['#BBB416', '#2EE6A8', '#3385FF', '#FFAA56'];


}
// 投资来源
function source() {
	var params={TYPE:'TZLY'};
	var legendData=[];
	var series_data=[];
	doData(BASE_URL+'/ztfxController/getEntTjfx',params,function (result) {
		if(result.status=10001){
			result.data.forEach(function(item,index){
				legendData.push(item.CODE_VALUE);
				series_data.push({value: item.SUMS,name: item.CODE_VALUE})
			})
			option = {
				legend: {
					data: legendData,
					orient: 'vertical',
					right: '10%',
					bottom: '13%',
					itemWidth: 10,
					itemHeight: 10,
					itemGap: 10,
					textStyle: {
						color: '#',
						fontSize: 10,
					},
				},
				tooltip: {
					trigger: 'item',
					formatter: function(parms) {
						var str = parms.marker + "" + parms.data.name + "</br>" +
							"企业数量：" + parms.data.value + "家</br>" +
							"占比：" + parms.percent + "%";
						return str;
					}
				},
				series: [{
					name: '',
					type: 'pie',
					radius: '68%',
					center: ['40%', '50%'],
					clockwise: false,
					data: series_data,
					label: {
						normal: {
							textStyle: {
								color: '#07c9fe',
								fontSize: 14,
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							color: function(params) {
								var colorList = colorList_data
								return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上

									offset: 0,
									color: colorList[params.dataIndex].c1
								}, {
									offset: 1,
									color: colorList[params.dataIndex].c2
								}])
								/*  return colorList[params.dataIndex]*/
							}

						},
						emphasis: {
							borderWidth: 0,
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}],
				color: color_data,
				//		backgroundColor: '#06076b'
			};
			var chart2 = document.getElementById('source');
			var myChart = echarts.init(chart2);
			myChart.setOption(option);
			myChart.off('click');
			myChart.on('click', function (param) {
				ZCZJ = '', NLJG = '',TZLY=CODE_NAME[param.dataIndex],TYPE='';
				$("#tableTitle").text("（投资来源"+param.name+"的企业）");
				getEntlist();
			});
		}

	})
	//历史监管
	var color_data = [
	    '#33cccc',
	    '#9966ff',
	    '#0066ff',
	    '#ff3366',
	    '#ff6666'
	];
	var colorList_data = [
		{
	        c1: '#33cccc', //管理
	        c2: '#66ff99'
	    },
	    {
	        c1: ' #9966ff', //实践
	        c2: '#ff66ff'
	    },
	    {
	        c1: '#0066ff', //操作
	        c2: '#33ccff'
	    },
	    {
	        c1: '#ff3366', //操作
	        c2: '#ff6699'
	    },
	    {
	        c1: '#ff6666', //操作
	        c2: '#ffcc66'
	    }
	]
	var colorList_data_2 = [
		{
	        c1: ' #9966ff', //实践
	        c2: '#ff66ff'
	    },
	    {
	        c1: '#ff3366', //操作
	        c2: '#ff6699'
	    },
	    {
	        c1: '#ff6666', //操作
	        c2: '#ffcc66'
	    }
	]


}
// 营业收入
function taking(REGNO) {
	var params={
		REGNO:REGNO
	};
	doData(BASE_URL+'/ztfxController/getEntJyxx',params,function (result) {
		if(result.status=10001){
			var names=[];
			var datas=[];
			result.data.forEach(function(item,index){
				names.push(item.ANCHEYEAR);
				datas.push(item.SUMS);
			})
			option = {
				tooltip: {
					trigger: 'axis',
					formatter: "{b} 年: {c} 万元 ",
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					top: '20%',
					bottom: '12%'
				},
				xAxis: [{
					type: 'category',
					data: names,
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.12)'
						}
					},
					axisLabel: {
						margin: 10,
						color: '#e2e9ff',
						textStyle: {
							fontSize: 14
						},
					},
				}],
				yAxis: [{
					name: '',
					axisLabel: {
						formatter: '{value}万元',
						color: '#e2e9ff',
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: 'rgba(255,255,255,1)'
						}
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.12)'
						}
					}
				}],
				series: [{
					type: 'bar',
					data: datas,
					barWidth: '20%',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(0,244,255,1)' // 0% 处的颜色
							}, {
								offset: 1,
								color: 'rgba(0,77,167,1)' // 100% 处的颜色
							}], false),
							barBorderRadius: [30, 30, 30, 30],
							shadowColor: 'rgba(0,160,221,1)',
							shadowBlur: 4,
						}
					},
					label: {
						normal: {
							show: true,
							lineHeight: 30,
							width: 80,
							height: 30,
							backgroundColor: 'rgba(0,160,221,0.1)',
							borderRadius: 200,
							position: ['-8', '-60'],
							distance: 1,
							formatter: [
								'    {d|●}',
								' {a|{c}}     \n',
								'    {b|}'
							].join(','),
							rich: {
								d: {
									color: '#1051dd',
								},
								a: {
									color: '#fff',
									align: 'center',
								},
								b: {
									width: 1,
									height: 30,
									borderWidth: 1,
									borderColor: '#234e6c',
									align: 'left'
								},
							}
						}
					}
				}]
			};
			var qyfbDom = echarts.init(document.getElementById("taking"));
			qyfbDom.setOption(option, true);
			qyfbDom.off('click');
		}

	})

}
//企业列表
function getEntlist(){
	var params={
		ZCZJ:ZCZJ,
		NLJG:NLJG,
		TZLY:TZLY,
		TYPE:TYPE
	};
	doData(BASE_URL+'/ztfxController/getEntlist',params,function (result) {
		if(result.status=10001){
			$("#qylb").empty();
			result.data.forEach(function(item,index){
				$("#qylb").append("<tr onclick='taking(\'"+item.REGNO+"\')'><td style='width: 33%;'>"+(index+1)+"</td><td>"+item.ENTNAME+"</td></tr>");
			})
			$("#qyzs").text(result.data.length);
		}
	})
}
