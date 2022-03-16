var myDate = new Date();
var YEAR = myDate.getFullYear();
var ARITHMETIC = "1";
$(function () {
    cytzyc(ARITHMETIC);
    scztfzyc(ARITHMETIC);
    cyzjzyc(ARITHMETIC);
    yxmb();

})

//点击
function arithmetic(data) {
    cytzyc(data);
    scztfzyc(data);
    cyzjzyc(data);
}
//产业投资预测
function cytzyc(ARITHMETIC) {
    var cytzyc = echarts.init(document.getElementById('cytzyc'));
    var datas = {};
	
    datas.ARITHMETIC = ARITHMETIC;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/cycController/getCytzyc',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            let jsonObj = JSON.parse(text);
            let data = jsonObj.data;
            let yearList = data.yearList;
			console.log(yearList)
            let valueList = data.valueList;
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#4A99FF'
                        }
                    },
                    formatter: function (data) {
                        let html = "";
                        if(data[0].name == YEAR+1+"" || data[0].name == YEAR+2+""){
                            html = data[0].name+"年（预测）<br/>";
                        }else{
                            html = data[0].name+"年<br/>";
                        }
                         html += data[0].marker+"产业投资预测："+data[0].value+"亿元";
                        return html;
                    }
                },
                grid: {
                    top: '15%',
                    left: '10%',
                    right: '1%',
                    bottom: '8%',
                },
                xAxis: [{
                    type: 'category',
                    axisLine: {
                        show: false,
                        color:'#ffffff'
                    },
                    axisLabel: {
                        color: '#ffffff',
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: true,
					
					data:[yearList[0],yearList[1],yearList[2],yearList[3]+'(预测)',yearList[4]+'(预测)'],
      //               data:function (yearList) {
      //                   let html1 = "";
						// console.log(yearList)
      //                   if(yearList==yearList[3] ||yearList==yearList[4]){
      //                       html1 = yearList+"（预测）";
      //                   }else{
      //                       html1 = yearList;
      //                   }
                         
      //                   return html1;
      //               }
                }],
                yAxis: {
                    type: 'value',
                    min: 0,
                    // max: 140,
                    splitNumber: 4,
                    name: '亿元',
                    nameTextStyle:{
                        color:"#ffffff",
                        padding : [5, 80, 0, 20],
                        fontFamily : "#Arial",
                        fontSize : 12
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(49, 247, 251,0.3)'
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        margin: 20,
                        textStyle: {
                            color: '#ffffff',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                },
                series: [
                    {
                        type: 'line',
                        smooth: false, //是否平滑
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "#04ABBC",
                            },
                        },
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#04ABBC',
                            }
                        },
                        itemStyle: {
                            color: "#fff",
                            borderColor: "#04ABBC",
                            borderWidth: 2,
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(4,171,188,0.5)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(4,171,188,0.1)'
                                    }
                                ], false),
                            }
                        },
                        data:  valueList
                    }
                ]
            }
            cytzyc.setOption(option);
        }
    });
    window.onresize = cytzyc.resize;
}

//市场主体发展预测
function scztfzyc(ARITHMETIC) {
    var scztfzyc = echarts.init(document.getElementById('scztfzyc'));
    var datas = {};
    datas.ARITHMETIC = ARITHMETIC;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/cycController/getScztfzyc',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            let jsonObj = JSON.parse(text);
            let data = jsonObj.data;
            let dataNames = data.dataNames;
            let yearLists = data.yearLists;
            let fristEnttotalsum = data.fristEnttotalsum;
            let fristEnttotalxz = data.fristEnttotalxz;
            let secondEnttotalsum = data.secondEnttotalsum;
            let secondEnttotalxz = data.secondEnttotalxz;
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#4A99FF'
                        }
                    },
                    formatter: function (data) {
                        let html = "";
                        if(data[0].name == YEAR+1+"" || data[0].name == YEAR+2+""){
                            html = data[0].name+"年（预测）<br/>";
                        }else{
                            html = data[0].name+"年<br/>";
                        }
                        for (let i = 0; i < data.length; i++) {
                            html+=
                                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+data[i].color.colorStops[0].color+';"></span>'
                                +data[i].seriesName+"数字经济企业新增(户)："+data[i].value+"<br/>";
                        }
                        return html;
                    }
                },
                grid: {
                    top: '15%',
                    left: '10%',
                    right: '1%',
                    bottom: '20%',
                },
                legend:{
                    show:true,
                    data:dataNames,
                    bottom: "3%",
                    left: "20%",
                    right: "20%",
                    itemGap: 10,
                    icon: 'rectangle',
                    itemWidth: 20,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    textStyle: {
                        fontSize: 12,
                        color: "#fff",
                        align: "left",
                    }
                },
                xAxis: [{
                    type: 'category',
                    axisLine: {
                        show: false,
                        color:'#ffffff'
                    },
                    axisLabel: {
                        color: '#ffffff',
                    },
                    splitLine: {
                        show: false
                    },
                    /*splitArea: {
                        show: true,
                        areaStyle: {
                            color: ["rgba(250,250,250,0)","rgba(250,250,250,0)","rgba(250,250,250,0)","rgba(250,250,250,0.2)","rgba(250,250,250,0.2)"],
                        }
                    },*/
                    boundaryGap: true,
                    data:[yearLists[0],yearLists[1],yearLists[2],yearLists[3]+'(预测)',yearLists[4]+'(预测)'],
					// data: yearLists
                }],
                yAxis: {
                    type: 'value',
                    splitNumber: 4,
                    name: '户',
                    nameTextStyle:{
                        color:"#ffffff",
                        padding : [5, 80, 0, 20],
                        fontFamily : "#Arial",
                        fontSize : 12
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(49, 247, 251,0.3)'
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        margin: 20,
                        textStyle: {
                            color: '#ffffff',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                },
                series: [{
                    name:'大数据与云计算产业',
                    type: 'bar',
                    barWidth: "12",
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: "rgba(255, 167, 24,0.6)" // 0% 处的颜色
                            }, {
                                offset: 0.6,
                                color: "rgba(255, 167, 24,0.8)" // 60% 处的颜色
                            }, {
                                offset: 1,
                                color: "rgba(255, 167, 24,1)" // 100% 处的颜色
                            }], false)
                        }
                    },
                    data:  fristEnttotalxz
                },
                    {
                        name:'物联网产业',
                        type: 'bar',
                        barWidth: "12",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "rgba(78, 241, 253,0.6)" // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: "rgba(78, 241, 253,0.8)" // 60% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "rgba(78, 241, 253,1)" // 100% 处的颜色
                                }], false)
                            }
                        },
                        data: secondEnttotalxz
                    },
                    /*{
                        name:'物联网',
                        type: 'bar',
                        barWidth: "12",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "rgba(96, 148, 246,0.6)" // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: "rgba(96, 148, 246,0.8)" // 60% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "rgba(96, 148, 246,1)" // 100% 处的颜色
                                }], false)
                            }
                        },
                        data: [1,3,5,7,9]
                    }*/
                ]
            }
            scztfzyc.setOption(option);
        }
    });
    window.onresize = scztfzyc.resize;
}

//产业增加值预测
function cyzjzyc(ARITHMETIC) {
    var cyzjzyc = echarts.init(document.getElementById('cyzjzyc'));
    var datas = {};
    datas.ARITHMETIC = ARITHMETIC;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/cycController/getCyzjzyc',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            let jsonObj = JSON.parse(text);
            let data = jsonObj.data;
            let dataNames = data.dataNames;
            let fristSzjjcyzjz = data.fristSzjjcyzjz;
            let fristSzjjzzl = data.fristSzjjzzl;
            let yearLists = data.yearLists;
            let secondSzjjcyzjz = data.secondSzjjcyzjz;
            let secondSzjjzzl = data.secondSzjjzzl;
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#4A99FF'
                        }
                    },
                    formatter: function (data) {
                        let html = "";
                        if(data[0].name == YEAR+1+"" || data[0].name == YEAR+2+""){
                            html = data[0].name+"年（预测）<br/>";
                        }else{
                            html = data[0].name+"年<br/>";
                        }
                        for (let i = 0; i < data.length; i++) {
                            if(data[i].seriesType == "bar"){
                                html+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+data[i].color.colorStops[0].color+';"></span>'
                                    +data[i].seriesName+"增加值："+data[i].value+"亿元<br/>";
                            }else{
                                html+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+data[i].color+';"></span>'
                                    +data[i].seriesName+"增长率："+data[i].value+"<br/>";
                            }
                        }
                        return html;
                    }
                },
                legend: {
                    bottom: "1%",
                    data:dataNames,
                    itemGap: 10,
                    icon: 'rectangle',
                    itemWidth: 20,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    textStyle: {
                        fontSize: 12,
                        color: "#fff",
                        align: "center",
                    }
                },
                grid: {
                    top:'15%',
                    left: '3%',
                    right: '1%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        // data:yearLists,
						data:[yearLists[0],yearLists[1],yearLists[2],yearLists[3]+'(预测)',yearLists[4]+'(预测)'],
                        axisLine: {lineStyle: {color: '#334a65',}},//x轴线的样式
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: 'rgba(49, 247, 251,0.3)',
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        min: 0,
                        type: 'value',
                        scale: true,
                        /*name: '万元',
                        nameTextStyle:{
                            color:"#fff",
                        },*/
                        boundaryGap: [0.2, 0.2],
                        axisLine: {lineStyle: {color: '#334a65',}},
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#334a65',
                            }
                        },
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: '',
                        max: 100,
                        min: 0,
                        boundaryGap: [0.2, 0.2],
                        axisLabel: {
                            formatter:"{value}%",
                            textStyle: {
                                color: '#fff'
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#334a65',
                            }
                        },
                        axisLine: {lineStyle: {color: '#334a65',}},
                    }
                ],
                series : [
                    {
                        name: '大数据与云计算产业',
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "rgba(143, 131, 256,0.6)" // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: "rgba(143, 131, 256,0.8)" // 60% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "rgba(143, 131, 256,1)" // 100% 处的颜色
                                }], false)
                            }
                        },
                        data: fristSzjjcyzjz
                    },
                    {
                        name: '大数据与云计算产业增长率',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,
                        itemStyle: {
                            color: "rgba(143, 131, 256,0.6)" // 0% 处的颜色
                        },
                        data: fristSzjjzzl
                    },
                    {
                        name: '物联网产业',
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "rgba(34, 234, 168,0.6)" // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: "rgba(34, 234, 168,0.8)" // 60% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "rgba(34, 234, 168,1)" // 100% 处的颜色
                                }], false)
                            }
                        },
                        data: secondSzjjcyzjz
                    },
                    {
                        name: '物联网产业增长率',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: true,
                        itemStyle: {
                            color: "rgba(34, 234, 168,0.6)" // 0% 处的颜色
                        },
                        data: secondSzjjzzl
                    }
                ]
            };
            cyzjzyc.setOption(option);
        }
    });
    window.onresize = cyzjzyc.resize;
}

//预期目标
function yxmb() {
    var datas = {};
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/cycController/getYqmb',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            let jsonObj = JSON.parse(text);
            let data = jsonObj.data;
            let yearList = data.yearList;
            console.log(data)
            /***********预期目标头部thead***********/
            let theadHtml = '<th width="10%"></th>' +
                '<th width="38%" style="text-indent: 5%;">指标（单位）</th>';
            for (let i = 0; i < yearList.length; i++) {
                theadHtml+='<th width="13%">'+yearList[i]+'年</th>';
            }
            theadHtml+='<th width="13%">平均增速</th>';
            $(".all-body-middle-bottom-content-table>thead>tr").html(theadHtml);

            /***********预期目标body***********/
            let msg = data.msg;
            let tbodyTrHtml = '';
            for (let i = 0; i < msg.length; i++) {
                let ITEM_ID = msg[i].ITEM_ID;
                let ITEM_NAMES = msg[i].ITEM_NAME;

                let secondZbHtml = '';
                let secondZb = msg[i].secondZb;
                for (let j = 0; j < secondZb.length; j++) {
                    let ITEM_NAME = secondZb[j].ITEM_NAME;
                    let ITEM_UNIT = secondZb[j].ITEM_UNIT;
                    let ZS = secondZb[j].ZS == '--'?secondZb[j].ZS:secondZb[j].ZS+"%";

                    let secondDataHtml = '';
                    let secondData = secondZb[j].secondData;
                    for (let k = 0; k < secondData.length; k++) {
                        let ITEM_VALUE = secondData[k].ITEM_VALUE;
                        let YEAR = secondData[k].YEAR;
                        secondDataHtml+='<td width="13%"><p>'+ITEM_VALUE+'</p></td>';
                    }
                    secondZbHtml += '<tr>' +
                        '<td width="38%"><p>'+ITEM_NAME+'（'+ITEM_UNIT+'）</p></td>' +
                        secondDataHtml +
                        '<td width="13%"><p>'+ZS+'</p></td>' +
                        '</tr>';
                }

                tbodyTrHtml +='<tr class="all-body-middle-bottom-content-table-border">' +
                    '<td>' +
                    '<div class="all-body-middle-bottom-content-table-img'+i+'">' +
                    '<span class="all-body-middle-bottom-content-table-span">'+ITEM_NAMES+'</span>' +
                    '</div>' +
                    '</td>' +
                    '<td colspan="5">' +
                    '<table class="all-body-middle-bottom-content-table2">' +
                    '<tbody>' +
                    secondZbHtml+
                    '</tbody>' +
                    '</table>' +
                    '</td>' +
                    '</tr>';
            }
            $(".all-body-middle-bottom-content-table>tbody").html(tbodyTrHtml);
        }
    });
}