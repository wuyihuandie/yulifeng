$(function(){
	$(".box1-top").click(function(){
		
		
	})
	//产业链第二版
	$('#twobutton').click(function(){
		window.location.href = 'cyl-3double.html?menuType=2';
	})
	//产业链图
	$('.collect').click(function(){
		window.location.href = 'cyl-3.html?menuType=2';
	})
	//技术路线图
	$('#technology').click(function(){
		window.location.href = 'cyl-jslx.html?menuType=2';
	})
	//应用领域图
	$('#use').click(function(){
		window.location.href = 'cyl-yyly.html?menuType=2';
	})
	//区域分布图
	$('#district').click(function(){
		window.location.href = 'cyl-qyfb.html?menuType=2';
	})
	//企业清单 第一版
	$('#qyqd').click(function(){
		window.location.href = 'cyl-qyqd.html?menuType=2';
	})
	//企业清单 第儿二版
	$('#qyqd-2').click(function(){
		window.location.href = 'cyl-qyqd-2.html?menuType=2';
	})
	//左列表
	queryLeft();
	//右列表
	queryRight();
	
	//感知层
	$('.box3').click(function(){
		
		$('.Perception').addClass('bolck');
	})
	//网络层
	$('.box5').click(function(){
		
		$('.network').addClass('bolck');
	})
	//平台层
	$('.box7').click(function(){
		
		$('.podium').addClass('bolck');
	})
	//应用层
	$('.box9').click(function(){
		
		$('.application').addClass('bolck');
	})
	
	
})

 function queryLeft(){
	console.log(123);
 	var datas = {};
 	datas.AREA='360100';
 	datas.YEAR='2020';
 	datas.PARENT_DL='ZK01';
 	// datas.BQ_JZZS=BQ_JZZS_S;
 	datas.CONDITION='RATGRO';
	
 	$.ajax({
         type: 'POST',
         url : BASE_URL+'/industrialChainController/getEnterpriseListByCondition',
         data:{
             param:JSON.stringify(datas)//参数
         },
         cache : false,
		 
         success : function(text) {
             var paramData = JSON.parse(text);
             var htmlData = '';
			 
         	if(paramData.status == '10001'){//接口调用成功
         		var listData = paramData.data.EntMsg;
 				var listThousand = paramData.data.RATGROAndVENDINCOfUNIT;
 				var listPeople = paramData.data.EMPNUMOfUNIT;
         		for(var i = 0;i<listData.length;i++){//循环拼接排名列表内容
 					var VENDINC = listData[i].VENDINC;
 					if(VENDINC==undefined||VENDINC=='undefined'){
 						VENDINC='';
 					}
 					var NETINC = listData[i].NETINC;
 					if(NETINC==undefined||NETINC=='undefined'){
 						NETINC='';
 					}
 					var RATGRO = listData[i].RATGRO;
 					if(RATGRO==undefined||RATGRO=='undefined'){
 						RATGRO='';
 					}
 					var EMPNUM = listData[i].EMPNUM;
 					if(EMPNUM==undefined||EMPNUM=='undefined') {
 						EMPNUM = '';
 					}
 					var AREA_NAME = listData[i].AREA_NAME
 					if(AREA_NAME==undefined||AREA_NAME=='undefined'){
 						AREA_NAME='';
 					}
 					var DOM = listData[i].DOM
 					if(DOM==undefined||DOM=='undefined'){
 						DOM='';
 					}
         			htmlData +=  '<div class="ent-list-info-zg-div" onclick="tzQyhx(\''+listData[i].PRIPID+'\',\''+listData[i].REGNO+'\',\''+listData[i].ENTNAME+'\')">'+
 			                        '<p class="p-entname"><span>'+AREA_NAME+'</span>'+listData[i].ENTNAME+'</p>'+
 			                        '<p class="p-dom">'+DOM+'</p>'+
 			                        '<p class="p-zcdate">注册日期：'+listData[i].ESTDATE+'</p>'+
 									'<p class="p-zcdate">企业营收：'+VENDINC+'（'+listThousand+'）'+'企业净利润：'+NETINC+'（'+listThousand+'）</p>'+
 									'<p class="p-zcdate">纳税额：'+RATGRO+'（'+listThousand+'）'+'从业人数：'+EMPNUM+'（'+listPeople+'）</p>'+
 			                    '</div>';
         		}
         	}
         	$("#ranklist").html(htmlData);
         }
     })
 	
 }
 
 function queryRight(){
 	
 	console.log(123);
 	var datas = {};
 	datas.AREA='360100';
 	datas.YEAR='2020';
 	datas.PARENT_DL='ZK01';
 	// datas.BQ_JZZS=BQ_JZZS_S;
 	datas.CONDITION='RATGRO';
 	
 	$.ajax({
         type: 'POST',
         url : BASE_URL+'/industrialChainController/getEnterpriseListByCondition',
         data:{
             param:JSON.stringify(datas)//参数
         },
         cache : false,
 		 
         success : function(text) {
             var paramData = JSON.parse(text);
             var htmlData = '';
 			 
         	if(paramData.status == '10001'){//接口调用成功
         		var listData = paramData.data.EntMsg;
 				var listThousand = paramData.data.RATGROAndVENDINCOfUNIT;
 				var listPeople = paramData.data.EMPNUMOfUNIT;
         		for(var i = 0;i<listData.length;i++){//循环拼接排名列表内容
 					var VENDINC = listData[i].VENDINC;
 					if(VENDINC==undefined||VENDINC=='undefined'){
 						VENDINC='';
 					}
 					var NETINC = listData[i].NETINC;
 					if(NETINC==undefined||NETINC=='undefined'){
 						NETINC='';
 					}
 					var RATGRO = listData[i].RATGRO;
 					if(RATGRO==undefined||RATGRO=='undefined'){
 						RATGRO='';
 					}
 					var EMPNUM = listData[i].EMPNUM;
 					if(EMPNUM==undefined||EMPNUM=='undefined') {
 						EMPNUM = '';
 					}
 					var AREA_NAME = listData[i].AREA_NAME
 					if(AREA_NAME==undefined||AREA_NAME=='undefined'){
 						AREA_NAME='';
 					}
 					var DOM = listData[i].DOM
 					if(DOM==undefined||DOM=='undefined'){
 						DOM='';
 					}
         			htmlData +=  '<div class="ent-list-info-zg-div" onclick="tzQyhx(\''+listData[i].PRIPID+'\',\''+listData[i].REGNO+'\',\''+listData[i].ENTNAME+'\')">'+
 			                        '<p class="p-entname"><span>'+AREA_NAME+'</span>'+listData[i].ENTNAME+'</p>'+
 			                        '<p class="p-dom">'+DOM+'</p>'+
 			                        '<p class="p-zcdate">注册日期：'+listData[i].ESTDATE+'</p>'+
 									'<p class="p-zcdate">企业营收：'+VENDINC+'（'+listThousand+'）'+'企业净利润：'+NETINC+'（'+listThousand+'）</p>'+
 									'<p class="p-zcdate">纳税额：'+RATGRO+'（'+listThousand+'）'+'从业人数：'+EMPNUM+'（'+listPeople+'）</p>'+
 			                    '</div>';
         		}
         	}
         	$("#ranklast").html(htmlData);
         }
     })
 	
 }