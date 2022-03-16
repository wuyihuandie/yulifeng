var companyNum = 0; // 总数
var wCurrent = 1; // 当前页
var listNum=0;//总页数

var CONDITION = "1";
var INDUSTRY = 'NK05';//行业
var YYSR = '';
var NSZE = '';
var CYRY = '';
var CODE_NAME = ["1","2","3","4","5"]
var industry = ['NK01', 'NK02', 'NK03', 'NK04','NK05'];
var INDUSTRY_NAME = "信息传输、软件和信息技术服务业";
var industry_name = ['计算机、通信和其他电子设备制造业', '电信、广播电视和卫星传输服务业', '互联网和相关服务业', '软件和信息技术服务业','信息传输、软件和信息技术服务业'];
var QYTYPE_LIST=['GSQY','WHGSQY','ZDSGQY','QZSGQY','PYQY','FGS'];//规上企业，其他规上企业，重点上规企业，潜在上规企业，培育企业，外商投资分公司
var QYTYPE = 'HYQY';//企业统计类型
var YSTYPE_LIST=['GSYYSR','WHGSYYSR','ZDYYSR','QZYYSR','PYYYSR','FGSYYSR'];
var YSTYPE = 'YYSR';//营收类型
var NSTYPE_LIST=['GSNSJE','WHGSNSJE','ZDNSJE','QZNSJE','PYNSJE','FGSNSJE'];
var NSTYPE = 'NSJE';//纳税类型
var RYTYPE_LIST=['GSCYRY','WHGSCYRY','ZDCYRY','QZCYRY','PYCYRY','FGSCYRY'];
var RYTYPE = 'CYRY';//从业人员类型
YEAR="2020";
$(".ctitle").text(YEAR);
var title = "家";

$(function(){
    $(".ctitle").text(YEAR);
	/*rectboxHighlight($(".rectleft"));*///中上右边，svg不能点击
    if( getCookie("area_value")!=360100){
        areatitle = getCookie("area_name");
        $(".areatitle").text(areatitle);
    }
	// 企业成立跳转
	$('#qycl').click(function(){
		window.location.href = 'qycl.html?menuType=1'
	})
	// 企业注销跳转
	$('#qyzx').click(function(){
		window.location.href = 'qyzx.html?menuType=1'
	})
	//在册企业刷新当前页
	$('#qycz').click(function(){
		location.reload()
	})

    submitForm();

    $('.cleft').click(function() {
        var year = $(".ctitle").text();
        //只能看近三年的数据
        if (year != '2019') {
            year--;
            $(".ctitle").text(year);
            YEAR = year + "";
            getIndustryChainOverAll();
            getQyBusinessdatas();
            getIndustryPmNums();
            getQydatas();
            renderYYSR();
            renderRATGRO();
            renderEMPNUM();
            if(QYTYPE=='GSQY'){
                getGsEnterpriseList();
            }else{
                getEnterpriseList("1");
            }
            $(".pieDom-t").removeClass("pieDom-xz");
        }
    })
    $('.cright').click(function() {
        var year = $(".ctitle").text();
        //只能看近三年的数据
        if ('2020' != year) {
            year++;
            $(".ctitle").text(year);
            YEAR = year + "";
            getIndustryChainOverAll();
            getQyBusinessdatas();
            getIndustryPmNums();
            getQydatas();
            renderYYSR();
            renderRATGRO();
            renderEMPNUM();
            if(QYTYPE=='GSQY'){
                getGsEnterpriseList();
            }else{
                getEnterpriseList("1");
            }
            $(".pieDom-t").removeClass("pieDom-xz");
        }
    })
})
function submitForm(){
    getIndustryChainOverAll();
    getQyBusinessdatas();
    getQydatas();
    getIndustryPmNums();
    renderYYSR();
    renderRATGRO();
    renderEMPNUM();
    getEnterpriseList("1");//企业列表
}
//数字经济产业现状
function getIndustryChainOverAll() {
    var params ={
        AREA_VALUE:'',
        YEAR: YEAR,
        INDUSTRY: INDUSTRY,
        TYPE:QYTYPE
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }

    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industryDistributionController/getZcqyIndustryOverview',
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
                if (result.data != null) {
                    var item = result.data;
                    new CountUp('ENTNUMS', item.SUMS).start();
                    //new CountUp('ENTZS', item.RATE, option1).start();
                }
            }
        }
    })
}
//查询数字经济企业营收
function getQyBusinessdatas() {
    var params ={
        YEAR: YEAR,
        INDUSTRY:INDUSTRY,
        TYPE:QYTYPE
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(BASE_URL+'/industryDistributionController/getNanchangIndustryOverview',params,function (result) {

        var option1 = {
            startVal: 0,
            decimalPlaces: 2,
            duration: 1.9,
        };
        if(result.status == 10001) {
            result.data.forEach(function (item, index) {
                new CountUp('VENDINC', item.VENDINC, option1).start();
                new CountUp('EMPNUM', item.EMPNUM, option1).start();
                new CountUp('RATGRO', item.RATGRO, option1).start();
            })
        }else{
            $("#VENDINC").text("-");
            $("#VENDINCZS").text("-");
            $("#HARDVENDINC").text("-");
            $("#HARDVENDINCZS").text("-");
            $("#SOFTVENDINC").text("-");
            $("#SOFTVENDINCZS").text("-");
        }
    })
}
//查询规上企业营收
function getGsQyBusinessdatas() {
    var params ={
        YEAR: YEAR,
        INDUSTRY:INDUSTRY
    }
    if(YEAR == nowdate){
        params.MONTH=new Date().getMonth()-1+"";
    }else{
        params.MONTH='12';
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(BASE_URL+'/qyyxjcController/getTotalInfo',params,function (result) {
        var option1 = {
            startVal: 0,
            decimalPlaces: 2,
            duration: 1.9,
        };
        if(result.status == 10001) {
            result.data.forEach(function (item, index) {
                /*new CountUp('VENDINC', item.VENDINC, option1).start();
                new CountUp('EMPNUM', item.EMPNUM, option1).start();
                new CountUp('RATGRO', item.RATGRO, option1).start();*/
                if(item.TYPE==2){
                    new CountUp('VENDINC', Number((item.DATAVALUE)/10000).toFixed(2),option1).start();
                }else if(item.TYPE==3){
                    new CountUp('RATGRO', Number((item.DATAVALUE)/10000).toFixed(2),option1).start();
                }else if(item.TYPE==5){
                    new CountUp('EMPNUM', Number((item.DATAVALUE)/10000).toFixed(2),option1).start();
                }
            })

        }
    })
}
//核心产业数量 4大类
function getIndustryPmNums() {
    var params = {
        YEAR: YEAR,
        CONDITION: '1',
        AREA_VALUE: ''
    };
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(BASE_URL + '/industryDistributionController/getZcqyIndustryEntPmNums',params,function(result){
        if (result.status == 10001) {
            //各省份的数据
            var software=0;
            result.data.forEach(function (item, index) {
                if(item.PARENT_DL=='NK01'){
                    /*$("#hardWareName").html(item.CHAIN_NAME);*/
                    /*$("#hardWareSums").html('（'+item.SUMS+'）');*/
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
        }
    })
}
//企业数量查询
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
    doData(BASE_URL + '/industryDistributionController/getQysl',params,function(result){
        var option1 = {
            startVal: 0,
            decimalPlaces: 2,
            duration: 1.9,
        };
        if (result.status == 10001) {
            result.data.forEach(function (item, index) {
                if(item.TYPE=='GSQY'){
                    $("#GSQYSL").text(item.SUMS);
                }else if(item.TYPE=='WHGSQY'){
                    $("#WHGSQYSL").text(item.SUMS);
                }else if(item.TYPE=='ZDSGQY'){
                    $("#ZDSGQYSL").text(item.SUMS);
                }else if(item.TYPE=='QZSGQY'){
                    $("#QZSGQYSL").text(item.SUMS);
                }else if(item.TYPE=='PYQY'){
                    $("#PYQYSL").text(item.SUMS);
                }else if(item.TYPE=='FGS'){
                    $("#FGSSL").text(item.SUMS);
                }
            })
        }
    })
}
//营业收入情况
function renderYYSR(){
    var url=BASE_URL+'/industryDistributionController/getIndustryEntVendinc';
    var params ={
        YEAR: YEAR,
        INDUSTRY: INDUSTRY,
        TYPE: YSTYPE
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
                    top: '8%',
                    left: '60',
                    right: '8%',
                    bottom: '5%',
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
                NSZE='',CYRY='',CONDITION='2';
                if(names.indexOf(param.value) > -1){
                    YYSR=CODE_NAME[names.indexOf(param.value)];
                }else{
                    YYSR=CODE_NAME[param.dataIndex];
                }
                $("select[name='city']").val(CONDITION);
                if(QYTYPE=='GSQY'){
                    getGsEnterpriseList();
                }else{
                    getEnterpriseList("1");
                }
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
        TYPE: NSTYPE
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
                    top: '8%',
                    left: '70',
                    right: '8%',
                    bottom: '5%',
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
                YYSR='',CYRY='',CONDITION='3';
                if(names.indexOf(param.value) > -1){
                    NSZE=CODE_NAME[names.indexOf(param.value)];
                }else{
                    NSZE=CODE_NAME[param.dataIndex];
                }
                $("select[name='city']").val(CONDITION);
                if(QYTYPE=='GSQY'){
                    getGsEnterpriseList();
                }else{
                    getEnterpriseList("1");
                }
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
        TYPE: RYTYPE
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
                    top: '8%',
                    left: '70',
                    right: '8%',
                    bottom: '5%',
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
                YYSR='',NSZE='',CONDITION='5';
                if(names.indexOf(param.value) > -1){
                    CYRY=CODE_NAME[names.indexOf(param.value)];
                }else{
                    CYRY=CODE_NAME[param.dataIndex];
                }
                $("select[name='city']").val(CONDITION);
                if(QYTYPE=='GSQY'){
                    getGsEnterpriseList();
                }else{
                    getEnterpriseList("1");
                }
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
    if(QYTYPE=='GSQY'){
        getGsEnterpriseList();
    }else{
        getEnterpriseList("1");
    }

}
//企业列表
function getEnterpriseList(page){
    var params ={
        page: page,
        limit:"500",
        YEAR: YEAR,
        CONDITION: CONDITION,
        INDUSTRY: INDUSTRY,
        YYSR : YYSR,
        NSZE : NSZE,
        CYRY : CYRY,
        TYPE : QYTYPE
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    $.ajax({
        type: 'POST',
        url : BASE_URL+'/industryDistributionController/getNanchangChainEnterprise',
        data:{
            param:JSON.stringify(params)//参数
        },
        cache : false,
        success : function(res) {
            var result = JSON.parse(res);
            if(page=='1'){
                $("#rTbox table tbody").empty();
            }
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
                // 总数量
                companyNum = result.data.count;
                // 第几页
                wCurrent = result.data.page;
                // 统计总页数
                listNum = companyNum / 500 < 0 ? 0 : Math.ceil(companyNum / 500);
                $("#rTbox table tbody").empty();
                result.data.list.forEach(function(item, index){
                   
                    indNum = 500*(page-1)+(index+1);
                    if(indNum < 4){
                        if(CONDITION == '1'||CONDITION == '2'){
                            $("#rTbox table tbody").append('<tr><td width="8%"><i>'+ indNum +'</i></td>'
                                + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center">'+ (item.VENDINC=='undefined'||item.VENDINC==undefined?'-':item.VENDINC) +'</td>'
                                + '</tr>')
                        }else if(CONDITION == '3'){
                            $("#rTbox table tbody").append('<tr><td width="8%"><i>'+ indNum +'</i></td>'
                                + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center">'+ (item.RATGRO=='undefined'||item.RATGRO==undefined?'-':item.RATGRO) +'</td>'
                                + '</tr>')
                        }else if(CONDITION == '4'){
                            $("#rTbox table tbody").append('<tr><td width="8%"><i>'+ indNum +'</i></td>'
                                + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center">'+ (item.NETINC=='undefined'||item.NETINC==undefined?'-':item.NETINC) +'</td>'
                                + '</tr>')
                        }else if(CONDITION == '5'){
                            $("#rTbox table tbody").append('<tr><td width="8%"><i>'+ indNum +'</i></td>'
                                + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center">'+ (item.EMPNUM=='undefined'||item.EMPNUM==undefined?'-':item.EMPNUM) +'</td>'
                                + '</tr>')
                        }
                    }else{
                        if(CONDITION == '1'||CONDITION == '2'){
                            $("#rTbox table tbody").append('<tr><td width="8%">'+ indNum +'</td>'
                                + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center" >'+ (item.VENDINC=='undefined'||item.VENDINC==undefined?'-':item.VENDINC) +'</td>'
                                + '</tr>')
                        }else if(CONDITION == '3'){
                            $("#rTbox table tbody").append('<tr><td width="8%">'+ indNum +'</td>'
                                + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center" >'+ (item.RATGRO=='undefined'||item.RATGRO==undefined?'-':item.RATGRO) +'</td>'
                                + '</tr>')
                        }else if(CONDITION == '4'){
                            $("#rTbox table tbody").append('<tr><td width="8%">'+ indNum +'</td>'
                                + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center" >'+ (item.NETINC=='undefined'||item.NETINC==undefined?'-':item.NETINC) +'</td>'
                                + '</tr>')
                        }else if(CONDITION == '5'){
                            $("#rTbox table tbody").append('<tr><td width="8%">'+ indNum +'</td>'
                                + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center" >'+ (item.EMPNUM=='undefined'||item.EMPNUM==undefined?'-':item.EMPNUM) +'</td>'
                                + '</tr>')
                        }
                    }
                })
                if(wCurrent=="1"){
                    layui.use(['laypage', 'layer'], function(){
                        var laypage = layui.laypage,layer = layui.layer;
                        laypage.render({
                            elem: 'fy'
                            ,count: companyNum
                            ,limit:500
                            ,layout: ['prev', 'page', 'next']
                            ,theme: '#0ca0a3'
                            ,jump: function(obj,first){
                                let curr = obj.curr;
                                if(!first){
                                    getEnterpriseList(curr+"");
                                }
                            }
                        });
                    });
                }
            }else{
                this.$message.error(result.data.msg);
            }
        }
    })

}
//规上企业列表
function getGsEnterpriseList(){
    var CONDITIONS = CONDITION;
    if(CONDITION=='1'){
        CONDITIONS='2';
    }
    var params ={
        YEAR: YEAR,
        CONDITION: CONDITIONS,
        INDUSTRY: INDUSTRY,
        YYSR : YYSR,
        NSZE : NSZE,
        CYRY : CYRY
    }
    if(getCookie("area_value")==360100){
        params.AREA_VALUE='';
    }else{
        params.AREA_VALUE=getCookie("area_value");
    }
    doData(BASE_URL + '/industryDistributionController/getChainEnterprise',params,function(result){

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
                        + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center">'+ DATAVALUE +'</td>'
                        + '</tr>')

                }else{
                    $("#rTbox table tbody").append('<tr><td width="8%">'+ indNum +'</td>'
                        + '<td width="45%" onclick="tzQyhx(\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+ item.ENTNAME +'</td><td  style="text-align:center" >'+ DATAVALUE +'</td>'
                        + '</tr>')
                }
            })
        }
    })

}

//产业类型点击事件
function changeIndustry(params,ths){
    if(params==4){
        //rectboxHighlight($(".rectleft"));
        $(".rectleft").css("background","transparent");
        $(".rectleft").css("border","4px solid #FFFF83");
        $(".lbtn").css("border","none");
    }else{
        $(".rectleft").css("background","url(../../source/img/cyfx/big-xz.png) no-repeat");
        $(".rectleft").css("border","none");
        $(".lbtn").css("border","none");
        $(ths).css("border","4px solid #FFFF83");
        //rectboxHighlight(ths);
    }
    INDUSTRY=industry[params];
    INDUSTRY_NAME=industry_name[params];
    $("#pieDom-title").text(INDUSTRY_NAME);
    QYTYPE="HYQY";
    YSTYPE="YYSR";
    NSTYPE="NSJE";
    RYTYPE="CYRY";
    $(".pieDom-t").removeClass("pieDom-xz");
    submitForm();
}
//企业类型点击事件
function changeQyType(params,ths){
    QYTYPE=QYTYPE_LIST[params];
    YSTYPE=YSTYPE_LIST[params];
    NSTYPE=NSTYPE_LIST[params];
    RYTYPE=RYTYPE_LIST[params];
    $(".pieDom-t").removeClass("pieDom-xz");
    $(ths).parents(".pieDom-t").addClass("pieDom-xz");
    if(QYTYPE=='GSQY'){
        new CountUp('ENTNUMS', $("#GSQYSL").text()).start();
        getGsQyBusinessdatas();
        getGsEnterpriseList();
    }else{
        getIndustryChainOverAll();
        getQyBusinessdatas();
        getEnterpriseList("1");
    }
    renderYYSR();
    renderRATGRO();
    renderEMPNUM();
}

//企业信用详情
function tzQyhx(REGNO,ENTNAME){
    var datas = {};
    datas.REGNO=ENTNAME;
    doData(BASE_URL+'/entPanoramicNewController/getEntCreditxq',datas,function(jsonData){
        var url = jsonData.data.httpUrl;
        url = decodeURI(url);//unicode解码
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

//样式事件
function rectboxHighlight(ths){
    /*$(".overdom").remove()
    var width=$(ths).width();
    var height=$(ths).height();
    var left=$(ths)[0].offsetLeft;
    var top=$(ths)[0].offsetTop
    var overDom=`<svg class="overdom" style="width:100%; height:100%; left:0; top:0; position:absolute; ">
                        <path d="M2 2  L${width-2} 2 L${width-2} ${height-2} L2 ${height-2} Z" fill="transparent" stroke="#ffff83" stroke-width="5"  />
                        <path d="M2 2  L${width-2} 2 L${width-2} ${height-2} L2 ${height-2} Z" fill="transparent" stroke="rgba(41,108,179,0.5)" stroke-width="5"  class="line1"  />
                        
                    </svg>`;
    $(ths).append(overDom);*/
}

//查看企业列表
var qytitle="";
function queryEntList() {
    if(QYTYPE=='GSQY'){
        queryGsList();
    }else{
        var areas = '';
        var tt = "";
        if(QYTYPE=='HYQY'){
            tt="活跃企业";
        }else if(QYTYPE=='WHGSQY'){
            tt="其他规上企业";
        }else if(QYTYPE=='ZDSGQY'){
            tt="重点上规企业";
        }else if(QYTYPE=='QZSGQY'){
            tt="潜在上规企业";
        }else if(QYTYPE=='PYQY'){
            tt="500-1500万的企业";
        }else if(QYTYPE=='FGS'){
            tt="外地投资分公司";
        }
        if(getCookie("area_value")==360100){
            areas='';
            qytitle = '南昌市' + YEAR + "年" + INDUSTRY_NAME + tt;
        }else{
            areas=getCookie("area_name");
            qytitle = areas + YEAR + "年" + INDUSTRY_NAME + tt;
        }
        layer.open({
            type: 2,
            shade: 0.1,
            title: false, //不显示标题
            area: ['100%', '100%'], //宽高
            content: realPath + "view/qylist.html?AREA_NAME=" + areas + "&INDUSTRY=" + INDUSTRY + "&YEAR=" + YEAR + "&qytitle=" + qytitle+"&TYPE="+QYTYPE
        })
    }
}

function queryByType(params){
    var tj = QYTYPE_LIST[params];
    var areas = '';
    var tt = "";
    if(tj=='HYQY'){
        tt="活跃企业";
    }else if(tj=='WHGSQY'){
        tt="其他规上企业";
    }else if(tj=='ZDSGQY'){
        tt="重点上规企业";
    }else if(tj=='QZSGQY'){
        tt="潜在上规企业";
    }else if(tj=='PYQY'){
        tt="500-1500万的企业";
    }else if(tj=='FGS'){
        tt="外地投资分公司";
    }
    if(getCookie("area_value")==360100){
        areas='';
        qytitle = '南昌市' + YEAR + "年" + INDUSTRY_NAME + tt;
    }else{
        areas=getCookie("area_name");
        qytitle = areas + YEAR + "年" + INDUSTRY_NAME + tt;
    }
    if(tj=='WHGSQY'){
        layer.open({
            type: 2,
            shade: 0.1,
            title: false, //不显示标题
            area: ['100%', '100%'], //宽高
            content: realPath + "view/cyfx/qtgsqylist.html?AREA_NAME=" + areas + "&INDUSTRY=" + INDUSTRY  + "&YEAR=" + YEAR + "&qytitle=" + qytitle+"&TYPE="+tj
        })
    }else{
        layer.open({
            type: 2,
            shade: 0.1,
            title: false, //不显示标题
            area: ['100%', '100%'], //宽高
            content: realPath + "view/qylist.html?AREA_NAME=" + areas + "&INDUSTRY=" + INDUSTRY + "&YEAR=" + YEAR + "&qytitle=" + qytitle+"&TYPE="+tj
        })
    }

}
//查看规上企业列表
function queryGsList() {
    var area_name="";
    if(getCookie("area_value")==360100){
        area_name='';
    }else{
        area_name=getCookie("area_name");
    }
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
        content: realPath + "view/sy/gsqylist.html?AREA_NAME=" + area_name + "&INDUSTRY=" + INDUSTRY + "&YEAR=" + YEAR + "&qytitle=" + jj
    })
}


