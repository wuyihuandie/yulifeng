var PARENT_DL = 'ZK06';
var CONDITION='RATGRO';
var CHAIN_LINK_ID='';
var APPLICATION_ID='';
YEAR = "2020";
$(function(){
	// 云计算
	$('#yjs').click(function(){
		window.location.href = '../yjs-cyl/yjs-yyly.html?menuType=5';
	})
	
	
	$('#industry').click(function(){
		window.location.href = 'cyl-3double.html?menuType=5';
	})
	
	$('#technology').click(function(){
		window.location.href = 'cyl-jslx.html?menuType=5';
	})
	
	$('#district').click(function(){
		window.location.href = 'cyl-qyfb.html?menuType=5';
	})
	queryEntNum();
	queryRightList();
	setTimeout(function (){queryLeft()},500);


})
function queryList(param,ths) {
	$('.location').removeClass('locations');
	$(ths).addClass("locations");
	APPLICATION_ID=param;
	queryRightList();
}
 function queryRightList() {
		var datas = {};
		datas.YEAR=YEAR;
		datas.PARENT_DL=PARENT_DL;
		datas.CHAIN_LINK_ID=CHAIN_LINK_ID;
		datas.CONDITION=CONDITION;
		datas.APPLICATION_ID = APPLICATION_ID;
	 	var htmlData = '';
		doData(BASE_URL+'/industrialChainController/getApplicationEnt',datas,function(result){
			if(result.status == '10001'){
				console.log("result:"+result);
				result.data.forEach(function(item,idex){
					htmlData +=  '<div class="ent-list-info-zg-div" onclick="tzQyhx(\''+item.PRIPID+'\',\''+item.REGNO+'\',\''+item.ENTNAME+'\')">'+
						'<p class="p-entname"><span>'+item.AREA_NAME+'</span>'+item.ENTNAME+'</p>'+
						'<p class="p-zcdate">成立日期：'+item.ESTDATE+'<b>注册资金：'+item.REGCAP+'万元</b></p>'+
						'<p class="p-zcdate">营业收入：'+item.VENDINC+'(万元)</p>'+
						'<p class="p-zcdate">纳税额：'+item.RATGRO+'(万元)</p>'+
						'</div>';
				})
			}
			$("#entList").html(htmlData);
		})

	}
 function queryEntNum() {
	console.log("hello")
	 var datas = {};
	 datas.YEAR = YEAR;
	 doData(BASE_URL+'/industrialChainController/getApplicationEntNum',datas,function(result){
	 	if(result.status == 10001){
	 		console.log("world")
	 		result.data.forEach(function(item,idex){
				if(item.APPLICATION_ID =='24'){
					$('#24').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='30'){
					$('#30').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='33'){
					$('#33').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='34'){
					$('#34').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='37'){
					$('#37').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='38'){
					$('#38').text(item.SUMS+"家")
				}if(item.APPLICATION_ID =='39'){
					$('#39').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='41'){
					$('#41').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='44'){
					$('#44').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='46'){
					$('#46').text(item.SUMS+"家")
				}if(item.APPLICATION_ID =='51'){
					$('#51').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='55'){
					$('#55').text(item.SUMS+"家")
				}
				if(item.APPLICATION_ID =='56'){
					$('#56').text(item.SUMS+"家")
				}
			})
		}
	 	console.log("NIHAP")
	 })

 }
 function queryLeft(){
	 var  category= []; // 类别
	 var datas ={
		 PARENT_DL:'ZK06'
	 };
	 $.ajax({
	 	type: 'POST',
	 	url : BASE_URL+'/industrialChainController/getWlwYyly',
	 	data:{
	 		param:JSON.stringify(datas)//参数
	 	},
	 	cache : false,
	 	success : function(text) {
			var result = JSON.parse(text);
	 		    if (result.status==10001){
	 		    	let data = result.data;
	 		    	data.forEach(function(item, index){
	 		    		var Data ={
	 		    			name: item.NAME,
	 		    			value: item.SUMS
	 		    		}
	 		    			category.push(Data);
	 		    	})
	 		    	
	 		    	var  datas = [];
	 		    	 category.forEach(value => {
	 		    	     datas.push(value.value);
	 		    	 });
	 		    	 option = {
	 		    	     // backgroundColor:'#333',
	 		    	     xAxis: {
	 		    			 name:'数量（个)',
	 		    			 nameTextStyle:{
	 		    				 color:"#fff"
	 		    			 },
	 		    	         splitLine: {
	 		    	             show: false
	 		    	         },
	 		    	         axisLine: {
	 		    	             show: false
	 		    	         },
	 		    	         axisLabel: {
	 		    	             show: false
	 		    	         },
	 		    	         axisTick: {
	 		    	             show: false
	 		    	         }
	 		    	     },
	 		    	     grid: {
	 		    	         left: 90,
	 		    	         top: 20, // 设置条形图的边距
	 		    	         right: 80,
	 		    	         bottom: 20
	 		    	     },
	 		    	     yAxis: [{
	 		    			 
	 		    	         type: "category",
	 		    	         inverse: false,
	 		    	         data: category,
	 		    	         axisLine: {
	 		    	             show: false
	 		    	         },
	 		    	         axisTick: {
	 		    	             show: false
	 		    	         },
	 		    	         axisLabel: {
	 		    	             show: false
	 		    	         }
	 		    	     }],
	 		    	     series: [{
	 		    	             // 内
	 		    	             type: "bar",
	 		    	             barWidth: 18,
	 		    	             itemStyle: {
	 		    	                 normal: {
	 		    	                     barBorderRadius:[4,4,4,4],
	 		    	                     color: function(params) {
	 		    	                         var color;
	 		    	                         if(params.dataIndex==19){
	 		    	                              color = {
	 		    	                                 type: "linear",
	 		    	                                 x: 0,
	 		    	                                 y: 0,
	 		    	                                 x2: 1,
	 		    	                                 y2: 0,
	 		    	                                 colorStops: [{
	 		    	                                         offset: 0,
	 		    	                                         color: "#66b1ff" // 0% 处的颜色
	 		    	                                     },
	 		    	                                     {
	 		    	                                         offset: 1,
	 		    	                                         color: "#409eff" // 100% 处的颜色
	 		    	                                     }
	 		    	                                 ]
	 		    	                             }
	 		    	                             }else if(params.dataIndex==18){
	 		    	                             color = {
	 		    	                                 type: "linear",
	 		    	                                 x: 0,
	 		    	                                 y: 0,
	 		    	                                 x2: 1,
	 		    	                                 y2: 0,
	 		    	                                 colorStops: [{
	 		    	                                          offset: 0,
	 		    	                                         color: "#66b1ff" // 0% 处的颜色
	 		    	                                     },
	 		    	                                     {
	 		    	                                         offset: 1,
	 		    	                                         color: "#409eff" // 100% 处的颜色
	 		    	                                     }
	 		    	                                 ]
	 		    	                             }
	 		    	                             }else if(params.dataIndex==17){
	 		    	                             color = {
	 		    	                                 type: "linear",
	 		    	                                 x: 0,
	 		    	                                 y: 0,
	 		    	                                 x2: 1,
	 		    	                                 y2: 0,
	 		    	                                 colorStops: [{
	 		    	                                          offset: 0,
	 		    	                                         color: "#66b1ff" // 0% 处的颜色
	 		    	                                     },
	 		    	                                     {
	 		    	                                         offset: 1,
	 		    	                                         color: "#409eff" // 100% 处的颜色
	 		    	                                     }
	 		    	                                 ]
	 		    	                             }
	 		    	                             }else{
	 		    	                             color = {
	 		    	                                 type: "linear",
	 		    	                                 x: 0,
	 		    	                                 y: 0,
	 		    	                                 x2: 1,
	 		    	                                 y2: 0,
	 		    	                                 colorStops: [{
	 		    	                                          offset: 0,
	 		    	                                         color: "#66b1ff" // 0% 处的颜色
	 		    	                                     },
	 		    	                                     {
	 		    	                                         offset: 1,
	 		    	                                         color: "#409eff" // 100% 处的颜色
	 		    	                                     }
	 		    	                                 ]
	 		    	                             }
	 		    	                             }
	 		    	                             return color;
	 		    	                     },
	 		    	                 }
	 		    	             },
	 		    	             label: {
	 		    	                 normal: {
	 		    	                     show: true,
	 		    	                     position: "left",
	 		    	                     formatter: "{b}",
	 		    	                     textStyle: {
	 		    	                         color: "#fff",
	 		    	                         fontSize: 14
	 		    	                     }
	 		    	                 }
	 		    	             },
	 		    	             data: category,
	 		    	             z: 1,
	 		    	             animationEasing: "elasticOut"
	 		    	         },
	 		    	         {
	 		    	             // 分隔
	 		    	             type: "pictorialBar",
	 		    	             itemStyle: {
	 		    	                 normal:{
	 		    	                     color:"#333"
	 		    	                 }
	 		    	             },
	 		    	             symbolRepeat: "fixed",
	 		    	             symbolMargin: 6,
	 		    	             symbol: "rect",
	 		    	             symbolClip: true,
	 		    	             symbolSize: [2, 21],
	 		    	             symbolPosition: "start",
	 		    	             symbolOffset: [1, -1],
	 		    	             data: category,
	 		    	             z: 2,
	 		    	             animationEasing: "elasticOut"
	 		    	         },
	 		    	         {
	 		    	             // 外边框
	 		    	             type: "pictorialBar",
	 		    	             symbol: "rect",
	 		    	             itemStyle: {
	 		    	                 normal: {
	 		    	                     color: "none"
	 		    	                 }
	 		    	             },
	 		    	             label: {
	 		    	                 normal: {
	 		    	                 	formatter: (params) => {
	 		    	                 		var text;
	 		    	                         if(params.dataIndex==1){
	 		    	                         	text = '{f|  '+params.data+'}';
	 		    	                         }else if(params.dataIndex==2){
	 		    	                         	text = '{f|  '+params.data+'}';
	 		    	                         }else if(params.dataIndex==3){
	 		    	                         	text = '{f|  '+params.data+'}';
	 		    	                         }else{
	 		    	                         	text = '{f|  '+params.data+'}';
	 		    	                         }
	 		    	                         return text;
	 		    	     				},
	 		    	     				rich:{
	 		    	     					f:{
	 		    	     			        	color:"#ffffff"
	 		    	     			        }
	 		    	     				},
	 		    	     				position: 'right',
	 		    	     				show: true
	 		    	                 }
	 		    	             },
	 		    	             data: datas,
	 		    	             z: 0,
	 		    	             animationEasing: "elasticOut"
	 		    	         }
	 		    	     ]
	 		    	 };
	 		    	var qyfbDom = document.getElementById("left");
	 		    	myCharts = echarts.init(qyfbDom);
	 		    	myCharts.setOption(option, true);
					myCharts.off('click');
	 		    	myCharts.on('click', function (params) {
						layer.open({
							type: 2,
							shade: 0.1,
							title: false, //不显示标题
							area: ['90%', '90%'], //宽高
							content: realPath + "view/cyl-3/cyl-qyqd-yyly.html?APPLICATION_NAME=" + params.name
						})
	 		    		//alert(params.name);
	 		    	});
	 		    }
	 	   },
	 	});
	
 }