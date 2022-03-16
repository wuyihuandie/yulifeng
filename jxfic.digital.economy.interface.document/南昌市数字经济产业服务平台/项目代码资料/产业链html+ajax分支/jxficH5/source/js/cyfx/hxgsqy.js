var PARENT_DL = ""; // 产业
var AREA = "360100";//区域
$(".ctitle").text(YEAR);
var CONDITION = "2";
var INDUSTRY = '';//行业
var CLSJ = '';
var ZCZJ = '';
var YYSR = '';
var NSZE = '';
var CYRY = '';
var CODE_NAME = ["1","2","3","4","5"]
var industry = ['NK01', 'NK02', 'NK03', 'NK04','NK05'];
var areatitle = '';

var title = "家";
function changeButton(params,ths){
    $(".overdom").remove();
    var index=$(ths).index();
    $("#tabSortBy>li").removeClass("star").eq(index).addClass("star");
    INDUSTRY='';
    PARENT_DL='';
    CONDITION=params;
    $(".cypm_condition div").removeClass("on");
    $(ths).addClass("on");
    $(".cyfx_rectbox .rectbox").css("border","none");
    CONDITION=params;
    if(CONDITION==1){
        title = "家";
        $(".unit").text("家");
        $(".chartTitle").text("核心企业");
    }else if(CONDITION==2){
        title = "亿元";
        $(".unit").text("亿元");
        $(".chartTitle").text("核心规模企业营收");
    }else if(CONDITION==3){
        title = "亿元";
        $(".unit").text("亿元");
        $(".chartTitle").text("核心规模企业纳税");
    }else if(CONDITION==5){
        title = "人";
        $(".unit").text("人");
        $(".chartTitle").text("核心规模企业从业人员");
    }
    submitForm();
}

function rectboxHighlight(ths){
    $(".overdom").remove()
    var width=$(ths).width();
    var height=$(ths).height();
    var left=$(ths)[0].offsetLeft;
    var top=$(ths)[0].offsetTop
    var overDom=`<svg class="overdom" style="width:100%; height:100%; left:0; top:0; position:absolute; ">
                        <path d="M2 2  L${width-2} 2 L${width-2} ${height-2} L2 ${height-2} Z" fill="transparent" stroke="#ffff83" stroke-width="5"  />
                        <path d="M2 2  L${width-2} 2 L${width-2} ${height-2} L2 ${height-2} Z" fill="transparent" stroke="rgba(41,108,179,0.5)" stroke-width="5"  class="line1"  />
                        
                    </svg>`;
    $(ths).append(overDom);
}


function changeIndustry(params,ths){
    if(params==4){
        rectboxHighlight($(".rectleft"));
    }else{
        rectboxHighlight(ths);
    }
    INDUSTRY=industry[params];
    renderSJQK();
    getIndustryChainOverAll();
    renderZCZJ();
    renderYYSR();
    renderRATGRO();
    renderEMPNUM();
    getEnterpriseList();//企业列表
}
$(function(){
    if( getCookie("area_value")!=360100){
        areatitle = getCookie("area_name");
        $(".areatitle").text(areatitle);
    }
    renderWDXD();
    $("#svgfzfx .svgItem").on("mouseenter",function(){
        $(this).find("image").hide().eq(1).show();
        document.getElementById("svgfzfx").pauseAnimations();
    })

    $("#svgfzfx .svgItem").on("mouseleave",function(){

        $(this).find("image").hide().eq(0).show();
        document.getElementById("svgfzfx").unpauseAnimations();
    })
    $("#svgfzfx .svgItem").on("click",function(){
        var index=$(this).index()-2;
        location.href="wdxd.html??menuType=1#"+index;
    })


    $(".btnzoom").click(function(){
        location.href="wdxd.html??menuType=1";
    })


    $(".btn_more").click(function(){
        location.href="../qyyxjc/yxjc-1.html?menuType=2";
    })
    submitForm();

    $('.cleft').click(function(){
        var year = $(".ctitle").text();
        //只能看近三年的数据
        if((nowdate-2)!=year){
            year--;
            $(".ctitle").text(year);
            YEAR=year+"";
            getQydatas();
            getIndustryChainOverAll();
            /*renderSJQK();
            renderZCZJ();*/
            getIndustryPmNums();
            renderYYSR();
            renderRATGRO();
            renderEMPNUM();
            getEnterpriseList();//企业列表
        }
    })
    $('.cright').click(function(){
        var year = $(".ctitle").text();
        //只能看近三年的数据
        if(nowdate!=year){
            year++;
            $(".ctitle").text(year);
            YEAR=year+"";
            getQydatas();
            getIndustryChainOverAll();
            /*renderSJQK();
            renderZCZJ();*/
            getIndustryPmNums();
            renderYYSR();
            renderRATGRO();
            renderEMPNUM();
            getEnterpriseList();//企业列表
        }
    })
})
function submitForm(){
    getQydatas();
    getIndustryChainOverAll();
    renderSJQK();
    renderZCZJ();
    getIndustryPmNums();
    renderYYSR();
    renderRATGRO();
    renderEMPNUM();
    getEnterpriseList();//企业列表
}

function getQydatas(){
    var params ={
        YEAR: YEAR,
        INDUSTRY:INDUSTRY
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industryDistributionController/getNanchangGsQydatas',
        data:{
            param:JSON.stringify(params)//参数
        },
        cache : false,
        success : function(res) {
            var result = JSON.parse(res);
            var option1 = {
                startVal: 0,
                decimalPlaces: 2,
                duration: 1.9,
            };
            if(result.status == 10001) {
                new CountUp('ENTNUMS', result.data.SUMS).start();
            }
        }
    })
}
//数字经济产业现状
function getIndustryChainOverAll() {
    var params ={
        AREA_NAME:'',
        YEAR: YEAR,
        INDUSTRY:INDUSTRY
    }
    if(INDUSTRY=='NK01'){
        params ={
            AREA_NAME:'',
            YEAR: YEAR,
            INDUSTRY:'NK05'
        }
    }
    if(getCookie("area_value")==360100){
        params.AREA_NAME='';
    }else{
        params.AREA_NAME=getCookie("area_name");
    }
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industryDistributionController/getIndustryChainOverAll',
        data:{
            param:JSON.stringify(params)//参数
        },
        cache : false,
        success : function(res) {
            var result = JSON.parse(res);
            var option1 = {
                startVal: 0,
                decimalPlaces: 2,
                duration: 1.9,
            };
            if(result.status == 10001) {
                //最新一年没有年报数据
                var zs = 0;
                var rj = 0;
                var yj = 0;

                result.data.forEach(function (item, index) {
                    if(index == 0){
                        /*new CountUp('VENDINC', item.VENDINC, option1).start();
                        new CountUp('VENDINCZS', item.VENDINCZS, option1).start();*/
                        zs=item.VENDINC;
                    }else if(index == 1){
                        new CountUp('HARDVENDINC', item.VENDINC, option1).start();
                        new CountUp('HARDVENDINCZS', item.VENDINCZS, option1).start();
                        yj=item.VENDINC;
                    }else if(index == 2){
                        /*new CountUp('SOFTVENDINC', item.VENDINC, option1).start();
                        new CountUp('SOFTVENDINCZS', item.VENDINCZS, option1).start();*/
                        rj=item.VENDINC;
                    }
                })
                if(INDUSTRY=='') {
                    new CountUp('VENDINC', zs, option1).start();
                    new CountUp('SOFTVENDINC', rj, option1).start();
                }else{
                    new CountUp('VENDINC', zs+yj, option1).start();
                    new CountUp('SOFTVENDINC', zs, option1).start();
                }
            }
        }
    })
}
//成立时间情况
function renderSJQK(){
    var url=BASE_URL+'/industryDistributionController/getIndustryEntEstdate';
    var params ={
        YEAR: '2020',
        INDUSTRY: INDUSTRY,
        TYPE: 'GSCLSJ'
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(url,params,function(result){
        var datas=[];
        var names=[];
        if(result.status == 10001) {
            result.data.forEach(function(item, index){
                names.push(item.CODE_VALUE);
                datas.push({value: item.ENTSUMS, name: item.CODE_VALUE})
            })
            var option = {
                color:['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: "10%",
                    top: "30%",
                    data: names,
                    //selected: data,
                    textStyle:{
                        color:"#fff"
                    }
                },
                series: [
                    {
                        name: '成立时间',
                        type: 'pie',
                        radius: '65%',
                        center: ['40%', '50%'],
                        data: datas,
                       /* roseType: 'radius',*/
                        label: {
                            color: '#ffffff'
                        },
                        labelLine: {
                            lineStyle: {
                                color: '#ffffff'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                    }
                ]
            };
            var chartsSJQK = document.getElementById('chartsSJQK');
            var myChart = echarts.init(chartsSJQK);
            myChart.setOption(option);
            myChart.off('click');//(多次重复绑定会导致弹出多层窗口)
            myChart.on('click', function (param) {
                CLSJ = CODE_NAME[param.dataIndex], ZCZJ = '',YYSR='',NSZE='',CYRY='',CONDITION='2';
                $("select[name='city']").val(CONDITION);
                getEnterpriseList();
            });


            var canPlayAction=true;
            myChart.on("mouseover",function(){
                canPlayAction=false;
            })
            myChart.on("mouseout",function(){
                canPlayAction=true;
            })

            let seed = 0; 
            setInterval(function(){
                if(!canPlayAction){return;}
                var index = seed % datas.length;
                datas.map(function(item,i){
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
            },10000)




        }else{
            layer.msg(result.data.msg);
        }
    })
}
//注册资金情况
function renderZCZJ(){
    var url=BASE_URL+'/industryDistributionController/getIndustryEntRegcap';
    var params ={
        YEAR: YEAR,
        INDUSTRY: INDUSTRY,
        TYPE: 'GSZCZJ'
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(url,params,function(result){
        var datas=[];
        var names=[];
        if(result.status == 10001) {
            result.data.forEach(function(item, index){
                names.push(item.CODE_VALUE);
                datas.push({value: item.ENTSUMS, name: item.CODE_VALUE})
            })
            var option = {
                color:['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: "10%",
                    top:"30%",
                    data: names,
                    textStyle:{
                        color:"#fff"
                    }
                },
                series: [
                    {
                        name: '注册资金',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        data: datas
                    }
                ]
            };
            var chartsZCZJ = document.getElementById('chartsZCZJ');
            var myChart = echarts.init(chartsZCZJ);
            myChart.setOption(option);
            myChart.off('click');//(多次重复绑定会导致弹出多层窗口)
            myChart.on('click', function (param) {
                CLSJ = '', ZCZJ = CODE_NAME[param.dataIndex],YYSR='',NSZE='',CYRY='',CONDITION='2';
                $("select[name='city']").val(CONDITION);
                getEnterpriseList();
            });

            var canPlayAction=true;
            myChart.on("mouseover",function(){
                canPlayAction=false;
            })
            myChart.on("mouseout",function(){
                canPlayAction=true;
            })

            let seed = 0; 
            setInterval(function(){
                if(!canPlayAction){return;}
                var index = seed % datas.length;
                datas.map(function(item,i){
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
            },10000)


        }else{
            layer.msg(result.data.msg);
        }
    })
}
//各产业数量 4大类
function getIndustryPmNums() {
    var params ={
        YEAR: YEAR,
        CONDITION:'1'
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industryDistributionController/getIndustryPmNums',
        data:{
            param:JSON.stringify(params)//参数
        },
        cache : false,
        success : function(res) {
            var result = JSON.parse(res);
            var locate = 1;
            if(result.status == 10001) {
                var software = 0;
                result.data.forEach(function(item, index){
                    if(item.PARENT_DL=='NK01'){
                       /* $("#hardWareName").html(item.CHAIN_NAME);*/
                        $("#hardWareSums").html('（'+item.SUMS+'）');
                    }else if(item.PARENT_DL=='NK02'){
                        software = software + item.SUMS;
                        $("#software1").html('（'+item.SUMS+'）');
                    }else if(item.PARENT_DL=='NK03'){
                        software = software + item.SUMS;
                        $("#software2").html('（'+item.SUMS+'）');
                    }else if(item.PARENT_DL=='NK04'){
                        software = software + item.SUMS;
                        $("#software3").html('（'+item.SUMS+'）');
                    }
                })
                $("#software").html(software);
            }else{
                layer.alert(result.data.msg);
            }
        }
    })
}
//三大行动
function renderWDXD(){

    var domWidth=$(".svgpanel").width();
    var domHeight=$(".svgpanel").height();

    var svgWidth=$("#svgfzfx").width();
    var svgHeight=$("#svgfzfx").height();
    var zoom=domWidth/svgWidth<domHeight/svgHeight?domWidth/svgWidth:domHeight/svgHeight;
    var tranX=(domWidth-svgWidth)/2;
    var tranY=(domHeight-svgHeight)/2;
    //$("#svgfzfx").css("transform",`translate(${tranX}px,${tranY}px) scale(${zoom})`);
}
//营业收入情况
function renderYYSR(){
    var url=BASE_URL+'/industryDistributionController/getIndustryEntVendinc';
    var params ={
        YEAR: YEAR,
        INDUSTRY: INDUSTRY,
        TYPE: 'GSYYSR'
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(url,params,function(result){
        var datas=[];
        var names=[];
        if(result.status == 10001) {
            result.data.forEach(function(item, index){
                names.push(item.CODE_VALUE);
                datas.push(item.ENTSUMS);
            })
            var option = {
                color:["#057ac9"],
                title:{
                    text:"营\n业\n收\n入",
                    left:5,
                    top:"20%",
                    padding:10,
                    textStyle:{
                        color:"#fff",
                    },
                    backgroundColor:"rgba(255,255,255,0.2)"
                },
                grid: {
                    top: '5%',
                    left: '60',
                    right: '8%',
                    bottom: '8%',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    triggerEvent:true,//控制X轴可以点击
                    data: names,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle:{
                            color:"#245a7e"
                        }
                    },
                    axisLabel:{
                        interval: 0,
                        textStyle: {
                        	color: "#ffffff"
                        },
                        formatter: function(value) {
                        	var ret = ""; //拼接加\n返回的类目项
                        	var maxLength = 5; //每项显示文字个数
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
                    splitLine:{
                        show:false
                    },
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLabel:{
                        color:"#fff"
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#20567c"
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type:"dashed",
                            color: '#245a7e'
                        }
                    },
                },
                series: [{
                    data: datas,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}家',
                        color:"#fff"
                    },
                    barWidth: 20,
                }]
            };
            var chart1 = document.getElementById('chart1');
            var myChart = echarts.init(chart1);
            myChart.setOption(option);
            myChart.off('click');//(多次重复绑定会导致弹出多层窗口)
            myChart.on('click', function (param) {
                CLSJ = '', ZCZJ = '',NSZE='',CYRY='',CONDITION='2';
                if(names.indexOf(param.value) > -1){
                    YYSR=CODE_NAME[names.indexOf(param.value)];
                }else{
                    YYSR=CODE_NAME[param.dataIndex];
                }
                $("select[name='city']").val(CONDITION);
                getEnterpriseList();
            });
            var canPlayAction=true;
            myChart.on("mouseover",function(){
                canPlayAction=false;
            })
            myChart.on("mouseout",function(){
                canPlayAction=true;
            })

            let seed = 0;
            setInterval(function(){
                if(!canPlayAction){return;}
                var index = seed % datas.length;
                datas.map(function(item,i){
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
            },10000)
        }else{
            layer.msg(result.data.msg);
        }
    })
}
//纳税情况
function renderRATGRO(){
    var url=BASE_URL+'/industryDistributionController/getIndustryEntRatgro';
    var params ={
        YEAR: YEAR,
        INDUSTRY: INDUSTRY,
        TYPE: 'GSNSJE'
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(url,params,function(result){
        var datas=[];
        var names=[];
        if(result.status == 10001) {
            result.data.forEach(function(item, index){
                names.push(item.CODE_VALUE);
                datas.push(item.ENTSUMS);
            })
            var option = {
                title:{
                    text:"纳\n税\n额",
                    left:5,
                    top:"20%",
                    padding:10,
                    textStyle:{
                        color:"#fff",
                    },
                    backgroundColor:"rgba(255,255,255,0.2)"
                },
                grid: {
                    top: '5%',
                    left: '70',
                    right: '8%',
                    bottom: '8%',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    borderColor:"#fff",
                    axisPointer: {
                        type: 'line'
                    }
                },
                xAxis: [{
                    type: 'category',
                    show:false
                },
                    {
                        triggerEvent:true,//控制X轴可以点击
                        type: 'category',
                        position: "bottom",
                        data: names,
                        axisTick: {
                            show: false
                        },
                        axisLabel:{
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
                    }

                ],
                yAxis: {
                    show: true,
                    offset: "10",
                    axisLabel:{
                        color:"#fff"
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#20567c"
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type:"dashed",
                            color: '#245a7e'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                },
                series: [{

                    type: 'pictorialBar',
                    xAxisIndex: 1,
                    barCategoryGap: '-30%',
                    symbol: 'path://d="M50 0 L150 0 L100 -100  Z"',
                    itemStyle: {
                        normal: {
                            color:  'rgba(179,86,70,0.5)',
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}家',
                        color:"#fff"
                    },
                    data: datas,
                },

                ]
            }
            var chart2 = document.getElementById('chart2');
            var myChart = echarts.init(chart2);
            myChart.setOption(option);
            myChart.off('click');//(多次重复绑定会导致弹出多层窗口)
            myChart.on('click', function (param) {
                CLSJ = '', ZCZJ = '',YYSR='',CYRY='',CONDITION='3';
                if(names.indexOf(param.value) > -1){
                    NSZE=CODE_NAME[names.indexOf(param.value)];
                }else{
                    NSZE=CODE_NAME[param.dataIndex];
                }
                $("select[name='city']").val(CONDITION);
                getEnterpriseList();
            });
            var canPlayAction=true;
            myChart.on("mouseover",function(){
                canPlayAction=false;
            })
            myChart.on("mouseout",function(){
                canPlayAction=true;
            })

            let seed = 0;
            setInterval(function(){
                if(!canPlayAction){return;}
                var index = seed % datas.length;
                datas.map(function(item,i){
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
            },10000)
        }else{
            layer.msg(result.data.msg);
        }
    })
}
//从业人员情况
function renderEMPNUM(){
    var url=BASE_URL+'/industryDistributionController/getIndustryEntEmpnum';
    var params ={
        YEAR: YEAR,
        INDUSTRY: INDUSTRY,
        TYPE: 'GSCYRY'
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(url,params,function(result){
        var datas=[];
        var names=[];
        if(result.status == 10001) {
            result.data.forEach(function(item, index){
                names.push(item.CODE_VALUE);
                datas.push(item.ENTSUMS);
            })
            var option = {
                title:{
                    text:"从\n业\n人\n员",
                    left:5,
                    top:"20%",
                    padding:10,
                    textStyle:{
                        color:"#fff",
                    },
                    backgroundColor:"rgba(255,255,255,0.2)"
                },
                grid: {
                    top: '5%',
                    left: '70',
                    right: '8%',
                    bottom: '8%',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    borderColor:"#fff",
                    axisPointer: {
                        type: 'line'
                    }
                },
                xAxis: [{
                    type: 'category',
                    show:false
                },
                    {
                        triggerEvent:true,//控制X轴可以点击
                        type: 'category',
                        position: "bottom",
                        data: names,
                        axisTick: {
                            show: false
                        },
                        axisLabel:{
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
                    }

                ],
                yAxis: {
                    show: true,
                    offset: "10",
                    axisLabel:{
                        color:"#fff"
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#20567c"
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type:"dashed",
                            color: '#245a7e'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                },
                series: [{

                    type: 'pictorialBar',
                    xAxisIndex: 1,
                    barCategoryGap: '-30%',
                    symbol: 'path://d="M50 0 L150 0 L100 -100  Z"',
                    itemStyle: {
                        normal: {
                            color:  'rgba(32,190,223,0.5)',
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}家',
                        color:"#fff"
                    },
                    data: datas,
                },

                ]
            }
            var chart3 = document.getElementById('chart3');
            var myChart = echarts.init(chart3);
            myChart.setOption(option);
            myChart.off('click');//(多次重复绑定会导致弹出多层窗口)
            myChart.on('click', function (param) {
                CLSJ = '', ZCZJ = '',YYSR='',NSZE='',CONDITION='5';
                if(names.indexOf(param.value) > -1){
                    CYRY=CODE_NAME[names.indexOf(param.value)];
                }else{
                    CYRY=CODE_NAME[param.dataIndex];
                }
                $("select[name='city']").val(CONDITION);
                getEnterpriseList();
            });
            var canPlayAction=true;
            myChart.on("mouseover",function(){
                canPlayAction=false;
            })
            myChart.on("mouseout",function(){
                canPlayAction=true;
            })

            let seed = 0;
            setInterval(function(){
                if(!canPlayAction){return;}
                var index = seed % datas.length;
                datas.map(function(item,i){
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
            },10000)
        }else{
            layer.msg(result.data.msg);
        }
    })
}
//企业列表
function changeSelect(ths){
    CONDITION = $(ths).val();
    getEnterpriseList();
}
function getEnterpriseList(){
    var params ={
        YEAR: YEAR,
        CONDITION: CONDITION,
        INDUSTRY: INDUSTRY,
        CLSJ : CLSJ,
        ZCZJ : ZCZJ,
        YYSR : YYSR,
        NSZE : NSZE,
        CYRY : CYRY
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industryDistributionController/getChainEnterprise',
        data:{
            param:JSON.stringify(params)//参数
        },
        cache : false,
        success : function(res) {
            var result = JSON.parse(res);
            $("#rTbox table tbody").empty();
            if(result.status == 10001) {
                if(CONDITION == '1'||CONDITION == '2'){
                    $(".th_title").text("营收（万元）")
                }else if(CONDITION == '3'){
                    $(".th_title").text("纳税额（万元）")
                }else if(CONDITION == '4'){
                    $(".th_title").text("净利润（万元）")
                }else if(CONDITION == '5'){
                    $(".th_title").text("从业人员（人）")
                }
                result.data.forEach(function(item, index){
                    var DATAVALUE = item.DATAVALUE;
                    if (DATAVALUE == undefined || DATAVALUE == 'undefined') {
                        DATAVALUE = '-';
                    }else{
                        if(CONDITION==5){
                            DATAVALUE=Math.round(DATAVALUE);
                        }
                    }
                    indNum = item.Serial;
                    if(indNum < 4){
                        $("#rTbox table tbody").append('<tr><td width="8%"><i>'+ indNum +'</i></td>'
                            + '<td width="45%" onclick="tzQyhx(\''+item.PRIPID+'\',\''+item.REGNO+'\',\''+item.ENTNAME+'\',\''+item.KEYNO+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center">'+ DATAVALUE +'</td>'
                            + '</tr>')

                    }else{
                        $("#rTbox table tbody").append('<tr><td width="8%">'+ indNum +'</td>'
                            + '<td width="45%" onclick="tzQyhx(\''+item.PRIPID+'\',\''+item.REGNO+'\',\''+item.ENTNAME+'\',\''+item.KEYNO+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center" >'+ DATAVALUE +'</td>'
                            + '</tr>')
                    }
                })

            }else{
                this.$message.error(result.data.msg);
            }
        }
    })

}
//调转企业画像
/*function tzQyhx(PRIPID,REGNO,ENTNAME,KEYNO){
    if(!REGNO || REGNO=='undefined'){//如果REGNO为空则传ENTNAME
        window.location.href=realPath+"view/qyhx/qyhx.html?menuType=3&PRIPID="+PRIPID+"&REGNO="+ENTNAME+"&KEYNO="+KEYNO+"&ENTNAME="+ENTNAME;
    }else{
        window.location.href=realPath+"view/qyhx/qyhx.html?menuType=3&PRIPID="+PRIPID+"&REGNO="+REGNO+"&KEYNO="+KEYNO+"&ENTNAME="+ENTNAME;
    }
}*/

$(".rbox").click(function(){
    $(".overdom").remove()
    var width=$(this).width();
    var height=$(this).height();
    var left=$(this)[0].offsetLeft;
    var top=$(this)[0].offsetTop
    var overDom=`<svg class="overdom" style="width:100%; height:100%; left:0; top:0; position:absolute; ">
                    <path d="M2 2  L${width-2} 2 L${width-2} ${height-2} L2 ${height-2} Z" fill="transparent" stroke="#D77B2F" stroke-width="5"  />
                    <path d="M2 2  L${width-2} 2 L${width-2} ${height-2} L2 ${height-2} Z" fill="transparent" stroke="rgba(41,108,179,0.5)" stroke-width="5"  class="line1"  />
                    
                </svg>`;
    $(this).append(overDom);

});
