var industry=['NK01','NK02','NK03','NK04'];
var area_list=['360200', '360300','360400','360500','360600','360700','360800','360900','361000','361100'];
var timer,timer2;
var AREA_VALUE='360800';
var area_name='吉安市';
var INDUSTRY='NK01';
$(function(){
    $(".yeartitle").text(YEAR+'年');
    $(".middle-box li").click(function(){
        $(".middle-box li").removeClass("xz");
        $(this).addClass("xz");
        AREA_VALUE=area_list[$(this).index()];
        area_name=$(this).text();
        $(".compare_area").text(area_name);
        queryChart1();
        queryChart2();
        /*queryNanchangEntlist();*/
    })
    $(".industry-box li").click(function(){
        $(".industry-box li").removeClass("xz");
        $(this).addClass("xz");
        $(".chart_title").text($(this).text());
        INDUSTRY=industry[$(this).index()];
        queryChart1();
        queryChart2();
        /*queryNanchangEntlist();*/
    })
    queryChart1();
    queryChart2();
    /*queryNanchangEntlist();*/
    queryContrastAreaOverview();
})
function queryContrastAreaOverview(){
    var params ={
        YEAR: YEAR,
        AREA_VALUE : AREA_VALUE
    }
    doData(BASE_URL + '/industryDistributionController/queryContrastAreaOverview', params, function(result) {
        if (result.status == 10001) {
            result.data.forEach(function(item, index) {
                if(item.AREA_VALUE=='360100'){
                    $("#ENTNUMS1").text(item.ENTSUMS);
                    $("#VENDINC1").text(item.VENDINC);
                }else{
                    $("#ENTNUMS2").text(item.ENTSUMS);
                    $("#VENDINC2").text(item.VENDINC);
                }
            })
        }
    })
}
//左边图表
function queryChart1() {
    var params ={
        CONDITION: '2',
        INDUSTRY: INDUSTRY,
        AREA_VALUE : AREA_VALUE
    }
    var title="营收";
    var dw='亿';
    doData(BASE_URL + '/industryDistributionController/queryContrastAreaStatis', params, function(result) {
        var names = [];
        var datas1 = [];
        var datas2 = [];
        var zsdatas1 = [];
        var zsdatas2 = [];
        if (result.status == 10001) {
            //各省份的数据
            result.data.forEach(function(item, index) {
                if(item.YEAR!=nowdate){
                    if(item.AREA_VALUE=='360100'){
                        names.push(item.YEAR);
                        datas1.push(item.SUMS);
                        zsdatas1.push(item.ZS);
                    }else{
                        datas2.push(item.SUMS);
                        zsdatas2.push(item.ZS);
                    }
                }

            })

            var myChart = echarts.init(document.getElementById('industry1'));
            myChart.setOption({
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
                            if ((i%2) == 0) {
                                html +=
                                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                                    data[i].color + ';"></span>' +
                                    data[i].seriesName + "：" + data[i].value + dw +"<br/>";
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
                    data: ['南昌市'+title,'南昌市'+title+'增速',area_name+title,area_name+title+'增速']
                },

                grid: {
                    left: '5%',
                    right: '3%',
                    bottom: '5%',
                    top:'10%',
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
                    data: names
                }],
                yAxis: [
                    {
                        name:title,
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
                            formatter: '{value} 亿'
                        },
                        type: 'value'
                    },
                    {
                        name:'增速',
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
                    name: '南昌市'+title,
                    type: 'bar',
                    barWidth: '20%', //柱图宽度
                    itemStyle: {
                        normal: {
                            color: '#31F7FB'
                        }
                    },
                    label: {
                        show: true,
                        position: 'insideTop',
                        formatter: '{c} 亿元',
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    data: datas1
                },
                 {
                        name: '南昌市'+title+'增速',
                        type: "line",
                        yAxisIndex: 1,
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: '#0EE3EF',
                                barBorderRadius: 0
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
                                        color: '#0099FC' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#0EE3EF' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                     label: {
                         show: true,
                         position: 'top',
                         formatter: '{c} %',
                         textStyle: {
                             color: '#ffffff'
                         }
                     },
                        data: zsdatas1
                    },
                    {
                        name: area_name+title,
                        type: 'bar',
                        barWidth: '20%', //柱图宽度
                        itemStyle: {
                            normal: {
                                color: '#3279F8'
                            }
                        },
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: '{c} 亿元',
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        data: datas2
                    },
                    {
                        name: area_name+title+'增速',
                        type: "line",
                        yAxisIndex: 1,
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: 'rgba(255, 196, 53, 1)',
                                barBorderRadius: 0
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
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c} %',
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        data: zsdatas2
                    }
                ]
            });
            myChart.off("click");
            myChart.on("click",function(param){
                YEAR=param.name;
                $(".yeartitle").text(YEAR+'年');
                queryContrastAreaOverview();
                /*queryNanchangEntlist();*/
            })

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
                if (!canPlayAction) {
                    return;
                }
                var index = seed % datas1.length;
                datas1.map(function(item, i) {
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
//企业数量图表
function queryChart2() {
    var params ={
        CONDITION: '1',
        INDUSTRY: INDUSTRY,
        AREA_VALUE : AREA_VALUE
    }
    var  title="企业数";
    var dw='家';
    doData(BASE_URL + '/industryDistributionController/queryContrastAreaStatis', params, function(result) {
        var names = [];
        var datas1 = [];
        var datas2 = [];
        var zsdatas1 = [];
        var zsdatas2 = [];
        if (result.status == 10001) {
            //各省份的数据
            result.data.forEach(function(item, index) {
                if(item.YEAR!=nowdate){
                    if(item.AREA_VALUE=='360100'){
                        names.push(item.YEAR);
                        datas1.push(item.SUMS);
                        zsdatas1.push(item.ZS);
                    }else{
                        datas2.push(item.SUMS);
                        zsdatas2.push(item.ZS);
                    }
                }

            })

            var myChart = echarts.init(document.getElementById('industry2'));
            myChart.setOption({
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
                            if ((i%2) == 0) {
                                html +=
                                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                                    data[i].color + ';"></span>' +
                                    data[i].seriesName + "：" + data[i].value + dw +"<br/>";
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
                    data: ['南昌市'+title,'南昌市'+title+'增速',area_name+title,area_name+title+'增速']
                },

                grid: {
                    left: '5%',
                    right: '3%',
                    bottom: '5%',
                    top:'10%',
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
                    data: names
                }],
                yAxis: [
                    {
                        name:title,
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
                            formatter: '{value} ' + dw
                        },
                        type: 'value'
                    },
                    {
                        name:'增速',
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
                    name: '南昌市'+title,
                    type: 'bar',
                    barWidth: '20%', //柱图宽度
                    itemStyle: {
                        normal: {
                            color: '#31F7FB'
                        }
                    },
                    label: {
                        show: true,
                        position: 'insideTop',
                        formatter: '{c} 家',
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    data: datas1
                },
                    {
                        name: '南昌市'+title+'增速',
                        type: "line",
                        yAxisIndex: 1,
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: '#0EE3EF',
                                barBorderRadius: 0
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
                                        color: '#0099FC' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#0EE3EF' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c} %',
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        data: zsdatas1
                    },
                    {
                        name: area_name+title,
                        type: 'bar',
                        barWidth: '20%', //柱图宽度
                        itemStyle: {
                            normal: {
                                color: '#3279F8'
                            }
                        },
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: '{c} 家',
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        data: datas2
                    },
                    {
                        name: area_name+title+'增速',
                        type: "line",
                        yAxisIndex: 1,
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: 'rgba(255, 196, 53, 1)',
                                barBorderRadius: 0
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
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c} %',
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        data: zsdatas2
                    }
                ]
            });
            myChart.off("click");
            myChart.on("click",function(param){
                YEAR=param.name;
                $(".yeartitle").text(YEAR+'年');
                queryContrastAreaOverview();
                /*queryNanchangEntlist();*/
            })
            var canPlayAction = true;
            myChart.on("mouseover", function() {
                canPlayAction = false;
            })
            myChart.on("mouseout", function() {
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
//右边企业列表
function queryNanchangEntlist() {
    var params ={
        YEAR: YEAR,
        CONDITION: '2',
        INDUSTRY: INDUSTRY
    }
    doData(BASE_URL + '/industryDistributionController/getChainEnterprise', params, function(result) {
        if(result.status == 10001) {
            $("#qytable1").empty();
            result.data.forEach(function(item, index){
                var DATAVALUE = item.DATAVALUE;
                if (DATAVALUE == undefined || DATAVALUE == 'undefined') {
                    DATAVALUE = '-';
                }
                var indNum = item.Serial;
                $("#qytable1").append('<tr><td style="width: 10%;">'+ indNum +'</td><td style="width: 55%;">'+ item.ENTNAME +'</td><td style="width: 35%;">'+ DATAVALUE +'</td></tr>');
            })

        }
    })
}