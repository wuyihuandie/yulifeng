var PARENT_DL = getUrlValue("PARENT_DL");
var AREA = getUrlValue("area");
var TYPE = getUrlValue("TYPE");
var areaName = getUrlValue("areaName");
var COUNT = "";
$(function () {
	qylb('',1);
})

function qylb(value,curr) {
	var datas = {};
	datas.PARENT_DL = PARENT_DL+"";
	datas.AREA = AREA+"";
	datas.page=curr+"";
	datas.limit="10";
	datas.TYPE = TYPE+"";
	datas.UNISCID = value+"";
	$.ajax({
		type: 'POST',
		url: BASE_URL + '/entDistributionController/getEntListByAreaCount',
		data: {
			param: JSON.stringify(datas)//参数
		},
		cache: false,
		success: function (text) {
			let jsonText = JSON.parse(text);
			let data = jsonText.data;
			let list = data.list;
			let count = data.count;
			COUNT = count;
			let html = "";
			if(typeof (list) != "undefined" && list.length>0){
				for (let i = 0; i < list.length; i++) {
					let ENTNAME = list[i].ENTNAME;
					let ESTDATE = list[i].ESTDATE;
					let REGORG = list[i].REGORG;
					let PRIPID = list[i].PRIPID;
					let NAME = list[i].NAME;
					let UNISCID = list[i].UNISCID;
					let REGNO = list[i].REGNO;
					html += '<tr onclick="tzQyhx(\''+PRIPID+'\',\''+REGNO+'\',\''+ENTNAME+'\')">' +
							'<td style="height: 2.5rem"  width="5%">'+(i+1)+'</td>' +
							'<td  width="20%">'+ENTNAME+'</td>' +
							'<td  width="20%">'+NAME+'</td>' +
							'<td  width="20%">'+UNISCID+'</td>' +
							'<td  width="20%">'+areaName+'</td>' +
							'<td  width="15%">'+ESTDATE+'</td>' +
							'</tr>';
					if(curr=="1"){
						layui.use(['laypage', 'layer'], function(){
							var laypage = layui.laypage
									,layer = layui.layer;
							laypage.render({
								elem: 'fy'
								,count: COUNT
								,layout: ['prev', 'page', 'next']
								,theme: '#56F2F6'
								,jump: function(obj,first){
									let curr = obj.curr;
									if(!first){
										qylb(value,curr);
									}
								}
							});
						});
					}
				}
				$(".all-body-right-bottom-content>tbody").html(html);


				//选中样式
				$('.all-body-right-bottom-content>tbody>tr').hover(
						function(){
							$(this).css("cursor","pointer");
							$(this).css("background","rgba(6,171,188,.5)");
						},
						function(){
							$(this).css("background","none");
						}
				);
			}
		}
	});
}


//企业查询
$(document).on("click",".sch-button",function(){
	var value = $(".sch-input").val();
	qylb(value,1);
});
//回车事件
$(document).keyup(function(){
	if(event.keyCode==13){
		var value = $(".sch-input").val();
		qylb(value,1);
	}
});

//调转企业画像
/*
function tzQyhx(PRIPID,REGNO,ENTNAME){
	if(!REGNO || REGNO=='undefined'){//如果REGNO为空则传ENTNAME
		parent.window.location.href=realPath+"view/qyhx/qyhx.html?menuType=1&PRIPID="+PRIPID+"&REGNO="+ENTNAME;
	}else{
		parent.window.location.href=realPath+"view/qyhx/qyhx.html?menuType=1&PRIPID="+PRIPID+"&REGNO="+REGNO;
	}

}*/
