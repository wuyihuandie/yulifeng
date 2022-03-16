var TYPE_R = "";
var PRIPID = getUrlValue("PRIPID");//获取url链接里的PRIPID参数
var REGNO = getUrlValue("REGNO");//获取url链接里的REGNO参数
var TYPE = getUrlValue("TYPE");//获取url链接里的type参数
var KEYNO = getUrlValue("KEYNO");//获取url链接里的KEYNO参数
var ENTNAME = getUrlValue("ENTNAME");//获取url链接里的ENTNAME参数
$(function(){
	queryIntellectual();
	qyjbxx();//基本信息
	qyjynjyqk();//近五年经营状况
	qjst();//全景视图
	yq();//舆情
})
// 知识产权数
function queryIntellectual(){
	let data = {searchKey:ENTNAME};
	doData( BASE_URL+'/entPanoramicNewController/queryIntellectualTotal',data,function (result) {
		if (result.status==10001){
			$("#BRAND").text(result.data.BRAND);
			$("#PATENT").text(result.data.PATENT);
			$("#SOFT_WORK").text(result.data.SOFT_WORK);
		}else {
			layer.msg(result.msg,{icon:2,time:5000});
		}
	});
}
//企业信息
function qyjbxx()  {
	var datas = {};
	datas.PRIPID=PRIPID;
	$.ajax({
		type: 'POST',
		url : BASE_URL+'/entPanoramicNewController/getEntMsg',
		data:{
			param:JSON.stringify(datas)//参数
		},
		cache : false,
		success : function(text) {
			let jsonData=eval('('+text+')')
			let ENTNAME=jsonData.data.ENTNAME; //企业名称
			let CODE_NAME=jsonData.data.CODE_NAME; //国民经济行业分类
			let UNISCID=jsonData.data.UNISCID;//统一社会信用代码
			let NAME=jsonData.data.NAME;//法人姓名
			let DOM=jsonData.data.DOM;//地址
			let ESTDATE=jsonData.data.ESTDATE;//成立日期
			let CHAIN_NAME = '';
			if(jsonData.data.INDUSTRY_NAME && jsonData.data.INDUSTRY_NAME!='undefined'){
				$(".labels").append('<p class="lab1">'+jsonData.data.INDUSTRY_NAME+'</p>')
			}
			if(jsonData.data.CHAIN_NAME && jsonData.data.CHAIN_NAME!='undefined'){
				CHAIN_NAME =jsonData.data.CHAIN_NAME.split(',');
				for (let i = 0; i < CHAIN_NAME.length; i++) {
					$(".labels").append('<p class="lab1">'+CHAIN_NAME[i]+'</p>')
				}
			}
			if(jsonData.data.ZDY_NAME && jsonData.data.ZDY_NAME!='undefined'){
				CHAIN_NAME =jsonData.data.ZDY_NAME.split(',');
				for (let i = 0; i < CHAIN_NAME.length; i++) {
					$(".labels").append('<p class="lab1">'+CHAIN_NAME[i]+'</p>')
				}
			}
			$("#ENTNAME").html(ENTNAME);
			$("#CODE_NAME").html(CODE_NAME);
			$("#UNISCID").html(UNISCID);
			$("#NAME").html(NAME);
			$("#DOM").html(DOM);
			$("#ESTDATE").html(ESTDATE);

		}});

}
//企业近五年经营情况
function qyjynjyqk() {
	var qyjynjyqk = echarts.init(document.getElementById('qyjynjyqk'));
	qyjynjyqk.showLoading({text: '正在加载数据'});//增加提示
	var datas = {};
	datas.PRIPID=PRIPID;
	datas.TYPE_R=TYPE_R;
	$.ajax({
		type: 'POST',
		url : BASE_URL+'/entPanoramicNewController/getEntBusinessData',
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
						color:'#f9cb63',
						data: jsonData.businessList
					},
					{
						name: '税金（万元）',
						type: 'bar',
						barWidth: 20,
						data: jsonData.payList
					},
					{
						name: '营收增长率',
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
//全景视图
function qjst() {
	let myChart = echarts.init(document.getElementById('qjst'));
	myChart.showLoading();
	let data = {KeyNo: KEYNO, entname: ENTNAME};
	doData(BASE_URL+'/entPanoramicNewController/queryAllView', data, function (result) {
		if (result.status == 10001) {
			myChart.hideLoading();
			let data = result.data.dataList;
			let links = result.data.linksList;
			let categories = result.data.categoriesList;
			option = {
				tooltip: {},
				toolbox: {
					iconStyle: {
						normal: {
							borderColor: '#fff'
						},
						emphasis: {
							borderColor: '#b1e4ff'
						}
					},
					feature: {
						myTool1: {
							show: true,
							title: '放大',
							icon: 'image://' + BASE_URL + '/source/img/fd.png',
							onclick: function () {
								fd();
							}
						}
						, myTool2: {
							show: false,
							title: '缩小',
							icon: 'image://' + BASE_URL + '/source/img/sx.png',
							onclick: function (params, ticket, callback) {
								sx2();
							}
						}
					},
					bottom: '0'
				},
				legend: [{
					data: categories.map(function (a) {
						return a.name;
					}),
					textStyle: {
						fontSize: 12,//字体大小
						color: 'white'//字体颜色
					},
				}],
				animationDurationUpdate: 1500,
				animationEasingUpdate: 'quinticInOut',
				series: [
					{
						type: 'graph',
						layout: 'force',
						force: {
							repulsion: 200,
						},
						data: data,
						links: links,
						categories: categories,
						roam: true,
						focusNodeAdjacency: true,
						label: {
							show: true,
							position: 'right',
							formatter: '{b}',
						},
						emphasis: {
							lineStyle: {
								width: 10
							}
						},

					}
				]
			};
			myChart.setOption(option);
			myChart.on('click', {dataType: 'node'}, function (event) {
				if (event.data.mycontent != undefined) {
					layer.open({
						type: 1,
						title: '详情',
						shade: false,
						scrollbar: false,
						area: ['40%', '30%'],
						content: '<div>' + event.data.mycontent + '</div>'
					});
				}
			});
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		} else {
			layer.msg(result.msg, {icon: 2, time: 5000});
		}
	});

	function fd() {
		var option = myChart.getOption();
		$(".chartfd").show();
		$(".chartfd").show();
		var mychart = echarts.init(document.getElementById('chartfd'));
		mychart.clear();
		option.toolbox[0].feature.myTool1.show = false;
		option.toolbox[0].feature.myTool2.show = true;
		mychart.setOption(option, true);
		window.onresize = mychart.resize;
	}

	// 缩小
	function sx2() {
		$("#zuo").show();
		$("#you").show();
		$(".chartfd").hide();
		$("#screen2").show();
	}
}
//舆情新闻查询
function yq(){
	let url =  BASE_URL + '/entPanoramicNewController/queryNews',
		data = {searchKey:KEYNO};
	doData(url,data, function(result) {
		if (result.status==10001){
			let data = result.data.Result;
			let str="";
			if (data.length >7){
				$(".more").text("更多>>");
			}
			for (let x of data){
				let title = (x.Title).length>18?(x.Title).substring(0,18)+"...":x.Title;
				str+= '<a class="li" href="'+x.Url+'" target="_blank" id="'+x.KeyNo+'" title="'+x.Title+'">'+
					'<div class="tit">'+title+'</div>'+
					'<div class="date">'+x.PublishTime+'</div>'+
					'</a>';
			}
			$("#qytable").empty().html(str);
			if(data.length==0){
				$("#qytable").html("暂无舆情新闻");
			}
		}else {
			layer.msg(result.msg,{icon:2,time:5000});
		}
	});
}
// 更多新闻舆情
function toNews() {
	//捕获页
	layer.open({
		type: 2,
		shade: false,
		maxmin: true, //开启最大化最小化按钮
		area: ['50%', '70%'],
		title: '新闻舆情', //不显示标题
		content: 'news.html?ENTNAME='+ENTNAME
	});
}
//知识产权列表页
function toZscq(){
	layer.open({
		type: 2,
		shade: false,
		maxmin: true, //开启最大化最小化按钮
		area: ['70%', '90%'],
		title: '知识产权', //不显示标题
		content: 'zscq.html?ENTNAME='+ENTNAME
	});
}
//企业信用详情
function qyxq(){
	var datas = {};
	datas.REGNO=REGNO;
	$.ajax({
		type: 'POST',
		url : BASE_URL+'/entPanoramicNewController/getEntCreditxq',
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