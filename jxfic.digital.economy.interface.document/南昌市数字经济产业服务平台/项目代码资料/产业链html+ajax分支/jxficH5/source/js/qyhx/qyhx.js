var TYPE_R = "";
$(function () {
	var PRIPID = getUrlValue("PRIPID");//获取url链接里的PRIPID参数
	var REGNO = getUrlValue("REGNO");//获取url链接里的REGNO参数
    var TYPE = getUrlValue("TYPE");//获取url链接里的type参数
    if(TYPE){
    	TYPE_R = TYPE;
    }
    if(TYPE_R == '1'){
        PRIPID = REGNO;
    }
	if(PRIPID){//pripid有值则继续
		qyzhpf(PRIPID);
        qyjynjyqk(PRIPID);
        qyjbxx(PRIPID);
	}
	if(REGNO){//REGNO有值则继续
		qyxq(REGNO);//企业信用详情
		qjst(REGNO);//全景视图
        yq(REGNO);//舆情
	}
})
//企业综合评分
function qyzhpf(PRIPID) {
    var qyzhpf = echarts.init(document.getElementById('qyzhpf'));
    //qyzhpf.showLoading({text: '正在加载数据'});//增加提示
    var datas = {};
    datas.PRIPID=PRIPID;
    datas.TYPE_R=TYPE_R;
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/entPanoramicController/getEntScore',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            let jsonData=eval('('+text+')')
            let qyfs=new Array(jsonData.data.entScoreXq.length);
            $("#SUMDF").html(jsonData.data.SUMDF);
            for (let i = 0; i <jsonData.data.entScoreXq.length ; i++) {
                let name=jsonData.data.entScoreXq[i].NAME;
                if(name=="企业特质" ){
                    qyfs[0]=jsonData.data.entScoreXq[i].DF;
                }
                if(name=="产业特质" ){
                    qyfs[1]=jsonData.data.entScoreXq[i].DF;
                }
                if(name=="关联风险" ){
                    qyfs[2]=jsonData.data.entScoreXq[i].DF;
                }
                if(name=="外部环境" ){
                    qyfs[3]=jsonData.data.entScoreXq[i].DF;
                }
                if(name=="信用历史" ){
                    qyfs[4]=jsonData.data.entScoreXq[i].DF;
                }
                if(name=="经营水平" ){
                    qyfs[5]=jsonData.data.entScoreXq[i].DF;
                }
                if(name=="股东背景" ){
                    qyfs[6]=jsonData.data.entScoreXq[i].DF;
                }
            }
            // console.log(jsonData.data.entScoreXq)
		    var legendData = ['企业综合评分']; //图例
		    var indicator = [{
			        text: '企业特质',
			        max: 2000,
			        },
			        {
			            text: '产业特质',
			            max: 2000,
			        },
			        {
			            text: '关联风险',
			            max: 2000,
			        },
			        {
			            text: '外部环境',
			            max: 2000,
			            //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
			        },
			        {
			            text: '信用历史',
			            max: 2000,
			        },
			        {
			            text: '经营水平',
			            max: 2000,
			        },
			        {
			            text: '股东背景',
			            max: 2000,
			        }
			
			    ];
		    var dataArr = [{
		        value: qyfs,
		        name: legendData[0],
		        itemStyle: {
		            normal: {
		                lineStyle: {
		                    color: '#4A99FF',
		                    // shadowColor: '#4A99FF',
		                    // shadowBlur: 10,
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
		                opacity: 0.5 // 区域透明度
		            }
		        }
		    }
		    ];
		    var colorArr = ['#4A99FF']; //颜色
		    var option = {
		    	tooltip: {},
		        color: colorArr,
		        /*legend: {
		            orient:'vertical',
		            icon: 'circle', //图例形状
		            data: legendData,
		            bottom:35,
		            right:40,
		            itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
		            itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
		            itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
		            textStyle: {
		                fontSize: 14,
		                color: '#00E4FF',
		            },
		        },*/
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
		            // symbol: 'angle',
		            data: dataArr
		        }]
		    };
		    qyzhpf.setOption(option);
	   }});
    //qyzhpf.hideLoading();//关闭提示
    window.onresize = qyzhpf.resize;
}


function qysjsjqk(PRIPID) {
    var qysjsjqk = echarts.init(document.getElementById('qysjsjqk'));
    qysjsjqk.showLoading({text: '正在加载数据'});//增加提示
    var datas = {};
    datas.PRIPID=PRIPID;
    datas.TYPE="2";
    datas.TYPE_R=TYPE_R;
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/entPanoramicController/getHistogramData',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            let jsonData=eval('('+text+')')
            // console.log(jsonData.data.payList)
        var option = {
        tooltip: {
            trigger: 'axis',
            formatter:function (a) {
                var value = a[0].value;
                var name = a[0].name;
                return name+"年<br/>"+value+"万元";
                console.log(a[0])
            },
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(0, 255, 233,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(0, 255, 233,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        grid: {
            top: '15%',
            left: '10%',
            right: '10%',
            bottom: '15%',
            // containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '万元',
            nameTextStyle:{
                color:'#ffffff',
                padding : [0, -500, 0,0],
                fontFamily : "#Arial",
                fontSize : 12
            },
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
            boundaryGap: false,
            data: jsonData.data.yearList//年份列表
        }],
        yAxis: {
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            name: '万元',
            nameTextStyle:{
                color:"#ffffff",
                padding : [5, 80, 0, 20],
                fontFamily : "#Arial",
                fontSize : 12
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#00BFF3',
                    //opacity:0.23
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
                // name:'液压异常报警',
                type: 'line',
                smooth: true, //是否平滑
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
                                color: 'rgba(4,171,188,0.3)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(4,171,188,0)'
                            }
                        ], false),
                    }
                },
                data: jsonData.data.payList//上缴资金
            }
        ]
    }

    qysjsjqk.setOption(option);
   }});
    qysjsjqk.hideLoading();//关闭提示
    window.onresize = qysjsjqk.resize;
}
function qyjbxx(PRIPID)  {
    var datas = {};
    datas.PRIPID=PRIPID;
    datas.TYPE_R=TYPE_R;
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/entPanoramicController/getEntMsg',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            let jsonData=eval('('+text+')')
            let ENTNAME=jsonData.data.ENTNAME; //企业名称
            let UNISCID=jsonData.data.UNISCID;//统一社会信用代码
            let NAME=jsonData.data.NAME;//法人姓名
            let DOM=jsonData.data.DOM;//地址
            let ESTDATE=jsonData.data.ESTDATE;//成立日期
            let CHAIN_NAME = '';
            if(jsonData.data.CHAIN_NAME && jsonData.data.CHAIN_NAME!='undefined'){
            	CHAIN_NAME =jsonData.data.CHAIN_NAME.split(',');//产业链
            }
            
            $("#ENTNAME").html(ENTNAME);
            $("#UNISCID").html("统一社会信用代码："+UNISCID);
            $("#NAME").html(" 法定代表人："+NAME);
            $("#DOM").html("地址："+DOM);
            $("#ESTDATE").html("成立日期："+ESTDATE);
            for (let i = 0; i < CHAIN_NAME.length; i++) {
                var addTab="<p  class='all-center-top-right-bq' >"+ CHAIN_NAME[i]+"</p>"+"&nbsp";
                $("#CHAIN_NAME").append(addTab)
            }
        }});

}
//企业近一年经营情况
function qyjynjyqk(PRIPID) {
    var qyjynjyqk = echarts.init(document.getElementById('qyjynjyqk'));
    qyjynjyqk.showLoading({text: '正在加载数据'});//增加提示
    var datas = {};
    datas.PRIPID=PRIPID;
    datas.TYPE_R=TYPE_R;
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/entPanoramicController/getHistogramData',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            let jsonData=JSON.parse(text).data;
            console.log(jsonData)
    //纺织服装出口额
    var option2 = {
        color:['#4A99FF','#35C96E','#04ABBC'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#4A99FF'
                }
            }
        },
        legend: {
            x: '60%',
            textStyle: {
                color: '#fff',
            }
        },
        grid: {
            top:'15%',
            left: '3%',
            right: '4%',
            bottom: '0',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data:jsonData.yearList,
                axisLine: {lineStyle: {color: '#334a65',}},//x轴线的样式
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
            }
        ],
        yAxis: [
            {
                min: 0,
                type: 'value',
                scale: true,
                name: '万元',
                nameTextStyle:{
                    color:"#fff",
                },
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
                name: '营业收入（万元）',
                type: 'bar',
                barWidth: 20,
                color:"#04ABBC",
                data: jsonData.businessList
            },
            {
                name: '利润（万元）',
                type: 'bar',
                barWidth: 20,
                data: jsonData.profitList
            },
            {
                name: '税金（万元）',
                type: 'bar',
                barWidth: 20,
                data: jsonData.payList
            },
            {
                name: '增长率',
                type: 'line',
                yAxisIndex: 1,
                data: jsonData.rateList
            }
        ]
    };

    qyjynjyqk.setOption(option2);
        }});
    qyjynjyqk.hideLoading();//关闭提示
    window.onresize = qyjynjyqk.resize;
}
//企业信用详情
function qyxq(regno){
	var datas = {};
	datas.REGNO=regno;
	$.ajax({
        type: 'POST',
        url : BASE_URL+'/entPanoramicController/getEntCreditxq',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
        	var jsonData = JSON.parse(text);
        	var url = jsonData.data.httpUrl;
        	url = decodeURI(url);//unicode解码
        	$(".qyxq").click(function(){
				layer.open({
			        type: 2
			        ,title:'企业信用详情'
			        ,area: ['95%', '95%']
			        ,content: url
			        ,btn: '关闭'
			        ,btnAlign: 'c' //按钮居中
			        ,shade: 0 //不显示遮罩
			        ,yes: function(){
			          layer.closeAll();
			        }
			    });
			})
        }
    })
}
//全景视图
function qjst(regno){
	var datas = {};
	datas.REGNO=regno;
	$.ajax({
        type: 'POST',
        url : BASE_URL+'/entPanoramicController/getEntQj',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
        	var jsonData = JSON.parse(text);
        	var url = jsonData.data.httpUrl;
        	url = decodeURI(url);//unicode解码
        	$(".qyqjDiv").click(function(){
				layer.open({
			        type: 2
			        ,title:'企业全景画像'
			        ,area: ['95%', '95%']
			        ,content: url
			        ,btn: '关闭'
			        ,btnAlign: 'c' //按钮居中
			        ,shade: 0 //不显示遮罩
			        ,yes: function(){
			          layer.closeAll();
			        }
			    });
			})
        }
    })
}
//舆情
function yq(REGNO){
	var datas = {};
    datas.searchKey=REGNO;
	$.ajax({
        type: 'POST',
        url : BASE_URL+'/entPanoramicController/searchNews',
        data:{
            param:JSON.stringify(datas)//参数
        },
        cache : false,
        success : function(text) {
            var jsonData = JSON.parse(text);
            var Result = jsonData.data.Result;
        	var tableHtml="";
            if (Result){
                for(var i = 0;i<Result.length;i++){
                    tableHtml+= '<tr onclick="tzYQ(\''+Result[i].NewsId+'\')">'+
                        '<td>'+Result[i].Title+'</td>'+
                        '<td class="all-right-bottom-table-date">'+Result[i].PublishTime+'</td>'+
                        '</tr>';
                }
            }
        	if(tableHtml==""){
        		tableHtml="<tr><td colspan='2'>暂无舆情信息</td></tr>"
        	}
        	$("#qytable tbody").html(tableHtml);
        }
    })
}
function tzYQ(newsId){
	layer.open({
        type: 2
        ,title:'舆情详情'
        ,area: ['95%', '95%']
        ,content: 'https://pro-plugin.qichacha.com/news-detail-page?newsId='+newsId
        ,btn: '关闭'
        ,btnAlign: 'c' //按钮居中
        ,shade: 0 //不显示遮罩
        ,yes: function(){
          layer.closeAll();
        }
    });
}
