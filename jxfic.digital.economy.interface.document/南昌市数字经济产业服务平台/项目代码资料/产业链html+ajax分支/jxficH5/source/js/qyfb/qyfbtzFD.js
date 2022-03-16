var PARENT_DL = getUrlValue("PARENT_DL");
$(document).ready(function() {
    var mainChart;
    var fdEcharts= document.getElementById('fd-echarts');

    let axisLabel = {
        textStyle: {
            color: "#DBDBDB",
        },
    };
    let axisLine = {
        show: true,
        lineStyle: {
            color: "#24687F",
        },
    };
    var datas = {};
    datas.PARENT_DL = PARENT_DL;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/entDistributionController/getWlwqyfb',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            var jsonText = JSON.parse(text);
            let wlwqyfb = jsonText.data.wlwqyfb;
            let data = [];
            let countArray = [];
            let regcapArray = [];
            if (typeof (wlwqyfb) != "undefined" && wlwqyfb.length > 0) {
                for (let i = 0; i < wlwqyfb.length; i++) {
                    let array = [];
                    let COUNT = wlwqyfb[i].COUNT;
                    let AREA_NAME = wlwqyfb[i].AREA_NAME;
                    let REGCAP = wlwqyfb[i].REGCAP;
                    let REGORG = wlwqyfb[i].REGORG;
                    countArray.push(COUNT);
                    regcapArray.push(REGCAP);
                    array.push(COUNT, REGCAP, AREA_NAME,REGORG)
                    data.push(array);
                }
            }
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
            var resizeMainContainer = function () {
                fdEcharts.style.width = window.innerWidth+'px';
                fdEcharts.style.height = window.innerHeight+'px';
            };
            //设置div容器高宽
            resizeMainContainer();
            // 初始化图表
            mainChart = echarts.init(fdEcharts);
            $(window).on('resize',function(){//
                //屏幕大小自适应，重置容器高宽
                resizeMainContainer();
                mainChart.resize();
            });
            var option = {
                // 调整散点图的大小
                grid: {
                    left: "5%",
                    top: 150, // 设置条形图的边距
                    right: "10%",
                    contain: true,
                },
                tooltip: {
                    formatter: function (param) {
                        return param.data[2] + "<br/>企业数量：" + param.data[0] + "户<br/>注册资本：" + param.data[1] + "亿元";
                    },
                },
                label: {
                    show: true,
                    formatter: function (param) {
                        return param.data[2];
                    },
                },
                color: "transparent",
                xAxis: {
                    name: "企业数量（户）",
                    nameTextStyle: {
                        color: "#DBDBDB",
                        bottom: 0,
                        align: "center",
                        padding: [10, 0, 0, 0],
						fontSize:20,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine:{
                    	lineStyle:{
                    		color:'#ffffff',
                    		fontSize:20,
                    	}
                    },
                    axisLabel:{
                    	show:true,
                    	textStyle:{
                    		color:'#ffffff',
                    		fontSize:20,
                    	}
                    },
                    // max: Math.max.apply(null, countArray),
                    // min: Math.min.apply(null, countArray),
                },
                yAxis: {
                    splitLine: {
                        show: false,
                    },
                    name: "注册资本（亿元）",
                    nameTextStyle: {
                        color: "#DBDBDB",
                        bottom: 0,
                        align: "center",
                        padding: [10, 0, 0, 30],
						fontSize:20,
                    },
                    axisLine:{
						lineStyle:{
							color:'#ffffff',
							fontSize:20,
						}
					},
                    axisLabel:{
						show:true,
						textStyle:{
							color:'#ffffff',
							fontSize:20,
						}
					},
                },
                series: [
                    {
                        // 设置点的大小随数值变化
                        symbolSize: function (dataItem) {	
                            return dataItem[0] / 12;
                        },
                        data: data,
						label:{
							
							normal:{
								position:'top',
								textStyle:{
									fontSize:15
								}
							},
						},
                        type: "scatter",
						// emphasis:{
						// 	label:{
						// 		show:true,
						// 		position:'top',
						// 	},
						// },
                        itemStyle: {
                            color: function (params) {
                                var colors = [
                                    "#F37171",
                                    "#F6BA52",
                                    "#66DB9F",
                                    "#55a7cf",
                                    "#3090eb",
                                    "#2f76e8",
                                    "#ffffff",
                                    "#50b17e",
                                    "#96ecc0",
                                    "#dfde7d",
                                    "#ffc96b",
                                    "#ec8850",
                                    "#ea9e73",
                                    "#f4bb2c",
                                ];
                                var num = colors.length;
                                return colors[params.dataIndex % num];
                            },
                        },
                    },
                ]
            };
            mainChart.on('click', function (params) {
                console.log(params);
                let areaName = params.data[2];
                let area = params.data[3];
                layer.open({
                    type:2,
                    shade: 0.5,
                    title: false, //不显示标题
                    area: ['90%', '90%'], //宽高
                    content: ["qylb.html?PARENT_DL="+PARENT_DL+"&area="+area+"&areaName="+areaName+"&TYPE=0","no"],
                    cancel: function(){
                    }
                });
            });
            mainChart.setOption(option);
        }
    });
});