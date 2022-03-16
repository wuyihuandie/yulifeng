var index_id = "";
var myDate = new Date();
var YEAR = myDate.getFullYear()+"";
$(function () {
    getYshjYears();
    //监听button点击
    $(document).on("click","button",function(){
        //获取所有的img
        let imgArray = $("button").children("img");
        //循环判断是否含有选中的图片
        for (let i = 0; i < imgArray.length; i++) {
            let imgArraySrc = $(imgArray[i]).attr("src");
            if(imgArraySrc.indexOf("_1.png")>-1){
                //有则替换成未选中的图片
                //let imgArraySrcSplit = imgArraySrc.split(".");
                //imgArraySrcSplit[0] = imgArraySrcSplit[0].substr(0,imgArraySrcSplit[0].length-2);
                var imgName = imgArray.eq(i).data("name");
        		var imgSrc = "../../source/img/yshj/"+imgName+".png";
                $(imgArray[i]).attr("src",imgSrc)
            }
        }
        //获取当前点击的img
        //let src = $(this).children("img").attr("src");
        //let srcSplit = src.split(".");
        var imgName = $(this).children("img").data("name");
        var imgSrc = "../../source/img/yshj/"+imgName+".png";
        //选中替换的图片
        $(this).children("img").attr("src",imgSrc);

        $("button").removeClass("button-xz");
        $(this).addClass("button-xz");
        let id  = $(this).attr("id");
        index_id = id;
        gdspm(index_id);
    });

    //监听下拉框选择
    $(document).on("change","#infoType",function(){
        let val = $(this).val();
        YEAR = val;
        wgwjzb(YEAR);
        hgzb(YEAR);
        mapData(YEAR);
        querygszhj(YEAR);
    });
})

//获取右上下拉框数据
function getYshjYears() {
    var datas = {};
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/businessClimateController/getYshjYears',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            var jsonText = JSON.parse(text);
            var yearList = [];
            if(typeof (jsonText.data) != "undefined" && jsonText.data != []){
                yearList = jsonText.data.yearList;
            }
            let html = "";
            if(typeof (yearList) != "undefined" && yearList.length>0){
                for (let i = 0; i < yearList.length; i++) {
                    if(i == 0){
                        html += '<option title="'+yearList[i]+'" value="'+yearList[i]+'" selected>'+yearList[i]+'</option>';
                    }else{
                        html += '<option title="'+yearList[i]+'" value="'+yearList[i]+'" >'+yearList[i]+'</option>';
                    }
                }
                YEAR = yearList[0];
            }
            $("#infoType").html(html);
            wgwjzb(YEAR);
            hgzb(YEAR);
            mapData(YEAR);
            querygszhj(YEAR);

        }
    })
}

//微观问卷指标
function wgwjzb(YEAR) {
    var wgwjzb = echarts.init(document.getElementById('wgwjzb'));
    var datas = {};
    datas.type = '1';
    datas.year=YEAR;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/businessClimateController/getIndexXq',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            // let jsonObj1= eval('('+text+')')
            let jsonObj=JSON.parse(text)
            let jsonData=jsonObj.data;
            let capsule=jsonData.capsule;
            let radar=jsonData.radar;
            let name=JSON.stringify(radar.name);
            name=name.replace("[","").replace("]","").replace(/"/g,'').split(",");
            zbbz(capsule.wgvalue,1)
            var legendData = ['微观问卷指标']; //图例
            var indicator = [{
                text: name[0]+':'+name[1],
                max: 0.3
            },
                {
                    text: name[2]+':'+name[3],
                    max: 0.3
                },
                {
                    text: name[4]+':'+name[5],
                    max: 0.3
                },
                {
                    text: name[6]+':'+name[7],
                    max: 0.3
                },
                {
                    text: name[8]+':'+name[9],
                    max: 0.3
                },
                {
                    text: name[10]+':'+name[11],
                    max: 0.3
                }
            ];
            var dataArr = [{
                value:radar.value,
                name: legendData[0],
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#4A99FF',
                        },
                        shadowColor: '#4A99FF',
                        shadowBlur: 10,
                    },
                },
                areaStyle: {
                    normal: { // 单项区域填充样式
                        color: {
                            type: 'linear',
                            x: 0, //右
                            y: 0, //下
                            x2: 1, //左
                            y2: 1, //上
                            colorStops: [{
                                offset: 0,
                                color: '#04ABBC'
                            }, {
                                offset: 0.5,
                                color: 'rgba(4,171,188,0.5)'
                            }, {
                                offset: 1,
                                color: '#04ABBC'
                            }],
                            globalCoord: false
                        },
                        opacity: 1 // 区域透明度
                    }
                }
            }
            ];
            var colorArr = ['#4A99FF', '#4BFFFC']; //颜色
            var option = {
                tooltip: {},
                color: colorArr,
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        },
                    },
                    indicator: indicator,
                    splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                        show: true,
                        areaStyle: { // 分隔区域的样式设置。
                            color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                        }
                    },
                    axisLine: { //指向外圈文本的分隔线样式
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#fff', // 分隔线颜色
                            width: 1, // 分隔线线宽
                        }
                    },
                },
                series: [{
                    type: 'radar',
                    symbolSize: 8,
                    data: dataArr
                }]
            };
            wgwjzb.setOption(option);
        }
    });
    window.onresize = wgwjzb.resize;
}

//宏观指标
function hgzb(YEAR) {
    var hgzb = echarts.init(document.getElementById('hgzb'));
    var datas = {};
    datas.type = '2';
    datas.year=YEAR;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/businessClimateController/getIndexXq',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            let jsonObj=JSON.parse(text)
            let jsonData=jsonObj.data;
            let capsule=jsonData.capsule;
            let radar=jsonData.radar;
            let name=JSON.stringify(radar.name);
            name=name.replace("[","").replace("]","").replace(/"/g,'').split(",");
            zbbz(capsule.hgvalue,2)
            var legendData = ['宏观指标']; //图例
            var indicator = [{
                text: name[0]+':'+name[1],
                max: 0.3
            },
                {
                    text: name[2]+':'+name[3],
                    max: 0.3
                },
                {
                    text: name[4]+':'+name[5],
                    max: 0.3
                },
                {
                    text: name[6]+':'+name[7],
                    max: 0.3
                },
                {
                    text: name[8]+':'+name[9],
                    max: 0.3
                }
            ];
            var dataArr = [{
                value: radar.value,
                name: legendData[0],
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#53E9B4',
                        },
                        shadowColor: '#53E9B4',
                        shadowBlur: 10,
                    },
                },
                areaStyle: {
                    normal: { // 单项区域填充样式
                        color: {
                            type: 'linear',
                            x: 0, //右
                            y: 0, //下
                            x2: 1, //左
                            y2: 1, //上
                            colorStops: [{
                                offset: 0,
                                color: '#53E9B4'
                            }, {
                                offset: 0.5,
                                color: 'rgba(83, 233, 180,0.5)'
                            }, {
                                offset: 1,
                                color: '#53E9B4'
                            }],
                            globalCoord: false
                        },
                        opacity: 1 // 区域透明度
                    }
                }
            }
            ];
            var colorArr = ['#4A99FF', '#4BFFFC']; //颜色
            var option = {
                tooltip: {},
                color: colorArr,
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        },
                    },
                    indicator: indicator,
                    splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                        show: true,
                        areaStyle: { // 分隔区域的样式设置。
                            color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                        }
                    },
                    axisLine: { //指向外圈文本的分隔线样式
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#fff', // 分隔线颜色
                            width: 1, // 分隔线线宽
                        }
                    },
                },
                series: [{
                    type: 'radar',
                    symbolSize: 8,
                    data: dataArr
                }]
            };
            hgzb.setOption(option);
        }
    });
    window.onresize = hgzb.resize;
}

function zbbz(value,type) {
    layui.use('element',function () {
        var element = layui.element;
        if(type==1){
            element.progress('wgwjzb', value);
            $(".wgwjzb").append("<span class=\"layui-progress-text\" style='float: left'>指标权重</span><span class=\"layui-progress-text\" style='float: right'>"+value+"</span>")
        }else{
            element.progress('hgzb', value);
            $(".hgzb").append("<span class=\"layui-progress-text\" style='float: left'>指标权重</span><span class=\"layui-progress-text\" style='float: right'>"+value+"</span>")
        }
    });
}

//各省份的数据
var allData = [];

//地图
function mapData(YEAR) {
    var datas = {};
    datas.year=YEAR;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/businessClimateController/queryBusinessClimateByScoreAndType',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            let jsonData=JSON.parse(text).data;
            let html = "";
            for (let i = 0; i < jsonData.length; i++) {
                if(i==0){
                    html+='<tr>' +
                        '<td width="15%" class="rank-one">'+jsonData[i].SERIALS+'</td>' +
                        '<td width="45%">'+jsonData[i].AREA_NAME+'市</td>' +
                        '<td width="25%">'+Number(jsonData[i].DF)+'</td>' +
                        '<td width="15%">'+jsonData[i].LX+'</td>' +
                        '</tr>';
                }else if(i==1){
                    html+='<tr>' +
                        '<td class="rank-two">'+jsonData[i].SERIALS+'</td>' +
                        '<td>'+jsonData[i].AREA_NAME+'市</td>' +
                        '<td>'+Number(jsonData[i].DF)+'</td>' +
                        '<td>'+jsonData[i].LX+'</td>' +
                        '</tr>';
                }else if(i==2){
                    html+='<tr>' +
                        '<td class="rank-three">'+jsonData[i].SERIALS+'</td>' +
                        '<td>'+jsonData[i].AREA_NAME+'市</td>' +
                        '<td>'+Number(jsonData[i].DF)+'</td>' +
                        '<td>'+jsonData[i].LX+'</td>' +
                        '</tr>';
                }else{
                    html+='<tr>' +
                        '<td>'+jsonData[i].SERIALS+'</td>' +
                        '<td>'+jsonData[i].AREA_NAME+'市</td>' +
                        '<td>'+Number(jsonData[i].DF)+'</td>' +
                        '<td>'+jsonData[i].LX+'</td>' +
                        '</tr>';
                }
                allData.push({name:jsonData[i].AREA_NAME+'市',value:Number(jsonData[i].DF),type:jsonData[i].LX,rank:jsonData[i].SERIALS});
            }
            $(".all-body-middle-pm-table>tbody").html(html);
            loadMap("../../source/json/jiangxi.json", "jiangxi", allData);
        }});


}

/**
 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
 @params {String} mapCode:json数据的地址
 @params {String} name: 地图名称
 */
var myChart;
function loadMap(mapCode, name, allData) {
    $.get(mapCode, function(data) {
        if (data) {
            echarts.registerMap(name, data);
            var option = {
                title: {
                    top: 20,
                    text: '{titleBg|} 各地市营商环境得分及类型',
                    x: 'left',
                    textStyle: {
                        fontSize:25,
                        color: '#ffffff',
                        rich: {
                            titleBg: {
                                backgroundColor: { image:'../../source/img/yshj/icon_gdsyshjdfjlx.png' },
                                height: 30,
                            }
                        }
                    },
                },
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        if (params.data) return '区域名称:'+params.name +'<br/>'+ '加权得分：' + params.data['value']+'<br/>'+ '排名：' + params.data['rank']+'<br/>'+ '类型：' + params.data['type']
                    },
                },
                geo: {
                    map: 'jiangxi',
                    aspectScale: 0.75, //长宽比
                    zoom: 0.9,//地图放大缩小 下面series的zoom也同时改
                    roam: false,
                    left:60,
                    itemStyle: {
                        normal: {
                            areaColor: '#25709C',
                            shadowColor: '#25709C',
                            shadowOffsetX: 0,
                            shadowOffsetY: 25
                        },
                        emphasis: {
                            areaColor: '#25709C',
                            borderWidth: 0,
                            color: 'green',
                            label: {
                                show: false
                            }
                        }
                    }
                },
                visualMap: {
                    right: 0,
                    type: "piecewise",
                    bottom: 50,
                    icon: "circle",
                    align: "left",
                    pieces: [
                        {
                            min: 7,
                            color: '#0267B9',
                            label: 'A类：7分（含）以上'
                        },
                        {
                            min: 6.5,
                            max: 7,
                            // color: '#A5D3F3',
                            color: '#386EDB',
                            label: 'B类：6.5分（含）-7分（不含）'
                        },
                        {
                            max: 6.5,
                            color: '#4890F1',
                            label: 'C类：6.5分（不含）以下'
                        }
                    ],
                    textStyle: {
                        color: '#ffffff'
                    },
                },
                series: [{
                    name: 'MAP',
                    type: 'map',
                    mapType: name,
                    data: allData,
                    showLegendSymbol: false,    //去除地图指示点
                    roam: false,  // 是否开启鼠标缩放和平移漫游。默认不开启。
                    // 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: 'white',
                                fontSize: 15,
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 15,
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#94D2DC',
                            borderColor: '#ffffff',
                        },
                        emphasis: {
                            areaColor: '#94D2DC',
                        }
                    },
                    zoom: 0.9,//地图放大缩小 上面geo的zoom也同时改
                    left:60,
                }]
            };
            var mapData = document.getElementById('mapData');
            myChart = echarts.init(mapData);
            myChart.setOption(option);
        }
    });
}

//获取各市子环境
function querygszhj(YEAR) {
    var datas = {};
    datas.year=YEAR;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/businessClimateController/queryBusinessClimateByZhjIndexId',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            let jsonData=JSON.parse(text).data;
            let html = "";
            if(typeof (jsonData) != "undefined" && jsonData.length>0){
                index_id = jsonData[0].ID;
                for (let i = 0; i < jsonData.length; i++) {
                    if(i == 0){
                        html += '<button class="all-body-left-top-content-button button-xz" id="'+jsonData[i].ID+'"><img src="../../source/img/yshj/'+jsonData[i].TB+'_1.png" data-name="'+jsonData[i].TB+'" height="19" width="21"/>&nbsp;&nbsp;'+jsonData[i].NAME+'</button>';
                    }else{
                        html += '<button class="all-body-left-top-content-button" id="'+jsonData[i].ID+'"><img src="../../source/img/yshj/'+jsonData[i].TB+'.png" data-name="'+jsonData[i].TB+'" height="19" width="21"/>&nbsp;&nbsp;'+jsonData[i].NAME+'</button>';
                    }
                }
            }
            $(".all-body-left-top-content-title").html(html);
            gdspm(index_id);
        }
    });
}

//各地市子环境加权得分及排名
function gdspm(index_id) {
    var datas = {};
    datas.index_id = index_id;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/businessClimateController/queryBusinessClimateByWeightedScoresAndRankings',
        data: {
            param: JSON.stringify(datas)//参数
        },
        cache: false,
        success: function (text) {
            let jsonData=JSON.parse(text).data;
            let html = "";
            if(typeof (jsonData) != "undefined" && jsonData.length>0){
                for (let i = 0; i < jsonData.length; i++) {
                    let DF = jsonData[i].DF;
                    let AREA_NAME = jsonData[i].AREA_NAME;
                    let rank = jsonData[i].SERIALS;
                    AREA_NAME = AREA_NAME+"市";
                    if(rank == '1'){
                        html += '<tr>' +
                            '<td width="15%"><div class="rank rankOne">'+rank+'</div></td>' +
                            '<td width="50%">'+AREA_NAME+'</td>' +
                            '<td width="35%">'+DF+'</td>' +
                            '</tr>';
                    }else if(rank == '2'){
                        html += '<tr>' +
                            '<td width="15%"><div class="rank rankTwo">'+rank+'</div></td>' +
                            '<td width="50%">'+AREA_NAME+'</td>' +
                            '<td width="35%">'+DF+'</td>' +
                            '</tr>';
                    }else if(rank == '3'){
                        html += '<tr>' +
                            '<td width="15%"><div class="rank rankThree">'+rank+'</div></td>' +
                            '<td width="50%">'+AREA_NAME+'</td>' +
                            '<td width="35%">'+DF+'</td>' +
                            '</tr>';
                    }else{
                        html += '<tr>' +
                            '<td width="15%"><div class="rank">'+rank+'</div></td>' +
                            '<td width="50%">'+AREA_NAME+'</td>' +
                            '<td width="35%">'+DF+'</td>' +
                            '</tr>';
                    }
                }
            }
            $(".all-body-left-top-content-table>tbody").html(html);
        }
    });
}