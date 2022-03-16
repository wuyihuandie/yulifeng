
$(function(){

	queryRank(AREA,YEAR,PARENT_DL,BQ_JZZS,CONDITION);//渲染企业列表
	
})
function queryRank(AREA_S,YEAR_S,PARENT_DL,BQ_JZZS_S,CONDITION_S){
	if(!PARENT_DL){
		PARENT_DL='ZK01';
	}
	var datas = {};
	datas.AREA=AREA_S;
	datas.YEAR=YEAR_S;
	datas.PARENT_DL=PARENT_DL;
	datas.BQ_JZZS=BQ_JZZS_S;
	datas.CONDITION=CONDITION_S;
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
//调转企业画像
/*function tzQyhx(PRIPID,REGNO,ENTNAME){
	if(!REGNO || REGNO=='undefined'){//如果REGNO为空则传ENTNAME
		window.location.href=realPath+"view/qyhx/qyhx.html?menuType=1&PRIPID="+PRIPID+"&REGNO="+ENTNAME;
	}else{
		window.location.href=realPath+"view/qyhx/qyhx.html?menuType=1&PRIPID="+PRIPID+"&REGNO="+REGNO;
	}
	
}*/

/*var datas1 = {};
datas1.areaType='5';
datas1.year='2019';
$.ajax({
	type: 'POST',
	url : BASE_URL+'/digitalEconomyController/queryDigitalIncomeRate',
	data:{
		param:JSON.stringify(datas1)//参数
	},
	cache : false,
	success : function(text) {


	}
})*/
