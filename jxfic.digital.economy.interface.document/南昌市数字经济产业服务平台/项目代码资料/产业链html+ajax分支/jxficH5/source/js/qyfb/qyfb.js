var myDate = new Date();
var YEAR = myDate.getFullYear()+"";
var AREA = "156";
var CHAIN_ID = "";
var PARENT_DL = "";
var areaName = "";
$(function () {
    etTopIndustrialChains();

    //监听下拉框选择
    $(document).on("change","#infoType",function(){
        let ids = $(this).val().split(",");
        CHAIN_ID = ids[0];
        PARENT_DL = ids[1];
        hyfb(PARENT_DL);
        hyys(CHAIN_ID);
        mapData(PARENT_DL);
        qyfbtz(PARENT_DL);
        getEntList(PARENT_DL)
    });

    $(document).on("click",".all-body-middle-bottom-fd",function(){
        layer.open({
            type:2,
            shade: 0.1,
            title: false, //不显示标题
            area: ['99%', '100%'], //宽高
            content: ["qyfbtzFD.html?PARENT_DL="+PARENT_DL,"no"],
            cancel: function(){
            }
        });
		
    });
})

//获取右上下拉框数据
function etTopIndustrialChains() {
    var datas = {};
    datas.YEAR=YEAR;
    datas.AREA=AREA;
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industrialChainController/getTopIndustrialChains',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            var jsonText = JSON.parse(text);
            var topIndustrialChains = jsonText.data.topIndustrialChains;
            let html = "";
            for (let i = 0; i < topIndustrialChains.length; i++) {
                var  CHAIN_NAME = topIndustrialChains[i].CHAIN_NAME;
                if(i == 0){
                    html += '<option title="'+topIndustrialChains[i].CHAIN_NAME+'" value="'+topIndustrialChains[i].CHAIN_ID+','+topIndustrialChains[i].PARENT_DL+'" selected>'+CHAIN_NAME+'</option>';
                }else{
                    html += '<option title="'+topIndustrialChains[i].CHAIN_NAME+'" value="'+topIndustrialChains[i].CHAIN_ID+','+topIndustrialChains[i].PARENT_DL+'" >'+CHAIN_NAME+'</option>';
                }
            }
            $("#infoType").html(html);
            CHAIN_ID = topIndustrialChains[0].CHAIN_ID;
            PARENT_DL = topIndustrialChains[0].PARENT_DL;
            hyfb(PARENT_DL);
            hyys(CHAIN_ID);
            mapData(PARENT_DL);
            qyfbtz(PARENT_DL);
            getEntList(PARENT_DL)
        }
    })
}

//行业分布
function hyfb(PARENT_DL) {
    var hyfb = echarts.init(document.getElementById('hyfb'));

    let colorLine = ["#54C0DE", "#B58EEF", "#ED8D69", "#82DDD6", "#E3CC6E"];
    var datas = {};
    datas.PARENT_DL= PARENT_DL;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/entDistributionController/getHyfb',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            var jsonText = JSON.parse(text);
            let dataNames = jsonText.data.dataNames;
            let dataValues = jsonText.data.dataValues;
            var option = {
                // 多列布局
                legend: {
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
                tooltip: {
                    trigger: "item",
                    formatter: function () {
                        return "";
                    },
                },
                // 渐变色
                color: colorLine,
                series: [
                    {
                        name: "行业分布",
                        type: "pie",
                        // 如果radius是百分比则必须加引号
                        radius: ["25%", "60%"],
                        center: ["50%", "45%"],
                        roseType: "radius",
                        data: dataValues,
                        // 修饰饼形图文字相关的样式 label对象
                        label: {
                            show: true,
                            position: "outside",
                            formatter: "{b|{b}}\n{a|{d}%}\n{hr|}",
                            rich: {
                                hr: {
                                    backgroundColor: "t",
                                    width: 3,
                                    height: 3,
                                    borderRadius: 3,
                                    padding: [3, 3, 0, -12],
                                },
                                a: {
                                    align: "center",
                                    padding: [-20, 10, 0, 10],
                                    height: 20,
                                },
                                b: {
                                    padding: [-20, 10, -30, 10],
                                },
                            },
                        },
                        labelLine: {
                            length: 1,
                            length2: 15,
                            smooth: true,
                            type: "dotted",
                        },
                    },
                ]
            };
            hyfb.setOption(option);
        }
    });
    window.onresize = hyfb.resize;
}

//行业营收
function hyys(CHAIN_ID) {
    var hyys = echarts.init(document.getElementById('hyys'));
    var datas = {};
    datas.CHAIN_ID= CHAIN_ID;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/entDistributionController/getHyys',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            var jsonText = JSON.parse(text);
            let dataCount = jsonText.data.dataCount;
            let dataHyys = jsonText.data.dataHyys;
            let dataNames = jsonText.data.dataNames;
            var option = {
                xAxis: {
                    max: Math.max.apply(null, dataHyys),
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                grid: {
                    left: "20%",
                    top: 20, // 设置条形图的边距
                    right: 70,
                    contain: true,
                },
                yAxis: [
                    {
                        type: "category",
                        inverse: false,
                        data: dataNames,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                    },
                    {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            inside: false,
                            textStyle: {
                                color: '#b3ccf8',
                                fontSize: '14',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            formatter: function (val) {
                                return `${val}亿元`
                            }
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: dataHyys
                    }
                ],
                series: [
                    {
                        barGap: 20,
                        type: "bar",
                        barWidth: 18,
                        legendHoverLink: false,
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "rgb(21,206,210)", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "rgb(115,222,180)", // 100% 处的颜色
                                        },
                                    ],
                                },
                            },
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "left",
                                formatter: "{b}",
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 14,
                                },
                            },
                        },
                        data: dataHyys,
                        z: 1,
                        animationEasing: "elasticOut",
                    },
                    {
                        type: "pictorialBar",
                        itemStyle: {
                            normal: {
                                color: "#0E2E5D",
                            },
                        },
                        symbolRepeat: "fixed",
                        symbolMargin: 5,
                        symbol: "rect",
                        symbolClip: true,
                        symbolSize: [4, 21],
                        symbolPosition: "start",
                        symbolOffset: [1, -1],
                        symbolBoundingData: Math.max.apply(null, dataHyys),
                        data: dataHyys,
                        animationEasing: "elasticOut",
                    }
                ]
            };
            hyys.setOption(option);
        }
    });
    window.onresize = hyys.resize;
}

//物联网企业分布特征
function qyfbtz(PARENT_DL) {
    var qyfbtz = echarts.init(document.getElementById('qyfbtz'));
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
            if(typeof (wlwqyfb) != "undefined" && wlwqyfb.length>0){
                for (let i = 0; i < wlwqyfb.length; i++) {
                    let array =[];
                    let COUNT = wlwqyfb[i].COUNT;
                    let AREA_NAME = wlwqyfb[i].AREA_NAME;
                    let REGCAP = wlwqyfb[i].REGCAP;
                    let REGORG = wlwqyfb[i].REGORG;
                    countArray.push(COUNT);
                    regcapArray.push(REGCAP);
                    array.push(COUNT,REGCAP,AREA_NAME,REGORG)
                    data.push(array);
                }
            }
            var option = {
                // 调整散点图的大小
                grid: {
                    left: "15%",
                    top: 40, // 设置条形图的边距
                    right: 100,
                    contain: true,
                },
                tooltip: {
                    formatter: function (param) {
                        return param.data[2]+"<br/>企业数量："+param.data[0]+"户<br/>注册资本："+param.data[1]+"亿元";
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
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine,
                    axisLabel,
                    max: Math.max.apply(null, countArray),
                    min: Math.min.apply(null, countArray),
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
                    },
                    axisLine,
                    axisLabel,
                },
                series: [
                    {
                        // 设置点的大小随数值变化
                        symbolSize: function (dataItem) {
                            return dataItem[0]/30;
                        },
                        data: data,
                        type: "scatter",
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
            qyfbtz.on('click', function(params) {
                console.log(params)
                areaName = params.data[2];
                let area = params.data[3];
                qylb(areaName,area,"0");
            });
            qyfbtz.setOption(option);
        }
    });
    window.onresize = qyfbtz.resize;
}


//中间南昌市地图
function mapData(PARENT_DL) {
    var datas = {};
    datas.PARENT_DL= PARENT_DL;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/entDistributionController/getEnterpriseSite',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            var jsonText = JSON.parse(text);
            let entMsg =jsonText.data.entMsg;
            let mapD = [];
            let xyData = [];
            if(typeof (entMsg) != "undefined" && entMsg.length>0){
                for (let i = 0; i < entMsg.length; i++) {
                    let MAPY = entMsg[i].MAPY;
                    let MAPX = entMsg[i].MAPX;
                    let ENTNAME = entMsg[i].ENTNAME;
                    let REGNO = entMsg[i].REGNO;
                    let PRIPID = entMsg[i].PRIPID;
                    mapD.push({
                        name:ENTNAME,
                        value:20,
                        REGNO:REGNO,
                        PRIPID:PRIPID
                    })
                    xyData.push({
                        name:ENTNAME,
                        value:[MAPX,MAPY]
                    })
                }
            }
            var convertData = function (datas) {
                var res = [];
                for (let i = 0; i < datas.length; i++) {
                    for (let j = 0; j < xyData.length; j++) {
                        if(datas[i].name == xyData[j].name){
                            let geoCoord = xyData[j].value;
                            if (geoCoord) {
                                res.push(geoCoord.concat(datas[i].value,datas[i].REGNO,datas[i].PRIPID,datas[i].name));
                            }
                        }
                    }
                }
                return res;
            };
            var mapCode = "../../source/json/360100.json";
            var name = "nanchang";
            var mapData = echarts.init(document.getElementById('mapData'));
            $.get(mapCode, function(data) {
                if (data)
                    echarts.registerMap(name, data);
                var option = {
                    tooltip: {
                        show: true,
                        formatter: function(params) {
                            if (params.data) return params.data[5]
                        },
                    },
                    geo: {
                        map: name,
                        zoom: 1.1,
                        aspectScale: 1.1,
                        roam: true,
                        show: true,
                        label: {
                            normal: {
                                show: true,
                                color: '#ffffff'
                            },
                            emphasis: {
                                show: true,
                                color: '#ffffff',

                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#3a7fd5',
                                borderColor: '#0a53e9',//线
                                shadowColor: '#092f8f',//外发光
                                shadowBlur: 20
                            },
                            emphasis: {
                                areaColor: '#092f8f',//悬浮区背景
                            }
                        }
                    },
                    series: [
                        {
                            type: 'scatter',
                            coordinateSystem: "geo",
                            data: convertData(mapD),
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#D8BC37'
                                }
                            }
                        }
                    ]
                };
                mapData.on('click', function(params) {
                    let REGNO = params.data[3];
                    let PRIPID = params.data[4];
                    let ENTNAME = params.data[5];
                    tzQyhx(PRIPID,REGNO,ENTNAME);
                });
                mapData.setOption(option);
            });
        }
    });
}


function getEntList(PARENT_DL) {
    var datas = {};
    datas.PARENT_DL = PARENT_DL;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/entDistributionController/getEntList',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            var jsonText = JSON.parse(text);
            console.log(jsonText)
            let entlist = jsonText.data.entlist;
            let SUMCOUNT = typeof (jsonText.data.SUMCOUNT) == "undefined"?"0":jsonText.data.SUMCOUNT;
            let sbzsHtml = "";
            let html = "";
            SUMCOUNT  = ""+SUMCOUNT;
            for (let i = 0; i < SUMCOUNT.length; i++) {
                sbzsHtml += '<span class="sbzs">'+SUMCOUNT[i]+'</span>';
            }
            $("#sbzsHtml").html(sbzsHtml);
            if(typeof (entlist) != "undefined" && entlist.length>0){
                for (let i = 0; i < entlist.length; i++) {
                    let ZS = entlist[i].ZS;
                    let COUNT = entlist[i].COUNT;
                    let REGORG = entlist[i].REGORG;
                    let AREA_NAME = entlist[i].AREA_NAME;
                    let newNum = entlist[i].newNum;
                    let rank = entlist[i].SERIALS;
                    if(rank == '1'){
                        html += '<tr>' +
                            '<td width="15%"><div class="rank rankOne">'+rank+'</div></td>' +
                            '<td width="23%">'+AREA_NAME+'</td>' +
                            '<td width="23%" onclick="qylb(\''+AREA_NAME+'\',\''+REGORG+'\',\'0\')" class="jd" id="dj1_'+i+'">'+COUNT+'</td>' +
                            '<td width="23%" onclick="qylb(\''+AREA_NAME+'\',\''+REGORG+'\',\'1\')" class="jd" id="dj2_'+i+'">'+newNum+'</td>' +
                            '<td width="16%">'+ZS+'</td>' +
                            '</tr>';
                    }else if(rank == '2'){
                        html += '<tr>' +
                            '<td width="15%"><div class="rank rankTwo">'+rank+'</div></td>' +
                            '<td width="23%">'+AREA_NAME+'</td>' +
                            '<td width="23%" onclick="qylb(\''+AREA_NAME+'\',\''+REGORG+'\',\'0\')" class="jd" id="dj1_'+i+'">'+COUNT+'</td>' +
                            '<td width="23%" onclick="qylb(\''+AREA_NAME+'\',\''+REGORG+'\',\'1\')" class="jd" id="dj2_'+i+'">'+newNum+'</td>' +
                            '<td width="16%">'+ZS+'</td>' +
                            '</tr>';
                    }else if(rank == '3'){
                        html += '<tr>' +
                            '<td width="15%"><div class="rank rankThree">'+rank+'</div></td>' +
                            '<td width="23%">'+AREA_NAME+'</td>' +
                            '<td width="23%" onclick="qylb(\''+AREA_NAME+'\',\''+REGORG+'\',\'0\')" class="jd" id="dj1_'+i+'">'+COUNT+'</td>' +
                            '<td width="23%" onclick="qylb(\''+AREA_NAME+'\',\''+REGORG+'\',\'1\')" class="jd" id="dj2_'+i+'">'+newNum+'</td>' +
                            '<td width="16%">'+ZS+'</td>' +
                            '</tr>';
                    }else{
                        html += '<tr>' +
                            '<td width="15%"><div class="rank">'+rank+'</div></td>' +
                            '<td width="23%">'+AREA_NAME+'</td>' +
                            '<td width="23%" onclick="qylb(\''+AREA_NAME+'\',\''+REGORG+'\',\'0\')" class="jd" id="dj1_'+i+'">'+COUNT+'</td>' +
                            '<td width="23%" onclick="qylb(\''+AREA_NAME+'\',\''+REGORG+'\',\'1\')" class="jd" id="dj2_'+i+'">'+newNum+'</td>' +
                            '<td width="16%">'+ZS+'</td>' +
                            '</tr>';
                    }
                }
                $(".all-body-right-bottom-content>tbody").html(html);

                //选中样式
                $('td[id^="dj1_"]').hover(
                    function(){
                        $(this).css("cursor","pointer");
                        $(this).css("background","rgba(6,171,188,.5)");
                    },
                    function(){
                        $(this).css("background","none");
                    }
                );
                //选中样式
                $('td[id^="dj2_"]').hover(
                    function(){
                        $(this).css("cursor","pointer");
                        $(this).css("background","rgba(6,171,188,.5)");
                    },
                    function(){
                        $(this).css("background","none");
                    }
                );
            }else{
                $(".all-body-right-bottom-content>tbody").html(html);
            }
        }
    });
}


//调转企业画像
/*function tzQyhx(PRIPID,REGNO,ENTNAME){
    if(!REGNO || REGNO=='undefined'){//如果REGNO为空则传ENTNAME
        parent.window.location.href=realPath+"view/qyhx/qyhx.html?menuType=1&PRIPID="+PRIPID+"&REGNO="+ENTNAME;
    }else{
        parent.window.location.href=realPath+"view/qyhx/qyhx.html?menuType=1&PRIPID="+PRIPID+"&REGNO="+REGNO;
    }

}*/

function qylb(AREA_NAME,AREA,TYPE) {
    areaName = AREA_NAME;
    layer.open({
        type:2,
        shade: 0.5,
        title: false, //不显示标题
        area: ['90%', '90%'], //宽高
        content: ["qylb.html?PARENT_DL="+PARENT_DL+"&area="+AREA+"&TYPE="+TYPE+"&areaName="+AREA_NAME,"no"],
        cancel: function(){
            layer.closeAll();
        }
    });
}
